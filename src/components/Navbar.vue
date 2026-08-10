<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { Menu, X, ShoppingBag, Leaf, Compass } from '@lucide/vue'

const router = useRouter()
const { toggleDrawer, totalItems } = useCart()

const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop All', path: '/products' },
  { name: 'Honey', path: '/products?category=honey' },
  { name: 'Desi Ghee', path: '/products?category=ghee' },
  { name: 'Khoya', path: '/products?category=khoya' }
]

const navigateTo = (path) => {
  isMobileMenuOpen.value = false
  
  if (path.includes('?category=')) {
    const category = path.split('=')[1]
    router.push({ path: '/products', query: { category } })
  } else {
    router.push(path)
  }
}
</script>

<template>
  <nav class="sticky top-0 z-40 w-full glass-nav shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2.5 group">
          <div class="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:rotate-6 transition-transform duration-300">
            <Leaf class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div class="flex flex-col">
            <span class="text-lg sm:text-xl font-black tracking-tight text-stone-900 group-hover:text-primary-600 transition-colors duration-200">
              Smart Dairy<span class="text-primary-600 font-medium">Store</span>
            </span>
            <span class="text-[10px] text-secondary-600 font-bold tracking-wider uppercase -mt-1">
              100% Raw & Pure
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <button 
            v-for="link in navLinks.slice(0, 2)" 
            :key="link.name" 
            @click="navigateTo(link.path)"
            class="text-sm font-bold text-stone-600 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
          >
            {{ link.name }}
          </button>
          
          <!-- Category Quick Links -->
          <div class="flex items-center space-x-1 border-l border-stone-200 pl-8">
            <button 
              v-for="link in navLinks.slice(2)" 
              :key="link.name" 
              @click="navigateTo(link.path)"
              class="text-xs font-semibold px-3 py-1.5 rounded-lg text-stone-500 hover:text-secondary-700 hover:bg-secondary-50 transition-all duration-200 cursor-pointer"
            >
              {{ link.name }}
            </button>
          </div>
        </div>

        <!-- Right Buttons -->
        <div class="flex items-center space-x-4">
          <!-- Cart Toggle -->
          <button 
            @click="toggleDrawer(true)"
            class="relative p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-primary-600 transition-all duration-200 shadow-sm cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag class="h-5 w-5 sm:h-5.5 sm:w-5.5" />
            <span 
              v-if="totalItems > 0"
              class="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-bounce"
            >
              {{ totalItems }}
            </span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors duration-200 cursor-pointer"
          >
            <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" />
            <X v-else class="h-5 w-5" />
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Menu Overlay Panel -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-show="isMobileMenuOpen" class="md:hidden border-t border-stone-200 bg-white/95 backdrop-blur-md">
        <div class="px-4 pt-3 pb-6 space-y-2 shadow-inner">
          <button 
            v-for="link in navLinks" 
            :key="link.name" 
            @click="navigateTo(link.path)"
            class="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-stone-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 cursor-pointer"
          >
            {{ link.name }}
          </button>
          
          <div class="border-t border-stone-100 pt-4 px-4 flex items-center space-x-2 text-xs text-stone-400 font-semibold uppercase tracking-wider">
            <Compass class="w-4 h-4 text-secondary-500" />
            <span>Farm to Table Guarantee</span>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
