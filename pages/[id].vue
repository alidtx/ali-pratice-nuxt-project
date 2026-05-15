<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const route = useRoute()

const store = useProductStore()

const { products } = storeToRefs(store)

const product = computed(() => {
    return products.value.find(
        item => item.id == route.params.id
    )
})
</script>

<template>
    <div
        v-if="product"
        class="max-w-5xl mx-auto p-6"
    >
        <div class="grid md:grid-cols-2 gap-10">

            <div class="bg-gray-100 rounded-xl overflow-hidden">
                <img
                    :src="product.imageSrc"
                    class="w-full h-full object-cover"
                >
            </div>

            <div class="space-y-5">

                <h1 class="text-3xl font-bold text-gray-800">
                    {{ product.name }}
                </h1>

                <p class="text-gray-500">
                    {{ product.color }}
                </p>

                <div class="text-2xl font-bold text-indigo-600">
                    ${{ product.price }}
                </div>

                <p class="text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Product details description here.
                </p>

                <button @click="store.addToCart(product)"
                    class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    Add To Cart
                </button>

            </div>

        </div>
    </div>

    <div
        v-else
        class="text-center py-20 text-gray-500"
    >
        Product not found
    </div>
</template>