<script setup>
import { inject, ref, watch } from 'vue'

const cart = inject('cart')
const customerName = inject('customerName')
const { removeFromCart, updateQuantity } = inject('cartActions')
const { addOrderFromCart } = inject('orderActions')
const total = ref(0)
const submitMessage = ref('')

watch(cart, (newCart) => {
  total.value = newCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
}, { deep: true, immediate: true })

const finalizeOrder = () => {
  const created = addOrderFromCart()

  submitMessage.value = created
    ? 'Commande ajoutée dans la page commandes.'
    : 'Ajoute un nom et au moins un plat avant de finaliser.'

  if (created) {
    setTimeout(() => {
      submitMessage.value = ''
    }, 2500)
  }
}
</script>

<template>
  <main class="cart-page">
    <h1>Votre Panier</h1>
    
    <div v-if="cart.length === 0" class="empty-cart">
      <p>Votre panier est vide.</p>
      <router-link to="/menu" class="btn-primary">Retour au menu</router-link>
    </div>

    <div v-else class="cart-container">
      <section class="cart-customer">
        <label for="customer-name">Nom du client</label>
        <input
          id="customer-name"
          v-model="customerName"
          type="text"
          placeholder="Ex. Sophie Martin"
          autocomplete="name"
        >
      </section>

      <section class="cart-items">
        <article v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item__img">
          <div class="cart-item__info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.price.toFixed(2) }} €</p>
          </div>
          <div class="cart-item__qty">
            <button @click="updateQuantity(item.id, -1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, 1)">+</button>
          </div>
          <button @click="removeFromCart(item.id)" class="btn-delete">×</button>
        </article>
      </section>

      <footer class="cart-summary">
        <div class="total-row">
          <span>Total :</span>
          <strong>{{ total.toFixed(2) }} €</strong>
        </div>
        <button class="btn-order" @click="finalizeOrder">Finaliser la commande</button>
        <p v-if="submitMessage" class="cart-summary__message">{{ submitMessage }}</p>
         <div class="btn-back-menu">
            <router-link to="/menu" class="btn-primary">Retour au menu</router-link>
         </div>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.cart-page { 
    max-width: 800px; 
    margin: 2rem auto; 
    padding: 0 1rem; 
}

.cart-customer {
  display: grid;
  gap: 0.45rem;
  margin: 0 0 1rem;
}

.cart-customer label {
  font-weight: 700;
  color: #0f172a;
}

.cart-customer input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  font: inherit;
  background: #fff;
}

.cart-customer input:focus {
  outline: 2px solid #bbf7d0;
  border-color: #16a34a;
}

.cart-item { 
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  padding: 1rem; 
  border-bottom: 1px solid #e2e8f0; 
}

.cart-item__img { 
    width: 80px; 
    height: 60px; 
    object-fit: cover; 
    border-radius: 8px; 
}

.cart-item__info { 
    flex: 1; 
}

.cart-item__qty { 
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 
}

.cart-item__qty button { 
    width: 30px; 
    height: 30px; 
    border: 1px solid #cbd5e1; 
    background: white; 
    border-radius: 4px; 
    cursor: pointer;
}

.cart-summary { 
    margin-top: 2rem; 
    padding: 1.5rem; 
    background: #f8fafc; 
    border-radius: 12px; }

.total-row { 
    display: flex; 
    justify-content: space-between; 
    font-size: 1.25rem; 
    margin-bottom: 1rem; 
    background-color: #181818; 
}

.btn-order { 
    width: 100%; 
    background: #16a34a; 
    color: white; 
    border: none; 
    padding: 1rem; 
    border-radius: 8px; 
    font-weight: bold; 
    cursor: pointer; 
}

.cart-summary__message {
  margin: 0.75rem 0 0;
  color: #166534;
  font-weight: 600;
}

.btn-delete { 
    background: none; 
    border: none; 
    color: #ef4444; 
    font-size: 1.5rem; 
    cursor: pointer; 
}

.btn-back-menu {
    display: flex;
    justify-content: center;
}
</style>