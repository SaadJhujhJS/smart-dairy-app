<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, ShoppingCart, Leaf } from '@lucide/vue'
import StarRating from './StarRating.vue'
import { useCart } from '../composables/useCart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const { addItem } = useCart()

// Find lowest price
const minPrice = computed(() => {
  return Math.min(...props.product.variants.map(v => v.price))
})

// Find original price of the lowest price variant to show discount badge
const lowestPriceVariant = computed(() => {
  return props.product.variants.reduce((prev, curr) => prev.price < curr.price ? prev : curr)
})

const hasDiscount = computed(() => {
  return lowestPriceVariant.value.originalPrice > lowestPriceVariant.value.price
})

const discountPercent = computed(() => {
  if (!hasDiscount.value) return 0
  const orig = lowestPriceVariant.value.originalPrice
  const cur = lowestPriceVariant.value.price
  return Math.round(((orig - cur) / orig) * 100)
})

const handleQuickAdd = (e) => {
  e.stopPropagation() // Prevent navigating to detail page
  // Add the lowest price variant to cart
  addItem(props.product, lowestPriceVariant.value, 1)
}

const navigateToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div 
    @click="navigateToDetail"
    class="group flex flex-col bg-white rounded-3xl border border-stone-200/70 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-300/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
  >
    <!-- Graphic Container -->
    <div :class="['h-56 bg-gradient-to-br flex items-center justify-center text-white relative font-bold font-serif overflow-hidden select-none', product.gradient]">
      
      <!-- Product Image -->
      <img 
        v-if="product.image"
        :src="product.image" 
        :alt="product.name" 
        class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
      />

      <!-- Hover Zoom effect overlay -->
      <div class="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors duration-300"></div>
      
      <!-- Category Badge -->
      <span class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-stone-900 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
        <Leaf class="w-3 h-3 text-secondary-600 fill-secondary-50" />
        <span>{{ product.category }}</span>
      </span>

      <!-- Discount Badge -->
      <span 
        v-if="hasDiscount"
        class="absolute top-4 right-4 z-10 bg-red-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm"
      >
        SAVE {{ discountPercent }}%
      </span>

      <!-- Quick Add Overlay button for hover -->
      <div class="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-stone-900/60 to-transparent flex justify-center z-10">
        <button 
          @click="handleQuickAdd"
          class="w-full flex items-center justify-center space-x-2 py-2.5 bg-white text-stone-900 font-bold text-xs rounded-xl shadow-md hover:bg-primary-50 transition-colors cursor-pointer"
        >
          <ShoppingCart class="w-4 h-4 text-primary-600" />
          <span>Quick Add</span>
        </button>
      </div>
    </div>

    <!-- Product Text Details -->
    <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-2">
        <!-- Review Stars -->
        <StarRating :rating="product.rating" :reviewsCount="product.reviewsCount" :showText="true" />

        <!-- Title -->
        <h3 class="text-base font-extrabold text-stone-900 group-hover:text-primary-600 line-clamp-1 transition-colors duration-200">
          {{ product.name }}
        </h3>

        <!-- Short Description -->
        <p class="text-xs text-stone-500 font-medium line-clamp-2 leading-relaxed">
          {{ product.shortDescription }}
        </p>
      </div>

      <!-- Pricing and Action -->
      <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Starting from</span>
          <div class="flex items-center space-x-1.5">
            <span class="text-base font-extrabold text-stone-950">Rs. {{ minPrice }}</span>
            <span v-if="hasDiscount" class="text-xs text-stone-400 line-through font-medium">
              Rs. {{ lowestPriceVariant.originalPrice }}
            </span>
          </div>
        </div>

        <button 
          class="p-2.5 rounded-xl border border-stone-200 text-stone-600 bg-stone-50 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="View Product Details"
        >
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
