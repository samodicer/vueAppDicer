<template>
  <div class="relative mt-2 rounded-md shadow-sm">
    <span v-if="label">{{ label }}</span>
    <input 
      class="block w-full rounded-md py-1.5 px-2 text-gray-900 placeholder:text-gray-400 border-2 border-gray-100" 
      :value="value"
      :type="type"  
      :placeholder="placeholder"
      @input="emit('update:value', $event.target.value || '')"
    >
  </div>
</template>

<script setup lang="ts">
interface TextInputProps {
  value: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

withDefaults(defineProps<TextInputProps>(), {
  type: 'text',
  label: undefined,
  placeholder: undefined,
});

const emit = defineEmits<{ (e: 'update:value',  value: string): void }>();
</script>