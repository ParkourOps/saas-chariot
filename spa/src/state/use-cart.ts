// import { ref, watch } from "vue";
// import { z } from "zod";
// import { defineStore } from "pinia";

// import hashStringItems from "@/utilities/hashStringItems";

// export const useCart = defineStore("cart", ()=>{
//     type Product = z.infer<typeof Product>;
//     type Price = z.infer<typeof SupportedPrice>;

//     type CartItem = {
//         hash: string,
//         product: Omit<Product, "prices">,
//         price: Price,
//         quantity: number
//     };
//     type Cart = CartItem[];

//     const cart = ref<Cart>([]);

//     function addToCart(product: Product, price: Price, quantity: number) {
//         const hash = hashStringItems([product.id, price.id]);
//         const idxExistingItem = cart.value.findIndex((item)=>(item.hash === hash));
//         if (idxExistingItem > -1) {
//             cart.value[idxExistingItem].quantity += quantity;
//             return;
//         } else {
//             cart.value.push({
//                 hash,
//                 product,
//                 price,
//                 quantity
//             })
//         }
//     }

//     function removeFromCart(cartItem: CartItem) {
//         cart.value = cart.value.filter((item)=>(item.hash !== cartItem.hash));
//     }

//     function removeQuantityFromCart(cartItem: CartItem, quantity: number) {
//         const hash = hashStringItems([cartItem.product.id, cartItem.price.id]);
//         const idxExistingItem = cart.value.findIndex((item)=>(item.hash === hash));
//         if (quantity >= cart.value[idxExistingItem].quantity) {
//             cart.value = cart.value.filter((item)=>(item.hash === cartItem.hash));
//         } else {
//             cart.value[idxExistingItem].quantity -= quantity;
//         }
//     }

//     function getQuantityInCart(product: Product) {
//         const itemsInCart = cart.value.filter((item)=>item.product.id === product.id);
//         return itemsInCart.reduce((prev, curr)=>(prev + curr.quantity), 0);
//     }
//     // watch(cart, ()=>{
//     //     // remove any item with zero quantity
//     //     cart.value = cart.value.filter((item)=>item.quantity > 0);
//     // }, { deep: true });

//     return {
//         cart,
//         addToCart,
//         removeFromCart,
//         removeQuantityFromCart,
//         getQuantityInCart
//     }
// });
