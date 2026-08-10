<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import ProductCard from '../components/ProductCard.vue'
import { useSEO } from '../composables/useSEO'
import { Search, SlidersHorizontal, RefreshCw, X, Tag } from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const {
  filteredProducts,
  searchQuery,
  selectedCategory,
  selectedWeight,
  priceRange,
  sortBy,
  resetFilters
} = useProducts()

// Mobile Filter drawer state
const isMobileFiltersOpen = ref(false)

// Sync route queries with store state
watch(
  () => route.query.category,
  (newCategory) => {
    selectedCategory.value = newCategory || 'all'
  },
  { immediate: true }
)

watch(
  () => route.query.q,
  (newQ) => {
    searchQuery.value = newQ || ''
  },
  { immediate: true }
)

// Categories List for Filter
const categoriesList = [
  { value: 'all', label: 'All Categories' },
  { value: 'honey', label: 'Pure Honey' },
  { value: 'ghee', label: 'Desi Ghee' },
  { value: 'khoya', label: 'Fresh Khoya' }
]

// Weights List for Filter
const weightsList = ['all', '250g', '500g', '1kg', '2kg']

// SEO Configuration
const seoTitle = computed(() => {
  const catLabel = categoriesList.find(c => c.value === selectedCategory.value)?.label || 'All'
  return `${catLabel} | Shop Pure Honey, Ghee & Khoya | Smart Dairy Store`
})

useSEO({
  title: seoTitle,
  description: 'Explore our catalog of certified pure small bee honey, wild honey, traditional bilona ghee, and fresh unsweetened khoya. Quality lab checked.',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    'mainEntity': {
      '@type': 'ItemList',
      'name': 'Organic Dairy & Honey Products Catalog',
      'numberOfItems': computed(() => filteredProducts.value.length)
    }
  }
})

const activeFilterCount = computed(() => {
  let count = 0
  if (selectedCategory.value !== 'all') count++
  if (selectedWeight.value !== 'all') count++
  if (priceRange.value.min > 0 || priceRange.value.max < 4000) count++
  if (searchQuery.value !== '') count++
  return count
})

const handleClearFilters = () => {
  resetFilters()
  // Also clear route queries
  router.push('/products')
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
    
    <!-- Page Header & Search -->
    <div class="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-stone-200/80 mb-10 space-y-6 md:space-y-0">
      <div class="space-y-2 text-center md:text-left">
        <h1 class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">Our Product Catalog</h1>
        <p class="text-xs sm:text-sm text-stone-500 font-medium">Showing {{ filteredProducts.length }} authentic pure items</p>
      </div>

      <!-- Search Input -->
      <div class="relative w-full md:max-w-md shadow-sm">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search pure honey, ghee, khoya..."
          class="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm placeholder:text-stone-400 font-medium"
        />
        <Search class="absolute left-4 top-3.5 h-4.5 w-4.5 text-stone-400" />
        <button 
          v-if="searchQuery" 
          @click="searchQuery = ''"
          class="absolute right-4 top-3.5 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div class="lg:grid lg:grid-cols-4 lg:gap-10">
      <!-- Desktop Filters Sidebar (Left Column) -->
      <aside class="hidden lg:block space-y-8 col-span-1">
        
        <!-- Filter Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 text-stone-900 font-black text-base uppercase tracking-wider">
            <SlidersHorizontal class="w-4.5 h-4.5 text-primary-600" />
            <span>Filters</span>
          </div>
          <button 
            v-if="activeFilterCount > 0"
            @click="handleClearFilters"
            class="flex items-center space-x-1 text-xs font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            <RefreshCw class="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>

        <!-- Category Filter -->
        <div class="border-t border-stone-200/60 pt-6">
          <h3 class="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Categories</h3>
          <div class="space-y-2">
            <button 
              v-for="cat in categoriesList" 
              :key="cat.value"
              @click="selectedCategory = cat.value"
              :class="[
                'w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-between cursor-pointer',
                selectedCategory === cat.value 
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/15' 
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              ]"
            >
              <span>{{ cat.label }}</span>
              <Tag class="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </div>

        <!-- Weight Filter -->
        <div class="border-t border-stone-200/60 pt-6">
          <h3 class="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Weight Variant</h3>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="w in weightsList" 
              :key="w"
              @click="selectedWeight = w"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-extrabold uppercase transition-all duration-200 border cursor-pointer',
                selectedWeight === w 
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md shadow-stone-900/10' 
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900'
              ]"
            >
              {{ w === 'all' ? 'All sizes' : w }}
            </button>
          </div>
        </div>

        <!-- Price Range Filter -->
        <div class="border-t border-stone-200/60 pt-6">
          <h3 class="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Price Range</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Min: Rs. {{ priceRange.min }}</span>
              <span>Max: Rs. {{ priceRange.max }}</span>
            </div>
            <!-- Slider -->
            <input 
              type="range" 
              min="0" 
              max="4000" 
              step="50"
              v-model.number="priceRange.max"
              class="w-full accent-primary-600 cursor-pointer"
            />
          </div>
        </div>

      </aside>

      <!-- Products Grid & Sort Controls (Right Columns) -->
      <main class="col-span-3 space-y-6">
        
        <!-- Toolbar (Mobile Filter toggle & Sort Options) -->
        <div class="flex items-center justify-between bg-stone-50/60 border border-stone-200/60 px-5 py-3 rounded-2xl">
          <!-- Mobile Filters Toggle -->
          <button 
            @click="isMobileFiltersOpen = true"
            class="lg:hidden flex items-center space-x-2 text-sm font-bold text-stone-700 bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-sm hover:bg-stone-50 cursor-pointer"
          >
            <SlidersHorizontal class="w-4 h-4 text-primary-600" />
            <span>Filters</span>
            <span v-if="activeFilterCount > 0" class="bg-primary-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {{ activeFilterCount }}
            </span>
          </button>

          <!-- Active filters overview (desktop only) -->
          <div class="hidden lg:block">
            <p v-if="activeFilterCount > 0" class="text-xs text-stone-500 font-medium">
              Active filters: <span class="font-extrabold text-stone-800">{{ activeFilterCount }}</span>
            </p>
            <p v-else class="text-xs text-stone-400 font-medium">No active filters applied</p>
          </div>

          <!-- Sort Select -->
          <div class="flex items-center space-x-2.5">
            <label for="sort-select" class="text-xs text-stone-500 font-bold uppercase tracking-wider">Sort by</label>
            <select 
              id="sort-select" 
              v-model="sortBy"
              class="text-xs font-bold text-stone-700 bg-white border border-stone-200 px-3 py-2 rounded-xl focus:outline-none focus:border-primary-500 cursor-pointer shadow-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <!-- Active Filter Tags Row -->
        <div v-if="activeFilterCount > 0" class="flex flex-wrap gap-2">
          <span 
            v-if="selectedCategory !== 'all'"
            class="inline-flex items-center space-x-1.5 px-3 py-1 bg-primary-50 border border-primary-200/50 text-primary-800 text-xs font-bold rounded-lg"
          >
            <span>Category: {{ selectedCategory }}</span>
            <button @click="selectedCategory = 'all'" class="hover:text-primary-950"><X class="w-3 h-3" /></button>
          </span>
          
          <span 
            v-if="selectedWeight !== 'all'"
            class="inline-flex items-center space-x-1.5 px-3 py-1 bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold rounded-lg"
          >
            <span>Size: {{ selectedWeight }}</span>
            <button @click="selectedWeight = 'all'" class="hover:text-stone-950"><X class="w-3 h-3" /></button>
          </span>

          <span 
            v-if="priceRange.max < 4000"
            class="inline-flex items-center space-x-1.5 px-3 py-1 bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold rounded-lg"
          >
            <span>Max Price: Rs. {{ priceRange.max }}</span>
            <button @click="priceRange.max = 4000" class="hover:text-stone-950"><X class="w-3 h-3" /></button>
          </span>

          <span 
            v-if="searchQuery"
            class="inline-flex items-center space-x-1.5 px-3 py-1 bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold rounded-lg"
          >
            <span>Query: "{{ searchQuery }}"</span>
            <button @click="searchQuery = ''" class="hover:text-stone-950"><X class="w-3 h-3" /></button>
          </span>
        </div>

        <!-- No Results state -->
        <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-stone-200/60 shadow-sm px-6">
          <div class="h-16 w-16 bg-stone-50 border border-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-400">
            <SlidersHorizontal class="w-8 h-8" />
          </div>
          <h2 class="text-xl font-bold text-stone-850">No products match your criteria</h2>
          <p class="text-stone-500 text-sm mt-1 max-w-sm">Try broadening your search parameters or clearing your filter selection.</p>
          <button 
            @click="handleClearFilters"
            class="mt-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>

        <!-- Results Grid -->
        <transition-group
          tag="div"
          name="fade"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </transition-group>

      </main>
    </div>

    <!-- Mobile Filters Slide-over (Drawer Drawer overlay) -->
    <div 
      v-show="isMobileFiltersOpen"
      class="fixed inset-0 z-50 overflow-hidden lg:hidden" 
      role="dialog" 
      aria-modal="true"
    >
      <div class="absolute inset-0 overflow-hidden">
        <!-- Backdrop -->
        <div 
          @click="isMobileFiltersOpen = false"
          class="absolute inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
        ></div>

        <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
          <transition
            enter-active-class="transform transition ease-in-out duration-300"
            leave-active-class="transform transition ease-in-out duration-300"
            enter-from-class="-translate-x-full"
            leave-to-class="-translate-x-full"
          >
            <div v-show="isMobileFiltersOpen" class="pointer-events-auto w-screen max-w-xs">
              <div class="flex h-full flex-col bg-white shadow-2xl overflow-y-auto px-6 py-5">
                
                <!-- Drawer Header -->
                <div class="flex items-center justify-between pb-4 border-b border-stone-150">
                  <span class="text-base font-black text-stone-900 uppercase tracking-wider flex items-center space-x-2">
                    <SlidersHorizontal class="w-4.5 h-4.5 text-primary-600" />
                    <span>Filter Panel</span>
                  </span>
                  <button 
                    @click="isMobileFiltersOpen = false"
                    class="p-1 rounded-full text-stone-400 hover:bg-stone-50"
                  >
                    <X class="w-5 h-5" />
                  </button>
                </div>

                <!-- Filters Content -->
                <div class="space-y-8 py-6">
                  
                  <!-- Category Filter -->
                  <div class="space-y-3">
                    <h3 class="text-xs font-bold text-stone-400 uppercase tracking-widest">Categories</h3>
                    <div class="space-y-2">
                      <button 
                        v-for="cat in categoriesList" 
                        :key="cat.value"
                        @click="selectedCategory = cat.value; isMobileFiltersOpen = false"
                        :class="[
                          'w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-between cursor-pointer',
                          selectedCategory === cat.value 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                        ]"
                      >
                        <span>{{ cat.label }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Weight Filter -->
                  <div class="space-y-3">
                    <h3 class="text-xs font-bold text-stone-400 uppercase tracking-widest">Weight Variant</h3>
                    <div class="flex flex-wrap gap-1.5">
                      <button 
                        v-for="w in weightsList" 
                        :key="w"
                        @click="selectedWeight = w; isMobileFiltersOpen = false"
                        :class="[
                          'px-3.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all duration-200 border cursor-pointer',
                          selectedWeight === w 
                            ? 'bg-stone-900 text-white border-stone-900' 
                            : 'bg-white text-stone-600 border-stone-200'
                        ]"
                      >
                        {{ w === 'all' ? 'All' : w }}
                      </button>
                    </div>
                  </div>

                  <!-- Price Range Filter -->
                  <div class="space-y-3">
                    <h3 class="text-xs font-bold text-stone-400 uppercase tracking-widest">Price Range</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between text-[10px] text-stone-500 font-bold">
                        <span>Min: Rs. {{ priceRange.min }}</span>
                        <span>Max: Rs. {{ priceRange.max }}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="4000" 
                        step="50"
                        v-model.number="priceRange.max"
                        class="w-full accent-primary-600"
                      />
                    </div>
                  </div>

                  <!-- Reset -->
                  <button 
                    v-if="activeFilterCount > 0"
                    @click="handleClearFilters(); isMobileFiltersOpen = false"
                    class="w-full py-2.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Clear All Filters
                  </button>

                </div>

              </div>
            </div>
          </transition>
        </div>

      </div>
    </div>

  </div>
</template>
