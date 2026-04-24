<script setup>
import { ref, computed, inject } from 'vue'
import { menuItems, menuCategories } from '@/data/menu'
import DishCard from '@/components/DishCard.vue'

const activeCategory = ref(null)

const filteredDishes = computed(() => {
  if (!activeCategory.value) return menuItems
  return menuItems.filter((d) => d.category === activeCategory.value)
})

const { addToCart } = inject('cartActions')
const showAlert = ref(false)
// Gestion des toasts multiples
const toasts = ref([])

const handleAdd = (dish) => {
  addToCart(dish)
  const id = Date.now()
  const message = `${dish.name} ajouté !`
  // On ajoute le nouveau toast au début ou à la fin
  toasts.value.push({ id, message })
  showAlert.value = true

  // On cache le toast après 2 secondes
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 2000)
}
</script>

<template>
  <main class="menu-page">
    <div class="toast-container">
      <TransitionGroup name="list">
        <div v-for="toast in toasts" :key="toast.id" class="cart-alert">
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>

    <header class="menu-page__head">
      <h1>Notre carte</h1>
      <p class="menu-page__intro">
        Découvrez nos plats préparés avec soin. Utilisez les filtres pour parcourir la carte.
      </p>

      <div class="menu-page__filters" role="tablist" aria-label="Filtrer par catégorie">
        <button
          type="button"
          :class="['filter-btn', { 'filter-btn--active': activeCategory === null }]"
          @click="activeCategory = null"
        >
          Tout
        </button>
        <button
          v-for="cat in menuCategories"
          :key="cat"
          type="button"
          :class="['filter-btn', { 'filter-btn--active': activeCategory === cat }]"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </header>

    <section class="menu-page__grid" aria-label="Liste des plats">
      <DishCard 
        v-for="dish in filteredDishes" 
        :key="dish.id" 
        :dish="dish"
        @add-to-cart="handleAdd"
      >
        <template #description="{ dish: d }">
          <p>{{ d.description }}</p>
        </template>
      </DishCard>
    </section>
  </main>
</template>

<style scoped>
.menu-page {
  min-height: 100%;
  padding: 2rem 1.25rem 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.menu-page__head {
  text-align: center;
  margin-bottom: 1.75rem;
}

.menu-page__head h1 {
  margin: 0 0 0.65rem;
  font-size: clamp(1.55rem, 2.2vw, 2rem);
  color: #0f172a;
}

.menu-page__intro {
  max-width: 640px;
  margin: 0 auto 0.4rem;
  line-height: 1.65;
  color: #334155;
  font-size: 0.98rem;
}

.menu-page__filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.4rem;
}

.filter-btn {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #334155;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.88rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.filter-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.filter-btn--active {
  background: #16a34a;
  color: #fff;
  border-color: #16a34a;
}

.menu-page__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  align-items: stretch;
}

.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column-reverse; /* Les plus récents en bas */
  gap: 10px;
  z-index: 1000;
  pointer-events: none; /* Pour ne pas bloquer les clics dessous */
}

.cart-alert {
  background: #16a34a;
  color: white;
  padding: 0.8rem 1.4rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  pointer-events: auto;
}

/* Animation d'empilement fluide */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Évite les sauts brusques quand un élément au milieu disparaît */
.list-move {
  transition: transform 0.4s ease;
}

@media (min-width: 560px) {
  .menu-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .menu-page__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.4rem;
  }
}
</style>