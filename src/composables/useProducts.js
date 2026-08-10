import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/products'

export function useProducts() {
  const store = useProductsStore()
  const { 
    products, 
    searchQuery, 
    selectedCategory, 
    selectedWeight, 
    priceRange, 
    sortBy, 
    filteredProducts 
  } = storeToRefs(store)

  return {
    products,
    searchQuery,
    selectedCategory,
    selectedWeight,
    priceRange,
    sortBy,
    filteredProducts,
    resetFilters: store.resetFilters,
    getMinPrice: store.getMinPrice,
    getMaxPrice: store.getMaxPrice,
    getMinOriginalPrice: store.getMinOriginalPrice,
    getProductById: store.getProductById
  }
}
