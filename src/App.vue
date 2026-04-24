<script setup>
import AppHeader from './components/AppHeader.vue'

import { ref, provide, watch, onMounted } from 'vue'
const cart = ref([])

onMounted(() => {
  const savedCart = localStorage.getItem('gourmet-cart')
  if (savedCart) {
    try {
      cart.value = JSON.parse(savedCart)
    } catch (e) {
      console.error("Erreur lors de la lecture du panier local", e)
      cart.value = []
    }
  }
})

watch(
  cart,
  (newCart) => {
    localStorage.setItem('gourmet-cart', JSON.stringify(newCart))
  },
  { deep: true } // Important pour détecter les changements de quantité à l'intérieur des objets
)

// Ajouter au panier
const addToCart = (dish) => {
  const existingItem = cart.value.find(item => item.id === dish.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...dish, quantity: 1 })
  }
}

// Supprimer ou modifier
const removeFromCart = (id) => {
  cart.value = cart.value.filter(item => item.id !== id)
}

const updateQuantity = (id, delta) => {
  const item = cart.value.find(i => i.id === id)
  if (item) {
    item.quantity += delta
    if (item.quantity <= 0) removeFromCart(id)
  }
}

// const clearCart = () => {
//   cart.value = []
// }

// Injection du panier et des méthodes
provide('cart', cart)
provide('cartActions', { addToCart, removeFromCart, updateQuantity })
</script>

<template>
  <AppHeader />
  <main class="app-main">
    <router-view />
  </main>
</template>

<style scoped>
.app-main {
  min-height: calc(100vh - 4.25rem);
  padding: 0;
}
</style>
