<template>
  <button
    type="button"
    :disabled="disabled"
    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
    :class="{
      'cursor-not-allowed bg-gray-500 hover:bg-gray-500': disabled,
    }"
    @click="!disabled ? emit('click') : undefined"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  text: string;
  disabled?: boolean
}

defineProps<ButtonProps>();

const emit = defineEmits<{(e: 'click'): void }>();
</script>
