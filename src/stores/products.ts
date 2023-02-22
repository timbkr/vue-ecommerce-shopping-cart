import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Product from "@/model/Product";

export const useProductsStore = defineStore("products", () => {
    const products = ref([
        {
            pictures: [
                "../assets/images/image-product-1.jpg",
                "../assets/images/image-product-2.jpg",
                "../assets/images/image-product-3.jpg",
                "../assets/images/image-product-4.jpg",
            ],
            brand: "SNEAKER COMPANY",
            name: "Fall Limited Edition Sneakers",
            description: `These low-profile sneakers are your perfect casual wear companion. Featuring a
        durable rubber outer sole, they’ll withstand everything the weather can offer.`,
            price: "$125.00",
            reduziert: "50%",
            oldprice: "50%",
        },
        // new Product('SNEAKER COMPANY','Fall Limited Edition Sneakers',`These low-profile sneakers are your perfect casual wear companion. Featuring a
        // durable rubber outer sole, they’ll withstand everything the weather can offer.`,'$125.00','50%,'50%')
    ]);

    function add() {
        //
    }

    function remove() {}

    // const doubleCount = computed(() => count.value * 2);
    // function increment() {
    //     count.value++;
    // }

    return { products, add, remove };
});
