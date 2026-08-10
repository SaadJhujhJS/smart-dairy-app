<script setup>
import { useRouter } from 'vue-router'
import { ArrowRight, Leaf, Shield, Award } from '@lucide/vue'

const router = useRouter()
</script>

<template>
  <div class="relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-cream-50 to-white pt-10 pb-20 sm:pt-16 sm:pb-28">
    <!-- Background Patterns -->
    <div class="absolute inset-0 z-0 opacity-30 pointer-events-none select-none">
      <div class="absolute top-10 left-10 w-72 h-72 rounded-full bg-amber-200/50 blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl animate-float"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
        
        <!-- Left Text Content -->
        <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div class="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/60 rounded-full px-3.5 py-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse-slow">
            <Leaf class="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
            <span>Pure Vedic Farming Methods</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-tight">
            100% Pure, Raw & <br class="hidden sm:inline" />
            <span class="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
              Unadulterated
            </span> <br />
            Dairy & Honey
          </h1>

          <p class="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Straight from pristine forests and certified organic meadows to your home. Discover our wild forest honey, ghee churned via traditional wood Bilona process, and hand-condensed fresh khoya.
          </p>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-3">
            <button 
              @click="router.push('/products')"
              class="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-lg shadow-primary-600/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight class="w-4 h-4" />
            </button>
            <a 
              href="#about"
              class="w-full sm:w-auto text-center px-8 py-4 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-bold text-base rounded-2xl transition-all duration-300 shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              Our Purity Standards
            </a>
          </div>

          <!-- Feature tags -->
          <div class="grid grid-cols-3 gap-4 pt-8 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
            <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span class="text-2xl font-black text-stone-900">0%</span>
              <span class="text-xs text-stone-500 font-bold uppercase tracking-wider">Adulteration</span>
            </div>
            <div class="flex flex-col items-center lg:items-start text-center lg:text-left border-x border-stone-200 px-4">
              <span class="text-2xl font-black text-stone-900">100%</span>
              <span class="text-xs text-stone-500 font-bold uppercase tracking-wider">Lab Tested</span>
            </div>
            <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span class="text-2xl font-black text-stone-900">10+</span>
              <span class="text-xs text-stone-500 font-bold uppercase tracking-wider">Quality Audits</span>
            </div>
          </div>
        </div>

        <!-- Right Visual Display (Sleek Glassmorphic layout representing Honey and Ghee elements) -->
        <div class="mt-16 lg:mt-0 lg:col-span-6 flex justify-center relative">
          <!-- Main display card -->
          <div class="relative w-80 h-96 sm:w-96 sm:h-[450px] bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl shadow-2xl overflow-hidden animate-float flex flex-col justify-between p-6 text-white group">
            <div class="absolute inset-0 bg-stone-950/10 mix-blend-multiply"></div>
            
            <!-- Graphic Top -->
            <div class="relative flex justify-between items-start">
              <div class="bg-white/20 backdrop-blur-md rounded-xl p-2.5">
                <Shield class="w-6 h-6 text-white" />
              </div>
              <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                Premium Grade
              </span>
            </div>

            <!-- Graphic Abstract Center (Pure Glowing Honey / Dairy Fluid Effect) -->
            <div class="relative flex justify-center py-6">
              <div class="w-36 h-36 rounded-full bg-yellow-300/80 blur-xl absolute animate-pulse"></div>
              <div class="w-28 h-28 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-2xl relative">
                <Leaf class="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>

            <!-- Graphic Bottom Text -->
            <div class="relative space-y-2">
              <span class="text-amber-200 text-xs font-bold tracking-widest uppercase">Harvested Fresh</span>
              <h3 class="text-2xl font-black font-serif leading-tight">Wild Forest Nectar & Vedic Churned Ghee</h3>
              <p class="text-xs text-amber-100 leading-relaxed">
                Retaining original enzymes, vital micro-nutrients, and rich textured grains.
              </p>
            </div>
          </div>

          <!-- Decorative Floating Card 1: Small Bee Honey -->
          <div class="absolute -top-6 right-2 sm:right-6 bg-white/90 backdrop-blur-md border border-stone-200/50 rounded-2xl p-4 shadow-xl flex items-center space-x-3 w-48 sm:w-56 hover:scale-105 transition-transform duration-300">
            <div class="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-white flex-shrink-0">
              <Award class="w-5 h-5" />
            </div>
            <div>
              <h4 class="text-xs font-bold text-stone-900">Small Bee Honey</h4>
              <p class="text-[10px] text-stone-500 mt-0.5">Highly Rare & Medicinal</p>
            </div>
          </div>

          <!-- Decorative Floating Card 2: Desi Ghee -->
          <div class="absolute -bottom-6 left-2 sm:left-6 bg-white/90 backdrop-blur-md border border-stone-200/50 rounded-2xl p-4 shadow-xl flex items-center space-x-3 w-48 sm:w-56 hover:scale-105 transition-transform duration-300">
            <div class="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
              <Leaf class="w-5 h-5" />
            </div>
            <div>
              <h4 class="text-xs font-bold text-stone-900">Bilona Cow Ghee</h4>
              <p class="text-[10px] text-stone-500 mt-0.5">Golden Grain Texture</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
