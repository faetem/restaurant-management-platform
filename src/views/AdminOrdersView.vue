<script setup>
import { computed, inject } from 'vue'

const orders = inject('orders')

const totalAmount = (order) =>
  order.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)

const readyOrdersCount = computed(() => orders.value.filter((order) => order.status === 'Prête').length)

const markAsReady = (orderId) => {
  orders.value = orders.value.map((order) =>
    order.id === orderId ? { ...order, status: 'Prête' } : order,
  )
}
</script>

<template>
  <main class="orders-page">
    <header class="orders-page__hero">
      <div>
        <p class="orders-page__eyebrow">Administration</p>
        <h1>Gestion des commandes</h1>
        <p>
          Suivez les commandes en cours, consultez le détail des plats commandés et marquez
          chaque commande comme prête quand elle sort de cuisine.
        </p>
      </div>

      <div class="orders-page__stats" aria-label="Résumé des commandes">
        <article>
          <span>{{ orders.length }}</span>
          <small>commandes</small>
        </article>
        <article>
          <span>{{ readyOrdersCount }}</span>
          <small>prêtes</small>
        </article>
      </div>
    </header>

    <section class="orders-page__list" aria-label="Liste des commandes">
      <article v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-card__top">
          <div>
            <p class="order-card__label">Client</p>
            <h2>{{ order.customerName }}</h2>
            <p class="order-card__id">Commande {{ order.id }}</p>
          </div>
          <span :class="['order-card__status', { 'order-card__status--ready': order.status === 'Prête' }]">
            {{ order.status }}
          </span>
        </div>

        <ul class="order-card__items">
          <li v-for="item in order.items" :key="`${order.id}-${item.name}`" class="order-card__item">
            <div>
              <strong>{{ item.name }}</strong>
              <p>Quantité : {{ item.quantity }}</p>
            </div>
            <span>{{ (item.quantity * item.unitPrice).toFixed(2) }} &euro;</span>
          </li>
        </ul>

        <div class="order-card__footer">
          <p>Total : {{ totalAmount(order).toFixed(2) }} &euro;</p>
          <button
            type="button"
            class="order-card__button"
            :disabled="order.status === 'Prête'"
            @click="markAsReady(order.id)"
          >
            {{ order.status === 'Prête' ? 'Commande prête' : 'Marquer comme prête' }}
          </button>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.orders-page {
  min-height: 100%;
  padding: 2rem 1.25rem 2.75rem;
  max-width: 1180px;
  margin: 0 auto;
}

.orders-page__hero {
  display: grid;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1.6rem;
}

.orders-page__eyebrow {
  margin: 0 0 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.74rem;
  font-weight: 700;
  color: #16a34a;
}

.orders-page__hero h1 {
  margin: 0;
  font-size: clamp(1.7rem, 2.5vw, 2.35rem);
  color: #0f172a;
}

.orders-page__hero p {
  margin: 0.7rem 0 0;
  max-width: 720px;
  line-height: 1.65;
  color: #334155;
}

.orders-page__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.orders-page__stats article {
  min-width: 128px;
  padding: 1rem 1.1rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: #fff;
  box-shadow: 0 12px 28px rgba(22, 163, 74, 0.2);
}

.orders-page__stats span {
  display: block;
  font-size: 1.65rem;
  font-weight: 800;
  line-height: 1;
}

.orders-page__stats small {
  display: block;
  margin-top: 0.3rem;
  opacity: 0.92;
}

.orders-page__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.order-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.1rem 1.1rem 1rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.order-card__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.order-card__label {
  margin: 0 0 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
}

.order-card h2 {
  margin: 0;
  font-size: 1.15rem;
  color: #0f172a;
}

.order-card__id {
  margin: 0.25rem 0 0;
  color: #64748b;
  font-size: 0.92rem;
}

.order-card__status {
  border-radius: 999px;
  padding: 0.38rem 0.75rem;
  background: #fee2e2;
  color: #b91c1c;
  font-weight: 700;
  font-size: 0.86rem;
}

.order-card__status--ready {
  background: #dcfce7;
  color: #166534;
}

.order-card__items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.7rem;
}

.order-card__item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0.9rem;
  border-radius: 12px;
  background: #f8fafc;
}

.order-card__item strong {
  display: block;
  color: #0f172a;
}

.order-card__item p {
  margin: 0.25rem 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

.order-card__item span {
  white-space: nowrap;
  align-self: center;
  color: #0f172a;
  font-weight: 700;
}

.order-card__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.9rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.order-card__footer p {
  margin: 0;
  font-weight: 700;
  color: #0f172a;
}

.order-card__button {
  border: 0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background: #16a34a;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    background 0.2s ease;
}

.order-card__button:hover:not(:disabled) {
  background: #15803d;
  transform: translateY(-1px);
}

.order-card__button:disabled {
  cursor: default;
  opacity: 0.65;
}

@media (min-width: 720px) {
  .orders-page__hero {
    grid-template-columns: 1.4fr 0.8fr;
  }

  .orders-page__list {
    gap: 1.2rem;
  }
}
</style>