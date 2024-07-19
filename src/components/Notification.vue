<template>
  <Transition>
    <div
      v-if="message"
      class="absolute bottom-0 right-0 m-6 max-w-80 border-l-4 p-4 rounded-lg z-50"
      :class="{
        'border-green-500 text-green-700 bg-green-100': message.type === NotificationVariant.SUCCESS,
        'border-red-500 text-red-700 bg-red-100': message.type === NotificationVariant.ERROR
      }"
    >
      <p class="text-lg font-semibold">{{ message.type === NotificationVariant.SUCCESS ? 'Success' : 'Error' }}</p>
      <p>{{ message.text }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useNotification } from '../composables/useNotification';
import { NotificationVariant } from '../types/notifications';

const { message } = useNotification();
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
