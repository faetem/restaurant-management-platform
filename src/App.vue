<script setup>
import AppHeader from './components/AppHeader.vue'

import { ref, provide, watch, onMounted } from 'vue'

const initialOrders = [
  {
    id: 'cmd-1001',
    customerName: 'Faetem Toure',
    status: 'En attente',
    items: [
      { name: 'Burger Le Gourmet', quantity: 2, unitPrice: 16.5 },
      { name: 'Limonade maison 50cL', quantity: 2, unitPrice: 4.5 },
    ],
  },
  {
    id: 'cmd-1002',
    customerName: 'Paulo Teixeira',
    status: 'En attente',
    items: [
      { name: 'Velouté de courge', quantity: 1, unitPrice: 7.5 },
      { name: 'Filet de saumon', quantity: 1, unitPrice: 19 },
      { name: 'Fondant au chocolat', quantity: 2, unitPrice: 8.5 },
    ],
  },
  {
    id: 'cmd-1003',
    customerName: 'Samuel Depoukn',
    status: 'Prête',
    items: [
      { name: 'Salade de chèvre chaud', quantity: 1, unitPrice: 9 },
      { name: 'Pâtes al ragù', quantity: 1, unitPrice: 14.5 },
    ],
  },
]

const cart = ref([])
const customerName = ref('')
const orders = ref(initialOrders)

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

  const savedCustomerName = localStorage.getItem('gourmet-customer-name')
  if (savedCustomerName !== null) {
    customerName.value = savedCustomerName
  }

  const savedOrders = localStorage.getItem('gourmet-orders')
  if (savedOrders) {
    try {
      orders.value = JSON.parse(savedOrders)
    } catch (e) {
      console.error("Erreur lors de la lecture des commandes locales", e)
      orders.value = initialOrders
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

watch(customerName, (newCustomerName) => {
  localStorage.setItem('gourmet-customer-name', newCustomerName)
})

watch(
  orders,
  (newOrders) => {
    localStorage.setItem('gourmet-orders', JSON.stringify(newOrders))
  },
  { deep: true },
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

const addOrderFromCart = () => {
  const trimmedCustomerName = customerName.value.trim()

  if (!trimmedCustomerName || cart.value.length === 0) {
    return false
  }

  orders.value.unshift({
    id: `cmd-${Date.now()}`,
    customerName: trimmedCustomerName,
    status: 'En attente',
    items: cart.value.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
    })),
  })

  cart.value = []
  customerName.value = ''

  return true
}

// const clearCart = () => {
//   cart.value = []
// }

// Injection du panier et des méthodes
provide('cart', cart)
provide('customerName', customerName)
provide('orders', orders)
provide('cartActions', { addToCart, removeFromCart, updateQuantity })
provide('orderActions', { addOrderFromCart })
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
