import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { product, cartProduct } from "@/model/Product";

export const useProductsStore = defineStore("products", () => {
    const products = ref<Array<product>>([]);
    const cart = ref<Array<cartProduct>>([]);
    
    const currentProduct = ref<product>();

    function add(product: product, amount: number) {
        if (amount === 0) return;
        for (let i = 0; i < cart.value.length; i++) {
            if (cart.value[i].name === product.name) {
                cart.value[i].amount += amount;
                return;
            }
        }
        // type cast because amount gets added to the product when it enters shopping cart
        let clone = { ...product } as cartProduct;
        clone.amount = amount;
        cart.value.push(clone);
    }

    function remove(product: product) {
        let index;
        for (let i = 0; i < cart.value.length; i++) {
            if (cart.value[i].name === product.name) {
                index = i;
                cart.value.splice(index, 1);
                break;
            }
        }
    }

    const getItemCount = computed(() => {
        let itemAmount = 0;
        cart.value.forEach((element) => {
            itemAmount += element.amount;
        });
        return itemAmount;
    });
    // const doubleCount = computed(() => count.value * 2);
    // function increment() {
    //     count.value++;
    // }
    products.value.push({
        pictures: [
            "../assets/images/image-product-1.jpg",
            "../assets/images/image-product-2.jpg",
            "../assets/images/image-product-3.jpg",
            "../assets/images/image-product-4.jpg",
        ],
        thumbnailImg: "../assets/images/image-product-1-thumbnail.jpg",
        brand: "SNEAKER COMPANY",
        name: "Fall Limited Edition Sneakers",
        description: `These low-profile sneakers are your perfect casual wear companion. Featuring a
                      durable rubber outer sole, they’ll withstand everything the weather can offer.`,
        price: "125.00",
        reduziert: "50%",
        oldprice: "250.00",
    });
    products.value.push({
      pictures: [
          "../assets/images/image-product-2.jpg",
          "../assets/images/image-product-1.jpg",
          "../assets/images/image-product-3.jpg",
          "../assets/images/image-product-4.jpg",
      ],
      thumbnailImg: "../assets/images/image-product-1-thumbnail.jpg",
      brand: "SNEAKER COMPANY",
      name: "Fall Limited Edition Sneakers1",
      description: `These low-profile sneakers are your perfect casual wear companion. Featuring a
                    durable rubber outer sole, they’ll withstand everything the weather can offer.`,
      price: "155.00",
      reduziert: "50%",
      oldprice: "310.00",
  });
    return { products, cart, add, remove, getItemCount, currentProduct};


});
