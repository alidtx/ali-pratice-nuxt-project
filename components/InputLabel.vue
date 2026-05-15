<script setup>
defineProps({
    value: {
        type: String,
    },
    is_required: {
        default: true,
        type: Boolean,
    }
});

</script>

<template>
    <label class="block font-medium text-sm mt-1  text-gray-700">
        <span v-if="value">{{ value }} <span v-if=" is_required === true " class="text-red-700 font-semibold">*</span></span>
        <span v-else><slot /></span>
    </label>
</template>
