<template>
  <div>
    <div class="flex flex-1 flex-col gap-4 p-6">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div class="flex items-center gap-4">
          <RouterLink to="/" class="font-bold">
            <FontAwesomeIcon
              :icon="faChevronLeft"
            />
          </RouterLink>
          <span class="font-bold text-2xl">ASSETS</span>
        </div>
        <div class="flex items-center gap-2  ml-auto">
          <TextInput
            :value="searchString"
            placeholder="Filter by name"
            @update:value="searchString = $event; filterAssets();"
          />
          <div
            class="font-bold text-2xl cursor-pointer"
            @click="openCreateModal()"
          >
            <FontAwesomeIcon
              class="text-blue-600 hover:text-blue-700 transform hover:scale-125 transition ease-out duration-300"
              :icon="faCirclePlus"
            />
          </div>
        </div>
      </div>
      <AssetsList
        :assets="filteredAssets"
        :loading="assetsLoading"
        @asset:delete="deleteAsset($event)"
        @asset:update="openUpdateModal($event)"
        @asset:detail="openDetailPanel($event)"
      />
    </div>
    <AssetModal
      :opened="modalOpened"
      v-bind="updateData"
      @modal:close="modalOpened = false; updateData = undefined"
      @asset:created="
        createNotificationMessage(NotificationVariant.SUCCESS, 'Asset has been successfully created');
        getAssets()
      "
      @asset:updated="
        createNotificationMessage(NotificationVariant.SUCCESS, 'Asset has been successfully updated');
        getAssets()
      "
      @error:message="createNotificationMessage(NotificationVariant.ERROR, $event);"
    />
    <Notification
      :message="notificationMessage"
      @remove:message="notificationMessage = undefined"
    />
    <router-view :opened="detailPanelOpened" @panel:close="hideDetailPanel()" />
  </div>
</template>

<script setup lang="ts">
import AssetsList from '../components/AssetsList.vue';
import AssetModal from '../components/AssetModal.vue';
import Notification from '../components/Notification.vue';
import TextInput from '../components/TextInput.vue';
import { ref } from 'vue';
import { Asset } from '../types/assets.ts';
import { NotificationMessage, NotificationVariant } from '../types/notifications.ts';
import { apiDeleteAsset, apiGetAssets } from '../api/assets.ts';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const router = useRouter();

const assets = ref<Asset[]>([]);
const filteredAssets = ref<Asset[]>([]);
const assetsLoading = ref(true);

const updateData = ref<Asset | undefined>(undefined);
const notificationMessage = ref<NotificationMessage | undefined>(undefined);

const searchString = ref('');

const detailPanelOpened = ref(false);
const modalOpened = ref(false);

function createNotificationMessage(type: NotificationVariant, text:string) {
  notificationMessage.value = {
    type,
    text,
  };
}

function openCreateModal() {
  updateData.value = undefined;
  modalOpened.value = true;
}

function openUpdateModal(asset: Asset) {
  updateData.value = asset;
  modalOpened.value = true;
}

function openDetailPanel(id: string) {
  router.push({ name: 'asset', params: { id }});
  detailPanelOpened.value = true;
}

function hideDetailPanel() {
  router.push({ name: 'assets' });
  detailPanelOpened.value = false;
}

function filterAssets() {
  filteredAssets.value = assets.value.filter(item => item.name.toLowerCase().indexOf(searchString.value.toLowerCase()) > -1);
}

function deleteAsset(id: string) {
  apiDeleteAsset(id).then(() => {
    getAssets();
    createNotificationMessage(
      NotificationVariant.SUCCESS,
      'Asset has been successfully deleted'
    );
  }).catch((err) => {
    createNotificationMessage(
      NotificationVariant.ERROR,
      err.message
    );
  });
}

function getAssets() {
  assetsLoading.value = true;
  apiGetAssets().then((response) => {
    assets.value = response.data;
    filteredAssets.value = response.data;
  }).catch((err) => {
    createNotificationMessage(
      NotificationVariant.ERROR,
      err.message
    );
  }).finally(() => {
    assetsLoading.value = false;
  });
}

function onCreated() {
  getAssets();
}

onCreated();
</script>
