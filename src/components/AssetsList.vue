<template>
  <div class="flex flex-col gap-2">
    <div v-for="asset in assets" :key="asset.id">
      <AssetItem 
      :asset="asset" 
      @asset:delete="emit('asset:delete', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CustomAsset } from '../views/AssetsView.vue';
import AssetItem from '../components/AssetItem.vue';


interface AssetsListProps {
  assets: CustomAsset[];
}

defineProps<AssetsListProps>();

const emit = defineEmits<{(e: 'asset:delete', id: number): void}>();
</script>