<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrdersStore } from '../stores/orders'
import { useSEO } from '../composables/useSEO'
import { CheckCircle2, Calendar, MapPin, Truck, ArrowRight, Printer } from '@lucide/vue'

const router = useRouter()
const ordersStore = useOrdersStore()

const order = computed(() => ordersStore.currentOrder)

// Setup SEO
useSEO({
  title: computed(() => order.value ? `Order Confirmed: ${order.value.id} | Smart Dairy Store` : 'Order Confirmed | Smart Dairy Store'),
  description: 'Thank you for shopping with us! Your order for pure honey, ghee or khoya has been received and is being processed.',
  schema: computed(() => {
    if (!order.value) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'Order',
      'orderNumber': order.value.id,
      'orderStatus': 'https://schema.org/OrderProcessing',
      'seller': {
        '@type': 'Organization',
        'name': 'Smart Dairy Store'
      },
      'orderDate': order.value.date,
      'priceCurrency': 'INR',
      'totalPaymentDue': {
        '@type': 'PriceSpecification',
        'price': order.value.billing.total
      }
    }
  })
})

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const handlePrint = () => {
  window.print()
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
    
    <!-- No Order found fallback -->
    <div v-if="!order" class="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm px-6">
      <h2 class="text-2xl font-black text-stone-900">No Recent Orders</h2>
      <p class="text-stone-500 text-sm mt-2">You haven't placed an order recently, or your session has expired.</p>
      <button 
        @click="router.push('/products')" 
        class="mt-6 px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors cursor-pointer"
      >
        Go to Shop
      </button>
    </div>

    <!-- Active confirmation -->
    <div v-else class="space-y-10 print:space-y-6">
      
      <!-- Success Banner header -->
      <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center p-3.5 bg-emerald-50 text-emerald-500 rounded-full ring-8 ring-emerald-100/50 mb-2 animate-bounce">
          <CheckCircle2 class="w-12 h-12" />
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">Order Placed Successfully!</h1>
        <p class="text-stone-500 text-sm sm:text-base max-w-md mx-auto">
          Thank you for your order, <span class="font-extrabold text-stone-850">{{ order.customer.fullName }}</span>. We have sent a confirmation email to <span class="font-bold text-stone-800">{{ order.customer.email }}</span>.
        </p>
      </div>

      <!-- Order details grid layout -->
      <div class="bg-white border border-stone-200 rounded-3xl shadow-sm p-6 sm:p-8 space-y-8 print:border-none print:shadow-none print:p-0">
        
        <!-- ID and date headers -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
          <div>
            <span class="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest block">Order Identifier</span>
            <span class="text-xl font-serif font-black text-stone-950">{{ order.id }}</span>
          </div>
          <div>
            <span class="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest block text-left sm:text-right">Order Date</span>
            <span class="text-sm font-bold text-stone-700 block">{{ formatDate(order.date) }}</span>
          </div>
        </div>

        <!-- Delivery & Shipping info columns -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-2 border-b border-stone-200/80 pb-8 text-sm">
          
          <div class="space-y-2">
            <span class="flex items-center space-x-1 text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
              <Calendar class="w-3.5 h-3.5 text-primary-500" />
              <span>Est. Delivery</span>
            </span>
            <p class="font-bold text-stone-850">{{ formatDate(order.deliveryDate) }}</p>
            <p class="text-xs text-stone-500 font-medium">Standard Home Courier</p>
          </div>

          <div class="space-y-2">
            <span class="flex items-center space-x-1 text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
              <MapPin class="w-3.5 h-3.5 text-primary-500" />
              <span>Shipping Address</span>
            </span>
            <p class="font-semibold text-stone-800 leading-relaxed">
              {{ order.customer.address }}, <br />
              {{ order.customer.city }}, {{ order.customer.state }} - {{ order.customer.zip }}
            </p>
          </div>

          <div class="space-y-2">
            <span class="flex items-center space-x-1 text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
              <Truck class="w-3.5 h-3.5 text-primary-500" />
              <span>Payment Details</span>
            </span>
            <p class="font-bold text-stone-850">
              {{ order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Credit Card (Mocked)' }}
            </p>
            <p class="text-xs text-stone-500 font-medium">Total: Rs. {{ order.billing.total }}</p>
          </div>

        </div>

        <!-- Placed Product Items listings -->
        <div class="space-y-4">
          <h3 class="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-4">Items Ordered</h3>
          <div class="divide-y divide-stone-150">
            <div 
              v-for="item in order.items" 
              :key="item.variantId"
              class="flex py-4 first:pt-0 last:pb-0 justify-between items-center text-sm"
            >
              <div class="flex items-center space-x-4">
                <div :class="['w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center font-bold text-white font-serif text-xs flex-shrink-0 shadow-inner select-none', item.gradient]">
                  {{ item.name.split(' ').slice(-1)[0] }}
                </div>
                <div>
                  <h4 class="font-bold text-stone-900">{{ item.name }}</h4>
                  <p class="text-[10px] text-stone-400 mt-0.5">{{ item.weight }} | Qty: {{ item.quantity }}</p>
                </div>
              </div>
              
              <span class="font-bold text-stone-900">Rs. {{ item.price * item.quantity }}</span>
            </div>
          </div>
        </div>

        <!-- Billing breakdowns -->
        <div class="border-t border-stone-200/80 pt-6 flex justify-end">
          <div class="w-full sm:w-80 space-y-3 text-sm text-stone-500 font-medium">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="text-stone-900 font-bold">Rs. {{ order.billing.subtotal }}</span>
            </div>
            <div v-if="order.billing.discount > 0" class="flex justify-between text-secondary-650 font-bold">
              <span>Savings</span>
              <span>- Rs. {{ order.billing.discount }}</span>
            </div>
            <div class="flex justify-between">
              <span>GST (5%)</span>
              <span class="text-stone-900 font-bold">Rs. {{ order.billing.gst }}</span>
            </div>
            <div class="flex justify-between pb-3 border-b border-stone-150">
              <span>Shipping Fee</span>
              <span v-if="order.billing.shippingFee === 0" class="text-secondary-600 font-bold">FREE</span>
              <span v-else class="text-stone-900 font-bold">Rs. {{ order.billing.shippingFee }}</span>
            </div>
            <div class="flex justify-between text-base font-black text-stone-950 pt-1">
              <span>Total Paid</span>
              <span>Rs. {{ order.billing.total }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Action Footer actions -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 print:hidden">
        <button 
          @click="handlePrint"
          class="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 border border-stone-250 bg-white hover:bg-stone-50 text-stone-600 font-bold text-sm rounded-xl transition-all cursor-pointer"
        >
          <Printer class="w-4 h-4" />
          <span>Print Receipt</span>
        </button>

        <button 
          @click="router.push('/products')"
          class="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-primary-600/10 hover:scale-[1.01] cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

    </div>
  </div>
</template>
