<template>
  <button
    type="button"
    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
    @click="emit('click')"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  text: string;
}

defineProps<ButtonProps>();

const emit = defineEmits<{ (e: 'click'): void }>();
</script>