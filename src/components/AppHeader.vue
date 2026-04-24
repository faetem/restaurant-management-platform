<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const isHome = computed(() => route.name === 'home')
const isMenu = computed(() => route.name === 'menu')
const isOrders = computed(() => route.name === 'orders')
</script>

<template>
  <header class="app-header">
    <div class="app-header__brand">
      <RouterLink to="/" class="app-header__logo">Le Gourmet Express</RouterLink>
    </div>
    <nav class="app-header__nav" aria-label="Navigation principale">
      <RouterLink
        class="app-header__link"
        to="/"
        :class="{ 'app-header__link--active': isHome }"
      >
        Accueil
      </RouterLink>
      <span class="app-header__pipe" aria-hidden="true">|</span>
      <RouterLink
        class="app-header__link"
        to="/menu"
        :class="{ 'app-header__link--active': isMenu }"
      >
        Menu
      </RouterLink>
      <span class="app-header__pipe" aria-hidden="true">|</span>
      <RouterLink
        class="app-header__link"
        to="/admin/commandes"
        :class="{ 'app-header__link--active': isOrders }"
      >
        Commandes
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 1.25rem;
  background: #ffffff;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.app-header__logo {
  font-weight: 700;
  font-size: 1.08rem;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.app-header__logo:hover {
  color: #16a34a;
}

.app-header__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.2rem;
}

.app-header__pipe {
  color: #cbd5e1;
  font-size: 0.85rem;
  user-select: none;
  padding: 0 0.1rem;
}

.app-header__link {
  color: #334155;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.92rem;
  padding: 0.35rem 0.45rem;
  border-bottom: 2px solid transparent;
  border-radius: 8px;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.app-header__link:hover {
  color: #16a34a;
  background: #f0fdf4;
}

.app-header__link--active {
  color: #16a34a;
  border-bottom-color: #16a34a;
  font-weight: 600;
}
</style>
