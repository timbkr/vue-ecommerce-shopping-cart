<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

let showMobileMenu = ref(false);
function openMenuMobile() {
  console.log("Open NavMenu");
  showMobileMenu.value = true;
}
function closeMenuMobile(){
  showMobileMenu.value = false;
}
</script>

<template>
  <header>
    <div class="container row header">
      <div class="left row">
        <img @click="openMenuMobile" id="menuIconImg" src="./assets/images/icon-menu.svg" alt="image of menu icon">
        <img src="./assets/images/logo.svg" alt="image of sneakers brand logo">
      </div>
      <div class="right row">
        <img src="./assets/images/icon-cart.svg" alt="shopping cart icon">
        <img src="./assets/images/image-avatar.png" alt="image of customer avatar">
      </div>
    </div>
  </header>

  <div v-if="showMobileMenu" class="mobileMenu">
    <div class=" row header">
      <div class="left row">
        <img @click="closeMenuMobile"  src="./assets/images/icon-close.svg" alt="image of menu icon">
      </div>
    </div>
    <nav class="bold">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/collections">Collections</RouterLink>
      <RouterLink to="/men">Men</RouterLink>
      <RouterLink to="/women">Women</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </nav>
  </div>

  <RouterView />


  <footer>
    <div class="ta-center">Coded by T</div>
  </footer>
</template>

<style scoped>
.mobileMenu {
  position: fixed;
  width: 65vw;
  height: 100vh;
  z-index: 500;
  background-color: white;
  padding-left: 5vw;
}

header {
  background-color: var(--color-bg);
}

.header {
  justify-content: space-between;
  align-items: center;
  padding: 2.5vh 0;
}

.header img {
  height: 2.7vh;
  object-fit: contain;
  cursor: pointer;
}

.left,
.right {
  gap: 4.2vw;
}

#menuIconImg {
  height: 2.2vh;
  align-self: flex-end;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding-top: 1.5em ;
}
nav a{
  text-decoration: none;
  color: var(--color-text);
  font-size: 1.4rem;
}
</style>