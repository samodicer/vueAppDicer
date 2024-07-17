<template>
  <div class="flex flex-col gap-2">
    <div v-for="asset in assets" :key="asset.id" @click="emit('asset:detail', asset.id)">
      <AssetItem 
        :asset="asset" 
        @asset:delete="emit('asset:delete', $event)" 
        @asset:update="emit('asset:update', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AssetItem from '../components/AssetItem.vue';
import { Asset } from '../types/assets';


interface AssetsListProps {
  assets: Asset[];
}

interface AssetsListEmits {
  (e: 'asset:delete', id: number): void;
  (e: 'asset:update', asset: Asset): void;
  (e: 'asset:detail', id: number): void;
}

defineProps<AssetsListProps>();

const emit = defineEmits<AssetsListEmits>();
</script>
