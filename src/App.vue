<script setup>
import Navbar from './components/Navbar.vue'
import CartDrawer from './components/CartDrawer.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation Bar -->
    <Navbar />

    <!-- Main Content Area with Fade Transitions -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Slide-over Shopping Cart -->
    <CartDrawer />

    <!-- Site Footer -->
    <Footer />
  </div>
</template>

<style>
/* Page transition fades */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
