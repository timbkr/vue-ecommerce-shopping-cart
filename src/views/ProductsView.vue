<script setup lang="ts">
import { useProductsStore } from '@/stores/products';
import { useRouter, useRoute } from 'vue-router'
import type { product } from '@/model/Product';

const router = useRouter();
const store = useProductsStore();

function clickProduct(product: product) {
    /* @ts-ignore */
    const url = product.name.replaceAll(' ', '-')
    store.currentProduct = product;
    router.push('/products/' + url)
    

}
</script>

<template>
    <div class="container">
        <h1>Products</h1>

        <div class="products">
            <div v-for="product in store.products" class="productCard" @click="clickProduct(product)">
                <img :src="product.pictures[0]" alt="image of product">
                <h3>{{ product.name }}</h3>
                <div class="price">${{ product.price }} <span class="rabatt">{{ product.reduziert }}</span> <span
                        class="oldPrice"> ${{ product.oldprice }}</span></div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
}

.productCard {
    border: 5px solid var(--color-elements);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.productCard img {
    border: 0;
    /* border-top: 5px solid var(--color-elements); */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

}

.productCard:hover {
    cursor: pointer;
    opacity: 0.7;
}

h3 {
    text-align: center;
}

.price {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 1em;
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
}</style>