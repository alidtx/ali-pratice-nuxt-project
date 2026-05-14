<script setup>
defineProps({
  name: {
    type: String,
    default: 'Product Name'
  },
  description: {
    type: String,
    default: 'Short product description goes here'
  },
  price: {
    type: [Number, String],
    default: 99
  },
  image: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">

    <div class="h-40 bg-gray-100 flex items-center justify-center">
      <img v-if="image" :src="image" class="h-full w-full object-cover" />
      <span v-else class="text-gray-400 text-sm">Product Image</span>
    </div>
    <div class="p-4 space-y-2">
      <h3 class="text-gray-800 font-semibold text-lg">
        {{ name }}
      </h3>

      <p class="text-gray-500 text-sm">
        {{ description }}
      </p>

      <div class="flex items-center justify-between pt-2">
        <span class="text-indigo-600 font-bold">
          ${{ price }}
        </span>

        <button
          class="bg-indigo-600 text-white text-sm px-3 py-1 rounded-md hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>
    </div>

  </div>
</template>