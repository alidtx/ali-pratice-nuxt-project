<script setup>
import Card from '~/components/card.vue';
import { storeToRefs } from 'pinia'
import { useProductStore } from '#imports';

const store = useProductStore();
const { products } = storeToRefs(store)

</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>