<template>
  <div>
    <div class="flex flex-1 flex-col gap-4 p-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <RouterLink to="/" class="font-bold">
            <FontAwesomeIcon 
              :icon="faChevronLeft" 
            />
          </RouterLink>
          <span class="font-bold text-2xl">ASSETS</span>
        </div>
        <span
          class="font-bold text-2xl cursor-pointer"
          @click="openCreateModal()"
        >
          +
        </span>
      </div>
      <AssetsList 
        :assets="assets" 
        @asset:delete="deleteAsset($event)"
        @asset:update="openUpdateModal($event)" 
        @asset:detail="openDetailPanel($event)"
      />
    </div>
    <AssetModal 
      :opened="modalOpened" 
      v-bind="updateData"
      @modal:close="modalOpened = false"
      @asset:created="getAssets()"
    />
    <router-view :opened="detailPanelOpened" @panel:close="hideDetailPanel()"/>
  </div>
</template>

<script setup lang="ts">
import AssetsList from '../components/AssetsList.vue';
import AssetModal from '../components/AssetModal.vue';
import { ref } from 'vue';
import { Asset } from '../types/assets.ts';
import { apiDeleteAsset, apiGetAssets } from '../api/assets.ts';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const router = useRouter();

const assets = ref<Asset[]>([]);

const updateData = ref<Asset | undefined>(undefined);

const detailPanelOpened = ref(false);
const modalOpened = ref(false);

function openCreateModal() { 
  updateData.value = undefined;
  modalOpened.value = true;
}

function openUpdateModal(asset: Asset) { 
  updateData.value = asset;
  modalOpened.value = true;
}

function openDetailPanel(id: number) {
  router.push({ name: 'asset', params: { id } });
  detailPanelOpened.value = true;
}

function hideDetailPanel() {
  router.push({ name: 'assets' });
  detailPanelOpened.value = false;
}

function deleteAsset(id: number) {
  apiDeleteAsset(id).then((response) => {
    console.log(response);
    getAssets();
  }).catch((err) => {
    console.log(err);
  });
}

function getAssets() {
  apiGetAssets().then((response) => {
    console.log(response);
    assets.value = response.data;
  }).catch((err) => {
    console.log(err);
  });
}

function onCreated() {
  getAssets();
}

onCreated();
</script>
