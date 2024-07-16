<template>
  <div class="flex justify-between p-2 bg-orange-200">
    <span>{{ asset.name }}</span>
    <span class="font-bold cursor-pointer" @click="emit('asset:delete', asset.id)">X</span>
  </div>
</template>

<script setup lang="ts">
import { CustomAsset } from '../views/AssetsView.vue';

interface AssetItemProps {
  asset: CustomAsset;
}

defineProps<AssetItemProps>();

const emit = defineEmits<{(e: 'asset:delete', id: number): void}>();
</script>