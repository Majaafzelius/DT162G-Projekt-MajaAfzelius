<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/" class="nav-item">Hem</RouterLink>
        <RouterLink to="/add" class="nav-item">Lägg till Recept</RouterLink>
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
  .nav-item {
    margin: 10px;
  }
  
</style>
