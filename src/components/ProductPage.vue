<script setup lang="ts">
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products';
import { useRouter, useRoute } from 'vue-router'
import type { product } from '@/model/Product';


const store = useProductsStore();
const route = useRoute();

const props = defineProps<{
    product: product
}>()

let product: product;
if (!props.product) {
    /* @ts-ignore */
    const name = route.params.name.replaceAll('-', ' ')
    store.currentProduct = store.products.find(elem => elem.name === name);
    if (store.currentProduct) product = store.currentProduct;
}
else product = props.product;


let amount = ref(1);

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
])

let currentImgIndex = ref(0)
let currentImg = ref(product!.pictures[currentImgIndex.value])

function nextPicture() {
    currentImgIndex.value++;
    if (currentImgIndex.value >= product.pictures.length) {
        currentImgIndex.value = 0;
    }
    currentImg.value = product.pictures[currentImgIndex.value]
    thumbnailImgIndex.value = currentImgIndex.value;

}

function previousPicture() {
    currentImgIndex.value--;
    if (currentImgIndex.value < 0) currentImgIndex.value = product.pictures.length - 1;
    currentImg.value = product.pictures[currentImgIndex.value]
    thumbnailImgIndex.value = currentImgIndex.value;
}

let thumbnailImgIndex = ref(0);
function changePicture(index: number) {
    currentImgIndex.value = index;
    currentImg.value = product.pictures[currentImgIndex.value]
    thumbnailImgIndex.value = index
}

let showLightbox = ref(false)
let lightBoxImgIndex = ref(0)
function openImgLightbox() {
    showLightbox.value = true
}
function closeImgLightbox() {
    showLightbox.value = false;
}

function addToCart() {
    store.add(product, amount.value)
}



</script>

<template>
    <div class="wrapper">

        <!-- --------------------- Lightbox --------------------- -->
        <div v-if="showLightbox" class="lightboxWrapper" @click="closeImgLightbox"></div>
        <div v-if="showLightbox" class="lightbox">
            <div class="imgSlider">
                <div class="close">
                    <img id="lightBoxCloseBTN" src="../assets/images/x-icon-white.png" alt="close large image icon"
                        @click="closeImgLightbox()">
                </div>
                <div class="previous" @click="previousPicture">
                    <img src="../assets/images/icon-previous.svg" alt="previous icon to go to previous image">
                </div>
                <div class="next" @click="nextPicture">
                    <img src="../assets/images/icon-next.svg" alt="next icon to go to next image">
                </div>
                <img class="imgSliderIMG" :src="currentImg" alt="image of product (shoes)" @click="openImgLightbox">
            </div>

            <div class="imgThumbnails">
                <div class="thumbnailContainer" v-for="(src, index) in product.pictures"
                    :class="(thumbnailImgIndex === index) ? 'activeThumbBorder' : ''">
                    <img class="thumbnailIMG" :src="src" :class="(thumbnailImgIndex === index) ? 'activeThumbImg' : ''"
                        @click="changePicture(index)" alt="image of product (shoes)">
                </div>
            </div>
        </div>

        <!-- --------------------- Product Images --------------------- -->
        <div class="productImages">
            <div class="imgSlider">
                <div class="previous" @click="previousPicture">
                    <img src="../assets/images/icon-previous.svg" alt="previous icon to go to previous image">
                </div>
                <div class="next" @click="nextPicture">
                    <img src="../assets/images/icon-next.svg" alt="next icon to go to next image">
                </div>

                <img class="imgSliderIMG" :src="currentImg" alt="image of product (shoes)" @click="openImgLightbox">

            </div>

            <div class="imgThumbnails">
                <div class="thumbnailContainer" v-for="(src, index) in product.pictures"
                    :class="(thumbnailImgIndex === index) ? 'activeThumbBorder' : ''">
                    <img class="thumbnailIMG" :src="src" :class="(thumbnailImgIndex === index) ? 'activeThumbImg' : ''"
                        @click="changePicture(index)" alt="image of product (shoes)">
                </div>
            </div>
            <!-- <img src="../assets/images/image-product-1.jpg" alt="image 1 of product (shoes)"> -->
        </div>

        <div class="container productRight">
            <h2 class="bold">{{ product.brand }}</h2>
            <h1>{{ product.name }}</h1>
            <p class="description">{{ product.description }}</p>
            <div class="row priceRow">
                <div class="left row">
                    <div class="price bold">${{ product.price }}</div>
                    <div class="rabatt bold">{{ product.reduziert }}</div>
                </div>
                <div class="oldPrice bold">${{ product.oldprice }}</div>
            </div>

            <div class="addToCart">
                <div class="row amount">
                    <div class="amountOuter" @click="decrease">
                        <img src="../assets/images/icon-minus.svg" alt="minus icon to decrease product amount">
                    </div>
                    <input id="amountInput" class="bold" type="number" name="" v-model="amount">
                    <div class="amountOuter amountRight" @click="increase">
                        <img src="../assets/images/icon-plus.svg" alt="plus icon to increase product amount">
                    </div>
                </div>
                <button @click="addToCart" class="addToCartBTN"><img src="../assets/images/icon-cart-white.svg"
                        alt="shopping cart icon"> Add
                    to
                    cart</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/**
---------------------- Mobile Image Buttons ----------------------
*/
.imgThumbnails {
    display: none;
}

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
    cursor: pointer;
}

.previous {
    left: 5vw;
}

.next {
    right: 5vw;
}

.imgSlider {
    max-height: 37vh;
    overflow: hidden;
}

img {
    object-fit: contain;
}

/**
---------------------- Styles ----------------------
*/
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
}

/**
---------------------- Desktop Image Lightbox ----------------------
*/
.lightboxWrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh;
    padding: 0 !important;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 6;
    /* transform: translate(0%, -50%);  */
    display: none;
}

.lightbox {
    width: 50% !important;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    /* left: 50%;
    transform: translate(-50%, -50%); */
    display: none;
    flex-direction: column;
    align-items: center;
}

.lightbox .close {
    /* display: inline-block; */
    text-align: end;
    margin-bottom: 1em;
}

.lightbox .close img {
    width: 1.8em;
    cursor: pointer;
}

#lightBoxCloseBTN:hover,
.next img:hover,
.previous img:hover {
    filter: invert(56%) sepia(83%) saturate(1412%) hue-rotate(343deg) brightness(98%) contrast(97%);
}

.lightbox .previous,
.lightbox .next {
    display: flex;
    position: fixed;
    top: 40%;
}

.lightbox .previous {
    left: 4%;
}

.lightbox .next {
    right: 4%;
}

.lightbox .imgThumbnails {
    width: 80%;
}

.lightbox .imgSliderIMG {
    cursor: initial;
}

/**
---------------------- Desktop Styles ----------------------
*/
@media (min-width: 700px) {
    .lightbox {
        display: flex;
    }

    .lightboxWrapper {
        display: block;
    }

    .wrapper {
        display: flex;
        width: 90%;
        max-width: 1300px;
        margin: 0 auto;
    }

    .wrapper>* {
        width: 50%;
        padding: 0 3vw;

    }


    /**
---------------------- Left (images) ----------------------
*/
    .productImages {
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        margin-left: 2.5vw;
    }

    .imgSliderIMG {
        max-height: none;
        /* width: 50%; */
        border-radius: 15px;
        cursor: pointer;
    }

    .previous,
    .next {
        display: none;
    }

    .imgSlider {
        display: block;
        max-height: none;
        margin-bottom: 1.5em;
    }

    .imgSlider img,
    .imgThumbnails img {
        border-radius: 15px;
    }

    .imgThumbnails {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5%;
    }

    .thumbnailContainer {
        border-radius: 17px;
        cursor: pointer;
        display: flex;
    }

    .thumbnailContainer:hover {
        background-color: rgba(255, 255, 255, 1);
    }

    .activeThumbBorder {
        border: 2px solid var(--color-primary);
        background-color: rgba(255, 255, 255, 1);

    }

    .activeThumbImg,
    .thumbnailIMG:hover {
        opacity: 0.4;
    }

    /**
---------------------- Right (images) ----------------------
*/
    .productRight {
        padding-top: 1em;
        padding-right: 5vw;
    }

    h1 {
        font-size: 2.5rem;
    }

    .description {
        padding: 1em 0;
    }

    .addToCart {
        display: flex;
        align-items: center;
        gap: 2em;
    }

    .priceRow {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.3em;
        padding-bottom: 1.5em;
    }

    .oldPrice {
        font-family: var(--font-reg);
    }

    .amount {
        margin-bottom: 0;
        user-select: none
    }

    .amountOuter {
        cursor: pointer;
    }

    .amountOuter:hover {
        opacity: 0.6;
    }

    .amount input {
        width: 50%;
    }


}</style>