import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])
  const currentOrder = ref(null)

  const isClient = typeof window !== 'undefined'

  // Load orders history from local storage
  if (isClient) {
    const savedOrders = localStorage.getItem('smart_dairy_orders')
    if (savedOrders) {
      try {
        orders.value = JSON.parse(savedOrders)
      } catch (e) {
        console.error('Failed to parse orders storage', e)
      }
    }
  }

  // Save order details to history
  const placeOrder = (customerInfo, cartItems, billingDetails) => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000)
    const orderDate = new Date().toISOString()
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 2) // Estimated delivery in 2 days
    
    const newOrder = {
      id: orderId,
      date: orderDate,
      deliveryDate: deliveryDate.toISOString(),
      customer: { ...customerInfo },
      items: [...cartItems],
      billing: { ...billingDetails },
      status: 'Placed', // Placed, Processing, Dispatched, Delivered
      paymentMethod: customerInfo.paymentMethod // 'COD' or 'Card'
    }

    orders.value.push(newOrder)
    currentOrder.value = newOrder

    if (isClient) {
      localStorage.setItem('smart_dairy_orders', JSON.stringify(orders.value))
    }

    return newOrder
  }

  const getOrderById = (id) => {
    return orders.value.find(o => o.id === id)
  }

  return {
    orders,
    currentOrder,
    placeOrder,
    getOrderById
  }
})
