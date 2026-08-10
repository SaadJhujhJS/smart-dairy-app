<script setup>
import { ref } from 'vue'
import { Leaf, Phone, Mail, MapPin, Send, ShieldCheck, Heart } from '@lucide/vue'

const emailInput = ref('')
const isSubscribed = ref(false)

const handleSubscribe = () => {
  if (emailInput.value.trim() !== '') {
    isSubscribed.value = true
    emailInput.value = ''
    setTimeout(() => {
      isSubscribed.value = false
    }, 4000)
  }
}
</script>

<template>
  <footer class="bg-stone-950 text-stone-300 border-t border-stone-800">
    <!-- Trust Features Banner -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="flex items-center space-x-4">
        <div class="p-3 rounded-xl bg-amber-500/10 text-amber-500">
          <ShieldCheck class="w-6 h-6" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider">100% Purity Certified</h4>
          <p class="text-xs text-stone-500 mt-0.5">Strict quality control with laboratory reports.</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <div class="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
          <Leaf class="w-6 h-6" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider">Farm Fresh & Raw</h4>
          <p class="text-xs text-stone-500 mt-0.5">Straight from forests and organic farms to your table.</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <div class="p-3 rounded-xl bg-amber-500/10 text-amber-500">
          <Phone class="w-6 h-6" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider">Dedicated Support</h4>
          <p class="text-xs text-stone-500 mt-0.5">Have queries? Reach us instantly via phone or email.</p>
        </div>
      </div>
    </div>

    <!-- Main Footer Columns -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
      
      <!-- Brand column -->
      <div class="space-y-4">
        <div class="flex items-center space-x-2.5">
          <div class="h-9 w-9 rounded-lg bg-amber-500 flex items-center justify-center text-white">
            <Leaf class="h-5 w-5" />
          </div>
          <span class="text-lg font-black tracking-tight text-white">
            Smart Dairy<span class="text-amber-500 font-medium">Store</span>
          </span>
        </div>
        <p class="text-sm text-stone-500 leading-relaxed">
          Bringing you premium quality wild small bee honey, organic big bee honey, pure Vedic Bilona Ghee, and fresh unsweetened Khoya. Truly authentic, rich taste.
        </p>
      </div>

      <!-- Links Column -->
      <div>
        <h4 class="text-sm font-extrabold text-white uppercase tracking-wider mb-5">Shop Categories</h4>
        <ul class="space-y-3 text-sm text-stone-400">
          <li><router-link to="/products?category=honey" class="hover:text-amber-500 transition-colors duration-200">Pure Forest Honey</router-link></li>
          <li><router-link to="/products?category=ghee" class="hover:text-amber-500 transition-colors duration-200">Bilona Cow Ghee</router-link></li>
          <li><router-link to="/products?category=khoya" class="hover:text-amber-500 transition-colors duration-200">Fresh Creamy Khoya</router-link></li>
          <li><router-link to="/products" class="hover:text-amber-500 transition-colors duration-200">All Products</router-link></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h4 class="text-sm font-extrabold text-white uppercase tracking-wider mb-5">Contact Details</h4>
        <ul class="space-y-4 text-sm text-stone-400">
          <li class="flex items-start space-x-2.5">
            <MapPin class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>Farm Lane, Organic Meadows, Sector 12, Mohali, India</span>
          </li>
          <li class="flex items-center space-x-2.5">
            <Phone class="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>+91 98765 43210</span>
          </li>
          <li class="flex items-center space-x-2.5">
            <Mail class="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>contact@smartdairystore.com</span>
          </li>
        </ul>
      </div>

      <!-- Newsletter Column -->
      <div class="space-y-4">
        <h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Stay Updated</h4>
        <p class="text-sm text-stone-500">Subscribe to receive exclusive offers, pure honey harvesting stories, and traditional recipes.</p>
        <form @submit.prevent="handleSubscribe" class="flex items-stretch overflow-hidden rounded-xl border border-stone-800 bg-stone-900/60 p-1">
          <input 
            type="email" 
            v-model="emailInput"
            placeholder="Your Email" 
            required
            class="flex-grow bg-transparent px-3 text-sm text-white focus:outline-none placeholder:text-stone-600"
          />
          <button 
            type="submit"
            class="bg-amber-600 hover:bg-amber-700 text-white p-2.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Subscribe"
          >
            <Send class="w-4 h-4" />
          </button>
        </form>
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <p v-if="isSubscribed" class="text-xs font-semibold text-secondary-500">
            🎉 Successfully subscribed! Check your inbox soon.
          </p>
        </transition>
      </div>

    </div>

    <!-- Copyright -->
    <div class="bg-stone-950/60 border-t border-stone-900 py-6 text-center text-xs text-stone-600">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <span>© 2026 Smart Dairy Store. All rights reserved.</span>
        <span class="flex items-center">
          Made with <Heart class="w-3.5 h-3.5 text-red-500 mx-1 fill-red-500" /> for Healthy Living.
        </span>
      </div>
    </div>
  </footer>
</template>
