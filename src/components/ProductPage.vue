<script setup lang="ts">
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products';
const productsStore = useProductsStore();

let amount = ref(0);

function increase() {
    amount.value++;
}
function decrease() {
    amount.value--;
}


//Infos: https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-image-src
let images = ref([ //wenn imgs nicht in public ordner (nur in src/assets dann:)
    //  new URL('../assets/images/image-product-1.jpg', import.meta.url).href,
    '../assets/images/image-product-1.jpg',
    '../assets/images/image-product-2.jpg',
    '../assets/images/image-product-3.jpg',
    '../assets/images/image-product-4.jpg',
])

let currentImgIndex = ref(0)
let currentImg = ref(images.value[currentImgIndex.value])

function nextPicture() {
    currentImgIndex.value++;
    if (currentImgIndex.value >= images.value.length) {
        currentImgIndex.value = 0;
    }
    currentImg.value = images.value[currentImgIndex.value]
}

function previousPicture() {
    currentImgIndex.value--;
    if (currentImgIndex.value < 0) currentImgIndex.value = images.value.length - 1;
    currentImg.value = images.value[currentImgIndex.value]

}
</script>

<template>
    <div class="productImages">
        <div class="previous" @click="previousPicture">
            <img src="../assets/images/icon-previous.svg" alt="previous icon to go to previous image">
        </div>
        <div class="next" @click="nextPicture">
            <img src="../assets/images/icon-next.svg" alt="next icon to go to next image">
        </div>

        <img :src="currentImg" alt="image of product (shoes)">
        <!-- <img src="../assets/images/image-product-1.jpg" alt="image 1 of product (shoes)"> -->
    </div>

    <div class="container">
        <h2 class="bold">SNEAKER COMPANY</h2>
        <h1>Fall Limited Edition Sneaker</h1>
        <p class="description">These low-profile sneakers are your perfect casual wear companion. Featuring a
            durable rubber outer sole, they’ll withstand everything the weather can offer.</p>

        <div class="row priceRow">
            <div class="left row">
                <div class="price bold">$125.00</div>
                <div class="rabatt bold">50%</div>
            </div>
            <div class="oldPrice bold">$250.00</div>
        </div>

        <div class="row amount">
            <div class="amountOuter" @click="decrease">
                <img src="../assets/images/icon-minus.svg" alt="minus icon to decrease product amount">
            </div>
            <input class="bold" type="number" name="" id="" v-model="amount">
            <div class="amountOuter amountRight" @click="increase">
                <img src="../assets/images/icon-plus.svg" alt="plus icon to increase product amount">
            </div>
        </div>

        <button class="addToCartBTN"><img src="../assets/images/icon-cart-white.svg" alt="shopping cart icon"> Add to
            cart</button>
    </div>
</template>

<style scoped>
/** Image Buttons */
.previous,
.next {
    position: absolute;
    top: 45%;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 1em;
    border-radius: 50%;
}

.previous {
    left: 5vw;
}

.next {
    right: 5vw;
}

.productImages {
    max-height: 37vh;
    overflow: hidden;
}

img {
    object-fit: contain;
}

/** Styles */
h1 {
    padding: 0.5em 0;
    /* line-height: 1; */
}

h2 {
    color: var(--color-primary);
    font-size: 1rem;
    letter-spacing: 0.1rem;
    padding-top: 1.35em;
}

p {
    color: var(--color-text-sec)
}

.priceRow {
    font-size: 1.2rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.8em 0;
}

.left {
    align-items: center;
    gap: 1em
}

.price {
    font-size: 2rem;
}

.rabatt {
    color: var(--color-primary);
    background-color: var(--color-elements);
    border-radius: 5px;
    padding: 0.15em 0.4em;

}

.oldPrice {
    color: var(--Grayish-blue);
    text-decoration: line-through;
}

.amount {
    /* width: 100%; */
    background-color: var(--Light-grayish-blue);
    padding: 0.8em 1.5em;
    border-radius: 10px;
    justify-content: space-between;
    margin-bottom: 1em;
}

.amountOuter {
    flex: 1;
    display: flex;
    align-items: center;
}

.amountRight {
    justify-content: flex-end
}

.amount input {
    text-align: center;
    background-color: var(--Light-grayish-blue);
    border: none;
    width: 25%;
    padding: 0.5em 0;
}

.addToCartBTN {
    background-color: var(--color-primary);
    border: none;
    border-radius: 10px;
    width: 100%;
    padding: 1.3em;
    color: white;
    display: flex;
    justify-content: center;
    gap: 1em;
    -webkit-box-shadow: 0px 19px 23px -23px #FF7D1A; 
box-shadow: 0px 19px 23px -23px #FF7D1A;
}</style>