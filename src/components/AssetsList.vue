<template>
  <table v-if="assets.length" class="table-fixed">
    <thead class="border-b border-neutral-200">
      <tr class="text-left bg-gray-100">
        <th class="px-3 py-4 rounded-tl-lg">#</th>
        <th class="px-3 py-4">Name</th>
        <th class="px-3 py-4 rounded-tr-lg text-right">Actions</th>
      </tr>
    </thead>
    <tbody class="text-left">
      <tr
        v-for="asset in assets"
        :key="asset.id"
        class="border-b border-neutral-200 hover:bg-gray-50 cursor-pointer"
        @click="emit('asset:detail', asset.id)"
      >
        <td class="w-20 max-w-20 px-3 py-4 text-gray-800">{{ asset.id }}</td>
        <td class="px-3 py-4 text-gray-800">{{ asset.name }}</td>
        <td class="flex items-center justify-end gap-2 py-4 px-3">
          <FontAwesomeIcon
            class="text-blue-600 hover:text-blue-700 cursor-pointer"
            :icon="faPenToSquare"
            @click.stop="emit('asset:update', asset)"
          />
          <FontAwesomeIcon
            class="text-blue-600 hover:text-blue-700 cursor-pointer"
            :icon="faXmark"
            @click.stop="emit('asset:delete', asset.id)"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else-if="!loading" class="flex flex-col items-center gap-2">
    <FontAwesomeIcon
      class="text-blue-600"
      :icon="faBan"
      size="2x"
    />
    <span class="font-bold text-lg"> No assets found </span>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Asset } from '../types/assets';

interface AssetsListProps {
  assets: Asset[];
  loading: boolean;
}

interface AssetsListEmits {
  (e: 'asset:delete', id: string): void;
  (e: 'asset:update', asset: Asset): void;
  (e: 'asset:detail', id: string): void;
}

defineProps<AssetsListProps>();

const emit = defineEmits<AssetsListEmits>();
</script>
