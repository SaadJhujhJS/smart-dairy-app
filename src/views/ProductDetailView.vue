<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCart } from '../composables/useCart'
import { useSEO } from '../composables/useSEO'
import StarRating from '../components/StarRating.vue'
import { 
  ArrowLeft, ShoppingCart, Plus, Minus, ShieldCheck, 
  Truck, CornerDownLeft, Sparkles, Heart 
} from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const { getProductById } = useProducts()
const { addItem } = useCart()

const product = computed(() => getProductById(route.params.id))

// Active selection states
const selectedVariant = ref(null)
const selectedQty = ref(1)
const activeTab = ref('description') // description, specifications, benefits
const activeImageIndex = ref(0) // Gallery representation

// Toast alert state for add to cart success
const showSuccessToast = ref(false)
const addedItemDetails = ref(null)

onMounted(() => {
  if (product.value && product.value.variants.length > 0) {
    selectedVariant.value = product.value.variants[0]
  }
})

// Switch variant helper
const selectVariant = (variant) => {
  selectedVariant.value = variant
  selectedQty.value = 1 // Reset quantity to 1 when variant changes
}

const handleAddToCart = () => {
  if (product.value && selectedVariant.value) {
    addItem(product.value, selectedVariant.value, selectedQty.value)
    
    // Trigger success toast
    addedItemDetails.value = {
      name: product.value.name,
      weight: selectedVariant.value.weight,
      quantity: selectedQty.value
    }
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 4000)
  }
}

// Generate Image Gallery simulation lists
// Uses different gradient shades to simulate a photo gallery
const galleryImages = computed(() => {
  if (!product.value) return []
  return [
    { title: 'Main Package', desc: 'Certified pure container', gradient: product.value.gradient, image: product.value.image },
    { title: 'Harvesting', desc: 'Direct from organic source', gradient: 'from-emerald-400 to-amber-600' },
    { title: 'Lab Testing', desc: '100% adulteration checks', gradient: 'from-amber-400 to-emerald-600' }
  ]
})

// Calculate discount
const discountPercent = computed(() => {
  if (!selectedVariant.value || !selectedVariant.value.originalPrice) return 0
  const orig = selectedVariant.value.originalPrice
  const cur = selectedVariant.value.price
  if (orig <= cur) return 0
  return Math.round(((orig - cur) / orig) * 100)
})

// Setup SEO & structured Product schema
const seoTitle = computed(() => product.value ? `${product.value.name} | Smart Dairy Store` : 'Product Details')
const seoDesc = computed(() => product.value ? product.value.shortDescription : '')
const productUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '')

useSEO({
  title: seoTitle,
  description: seoDesc,
  schema: computed(() => {
    if (!product.value || !selectedVariant.value) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.value.name,
      'description': product.value.description,
      'image': 'https://smartdairystore.com/og-image.png',
      'sku': selectedVariant.value.sku,
      'brand': {
        '@type': 'Brand',
        'name': 'Smart Dairy Store'
      },
      'offers': {
        '@type': 'Offer',
        'priceCurrency': 'INR',
        'price': selectedVariant.value.price,
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': selectedVariant.value.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'url': productUrl.value
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': product.value.rating,
        'reviewCount': product.value.reviewsCount
      }
    }
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
    
    <!-- 404 handler if product is not found -->
    <div v-if="!product" class="text-center py-24 bg-white rounded-3xl border border-stone-200 shadow-sm px-6">
      <h2 class="text-2xl font-black text-stone-900">Product Not Found</h2>
      <p class="text-stone-500 text-sm mt-2">The product you are looking for does not exist or has been discontinued.</p>
      <button 
        @click="router.push('/products')" 
        class="mt-6 px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors cursor-pointer"
      >
        Return to Shop
      </button>
    </div>

    <!-- Main Detail Layout -->
    <div v-else class="space-y-12">
      <!-- Back Button -->
      <div>
        <button 
          @click="router.back()" 
          class="inline-flex items-center space-x-2 text-sm font-bold text-stone-600 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to products</span>
        </button>
      </div>

      <!-- Detail Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
        
        <!-- Left: Image Gallery -->
        <div class="space-y-6">
          <!-- Main Display -->
          <div :class="['h-80 sm:h-[400px] w-full rounded-3xl shadow-lg relative flex items-center justify-center font-serif text-white font-black text-4xl bg-gradient-to-br transition-all duration-500 overflow-hidden select-none', galleryImages[activeImageIndex]?.gradient]">
            
            <!-- Real Product Image (if defined) -->
            <img 
              v-if="galleryImages[activeImageIndex]?.image"
              :src="galleryImages[activeImageIndex]?.image"
              :alt="product.name"
              class="absolute inset-0 w-full h-full object-cover"
            />
            
            <div class="absolute inset-0 bg-stone-900/10 transition-opacity duration-300"></div>
            
            <div v-if="!galleryImages[activeImageIndex]?.image" class="text-center px-6 drop-shadow-md transform hover:scale-[1.03] transition-transform duration-300 z-10 relative">
              <span class="block text-xs uppercase font-sans tracking-widest opacity-80 mb-2 font-bold">{{ product.category }}</span>
              {{ product.name.split(' ').slice(-2).join(' ') }}
            </div>

            <!-- Active Graphic Caption overlay -->
            <div class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center justify-between text-stone-900 text-xs font-semibold shadow-md z-10">
              <span>{{ galleryImages[activeImageIndex]?.title }}</span>
              <span class="text-stone-400">{{ galleryImages[activeImageIndex]?.desc }}</span>
            </div>
          </div>

          <!-- Thumbnail Sliders -->
          <div class="grid grid-cols-3 gap-4">
            <button 
              v-for="(img, idx) in galleryImages" 
              :key="idx"
              @click="activeImageIndex = idx"
              :class="[
                'h-20 sm:h-24 rounded-2xl border bg-gradient-to-br flex items-center justify-center font-serif font-black text-white text-[10px] shadow-sm overflow-hidden transition-all duration-300 relative select-none cursor-pointer',
                activeImageIndex === idx 
                  ? 'border-primary-500 ring-2 ring-primary-500 scale-95' 
                  : 'border-stone-200 opacity-70 hover:opacity-100'
              ], img.gradient"
            >
              <!-- Real Product Image Thumbnail -->
              <img 
                v-if="img.image"
                :src="img.image"
                :alt="img.title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              
              <div class="absolute inset-0 bg-stone-950/5"></div>
              <span class="text-center px-1 drop-shadow-sm z-10 relative">{{ img.title.split(' ')[0] }}</span>
            </button>
          </div>
        </div>

        <!-- Right: Text details & Action options -->
        <div class="space-y-8">
          <div class="space-y-4">
            <div class="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200/50 rounded-full px-3 py-1 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles class="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
              <span>Sustainably Harvested</span>
            </div>
            
            <h1 class="text-3xl sm:text-4xl font-black text-stone-950 leading-tight">
              {{ product.name }}
            </h1>

            <div class="flex items-center space-x-4 border-b border-stone-200/60 pb-4">
              <StarRating :rating="product.rating" :reviewsCount="product.reviewsCount" />
              <span class="text-stone-300">|</span>
              <span class="text-xs text-secondary-600 font-bold uppercase tracking-wider">In Stock & Verified</span>
            </div>
          </div>

          <!-- Price Display -->
          <div v-if="selectedVariant" class="bg-stone-50 border border-stone-200/50 p-6 rounded-2xl flex items-center justify-between">
            <div class="space-y-1">
              <span class="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest">Pricing for {{ selectedVariant.weight }}</span>
              <div class="flex items-baseline space-x-2">
                <span class="text-2xl sm:text-3xl font-black text-stone-950">Rs. {{ selectedVariant.price }}</span>
                <span v-if="discountPercent > 0" class="text-sm text-stone-400 line-through font-semibold">
                  Rs. {{ selectedVariant.originalPrice }}
                </span>
              </div>
            </div>
            
            <span 
              v-if="discountPercent > 0"
              class="bg-red-500 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-sm"
            >
              SAVE {{ discountPercent }}%
            </span>
          </div>

          <!-- Variant Selector -->
          <div class="space-y-3">
            <label class="text-xs font-black text-stone-900 uppercase tracking-wider block">Choose Variant (Size)</label>
            <div class="flex flex-wrap gap-3">
              <button 
                v-for="variant in product.variants" 
                :key="variant.id"
                @click="selectVariant(variant)"
                :class="[
                  'px-5 py-3 rounded-2xl border text-sm font-bold flex flex-col items-center justify-center transition-all duration-300 w-28 cursor-pointer relative',
                  selectedVariant?.id === variant.id 
                    ? 'border-primary-600 bg-primary-50/50 text-primary-850 ring-1 ring-primary-600 shadow-sm' 
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900 shadow-sm'
                ]"
              >
                <span class="text-sm font-black">{{ variant.weight }}</span>
                <span class="text-xs font-semibold text-stone-400 mt-0.5">Rs. {{ variant.price }}</span>
              </button>
            </div>
          </div>

          <!-- Quantity Picker & Add to Cart -->
          <div v-if="selectedVariant" class="space-y-4 pt-4 border-t border-stone-250">
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <!-- Qty controls -->
              <div class="flex items-center justify-between border border-stone-200 rounded-2xl bg-white p-1 shadow-sm w-full sm:w-36 h-[54px]">
                <button 
                  @click="selectedQty = Math.max(1, selectedQty - 1)"
                  :disabled="selectedQty <= 1"
                  class="p-2 text-stone-500 hover:bg-stone-50 active:bg-stone-100 disabled:opacity-30 rounded-xl transition-colors cursor-pointer"
                >
                  <Minus class="w-4 h-4" />
                </button>
                <span class="px-4 text-stone-950 font-extrabold text-base select-none">
                  {{ selectedQty }}
                </span>
                <button 
                  @click="selectedQty++"
                  :disabled="selectedQty >= selectedVariant.stock"
                  class="p-2 text-stone-500 hover:bg-stone-50 active:bg-stone-100 disabled:opacity-30 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus class="w-4 h-4" />
                </button>
              </div>

              <!-- Cart button -->
              <button 
                @click="handleAddToCart"
                :disabled="selectedVariant.stock <= 0"
                class="w-full flex items-center justify-center space-x-2.5 px-8 h-[54px] bg-primary-600 hover:bg-primary-700 disabled:bg-stone-300 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-lg shadow-primary-600/30 hover:shadow-primary-700/35 cursor-pointer disabled:cursor-not-allowed hover:scale-[1.01]"
              >
                <ShoppingCart class="w-5 h-5" />
                <span>{{ selectedVariant.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}</span>
              </button>
            </div>

            <!-- Stock status indicator -->
            <p v-if="selectedVariant.stock > 0 && selectedVariant.stock <= 5" class="text-xs font-bold text-amber-600">
              ⚠️ Hurray! Only {{ selectedVariant.stock }} items left in stock.
            </p>
            <p v-else-if="selectedVariant.stock === 0" class="text-xs font-bold text-red-500">
              ❌ Out of stock. We are restocking this variant soon!
            </p>
          </div>

          <!-- Trust Badges -->
          <div class="grid grid-cols-3 gap-4 py-4 border-y border-stone-200/80 text-center text-[10px] text-stone-500 font-bold uppercase tracking-wider">
            <div class="flex flex-col items-center justify-center space-y-1.5">
              <ShieldCheck class="w-5 h-5 text-secondary-600" />
              <span>Lab Checked</span>
            </div>
            <div class="flex flex-col items-center justify-center space-y-1.5 border-x border-stone-200">
              <Truck class="w-5 h-5 text-secondary-600" />
              <span>Quick Dispatch</span>
            </div>
            <div class="flex flex-col items-center justify-center space-y-1.5">
              <CornerDownLeft class="w-5 h-5 text-secondary-600" />
              <span>Easy Return</span>
            </div>
          </div>

        </div>

      </div>

      <!-- Description Tabs -->
      <div class="border-t border-stone-200/80 pt-10">
        <!-- Tab triggers -->
        <div class="flex border-b border-stone-250 overflow-x-auto space-x-6 sm:space-x-8">
          <button 
            v-for="tab in ['description', 'specifications', 'benefits']" 
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'pb-4 text-sm font-black uppercase tracking-wider border-b-2 transition-all duration-200 capitalize whitespace-nowrap cursor-pointer',
              activeTab === tab 
                ? 'border-primary-600 text-stone-900' 
                : 'border-transparent text-stone-400 hover:text-stone-700'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Tab contents -->
        <div class="py-8 text-stone-600 text-sm leading-relaxed max-w-3xl">
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="space-y-4">
            <p>{{ product.description }}</p>
          </div>

          <!-- Specifications Tab -->
          <div v-if="activeTab === 'specifications'">
            <table class="w-full border-collapse border border-stone-200 rounded-2xl overflow-hidden">
              <tbody>
                <tr 
                  v-for="(val, key) in product.specifications" 
                  :key="key"
                  class="odd:bg-stone-50 border-b border-stone-200/60"
                >
                  <td class="px-5 py-3 text-stone-500 font-bold uppercase tracking-wider text-xs w-1/3">{{ key }}</td>
                  <td class="px-5 py-3 text-stone-850 font-semibold">{{ val }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Benefits Tab -->
          <div v-if="activeTab === 'benefits'">
            <ul class="space-y-3">
              <li 
                v-for="(ben, idx) in product.benefits" 
                :key="idx" 
                class="flex items-start space-x-2.5"
              >
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                <span class="font-medium text-stone-700">{{ ben }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <!-- Success Added Toast Notification -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showSuccessToast && addedItemDetails" 
        class="fixed bottom-6 right-6 z-50 max-w-md w-full bg-stone-900 text-white rounded-2xl shadow-2xl p-4 border border-white/10 flex items-center justify-between"
      >
        <div class="flex items-center space-x-3.5">
          <div class="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 font-bold">
            ✓
          </div>
          <div>
            <h4 class="text-xs font-bold">Added to Cart!</h4>
            <p class="text-[10px] text-stone-400 mt-0.5">
              {{ addedItemDetails.quantity }}x {{ addedItemDetails.name }} ({{ addedItemDetails.weight }})
            </p>
          </div>
        </div>
        <button 
          @click="showSuccessToast = false"
          class="text-xs font-bold text-amber-400 hover:text-amber-300 ml-4 cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </transition>

  </div>
</template>
