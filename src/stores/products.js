import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  // Hardcoded product database for organic, farm-fresh dairy store
  const products = ref([
    {
      id: 'pure-small-bee-honey',
      name: 'Premium Pure Small Bee Honey',
      slug: 'pure-small-bee-honey',
      category: 'honey',
      image: '/images/small-bee-honey.png',
      shortDescription: 'Rare, wild honey collected from small bees (Apis florea) in deep forests. Known for its medicinal properties and intense tangy-sweet flavor.',
      description: 'Our Small Bee Honey is 100% raw, unfiltered, and unpasteurized. Collected carefully from wild beehives in dense forest areas, this rare honey is richer in antioxidants, pollen, and propolis compared to regular honey. It has a distinctive dark, amber hue, a light consistency, and a complex flavor profile with floral and tangy undertones. Excellent for therapeutic purposes, boosting immunity, and as a natural health supplement.',
      benefits: [
        'Rich in anti-inflammatory and antibacterial properties',
        'Improves digestion and boosts natural energy levels',
        'Harvested sustainably from natural, wild forests',
        'Contains natural bee pollen and propolis'
      ],
      specifications: {
        'Type': 'Wild Forest Honey (Apis Florea)',
        'Purity': '100% Unadulterated',
        'Color': 'Dark Amber / Golden Brown',
        'Shelf Life': '24 Months',
        'Origin': 'Himalayan Foothills / Shivalik Forests'
      },
      rating: 4.9,
      reviewsCount: 142,
      // Dynamic color styling for images
      gradient: 'from-amber-400 to-amber-700',
      variants: [
        { id: 'sbh-250g', weight: '250g', price: 420, originalPrice: 480, stock: 35, sku: 'HNY-SB-250' },
        { id: 'sbh-500g', weight: '500g', price: 790, originalPrice: 890, stock: 24, sku: 'HNY-SB-500' },
        { id: 'sbh-1kg', weight: '1kg', price: 1490, originalPrice: 1690, stock: 15, sku: 'HNY-SB-1000' }
      ]
    },
    {
      id: 'pure-big-bee-honey',
      name: 'Organic Pure Big Bee Honey',
      slug: 'pure-big-bee-honey',
      category: 'honey',
      image: '/images/big-bee-honey.png',
      shortDescription: 'Classic sweet nectar harvested from traditional beehives. Rich golden hue, smooth texture, and standard sweet floral taste.',
      description: 'Our Big Bee Honey is sourced from organic farms where bees forage freely on diverse wild flowers. It is extracted using traditional cold-press methods to preserve its raw nutritional values, enzymes, and delicate taste. With a brilliant golden clarity and smooth, velvety body, it serves as the perfect daily sweetener for your teas, pancakes, baking, and immunity drinks.',
      benefits: [
        'Excellent daily energy booster and cough reliever',
        'Cold-pressed extraction preserves vital enzymes',
        '100% chemical-free and trace-certified organic farms',
        'Naturally rich in vitamins and essential minerals'
      ],
      specifications: {
        'Type': 'Multifloral Honey (Apis Mellifera)',
        'Purity': '100% Pure Nectar',
        'Color': 'Light Golden / Yellow Gold',
        'Shelf Life': '24 Months',
        'Origin': 'Organic Wildflower Meadows'
      },
      rating: 4.7,
      reviewsCount: 96,
      gradient: 'from-yellow-300 to-amber-500',
      variants: [
        { id: 'bbh-250g', weight: '250g', price: 290, originalPrice: 320, stock: 50, sku: 'HNY-BB-250' },
        { id: 'bbh-500g', weight: '500g', price: 540, originalPrice: 590, stock: 42, sku: 'HNY-BB-500' },
        { id: 'bbh-1kg', weight: '1kg', price: 990, originalPrice: 1100, stock: 28, sku: 'HNY-BB-1000' }
      ]
    },
    {
      id: 'pure-desi-ghee',
      name: 'Traditional Bilona Cow Ghee',
      slug: 'pure-desi-ghee',
      category: 'ghee',
      image: '/images/desi-ghee.png',
      shortDescription: 'Nutrient-rich golden Desi Ghee prepared from A2 cow milk yogurt using the ancient wood-churned Bilona method.',
      description: 'Made from high-quality grass-fed cow milk, our Desi Ghee is prepared using the traditional Vedic Bilona method. First, the milk is boiled and cultured into curd. Then, the curd is churned in wooden pots to separate the white butter (Makhan). Finally, the butter is slow-cooked on firewood, yielding incredibly aromatic, golden, and grain-textured Ghee. Highly digestible and packed with fat-soluble vitamins (A, D, E, K) and Butyric acid.',
      benefits: [
        'Prepared using the traditional Vedic Bilona wooden-churn method',
        'Rich grainy texture with a deep, nostalgic homemade aroma',
        'High smoke point, perfect for cooking, baking, and frying',
        'Boosts immunity, joint health, and cognitive function'
      ],
      specifications: {
        'Method': 'Traditional Wooden Bilona Churning',
        'Source': 'Grass-Fed Cow Milk',
        'Texture': 'Grainy / Danedar Ghee',
        'Shelf Life': '12 Months',
        'Origin': 'Rural Dairy Cooperatives (Rajasthan/Punjab)'
      },
      rating: 4.9,
      reviewsCount: 215,
      gradient: 'from-amber-200 to-yellow-600',
      variants: [
        { id: 'dg-500g', weight: '500g', price: 850, originalPrice: 950, stock: 20, sku: 'GHE-BL-500' },
        { id: 'dg-1kg', weight: '1kg', price: 1650, originalPrice: 1800, stock: 18, sku: 'GHE-BL-1000' },
        { id: 'dg-2kg', weight: '2kg', price: 3190, originalPrice: 3500, stock: 8, sku: 'GHE-BL-2000' }
      ]
    },
    {
      id: 'fresh-dani-khoya',
      name: 'Fresh Premium Danedar Khoya',
      slug: 'fresh-dani-khoya',
      category: 'khoya',
      image: '/images/danedar-khoya.png',
      shortDescription: 'Rich, condensed milk solids slow-cooked to perfection. Free of starch, preservatives, or artificial additives.',
      description: 'Our Danedar Khoya (Mawa) is prepared in the traditional way by slowly boiling and condensing full-cream milk in iron pots until it reaches a soft, grainy, solid state. We guarantee 100% purity with zero adulteration, starch, or palm oil. It has a moist, crumbly texture and a deep milky aroma. Perfect for preparing Indian sweets like Gulab Jamun, Gujia, Halwas, Barfis, and premium bakery items.',
      benefits: [
        '100% pure cow and buffalo milk solids',
        'Contains zero starch, flour, or chemical stabilizers',
        'Freshly prepared daily for authentic taste and texture',
        'Rich source of calcium, protein, and healthy milk fats'
      ],
      specifications: {
        'Type': 'Danedar Khoya (Mawa) / Milk Solids',
        'Milk Fat': 'Min 30%',
        'Texture': 'Soft, moist, and grainy',
        'Shelf Life': '7 Days (Refrigerated) / 3 Months (Frozen)',
        'Origin': 'Local Farm Fresh Sourcing'
      },
      rating: 4.8,
      reviewsCount: 78,
      gradient: 'from-amber-50 to-orange-100',
      variants: [
        { id: 'khy-250g', weight: '250g', price: 190, originalPrice: 220, stock: 40, sku: 'KHY-DN-250' },
        { id: 'khy-500g', weight: '500g', price: 360, originalPrice: 400, stock: 25, sku: 'KHY-DN-500' },
        { id: 'khy-1kg', weight: '1kg', price: 690, originalPrice: 760, stock: 12, sku: 'KHY-DN-1000' }
      ]
    }
  ])

  // Filters State
  const searchQuery = ref('')
  const selectedCategory = ref('all')
  const selectedWeight = ref('all')
  const priceRange = ref({ min: 0, max: 4000 })
  const sortBy = ref('featured') // featured, price-asc, price-desc, rating

  // Reset Filters
  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    selectedWeight.value = 'all'
    priceRange.value = { min: 0, max: 4000 }
    sortBy.value = 'featured'
  }

  // Get lowest price variant for display
  const getMinPrice = (product) => {
    return Math.min(...product.variants.map(v => v.price))
  }

  // Get highest price variant for display
  const getMaxPrice = (product) => {
    return Math.max(...product.variants.map(v => v.price))
  }

  // Get lowest original price variant
  const getMinOriginalPrice = (product) => {
    return Math.min(...product.variants.map(v => v.originalPrice))
  }

  // Filtered Products computation
  const filteredProducts = computed(() => {
    return products.value
      .filter((product) => {
        // 1. Search Query Match
        const query = searchQuery.value.toLowerCase().trim()
        const matchesSearch = !query || 
          product.name.toLowerCase().includes(query) ||
          product.shortDescription.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)

        // 2. Category Match
        const matchesCategory = selectedCategory.value === 'all' || 
          product.category === selectedCategory.value

        // 3. Price Match (using lowest price variant of the product)
        const lowestPrice = getMinPrice(product)
        const matchesPrice = lowestPrice >= priceRange.value.min && lowestPrice <= priceRange.value.max

        // 4. Weight Variant Match
        const matchesWeight = selectedWeight.value === 'all' ||
          product.variants.some(v => v.weight === selectedWeight.value)

        return matchesSearch && matchesCategory && matchesPrice && matchesWeight
      })
      .sort((a, b) => {
        // Sorting logic
        if (sortBy.value === 'price-asc') {
          return getMinPrice(a) - getMinPrice(b)
        }
        if (sortBy.value === 'price-desc') {
          return getMinPrice(b) - getMinPrice(a)
        }
        if (sortBy.value === 'rating') {
          return b.rating - a.rating
        }
        // 'featured' / default sorting (no change or order of array)
        return 0
      })
  })

  // Get a single product by ID
  const getProductById = (id) => {
    return products.value.find(p => p.id === id)
  }

  return {
    products,
    searchQuery,
    selectedCategory,
    selectedWeight,
    priceRange,
    sortBy,
    resetFilters,
    getMinPrice,
    getMaxPrice,
    getMinOriginalPrice,
    filteredProducts,
    getProductById
  }
})
