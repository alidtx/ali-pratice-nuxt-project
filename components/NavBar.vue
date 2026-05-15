<script setup>
import CartIcon from './Icons/cartIcon.vue';
import {
    Dialog as HeadlessDialog,
    DialogPanel as HeadlessDialogPanel,
    DialogTitle as HeadlessDialogTitle,
    TransitionChild as HeadlessTransitionChild,
    TransitionRoot as HeadlessTransitionRoot
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
const store = useProductStore();
const { selectedProducts } = storeToRefs(store)
const selectedProductsCount = computed(() => selectedProducts.value.length || 0)
const route = useRoute()
const open = ref(false)




function isOpen() {
    open.value = true
}

const totalPrice = computed(() => store.calculateTotalPrice(selectedProducts.value))
</script>



<template>
    <nav class="sticky top-0 z-30 bg-white shadow-md backdrop-blur-sm bg-white/95">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <div>
                    <h1 class="text-xl font-bold tracking-tight text-gray-800">
                        <NuxtLink to="/">Ali's <span class="text-indigo-600">Store</span></NuxtLink>
                    </h1>
                    <p class="text-xs text-gray-500 hidden sm:block">buying best</p>
                </div>
            </div>
            <div class="hidden md:flex items-center gap-6">
                <NuxtLink to="/" class="text-gray-600 hover:text-indigo-600">
                    Shop
                </NuxtLink>

                <NuxtLink to="/about" class="text-gray-600 hover:text-indigo-600">
                    About
                </NuxtLink>

                <NuxtLink to="/contact" class="text-gray-600 hover:text-indigo-600">
                    Contact
                </NuxtLink>
            </div>
            <div class="flex items-center gap-4">
                <CartIcon @click="isOpen"  :count="selectedProductsCount"/>
            </div>
        </div>
    </nav>

    <HeadlessTransitionRoot as="template" :show="open">
        <HeadlessDialog class="relative z-50" @close="open = false">
            <HeadlessTransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </HeadlessTransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <HeadlessTransitionChild as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <HeadlessDialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <HeadlessDialogTitle class="text-lg font-medium text-gray-900">Shopping cart
                                            </HeadlessDialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    @click="open = false">
                                                    <span class="absolute -inset-0.5" />
                                                    <span class="sr-only">Close panel</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="mt-8">
                                            <div class="flow-root">
                                                <ul role="list" class="-my-6 divide-y divide-gray-200">
                                                    <li v-for="product in selectedProducts" :key="product.id"
                                                        class="flex py-6">
                                                        <div
                                                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img :src="product.imageSrc" :alt="product.imageAlt"
                                                                class="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div class="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div
                                                                    class="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a :href="product.href">{{ product.name }}</a>
                                                                    </h3>
                                                                    <p class="ml-4">৳{{ product.price }}</p>
                                                                </div>
                                                            </div>
                                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                                <p class="text-gray-500">Qty {{ product.quantity }}</p>

                                                                <div class="flex">
                                                                    <button @click="store.removeProduct(product.id)"
                                                                        type="button"
                                                                        class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div class="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>৳{{ totalPrice }}</p>
                                        </div>
                                        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at
                                            checkout.</p>
                                        <div class="mt-6">
                                            <NuxtLink v-if="selectedProductsCount" to="/checkout" @click="open = false"
                                                class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                                Checkout
                                            </NuxtLink>
                                            <span
                                                class="flex items-center justify-center rounded-md border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white shadow-sm"
                                                v-else>
                                                Please select product
                                            </span>
                                        </div>
                                        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{{ ' ' }}
                                                <button type="button"
                                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                                    @click="open = false">
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </HeadlessDialogPanel>
                        </HeadlessTransitionChild>
                    </div>
                </div>
            </div>
        </HeadlessDialog>
    </HeadlessTransitionRoot>
</template>
