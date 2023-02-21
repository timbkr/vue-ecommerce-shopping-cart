<script setup lang="ts">
import { ref } from 'vue'
let amount = ref(0);

function increase(){
    amount.value++;
}
function decrease(){
    amount.value--;
}
</script>

<template>
    <img src="../assets/images/image-product-1.jpg" alt="image 1 of product (shoes)">
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
                <img  src="../assets/images/icon-minus.svg" alt="minus icon to decrease product amount">
            </div>
            <input class="bold" type="number" name="" id="" v-model="amount">
            <div class="amountOuter amountRight" @click="increase">
                <img src="../assets/images/icon-plus.svg" alt="plus icon to increase product amount">
            </div>
        </div>
    
        <button class="addToCartBTN"><img src="../assets/images/icon-cart-white.svg" alt="shopping cart icon"> Add to cart</button>
    </div>
</template>

<style scoped>
img{
    object-fit: contain;
}
h1{
    padding: 0.5em 0;
    /* line-height: 1; */
}
h2{
    color: var(--color-primary);
    font-size: 1rem;
    letter-spacing: 0.1rem;
    padding-top: 1.35em;
}
p{
    color: var(--color-text-sec)
}

.priceRow{
    font-size: 1.2rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.8em 0;
}
.left{
    align-items: center;
    gap: 1em
}
.price{
    font-size: 2rem;
}
.rabatt{
    color: var(--color-primary);
    background-color: var(--color-elements);
    border-radius: 5px;
    padding: 0.15em 0.4em;

}
.oldPrice{
    color: var(--Grayish-blue);
    text-decoration: line-through;
}

.amount{
    /* width: 100%; */
    background-color: var(--Light-grayish-blue);
    padding: 0.8em 1.5em;
    border-radius: 10px;
    justify-content: space-between;
    margin-bottom: 1em;
}
.amountOuter{
    flex: 1;
    display: flex;
    align-items: center;
}
.amountRight{
    justify-content: flex-end
}
.amount input{
    text-align: center;
    background-color: var(--Light-grayish-blue);
    border: none;
    width: 25%;
    padding: 0.5em 0;
}
.addToCartBTN{
    background-color: var(--color-primary);
    border: none;
    border-radius: 10px;
    width: 100%;
    padding: 1.3em;
    color: white;
    display: flex;
    justify-content: center;
    gap: 1em;
}

</style>