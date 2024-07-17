<template>
<div v-if="opened" class="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
          <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ variant === AssetModalVariant.CREATE ? 'Create asset' : 'Update asset' }}
              </h3>
              <TextInput 
                :value="assetName" 
                placeholder="Asset name" 
                label="Name" 
                @update:value="assetName = $event"
              />
              <TextInput 
                :value="assetDescription" 
                placeholder="Asset desciption" 
                label="Description" 
                @update:value="assetDescription = $event"
              />
              <TextInput 
                :value="assetValue" 
                placeholder="Asset value" 
                label="Value"
                type="number"
                @update:value="assetValue = $event"
              />
              <TextInput 
                :value="assetLocation" 
                placeholder="Asset location" 
                label="Location" 
                @update:value="assetLocation = $event"
              />
            </div>
            <div class="flex gap-2 bg-gray-50 px-4 py-3 sm:px-6 flex-row-reverse">
              <Button text="Confirm" @click="variant === AssetModalVariant.CREATE ? createAsset() : updateAsset()"/>
              <Button text="Cancel" @click="onClose()"/>
            </div>
          </div>
        </div>
</template>

<script setup lang="ts">
import TextInput from './TextInput.vue';
import Button from './Button.vue';
import { computed, ref, watch } from 'vue';
import { apiCreateAsset, apiUpdateAsset } from '../api/assets';
import { AssetModalVariant, CreateAssetData } from '../types/assets';

interface AssetModalProps {
  opened: boolean;
  id?: number;
  name?: string;
  description?: string;
  value?: number;
  location?: string;
}

const props = defineProps<AssetModalProps>();

const emit = defineEmits<{ (e: 'modal:close'): void, (e: 'asset:created'): void }>();

const variant = computed(() => { 
  if (props.id) { 
    return AssetModalVariant.UPDATE;
  }
  return AssetModalVariant.CREATE;
})

const assetName = ref('');
const assetDescription = ref('');
const assetValue = ref('');
const assetLocation = ref('');

watch(() => props.id, (value) => { 
  if (value) { 
    assetName.value = props.name || '';
    assetDescription.value = props.description || '';
    assetValue.value = `${props.value || ''}`;
    assetLocation.value = props.location || '';
  }
});

function resetStates() {
  assetName.value = '';
  assetDescription.value = '';
  assetValue.value = '';
  assetLocation.value = '';
}

function onClose() {
  resetStates();
  emit('modal:close');
}

function createAsset() {
  const data: CreateAssetData = {
    name: assetName.value,
    description: assetDescription.value,
    value: parseInt(assetValue.value),
    location: assetLocation.value,
  }
  apiCreateAsset(data).then(() => {
    emit('asset:created');
    onClose();
  }).catch((err) => {
    console.log(err);
  });
}

function updateAsset() { 
  if (!props.id) { 
    return;
  }
  const data: CreateAssetData = {
    name: assetName.value,
    description: assetDescription.value,
    value: parseInt(assetValue.value),
    location: assetLocation.value,
  }
  apiUpdateAsset(props.id, data).then(() => {
    emit('asset:created');
    onClose();
  }).catch((err) => {
    console.log(err);
  });
}
</script>