<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

let showMobileMenu = ref(false);
function openMenuMobile() {
  console.log("Open NavMenu");
  showMobileMenu.value = true;
}
function closeMenuMobile() {
  showMobileMenu.value = false;
}

let showCart = ref(true);
function toggleShoppingCart() {
  console.log("cart");
  showCart.value = !showCart.value;
}

function clickOutsideNavMenu(){
  if(showMobileMenu.value) closeMenuMobile();
}

</script>

<template >
    <header>
      <div class="container row header">
        <div class="left row">
          <img @click="openMenuMobile" id="menuIconImg" src="./assets/images/icon-menu.svg" alt="image of menu icon">
          <img src="./assets/images/logo.svg" alt="image of sneakers brand logo">
        </div>
        <div class="right row">
          <img @click="toggleShoppingCart" src="./assets/images/icon-cart.svg" alt="shopping cart icon">
          <img src="./assets/images/image-avatar.png" alt="image of customer avatar">
        </div>
      </div>
    </header>
  
    <div v-if="showMobileMenu" class="mobileMenu">
      <div class=" row header">
        <div class="left row">
          <img @click="closeMenuMobile" src="./assets/images/icon-close.svg" alt="image of menu icon">
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
  
    <div v-if="showCart" class="cart row" @click="clickOutsideNavMenu">
      <h2 class="bold">Cart</h2>
      <div class="cartContent row">
        <!-- <p class="bold">Your cart is empty</p> -->
  
      </div>
    </div>
  
    <RouterView @click="clickOutsideNavMenu" />
  
  
    <footer @click="clickOutsideNavMenu">
      <div class="ta-center">Coded by T</div>
    </footer>

</template>

<style scoped>
.cart {
  flex-direction: column;
  justify-content: center;
  position: fixed;
  width: 95%;
  left: 50%;
  transform: translateX(-50%);
  top: 9vh;
  z-index: 6;
  background-color: white;
  min-height: 30vh;
  border-radius: 15px;

  -webkit-box-shadow: 0px 19px 23px -23px #000000;
  box-shadow: 0px 19px 23px -23px #000000;
}

.cart h2 {
  border-bottom: 1px solid var(--color-text-sec);
  padding: 1.5em;
  font-size: 1.2rem;
}

.cartContent {
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cart p {
  text-align: center;
  color: var(--color-text-sec)
}

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
  padding-top: 1.5em;
}

nav a {
  text-decoration: none;
  color: var(--color-text);
  font-size: 1.4rem;
}
</style>