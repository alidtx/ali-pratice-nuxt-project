import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', () => {

    interface IProduct {
        id: number,
        name: string,
        href: string,
        imageSrc: string,
        price: number,
        color: string,
        quantity: number
    }
    const products: Ref<IProduct[]> = ref([
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: 8,
            color: 'Black',
            quantity: 1
        },
        {
            id: 2,
            name: 'Earthen Bottle',
            href: '#',
            price: 10,
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
            color: 'Black',
            quantity: 1

        },
        {
            id: 3,
            name: 'Nomad Tumbler',
            href: '#',
            price: 12,
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
            color: 'Black',
            quantity: 1
        },
        {
            id: 4,
            name: 'Focus Paper Refill',
            href: '#',
            price: 15,
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
            color: 'Black',
            quantity: 1
        },
    ])

    const selectedProducts: Ref<IProduct[]> = ref([]);

    function addToCart(product: IProduct) {
        if (!product) return false;
        const hasItem = selectedProducts.value.find((item) => item.id === product.id)

        if (hasItem) {
            alert('This item already selected')
            return false
        }

        selectedProducts.value.push(product)
    }


    function removeProduct(productID: number) {
        selectedProducts.value = selectedProducts.value.filter((item: IProduct) => item.id != productID)
    }

    function calculateTotalPrice(cart: IProduct[]): number {
        return Object.values(cart).reduce((acc, product: IProduct) => {
            return acc + product.price * product.quantity;
        }, 0);
    }


    return { products, selectedProducts, addToCart, removeProduct, calculateTotalPrice }
},
{
    persist: true,

})
