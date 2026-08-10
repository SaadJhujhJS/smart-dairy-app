<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import ProductCard from './ProductCard.vue'
import { ArrowRight, Sparkles } from '@lucide/vue'

const router = useRouter()
const { products } = useProducts()

// We showcase all 4 unique products as featured
const featuredList = computed(() => {
  return products.value.slice(0, 4)
})
</script>

<template>
  <section class="py-16 sm:py-24 bg-cream-50/40" id="featured-products">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div class="space-y-3 text-center md:text-left">
          <div class="inline-flex items-center space-x-1.5 bg-amber-100/60 border border-amber-200/50 rounded-full px-3 py-1 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest">
            <Sparkles class="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
            <span>Farm Handpicked Selection</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Our Featured Pure Products
          </h2>
          <p class="text-sm sm:text-base text-stone-500 font-medium max-w-xl">
            Sourced using sustainable methods, preserving vital nutrients and authentic homemade taste.
          </p>
        </div>

        <button 
          @click="router.push('/products')"
          class="inline-flex items-center justify-center space-x-2 text-sm font-bold text-primary-600 hover:text-primary-700 hover:translate-x-1 transition-all duration-200 cursor-pointer self-center md:self-end"
        >
          <span>View All Products</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in featuredList" 
          :key="product.id" 
          :product="product" 
        />
      </div>

    </div>
  </section>
</template>
