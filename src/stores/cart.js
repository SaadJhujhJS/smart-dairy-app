import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isDrawerOpen = ref(false)

  // Safety check to ensure we only access localStorage on the client side (ViteSSG runs in Node.js)
  const isClient = typeof window !== 'undefined'

  // Load cart from localStorage
  if (isClient) {
    const savedCart = localStorage.getItem('smart_dairy_cart')
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart)
      } catch (e) {
        console.error('Failed to parse cart storage', e)
      }
    }
  }

  // Save cart to localStorage on change
  if (isClient) {
    watch(
      items,
      (newItems) => {
        localStorage.setItem('smart_dairy_cart', JSON.stringify(newItems))
      },
      { deep: true }
    )
  }

  // Toggle Cart Drawer
  const toggleDrawer = (value) => {
    isDrawerOpen.value = value !== undefined ? value : !isDrawerOpen.value
  }

  // Add Item to Cart
  const addItem = (product, variant, quantity = 1) => {
    const existingItem = items.value.find(
      (item) => item.variantId === variant.id
    )

    if (existingItem) {
      // Check stock limit
      if (existingItem.quantity + quantity <= variant.stock) {
        existingItem.quantity += quantity
      } else {
        existingItem.quantity = variant.stock // set to max stock available
      }
    } else {
      // Add as new item
      items.value.push({
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        category: product.category,
        weight: variant.weight,
        price: variant.price,
        originalPrice: variant.originalPrice,
        sku: variant.sku,
        quantity: Math.min(quantity, variant.stock),
        maxStock: variant.stock,
        gradient: product.gradient
      })
    }
    // Auto-open drawer for better user feedback
    isDrawerOpen.value = true
  }

  // Remove Item
  const removeItem = (variantId) => {
    items.value = items.value.filter((item) => item.variantId !== variantId)
  }

  // Update Item Quantity
  const updateQuantity = (variantId, quantity) => {
    const item = items.value.find((item) => item.variantId === variantId)
    if (item) {
      const parsedQty = Math.max(1, parseInt(quantity) || 1)
      item.quantity = Math.min(parsedQty, item.maxStock)
    }
  }

  // Clear Cart
  const clearCart = () => {
    items.value = []
  }

  // Calculations
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const discount = computed(() => {
    // Show total savings compared to originalPrice
    return items.value.reduce((sum, item) => {
      const diff = (item.originalPrice || item.price) - item.price
      return sum + (diff > 0 ? diff * item.quantity : 0)
    }, 0)
  })

  // Free shipping over Rs. 1000, else Rs. 100
  const shippingFee = computed(() => {
    if (subtotal.value === 0) return 0
    return subtotal.value >= 1000 ? 0 : 99
  })

  // GST 5% included or added (let's add 5% GST for premium dairy store realism)
  const gst = computed(() => {
    return Math.round(subtotal.value * 0.05)
  })

  const total = computed(() => {
    return subtotal.value + shippingFee.value + gst.value
  })

  return {
    items,
    isDrawerOpen,
    toggleDrawer,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    discount,
    shippingFee,
    gst,
    total
  }
})
