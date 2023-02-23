<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import { useProductsStore } from '@/stores/products';

const store = useProductsStore();
let cart = store.cart;

let showMobileMenu = ref(false);
function openMenuMobile() {
  showMobileMenu.value = true;
}
function closeMenuMobile() {
  showMobileMenu.value = false;
}

let showCart = ref(false);
function toggleShoppingCart() {
  showCart.value = !showCart.value;
}
function closeShoppingCart(){
  showCart.value = false;
}

function clickOutsideNavMenu() {
  if (showMobileMenu.value) closeMenuMobile();
}

let cartIcon = ref('../assets/images/icon-cart.svg')
</script>

<template >
  <header>
    <div class="container row header">
      <div class="left row">
        <img @click="openMenuMobile" id="menuIconImg" src="./assets/images/icon-menu.svg" alt="image of menu icon">
        <RouterLink to="/"><img src="./assets/images/logo.svg" alt="image of sneakers brand logo"> </RouterLink> 
        <nav class="desktopNav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/products">Products</RouterLink>
          <RouterLink to="/men">Men</RouterLink>
          <RouterLink to="/women">Women</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </nav>
      </div>
      <div class="right row">
        <span v-if="store.getItemCount > 0" class="cartAmount">{{ store.getItemCount }}</span>
      <img @click="toggleShoppingCart" :src="cartIcon" alt="shopping cart icon" @mouseenter="cartIcon = '../assets/images/icon-cart-black.svg'" @mouseleave="cartIcon = '../assets/images/icon-cart.svg'">
      <img class="customerAvatarImg" src="./assets/images/image-avatar.png" alt="image of customer avatar">
      </div>
    </div>
  </header>


  <!-- 
             -----------------------  Mobile Navmenu -----------------------
             -->
  <div v-if="showMobileMenu" class="mobileMenu">
    <div class=" row header">
      <div class="left row">
        <img @click="closeMenuMobile" src="./assets/images/icon-close.svg" alt="image of menu icon">
      </div>
    </div>
    <nav class="bold">
      <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/products">Products</RouterLink>
          <RouterLink to="/men">Men</RouterLink>
          <RouterLink to="/women">Women</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
  </nav>
</div>

<!-- 
       -----------------------  Shopping Cart -----------------------
       -->
<div v-if="showCart" class="cart row" @click="clickOutsideNavMenu">
  <h2 class="bold">Cart</h2>
  <div class="cartContent row">
    <p v-if="cart.length === 0" class="bold">Your cart is empty</p>

      <div v-for="item in cart" class="productItem row">
        <div class="thumbnail row">
          <img :src="item.thumbnailImg" alt="thumbnail image of product">
        </div>
        <div class="infos row">
          <div class="title">{{ item.name }}</div>
        <div class="price">{{ item.price }} x {{ item.amount }}<span class="sumprice bold"> ${{ item.amount *
          Number.parseInt(item.price) }}</span></div>
        </div>
        <div class="delete">
          <img @click="store.remove(item)" class="deleteIcon" src="./assets/images/icon-delete.svg"
            alt="image of delete icon">
        </div>
      </div>

      <!-- <div class="productItem row">
              <div class="thumbnail row">
                <img src="./assets/images/image-product-1-thumbnail.jpg" alt="thumbnail image of product (shoes)">
              </div>
              <div class="infos row">
                <div class="title">Fall Limited Edition Sneakers</div>
                <div class="price">$125.00 x 3 <span class="sumprice bold">$375</span></div>
              </div>
              <div class="delete">
                <img class="deleteIcon" src="./assets/images/icon-delete.svg" alt="image of delete icon">
              </div>
            </div> -->

      <button class="checkout bold">Checkout</button>
    </div>
  </div>

  <!-- 
             -----------------------  APP -----------------------
             -->
  <RouterView @click="{clickOutsideNavMenu(); closeShoppingCart();}" :product="store.currentProduct" />


  <footer @click="clickOutsideNavMenu">
    <div class="ta-center">Coded by T</div>
  </footer>
</template>

<style scoped>
/**
---------------------- Header ----------------------
*/
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
  align-items: center;
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
  padding-bottom: 1em;
  border-bottom: 5px solid transparent;

}

nav a:hover{
  border-bottom: 5px solid var(--color-primary);
}
.cartAmount {
  z-index: 6;
  position: absolute;
  top: -0.7em;
  left: 0.6em;
  background-color: var(--color-primary);
  padding: 0.05em 0.56em;
  border-radius: 11px;
  color: white;
  min-width: 2.1em;
  text-align: center;
}

/**
---------------------- Mobile Nav Menu ----------------------
*/
.desktopNav {
  display: none
}

.mobileMenu {
  position: fixed;
  width: 65vw;
  height: 100vh;
  z-index: 500;
  background-color: white;
  padding-left: 5vw;
}

/**
---------------------- Shopping Cart ----------------------
*/
.cart {
  flex-direction: column;
  justify-content: center;
  position: absolute;
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
  padding: 1.25em;
  gap: 1.25em;
}

.cart p {
  text-align: center;
  color: var(--color-text-sec)
}

.productItem {
  gap: 1em;
  justify-content: space-between;
  align-items: center;
}

.thumbnail {
  width: 15%;
}

.thumbnail img {
  border-radius: 8px;
}

.infos {
  flex: 1;
  flex-direction: column;
  gap: 0.25em;
  color: var(--color-text-sec)
}

.infos .price {
  font-size: 1.1rem;
}

.sumprice {
  color: var(--color-text);
}

.delete {
  width: 5%;
}

.deleteIcon {
  width: 100%;
  cursor: pointer;
}

.checkout {
  background-color: var(--color-primary);
  border: none;
  border-radius: 10px;
  width: 100%;
  padding: 1.3em;
  color: white;
}

@media (min-width: 700px) {
  #menuIconImg {
    display: none;
  }

  header {
    /* padding: 2em 0; */
    padding-bottom: 4em;

  }

  .header {
    border-bottom: 1px solid var(--color-text-sec);
    /* padding: 2em 0; */
    padding: 0;
  }

  .desktopNav {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    /* gap: 2em; */
    color: var(--color-text-sec);
  }

  .desktopNav a {
    color: inherit;
    font-size: 1.125rem;
    padding: 4vh 0;
  }

  .header img {
    /* height: 3vh; */
  }

  .right {
    gap: 2.5em;
  }

  .header .customerAvatarImg {
    height: 4.75vh;
  }
  .header .customerAvatarImg:hover{
    border: 2px solid var(--color-primary);
    border-radius: 50%;
  }
  .cart {
    border: 1px solid var(--color-text-sec);
    width: 50%;
    max-width: 1300px;
    transform: translateX(-7.5%);
  }

  .cartAmount {
    top: -0.25em;
    left: 0.5em;
  }
}
</style>