<template>
  <div v-if="opened" class="relative z-10">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-30" />
    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="relative w-screen max-w-md">
            <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
              <div class="flex justify-between items-center px-4 sm:px-6">
                <span class="text-2xl font-semibold leading-6">Asset detail</span>
                <FontAwesomeIcon
                  class="cursor-pointer"
                  :icon="faXmark"
                  @click="emit('panel:close')"
                />
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
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
                        <span class="text-sm font-semibold">{{ asset.value || "Not provided" }}</span>
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

interface AssetDetailPanelProps {
  id: string;
  opened: boolean;
}

const props = defineProps<AssetDetailPanelProps>();

const emit = defineEmits<{(e: 'panel:close'): void }>();

const asset = ref<Asset | null>(null);

function onCreated() {
  apiGetAssetById(props.id).then((response) => {
    asset.value = response.data;
  });
}

watch(() => props.id, (value) => {
  apiGetAssetById(value).then((response) => {
    asset.value = response.data;
  });
});

onCreated();
</script>
