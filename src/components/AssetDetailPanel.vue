<template>
  <div class="flex">
    <div class="fixed top-0 right-0 z-20 sm:w-[400px] w-full h-full shadow-xl bg-white px-6 py-6">
      <div class="flex justify-between items-center mb-8">
        <span class="text-2xl font-semibold leading-6">Asset detail</span>
        <FontAwesomeIcon
          class="cursor-pointer"
          :icon="faXmark"
          @click="emit('panel:close')"
        />
      </div>
      <div v-if="asset">
        <div class="flex items-center gap-2 font-semibold border-b mb-4 border-neutral-200 text-gray-800">
          <span class="text-xs">#{{ asset.id }}</span>
          <span class="text-xl">{{ asset.name }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <FontAwesomeIcon
              size="lg"
              class="text-blue-600 mt-1"
              :icon="faBook"
            />
            <div class="flex flex-col gap-1 text-gray-800">
              <span>Description</span>
              <span class="text-sm font-semibold">{{ asset.description || "Not provided" }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <FontAwesomeIcon
              size="lg"
              class="text-blue-600 mt-1"
              :icon="faDollarSign"
            />
            <div class="flex flex-col gap-1 text-gray-800">
              <span>Worth</span>
              <span class="text-sm font-semibold">{{ `${asset.value}€` || "Not provided" }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <FontAwesomeIcon
              size="lg"
              class="text-blue-600 mt-1"
              :icon="faLocationDot"
            />
            <div class="flex flex-col gap-1 text-gray-800">
              <span>Location</span>
              <span class="text-sm font-semibold">{{ asset.location || "Not provided" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { apiGetAssetById } from '../api/assets';
import { Asset } from '../types/assets';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDollarSign, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { NotificationVariant } from '../types/notifications';
import { useNotification } from '../composables/useNotification';

interface AssetDetailPanelProps {
  id: string;
  opened: boolean;
}

const props = defineProps<AssetDetailPanelProps>();

const emit = defineEmits<{(e: 'panel:close'): void }>();

const { setMessage } = useNotification();

const asset = ref<Asset | null>(null);

/* Get asset by id api call */
function getAssetById(id: string) { 
  apiGetAssetById(id).then((response) => {
    asset.value = response.data;
  }).catch((err) => {
    setMessage({
      type: NotificationVariant.ERROR,
      text: err.message,
    });
  });
}

/* If id is changed, refetch data */
watch(() => props.id, (value) => {
  getAssetById(value);
});

/* Fetch asset on created */
function onCreated() {
  getAssetById(props.id);
}

onCreated();
</script>
