<script setup>
import { useRouter } from 'vue-router'
import HeroBanner from '../components/HeroBanner.vue'
import FeaturedProducts from '../components/FeaturedProducts.vue'
import { useSEO } from '../composables/useSEO'
import { Leaf, Award, Compass, ShieldAlert, ArrowRight, Quote } from '@lucide/vue'

const router = useRouter()

// Setup SEO
useSEO({
  title: 'Pure Ghee, Honey & Dairy Products | Smart Dairy Store',
  description: 'Premium organic store offering pure small bee honey, big bee honey, grass-fed bilona cow ghee, and fresh khoya. Pure, fresh, and lab-tested.',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    'name': 'Smart Dairy Store',
    'image': 'https://smartdairystore.com/og-image.png',
    'description': 'Premium organic store offering pure small bee honey, big bee honey, grass-fed bilona cow ghee, and fresh khoya.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Farm Lane, Organic Meadows, Sector 12',
      'addressLocality': 'Mohali',
      'addressRegion': 'Punjab',
      'postalCode': '160062',
      'addressCountry': 'IN'
    },
    'telephone': '+919876543210',
    'priceRange': '₹₹',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '08:00',
      'closes': '21:00'
    }
  }
})

const categories = [
  {
    name: 'Pure Forest Honey',
    category: 'honey',
    description: 'Sourced from wild small and big bees in forest regions.',
    badge: 'Raw & Wild',
    gradient: 'from-amber-400 to-amber-600',
    hover: 'group-hover:text-amber-600'
  },
  {
    name: 'Bilona Desi Ghee',
    category: 'ghee',
    description: 'Traditionally prepared using cultured curd wood-churning.',
    badge: 'A2 Cow Milk',
    gradient: 'from-yellow-400 to-amber-600',
    hover: 'group-hover:text-amber-600'
  },
  {
    name: 'Fresh Dairy Khoya',
    category: 'khoya',
    description: 'Condensed milk solids cooked slowly in iron pans.',
    badge: 'Unsweetened',
    gradient: 'from-amber-200 to-orange-400',
    hover: 'group-hover:text-orange-600'
  }
]

const handleCategoryClick = (categoryName) => {
  router.push({ path: '/products', query: { category: categoryName } })
}

const testimonials = [
  {
    quote: "The Bilona Cow Ghee from Smart Dairy Store took me back to my childhood. The aroma and grainy texture are exactly like what my grandmother used to make. Excellent quality!",
    author: "Raman Preet Singh",
    role: "Aesthetic Chef & Food Blogger",
    stars: 5
  },
  {
    quote: "I bought the Small Bee Honey for my grandmother's cough. Its consistency is light and has a unique tangy flavor which shows it is indeed wild honey. Highly recommended medicinal honey.",
    author: "Dr. Anjali Mehta",
    role: "Ayurveda Practitioner",
    stars: 5
  },
  {
    quote: "Their Khoya is absolutely starch-free. I made Gulab Jamuns for Diwali and they turned out so soft and rich. Finding pure dairy products nowadays is hard, glad I found this store.",
    author: "Meenakshi Sharma",
    role: "Home Maker",
    stars: 5
  }
]
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Banner Segment -->
    <HeroBanner />

    <!-- Categories Grid Segment -->
    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span class="text-xs font-bold text-secondary-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">
            Browse by Department
          </span>
          <h2 class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Shop Pure Organic Categories
          </h2>
          <p class="text-sm sm:text-base text-stone-500 font-medium leading-relaxed">
            Select a category to view variants, specifications, and lab certification reports.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="cat in categories" 
            :key="cat.name"
            @click="handleCategoryClick(cat.category)"
            class="group bg-cream-50/50 hover:bg-white border border-stone-200/60 hover:border-amber-300/40 p-8 rounded-3xl cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-72"
          >
            <div>
              <div :class="['h-12 w-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shadow-md mb-6', cat.gradient]">
                {{ cat.name.charAt(0) }}
              </div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-stone-400">
                {{ cat.badge }}
              </span>
              <h3 :class="['text-xl font-black text-stone-950 mt-2 transition-colors duration-200', cat.hover]">
                {{ cat.name }}
              </h3>
              <p class="text-sm text-stone-500 font-medium mt-2 leading-relaxed">
                {{ cat.description }}
              </p>
            </div>
            <div class="flex items-center space-x-2 text-stone-400 group-hover:text-primary-600 transition-colors duration-200 pt-4">
              <span class="text-xs font-bold uppercase tracking-wider">Shop Category</span>
              <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Segment -->
    <FeaturedProducts />

    <!-- Quality Standards & Testing Info Segment -->
    <section class="py-16 sm:py-24 bg-white" id="about">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          <!-- Image/Visual Details representation -->
          <div class="relative flex justify-center mb-12 lg:mb-0">
            <!-- Glowing background -->
            <div class="absolute inset-0 bg-emerald-100/40 rounded-3xl blur-2xl"></div>
            
            <div class="glass-dark-card rounded-3xl p-8 text-white relative max-w-md shadow-2xl space-y-6">
              <div class="flex items-center space-x-3">
                <div class="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <Award class="w-5 h-5" />
                </div>
                <div>
                  <h3 class="font-bold text-lg">Purity Guarantee</h3>
                  <p class="text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">FSSAI & AGMARK Compliant</p>
                </div>
              </div>
              
              <div class="border-t border-white/10 pt-4 space-y-4 text-sm text-stone-300 leading-relaxed">
                <div class="flex items-start space-x-3">
                  <div class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">✓</div>
                  <p><strong>Honey Quality:</strong> 0% sugar syrup, tested via C3/C4 honey purity index tests.</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">✓</div>
                  <p><strong>Ghee Quality:</strong> Free of animal fat or palm oil. Tested for RM values and BR reading.</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">✓</div>
                  <p><strong>Khoya Purity:</strong> Churning and solidifying test verifies 0% added starch or washing powder.</p>
                </div>
              </div>
              
              <div class="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center space-x-3">
                <ShieldAlert class="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p class="text-xs text-stone-400">We invite you to perform home purity tests. Check instructions enclosed with every package.</p>
              </div>
            </div>
          </div>

          <!-- Text Details -->
          <div class="space-y-6">
            <div class="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/60 rounded-full px-3 py-1 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest">
              <Compass class="w-3.5 h-3.5 text-amber-600" />
              <span>Our Organic Farming Philosophy</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
              Purity You Can Taste, <br class="hidden sm:inline" />
              Quality You Can Trust.
            </h2>
            <p class="text-stone-600 text-base leading-relaxed">
              At Smart Dairy Store, we bridge the gap between traditional farmers and health-conscious consumers. We believe in preserving nature's original states. That means:
            </p>
            <ul class="space-y-4 pt-2">
              <li class="flex items-start space-x-3">
                <span class="w-6 h-6 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">1</span>
                <div>
                  <h4 class="text-sm font-bold text-stone-900">Zero Preservatives & Additives</h4>
                  <p class="text-xs text-stone-500 mt-0.5">No artificial colors, taste enhancers, or stabilizers are ever added.</p>
                </div>
              </li>
              <li class="flex items-start space-x-3">
                <span class="w-6 h-6 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">2</span>
                <div>
                  <h4 class="text-sm font-bold text-stone-900">Ethical Sourcing</h4>
                  <p class="text-xs text-stone-500 mt-0.5">Wild honey is collected without destroying hives, and cows are grass-fed.</p>
                </div>
              </li>
              <li class="flex items-start space-x-3">
                <span class="w-6 h-6 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">3</span>
                <div>
                  <h4 class="text-sm font-bold text-stone-900">Traditional Slow-Cooking</h4>
                  <p class="text-xs text-stone-500 mt-0.5">Khoya and Bilona Ghee are slow-cooked in iron pots for authentic flavor profiles.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- Testimonials Segment -->
    <section class="py-16 sm:py-24 bg-cream-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span class="text-xs font-bold text-secondary-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">
            Real Feedback
          </span>
          <h2 class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Customer Testimonials
          </h2>
          <p class="text-sm sm:text-base text-stone-500 font-medium">
            Read stories from verified customers who made Smart Dairy Store a part of their healthy kitchens.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="test in testimonials" 
            :key="test.author"
            class="bg-white border border-stone-200/50 p-8 rounded-3xl relative shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
          >
            <div class="space-y-4">
              <Quote class="w-10 h-10 text-primary-200" />
              <p class="text-stone-600 text-sm italic leading-relaxed">
                "{{ test.quote }}"
              </p>
            </div>
            
            <div class="mt-8 border-t border-stone-100 pt-4 flex items-center justify-between">
              <div>
                <h4 class="text-sm font-bold text-stone-900">{{ test.author }}</h4>
                <p class="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-0.5">{{ test.role }}</p>
              </div>
              <div class="flex items-center space-x-0.5 text-amber-400">
                <span class="text-xs font-black text-stone-700 mr-1">{{ test.stars }}.0</span>
                ★
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
