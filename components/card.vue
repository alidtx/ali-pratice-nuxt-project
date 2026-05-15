<script setup lang="ts">
import { useProductStore } from '@/stores/product'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const store = useProductStore()


</script>

<template>
    <NuxtLink :to="`/${product.id}`">
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
        <div class="h-40 bg-gray-100 flex items-center justify-center">
            <img v-if="product.imageSrc" :src="product.imageSrc" class="h-full w-full object-cover" />
            <span v-else class="text-gray-400 text-sm">
                Product Image
            </span>
        </div>
        <div class="p-4 space-y-2">

            <h3 class="text-gray-800 font-semibold text-lg">
                {{ product.name }}
            </h3>

            <p class="text-gray-500 text-sm">
                {{ product.color }}
            </p>

            <div class="flex items-center justify-between pt-2">
                <span class="text-indigo-600 font-bold">
                    ${{ product.price }}
                </span>

                <button class="bg-indigo-600 text-white text-sm px-3 py-1 rounded-md hover:bg-indigo-700 transition">
                    Add
                </button>
            </div>

        </div>

    </div>
    </NuxtLink>
</template>