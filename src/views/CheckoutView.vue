<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useOrdersStore } from '../stores/orders'
import { useSEO } from '../composables/useSEO'
import { 
  User, MapPin, CreditCard, ArrowLeft, ShoppingBag, 
  ChevronRight, Lock, CheckCircle 
} from '@lucide/vue'

const router = useRouter()
const { items, subtotal, discount, shippingFee, gst, total, clearCart } = useCart()
const ordersStore = useOrdersStore()

// Setup SEO
useSEO({
  title: 'Secure Checkout | Smart Dairy Store',
  description: 'Complete your purchase securely. Choose between Cash on Delivery (COD) and Credit/Debit card options for your organic honey and ghee.'
})

// Checkout Step Tracker
const currentStep = ref(1) // 1: Info & Shipping, 2: Payment, 3: Review

// Customer Form Fields
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  paymentMethod: 'COD', // COD or CARD
  cardNumber: '',
  cardExpiry: '',
  cardCvv: ''
})

// Validation errors
const errors = ref({})

// Client validation
const validateStep1 = () => {
  const errs = {}
  if (!form.value.fullName.trim()) errs.fullName = 'Full name is required'
  
  if (!form.value.email.trim()) {
    errs.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errs.email = 'Invalid email address'
  }

  if (!form.value.phone.trim()) {
    errs.phone = 'Phone number is required'
  } else if (!/^[0-9]{10}$/.test(form.value.phone.replace(/[^0-9]/g, ''))) {
    errs.phone = 'Please enter a valid 10-digit phone number'
  }

  if (!form.value.address.trim()) errs.address = 'Street address is required'
  if (!form.value.city.trim()) errs.city = 'City is required'
  if (!form.value.state.trim()) errs.state = 'State is required'
  if (!form.value.zip.trim()) errs.zip = 'ZIP code is required'

  errors.value = errs
  return Object.keys(errs).length === 0
}

const validateStep2 = () => {
  const errs = {}
  if (form.value.paymentMethod === 'CARD') {
    if (!form.value.cardNumber.trim()) {
      errs.cardNumber = 'Card number is required'
    } else if (form.value.cardNumber.replace(/\s/g, '').length < 16) {
      errs.cardNumber = 'Invalid card number'
    }
    if (!form.value.cardExpiry.trim()) errs.cardExpiry = 'Expiry date required'
    if (!form.value.cardCvv.trim()) errs.cardCvv = 'CVV required'
  }

  errors.value = errs
  return Object.keys(errs).length === 0
}

const nextStep = () => {
  if (currentStep.value === 1) {
    if (validateStep1()) {
      currentStep.value = 2
      window.scrollTo(0, 0)
    }
  } else if (currentStep.value === 2) {
    if (validateStep2()) {
      currentStep.value = 3
      window.scrollTo(0, 0)
    }
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo(0, 0)
  }
}

// Form Submission (Placing simulated order)
const isSubmitting = ref(false)
const handleSubmitOrder = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  
  // Simulate network delay
  setTimeout(() => {
    const billingDetails = {
      subtotal: subtotal.value,
      discount: discount.value,
      shippingFee: shippingFee.value,
      gst: gst.value,
      total: total.value
    }

    ordersStore.placeOrder(form.value, items.value, billingDetails)
    
    // Clear shopping cart
    clearCart()
    isSubmitting.value = false
    
    // Redirect to success confirmation page
    router.push('/order-confirmation')
  }, 1500)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
    
    <!-- Empty Cart Warning -->
    <div v-if="items.length === 0" class="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm px-6">
      <div class="h-16 w-16 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-400 mx-auto">
        <ShoppingBag class="w-8 h-8" />
      </div>
      <h2 class="text-xl font-black text-stone-850">Your Cart is Empty</h2>
      <p class="text-stone-500 text-sm mt-1">Please add items to your cart before proceeding to checkout.</p>
      <button 
        @click="router.push('/products')" 
        class="mt-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
      >
        Go Shopping
      </button>
    </div>

    <!-- Active Checkout Flow -->
    <div v-else class="space-y-10">
      
      <!-- Steps Progress Tracker -->
      <div class="max-w-3xl mx-auto">
        <div class="flex items-center justify-between">
          <div 
            v-for="step in [1, 2, 3]" 
            :key="step" 
            class="flex items-center relative flex-1 last:flex-initial"
          >
            <!-- Step circle -->
            <div 
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 z-10',
                currentStep === step 
                  ? 'border-primary-600 bg-primary-50 text-primary-800 scale-110' 
                  : currentStep > step 
                    ? 'border-secondary-500 bg-secondary-500 text-white' 
                    : 'border-stone-200 bg-white text-stone-400'
              ]"
            >
              <CheckCircle v-if="currentStep > step" class="w-5 h-5" />
              <span v-else>{{ step }}</span>
            </div>
            
            <!-- Step title -->
            <span class="absolute top-12 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider text-stone-400 whitespace-nowrap">
              {{ step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review' }}
            </span>

            <!-- Connecting bar -->
            <div 
              v-if="step < 3"
              :class="[
                'h-0.5 w-full absolute top-5 left-10 -z-0 transition-all duration-500',
                currentStep > step ? 'bg-secondary-500' : 'bg-stone-200'
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6">
        
        <!-- Left Side: Interactive Checkout steps -->
        <div class="lg:col-span-7 space-y-6">
          <div class="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            <!-- STEP 1: Shipping and Information Details -->
            <div v-if="currentStep === 1" class="space-y-6">
              <div class="flex items-center space-x-3 pb-4 border-b border-stone-150">
                <User class="w-5 h-5 text-primary-600" />
                <h2 class="text-lg font-black text-stone-900 uppercase tracking-wide">Customer & Delivery Info</h2>
              </div>

              <!-- Customer info -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    v-model="form.fullName"
                    class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                    placeholder="John Doe"
                  />
                  <p v-if="errors.fullName" class="text-xs text-red-500 font-semibold mt-1">{{ errors.fullName }}</p>
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    v-model="form.email"
                    class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                    placeholder="john@example.com"
                  />
                  <p v-if="errors.email" class="text-xs text-red-500 font-semibold mt-1">{{ errors.email }}</p>
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    v-model="form.phone"
                    class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                    placeholder="9876543210"
                  />
                  <p v-if="errors.phone" class="text-xs text-red-500 font-semibold mt-1">{{ errors.phone }}</p>
                </div>
              </div>

              <!-- Address details -->
              <div class="space-y-4 pt-4 border-t border-stone-100">
                <div class="flex items-center space-x-2 text-stone-850 font-extrabold text-sm mb-3">
                  <MapPin class="w-4.5 h-4.5 text-secondary-650" />
                  <span>Shipping Address</span>
                </div>

                <div>
                  <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Street Address</label>
                  <input 
                    type="text" 
                    v-model="form.address"
                    class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                    placeholder="House No, Street, Locality"
                  />
                  <p v-if="errors.address" class="text-xs text-red-500 font-semibold mt-1">{{ errors.address }}</p>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div class="col-span-1">
                    <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">City</label>
                    <input 
                      type="text" 
                      v-model="form.city"
                      class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                      placeholder="Mohali"
                    />
                    <p v-if="errors.city" class="text-xs text-red-500 font-semibold mt-1">{{ errors.city }}</p>
                  </div>
                  <div class="col-span-1">
                    <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">State</label>
                    <input 
                      type="text" 
                      v-model="form.state"
                      class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                      placeholder="Punjab"
                    />
                    <p v-if="errors.state" class="text-xs text-red-500 font-semibold mt-1">{{ errors.state }}</p>
                  </div>
                  <div class="col-span-2 sm:col-span-1">
                    <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">ZIP Code</label>
                    <input 
                      type="text" 
                      v-model="form.zip"
                      class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                      placeholder="160062"
                    />
                    <p v-if="errors.zip" class="text-xs text-red-500 font-semibold mt-1">{{ errors.zip }}</p>
                  </div>
                </div>
              </div>

              <!-- Continue Button -->
              <div class="pt-6 border-t border-stone-100 flex justify-end">
                <button 
                  @click="nextStep"
                  class="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-md shadow-primary-600/10"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- STEP 2: Payment details selection -->
            <div v-if="currentStep === 2" class="space-y-6">
              <div class="flex items-center space-x-3 pb-4 border-b border-stone-150">
                <CreditCard class="w-5 h-5 text-primary-600" />
                <h2 class="text-lg font-black text-stone-900 uppercase tracking-wide">Choose Payment Method</h2>
              </div>

              <!-- Options -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- COD -->
                <label 
                  :class="[
                    'border rounded-2xl p-5 flex flex-col justify-between h-32 cursor-pointer transition-all duration-300 relative shadow-sm',
                    form.paymentMethod === 'COD' 
                      ? 'border-primary-600 bg-primary-50/20' 
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  ]"
                >
                  <input 
                    type="radio" 
                    v-model="form.paymentMethod" 
                    value="COD" 
                    class="sr-only"
                  />
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-black text-stone-900 uppercase tracking-wider">Cash on Delivery (COD)</span>
                    <div 
                      :class="[
                        'w-4 h-4 rounded-full border flex items-center justify-center',
                        form.paymentMethod === 'COD' ? 'border-primary-600 bg-primary-600' : 'border-stone-300'
                      ]"
                    >
                      <div v-if="form.paymentMethod === 'COD'" class="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <p class="text-xs text-stone-500 font-medium">Pay with cash at your doorstep. Zero convenience fee.</p>
                </label>

                <!-- Mock card -->
                <label 
                  :class="[
                    'border rounded-2xl p-5 flex flex-col justify-between h-32 cursor-pointer transition-all duration-300 relative shadow-sm',
                    form.paymentMethod === 'CARD' 
                      ? 'border-primary-600 bg-primary-50/20' 
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  ]"
                >
                  <input 
                    type="radio" 
                    v-model="form.paymentMethod" 
                    value="CARD" 
                    class="sr-only"
                  />
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-black text-stone-900 uppercase tracking-wider">Credit / Debit Card</span>
                    <div 
                      :class="[
                        'w-4 h-4 rounded-full border flex items-center justify-center',
                        form.paymentMethod === 'CARD' ? 'border-primary-600 bg-primary-600' : 'border-stone-300'
                      ]"
                    >
                      <div v-if="form.paymentMethod === 'CARD'" class="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <p class="text-xs text-stone-500 font-medium">Pay securely using Visa, MasterCard, or RuPay.</p>
                </label>
              </div>

              <!-- Card form placeholder -->
              <div
  v-if="form.paymentMethod === 'CARD'"
  class="border border-stone-200 rounded-2xl bg-white p-4 flex items-center justify-between h-20 shadow-sm"
>
  <div class="flex items-center gap-3">
    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
      💳
    </div>

    <div>
      <p class="font-semibold text-gray-800">
        Credit / Debit Card
      </p>
      <p class="text-sm text-gray-500">
        Card payments will be available soon.
      </p>
    </div>
  </div>

  <span
    class="whitespace-nowrap rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white"
  >
    Coming Soon
  </span>
</div>
              <!-- <div v-if="form.paymentMethod === 'CARD'" class="space-y-4 pt-4 border-t border-stone-100">
                <div>
                  <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Card Number</label>
                  <input 
                    type="text" 
                    v-model="form.cardNumber"
                    class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxlength="19"
                  />
                  <p v-if="errors.cardNumber" class="text-xs text-red-500 font-semibold mt-1">{{ errors.cardNumber }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Expiry Date</label>
                    <input 
                      type="text" 
                      v-model="form.cardExpiry"
                      class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                      placeholder="MM/YY"
                      maxlength="5"
                    />
                    <p v-if="errors.cardExpiry" class="text-xs text-red-500 font-semibold mt-1">{{ errors.cardExpiry }}</p>
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">CVV</label>
                    <input 
                      type="password" 
                      v-model="form.cardCvv"
                      class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                      placeholder="XXX"
                      maxlength="3"
                    />
                    <p v-if="errors.cardCvv" class="text-xs text-red-500 font-semibold mt-1">{{ errors.cardCvv }}</p>
                  </div>
                </div>
              </div> -->

              <!-- Navigation Buttons -->
              <div class="pt-6 border-t border-stone-100 flex items-center justify-between">
                <button 
                  @click="prevStep"
                  class="flex items-center space-x-2 px-5 py-3 border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 font-bold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <ArrowLeft class="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button 
                  @click="nextStep"
                  class="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-md shadow-primary-600/10"
                >
                  <span>Review Order</span>
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- STEP 3: Order Review -->
            <div v-if="currentStep === 3" class="space-y-6">
              <div class="flex items-center space-x-3 pb-4 border-b border-stone-150">
                <ShoppingBag class="w-5 h-5 text-primary-600" />
                <h2 class="text-lg font-black text-stone-900 uppercase tracking-wide">Review & Confirm Order</h2>
              </div>

              <!-- Information Review summary -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50/50 p-6 rounded-2xl border border-stone-150 text-sm text-stone-600 leading-relaxed">
                <div class="space-y-1.5">
                  <h4 class="font-black text-stone-900 uppercase tracking-wider text-xs">Delivery Recipient</h4>
                  <p class="font-bold text-stone-800">{{ form.fullName }}</p>
                  <p>{{ form.phone }}</p>
                  <p>{{ form.email }}</p>
                </div>
                
                <div class="space-y-1.5">
                  <h4 class="font-black text-stone-900 uppercase tracking-wider text-xs">Shipping Address</h4>
                  <p class="font-semibold text-stone-850">{{ form.address }}</p>
                  <p>{{ form.city }}, {{ form.state }} - {{ form.zip }}</p>
                </div>

                <div class="sm:col-span-2 border-t border-stone-200/60 pt-4 flex items-center justify-between">
                  <div>
                    <h4 class="font-black text-stone-900 uppercase tracking-wider text-xs">Selected Payment</h4>
                    <p class="font-semibold text-stone-800">{{ form.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Credit Card (Mock)' }}</p>
                  </div>
                  <span class="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200/50">
                    Ready to place
                  </span>
                </div>
              </div>

              <!-- Place Order Button -->
              <div class="pt-6 border-t border-stone-100 flex items-center justify-between">
                <button 
                  @click="prevStep"
                  :disabled="isSubmitting"
                  class="flex items-center space-x-2 px-5 py-3 border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-40"
                >
                  <ArrowLeft class="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button 
                  @click="handleSubmitOrder"
                  :disabled="isSubmitting"
                  class="flex items-center justify-center space-x-2.5 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-base rounded-xl transition-all duration-200 shadow-lg shadow-primary-600/35 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed"
                >
                  <Lock class="w-4 h-4" />
                  <span>{{ isSubmitting ? 'Processing...' : 'Place Order' }}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Right Side: Order Summary Checkout Sidebar -->
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div class="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 class="text-base font-black uppercase tracking-wider border-b border-white/10 pb-4">Order Summary</h3>

            <!-- Item Rows list -->
            <div class="divide-y divide-white/10 max-h-60 overflow-y-auto pr-1">
              <div 
                v-for="item in items" 
                :key="item.variantId"
                class="flex py-4 first:pt-0 last:pb-0 justify-between items-center"
              >
                <div class="flex items-center space-x-3.5">
                  <div :class="['w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center font-bold text-[9px] text-white font-serif flex-shrink-0 relative shadow-inner', item.gradient]">
                    {{ item.name.split(' ').slice(-1)[0] }}
                    <span class="absolute -top-1.5 -right-1.5 bg-primary-500 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                      {{ item.quantity }}
                    </span>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold line-clamp-1 max-w-[150px]">{{ item.name }}</h4>
                    <p class="text-[9px] text-stone-400 mt-0.5">{{ item.weight }} | SKU: {{ item.sku }}</p>
                  </div>
                </div>
                
                <span class="text-xs font-bold">Rs. {{ item.price * item.quantity }}</span>
              </div>
            </div>

            <!-- Billing summaries -->
            <div class="border-t border-white/10 pt-4 space-y-2 text-xs text-stone-400 font-medium">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="text-white font-bold">Rs. {{ subtotal }}</span>
              </div>
              <div v-if="discount > 0" class="flex justify-between text-secondary-405 font-bold">
                <span>Savings</span>
                <span>- Rs. {{ discount }}</span>
              </div>
              <div class="flex justify-between">
                <span>GST (5%)</span>
                <span class="text-white font-bold">Rs. {{ gst }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span v-if="shippingFee === 0" class="text-secondary-400 font-bold uppercase tracking-wider">FREE</span>
                <span v-else class="text-white font-bold">Rs. {{ shippingFee }}</span>
              </div>
            </div>

            <!-- Total price -->
            <div class="border-t border-white/10 pt-4 flex justify-between items-baseline text-white">
              <span class="text-sm font-bold uppercase tracking-wider">Total Payable</span>
              <span class="text-2xl font-black">Rs. {{ total }}</span>
            </div>

            <!-- Lock assurance -->
            <div class="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-2xl p-4 text-[10px] text-stone-400 leading-normal">
              <Lock class="w-4 h-4 text-primary-500 flex-shrink-0" />
              <p>Your connection is encrypted using SSL/TLS protocols. Order dispatch will follow 100% safety checks.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
