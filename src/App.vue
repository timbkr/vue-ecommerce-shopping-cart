<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="container row header">
      <div class="left row">
        <img id="menuIconImg" src="./assets/images/icon-menu.svg" alt="image of menu icon">
        <img src="./assets/images/logo.svg" alt="image of sneakers brand logo">
      </div>
      <div class="right row">
        <img src="./assets/images/icon-cart.svg" alt="shopping cart icon">
        <img src="./assets/images/image-avatar.png" alt="image of customer avatar">
      </div>
    </div>
  </header>

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/collections">Collections</RouterLink>
    <RouterLink to="/men">Men</RouterLink>
    <RouterLink to="/women">Women</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>

  <RouterView />


<footer><div class="ta-center">Coded by T</div></footer>
</template>

<style scoped>
.header{
  justify-content: space-between;
  align-items: center;
  padding: 2.5vh 0;
}
.header img{
  height: 2.7vh;
  object-fit: contain;
  cursor: pointer;
}

.left, .right{
  gap: 4.2vw;
}

#menuIconImg{
  height: 2.2vh;
  align-self: flex-end;
}

nav{
  display: none;
}
</style>