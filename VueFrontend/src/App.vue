<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Hem</RouterLink>
        <RouterLink to="/add">Lägg till Recept</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
  body {
    background-color: rgb(255, 255, 255);
  }
  h1,h2,h3,h4 {
    color: rgb(0, 0, 0);
  }
  
</style>
