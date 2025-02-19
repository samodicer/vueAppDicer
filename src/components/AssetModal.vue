<template>
  <div v-if="opened" class="fixed z-40 inset-0 flex items-center justify-center overflow-hidden">
    <div class="fixed inset-0">
      <div class="absolute inset-0 bg-gray-500 bg-opacity-30" />
    </div>
    <div class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[600px]">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 class="text-2xl font-semibold leading-6 mb-4">
          {{ variant === AssetModalVariant.CREATE ? 'Create asset' : 'Update asset' }}
        </h3>
        <TextInput
          class="mt-2"
          :value="assetName"
          :error-message="nameValidationError"
          placeholder="Asset name"
          label="Name"
          @update:value="assetName = $event; validateName($event)"
        />
        <TextInput
          class="mt-2"
          :value="assetDescription"
          placeholder="Asset desciption"
          label="Description"
          @update:value="assetDescription = $event"
        />
        <TextInput
          class="mt-2"
          :value="assetValue"
          :error-message="worthValidationError"
          placeholder="Asset worth in €"
          label="Worth"
          type="number"
          @update:value="assetValue = $event; validateWorth($event)"
        />
        <TextInput
          class="mt-2"
          :value="assetLocation"
          placeholder="Asset location"
          label="Location"
          @update:value="assetLocation = $event"
        />
      </div>
      <div class="flex gap-2 bg-gray-50 px-4 py-3 sm:px-6 flex-row-reverse">
        <Button
          text="Confirm"
          :disabled="!isValid"
          @click="variant === AssetModalVariant.CREATE ? createAsset() : updateAsset()"
        />
        <Button text="Cancel" @click="onClose()" />
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
import { NotificationVariant } from '../types/notifications';
import { useNotification } from '../composables/useNotification';

interface AssetModalProps {
  opened: boolean;
  id?: string;
  name?: string;
  description?: string;
  value?: number;
  location?: string;
}

interface AssetModalEmits {
  (e: 'modal:close'): void;
  (e: 'modal:confirm'): void;
  (e: 'error:message', message: string): void;
}

const props = defineProps<AssetModalProps>();

const emit = defineEmits<AssetModalEmits>();

const { setMessage } = useNotification();

/* Compute modal variant based on id */
const variant = computed(() => {
  if (props.id) {
    return AssetModalVariant.UPDATE;
  }
  return AssetModalVariant.CREATE;
});

/* Check if there are validation errors */
const isValid = computed(() => {
  return assetName.value && !nameValidationError.value && !worthValidationError.value;
});

const assetName = ref('');
const assetDescription = ref('');
const assetValue = ref('');
const assetLocation = ref('');

const nameValidationError = ref('');
const worthValidationError = ref('');

/* If id is changed, apply data to prefill inputs */
watch(() => props.id, (value) => {
  if (value !== undefined) {
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
  nameValidationError.value = '';
  worthValidationError.value = '';
}

function onClose() {
  resetStates();
  emit('modal:close');
}

/* Validation for name input */
function validateName(name: string) {
  if (!name) {
    nameValidationError.value = 'The name is required';
    return;
  }
  if (name.length > 100) {
    nameValidationError.value = 'The name must not contain more than 100 characters';
    return;
  }
  nameValidationError.value = '';
}

/* Validation for worth input */
function validateWorth(worth: string) {
  if (parseInt(worth) < 0) {
    worthValidationError.value = 'The worth must not be a negative number';
    return;
  }
  if (isNaN(Number(worth))) {
    worthValidationError.value = 'The worth must be a valid number';
    return;
  }
  worthValidationError.value = '';
}

/* Create asset api call */
function createAsset() {
  const data: CreateAssetData = {
    name: assetName.value,
    description: assetDescription.value,
    value: parseInt(assetValue.value),
    location: assetLocation.value,
  };
  apiCreateAsset(data).then(() => {
    emit('modal:confirm');
    setMessage({
      type: NotificationVariant.SUCCESS,
      text: 'Asset has been successfully created'
    });
    onClose();
  }).catch((err) => {
    emit('error:message', err.message);
  });
}

/* Update asset api call */
function updateAsset() {
  if (!props.id) {
    return;
  }
  const data: CreateAssetData = {
    name: assetName.value,
    description: assetDescription.value,
    value: parseInt(assetValue.value),
    location: assetLocation.value,
  };
  apiUpdateAsset(props.id, data).then(() => {
    emit('modal:confirm');
    setMessage({
      type: NotificationVariant.SUCCESS,
      text: 'Asset has been successfully updated'
    });
    onClose();
  }).catch((err) => {
    setMessage({
      type: NotificationVariant.ERROR,
      text: err.message
    });
  });
}
</script>
