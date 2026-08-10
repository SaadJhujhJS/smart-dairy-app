<script setup>
import { Star } from '@lucide/vue'

defineProps({
  rating: {
    type: Number,
    required: true
  },
  reviewsCount: {
    type: Number,
    default: null
  },
  showText: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="flex items-center space-x-1">
    <div class="flex items-center">
      <Star 
        v-for="i in 5" 
        :key="i"
        :class="[
          'w-4 h-4 transition-transform duration-200 hover:scale-110',
          i <= Math.round(rating) 
            ? 'fill-amber-400 text-amber-400' 
            : 'text-stone-300'
        ]"
      />
    </div>
    <span v-if="showText && reviewsCount !== null" class="text-xs text-stone-500 font-medium ml-1">
      {{ rating }} ({{ reviewsCount }} reviews)
    </span>
    <span v-else-if="showText" class="text-xs text-stone-500 font-medium ml-1">
      {{ rating }}
    </span>
  </div>
</template>
