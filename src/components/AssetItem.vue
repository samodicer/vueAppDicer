<template>
  <div class="flex justify-between items-center p-2 cursor-pointer bg-orange-200">
    <span>{{ asset.name }}</span>
    <div class="flex gap-2">
      <FontAwesomeIcon 
        :icon="faPenToSquare" 
        @click.stop="emit('asset:update', asset)"
      />
      <FontAwesomeIcon 
        :icon="faXmark" 
        @click.stop="emit('asset:delete', asset.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Asset } from '../types/assets';


interface AssetItemProps {
  asset: Asset;
}

defineProps<AssetItemProps>();

const emit = defineEmits<{(e: 'asset:update', asset: Asset): void, (e: 'asset:delete', id: number): void}>();
</script>