import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'

export function useCart() {
  const store = useCartStore()
  const { 
    items, 
    isDrawerOpen, 
    totalItems, 
    subtotal, 
    discount, 
    shippingFee, 
    gst, 
    total 
  } = storeToRefs(store)

  return {
    items,
    isDrawerOpen,
    totalItems,
    subtotal,
    discount,
    shippingFee,
    gst,
    total,
    toggleDrawer: store.toggleDrawer,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart
  }
}
