<template>
  <div class="relative rounded-md shadow-sm">
    <span v-if="label" class="ml-2 text-gray-800">{{ label }}</span>
    <input
      class="block w-full rounded-md py-1.5 px-2 placeholder:text-gray-400 border-2 border-gray-100"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      @input="emit('update:value', ($event.target as HTMLInputElement).value)"
    >
    <span v-if="errorMessage" class="ml-2 text-xs text-red-700">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
interface TextInputProps {
  value: string;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

withDefaults(defineProps<TextInputProps>(), {
  type: 'text',
  label: undefined,
  placeholder: undefined,
});

const emit = defineEmits<{(e: 'update:value', value: string): void }>();
</script>
