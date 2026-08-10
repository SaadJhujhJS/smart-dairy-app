<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { X, Plus, Minus, Trash2, ShoppingBag } from '@lucide/vue'

const router = useRouter()
const {
  items,
  isDrawerOpen,
  totalItems,
  subtotal,
  discount,
  shippingFee,
  gst,
  total,
  toggleDrawer,
  removeItem,
  updateQuantity
} = useCart()

const handleCheckout = () => {
  toggleDrawer(false)
  router.push('/checkout')
}
</script>

<template>
  <div 
    v-show="isDrawerOpen" 
    class="fixed inset-0 z-50 overflow-hidden" 
    aria-labelledby="slide-over-title" 
    role="dialog" 
    aria-modal="true"
  >
    <div class="absolute inset-0 overflow-hidden">
      <!-- Backdrop with blur -->
      <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        leave-active-class="transition-opacity duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div 
          v-show="isDrawerOpen" 
          @click="toggleDrawer(false)" 
          class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        ></div>
      </transition>

      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <transition
          enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          enter-from-class="translate-x-full"
          leave-to-class="translate-x-full"
        >
          <div v-show="isDrawerOpen" class="pointer-events-auto w-screen max-w-md">
            <div class="flex h-full flex-col bg-cream-50 shadow-2xl border-l border-stone-200">
              
              <!-- Header -->
              <div class="px-6 py-5 border-b border-stone-200 bg-white">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <ShoppingBag class="h-6 w-6 text-primary-600" />
                    <h2 class="text-xl font-bold text-stone-900" id="slide-over-title">Your Cart</h2>
                    <span class="bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}
                    </span>
                  </div>
                  <div class="ml-3 flex h-7 items-center">
                    <button 
                      type="button" 
                      @click="toggleDrawer(false)"
                      class="rounded-full p-1 text-stone-400 hover:text-stone-600 hover:bg-stone-100 focus:outline-none transition-colors duration-200"
                    >
                      <span class="sr-only">Close panel</span>
                      <X class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Cart List -->
              <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-80 text-center">
                  <div class="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                    <ShoppingBag class="w-8 h-8" />
                  </div>
                  <h3 class="text-lg font-bold text-stone-800">Your cart is empty</h3>
                  <p class="text-stone-500 text-sm mt-1 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                  <button 
                    @click="toggleDrawer(false); router.push('/products')" 
                    class="mt-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary-600/25 cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>

                <div v-else class="divide-y divide-stone-200">
                  <div 
                    v-for="item in items" 
                    :key="item.variantId" 
                    class="flex py-5 first:pt-0 last:pb-0"
                  >
                    <!-- Product Gradient Thumbnail -->
                    <div :class="['h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br shadow-inner relative flex items-center justify-center font-bold text-white text-xs', item.gradient]">
                      <span class="text-center px-1 font-serif select-none drop-shadow-md">
                        {{ item.name.split(' ').slice(-2).join(' ') }}
                      </span>
                      <span class="absolute bottom-1 right-1 bg-stone-900/40 px-1 py-0.5 rounded text-[10px]">
                        {{ item.weight }}
                      </span>
                    </div>

                    <!-- Details -->
                    <div class="ml-4 flex flex-1 flex-col justify-between">
                      <div>
                        <div class="flex justify-between text-base font-bold text-stone-900">
                          <h3 class="line-clamp-1 hover:text-primary-600 transition-colors duration-200">
                            <router-link :to="`/product/${item.productId}`" @click="toggleDrawer(false)">
                              {{ item.name }}
                            </router-link>
                          </h3>
                          <p class="ml-4">Rs. {{ item.price * item.quantity }}</p>
                        </div>
                        <p class="mt-1 text-xs text-stone-500 font-medium">SKU: {{ item.sku }}</p>
                      </div>

                      <div class="flex items-end justify-between text-sm">
                        <!-- Quantity selector -->
                        <div class="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden shadow-sm">
                          <button 
                            @click="updateQuantity(item.variantId, item.quantity - 1)" 
                            class="p-1.5 text-stone-500 hover:bg-stone-50 active:bg-stone-100 transition-colors cursor-pointer"
                          >
                            <Minus class="w-3.5 h-3.5" />
                          </button>
                          <span class="px-3 text-stone-800 font-semibold text-xs select-none">
                            {{ item.quantity }}
                          </span>
                          <button 
                            @click="updateQuantity(item.variantId, item.quantity + 1)"
                            :disabled="item.quantity >= item.maxStock"
                            class="p-1.5 text-stone-500 hover:bg-stone-50 active:bg-stone-100 disabled:opacity-30 transition-colors cursor-pointer"
                          >
                            <Plus class="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <!-- Remove Button -->
                        <button 
                          type="button" 
                          @click="removeItem(item.variantId)"
                          class="flex items-center space-x-1 font-medium text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                        >
                          <Trash2 class="w-4 h-4" />
                          <span class="text-xs">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer billing & Action -->
              <div v-if="items.length > 0" class="border-t border-stone-200 bg-white px-6 py-6 space-y-4">
                <div class="space-y-2 text-sm text-stone-600">
                  <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span class="font-semibold text-stone-900">Rs. {{ subtotal }}</span>
                  </div>
                  <div v-if="discount > 0" class="flex justify-between text-secondary-600 font-medium">
                    <span>Your Savings</span>
                    <span>- Rs. {{ discount }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>GST (5%)</span>
                    <span class="font-semibold text-stone-900">Rs. {{ gst }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Shipping</span>
                    <span v-if="shippingFee === 0" class="font-semibold text-secondary-600">FREE</span>
                    <span v-else class="font-semibold text-stone-900">Rs. {{ shippingFee }}</span>
                  </div>
                  
                  <!-- Progress bar for free shipping -->
                  <div class="pt-2">
                    <div class="flex justify-between text-xs font-semibold text-stone-500 mb-1">
                      <span v-if="subtotal < 1000">Add Rs. {{ 1000 - subtotal }} more for FREE shipping!</span>
                      <span v-else class="text-secondary-600">🎉 You qualify for FREE shipping!</span>
                    </div>
                    <div class="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-secondary-500 transition-all duration-500 ease-out" 
                        :style="{ width: Math.min(100, (subtotal / 1000) * 100) + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="border-t border-stone-100 pt-4">
                  <div class="flex justify-between text-lg font-extrabold text-stone-950">
                    <span>Estimated Total</span>
                    <span>Rs. {{ total }}</span>
                  </div>
                  <p class="mt-0.5 text-xs text-stone-500">Taxes and shipping calculated at checkout.</p>
                </div>

                <div class="pt-2">
                  <button 
                    @click="handleCheckout"
                    class="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-base rounded-xl transition-all duration-200 shadow-lg shadow-primary-600/25 cursor-pointer hover:shadow-primary-700/30"
                  >
                    <span>Secure Checkout</span>
                  </button>
                  <button 
                    @click="toggleDrawer(false)" 
                    class="mt-3 w-full text-center text-sm font-semibold text-stone-500 hover:text-stone-700 transition-colors duration-200 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
