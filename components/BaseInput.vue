<script setup>
const model = defineModel({
    type: [String, Number, null],
    required: true,
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });

</script>

<template>
    <input
        class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 px-3 focus:ring-indigo-500 sm:text-sm py-2.5"
        v-model="model"
        ref="input"
    />
</template>
