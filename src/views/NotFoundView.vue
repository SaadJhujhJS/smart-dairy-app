<script setup>
import { useRouter } from 'vue-router'
import { useSEO } from '../composables/useSEO'
import { Compass, Home } from '@lucide/vue'

const router = useRouter()

useSEO({
  title: '404 - Page Not Found | Smart Dairy Store',
  description: 'The page you are looking for does not exist. Return to Smart Dairy Store to browse our pure small bee honey, cow ghee and fresh khoya.'
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 flex flex-col items-center justify-center text-center">
    
    <!-- Animated icon -->
    <div class="relative mb-8 select-none">
      <div class="absolute inset-0 bg-amber-100/50 rounded-full blur-2xl animate-pulse"></div>
      <div class="w-24 h-24 rounded-full border border-stone-200 bg-white flex items-center justify-center text-amber-500 shadow-xl relative animate-float">
        <Compass class="w-12 h-12" />
      </div>
    </div>

    <!-- Message -->
    <h1 class="text-4xl sm:text-5xl font-black text-stone-900 leading-tight">404</h1>
    <h2 class="text-xl font-bold text-stone-850 mt-2">Oops! Page Not Found</h2>
    <p class="text-stone-500 text-sm mt-3 max-w-sm leading-relaxed">
      The pathway you followed seems to have led away from our organic meadows. Let's get you back to safety.
    </p>

    <!-- CTAs -->
    <div class="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8 w-full max-w-xs sm:max-w-md">
      <button 
        @click="router.push('/')"
        class="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-colors"
      >
        <Home class="w-4 h-4" />
        <span>Return Home</span>
      </button>
      
      <button 
        @click="router.push('/products')"
        class="w-full sm:w-auto px-6 py-3 border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 font-bold text-sm rounded-xl shadow-sm cursor-pointer transition-colors"
      >
        Browse Catalog
      </button>
    </div>

  </div>
</template>
