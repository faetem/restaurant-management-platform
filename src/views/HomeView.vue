<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMenu = () => {
  router.push({ name: 'menu' })
}
</script>

<template>
  <main class="home-page">
    <section class="hero">
      <h1>Le Gourmet Express</h1>
      <p>
        Bienvenue dans notre restaurant. Decouvrez une cuisine savoureuse,
        preparee a la minute avec des ingredients frais.
      </p>
      <button type="button" @click="goToMenu">Voir le menu</button>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.hero {
  max-width: 680px;
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 2.8vw, 2.6rem);
}

p {
  margin: 1rem 0 1.5rem;
  line-height: 1.6;
  color: #334155;
}

button {
  border: 0;
  border-radius: 10px;
  padding: 0.8rem 1.3rem;
  background: #16a34a;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #15803d;
}
</style>
