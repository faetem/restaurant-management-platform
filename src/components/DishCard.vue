<script setup>
defineProps({
  /** Plat affiche : { id, name, description, price, category, image } */
  dish: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <article class="dish-card">
    <div class="dish-card__image-wrap">
      <img :src="dish.image" :alt="dish.name" class="dish-card__image" loading="lazy" />
      <span class="dish-card__badge">{{ dish.category }}</span>
    </div>
    <div class="dish-card__body">
      <h2 class="dish-card__title">{{ dish.name }}</h2>
      <div class="dish-card__description">
        <slot name="description" :dish="dish">
          <p>{{ dish.description }}</p>
        </slot>
      </div>
      <p class="dish-card__price">{{ dish.price.toFixed(2) }} &euro;</p>
      <button 
      type="button" 
      class="dish-card__btn" 
      style="cursor: pointer;"
      @click="emit('add-to-cart', dish)">
    Ajouter au panier
      </button>
    </div>
  </article>
</template>

<style scoped>
.dish-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;
  transition:
    box-shadow 0.25s ease,
    transform 0.2s ease;
}

.dish-card:hover {
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.1);
}

.dish-card__image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  background: #f1f5f9;
}

.dish-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.dish-card__badge {
  position: absolute;
  top: 0.65rem;
  left: 0.65rem;
  background: rgba(22, 163, 74, 0.95);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.55rem;
  border-radius: 8px;
}

.dish-card__body {
  padding: 1rem 1.1rem 1.15rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dish-card__title {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
  color: #0f172a;
}

.dish-card__description {
  flex: 1;
  color: #334155;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.65rem;
}

.dish-card__description :deep(p) {
  margin: 0;
}

.dish-card__price {
  margin: 0 0 0.85rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #16a34a;
}

.dish-card__btn {
  border: 0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background: #16a34a;
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: default;
}
</style>
