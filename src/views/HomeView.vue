<template>
  <div class="flex flex-col gap-4 p-6">
    <span class="font-bold text-2xl">Welcome</span>
    <RouterLink to="/assets">
      <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transform hover:scale-105 transition ease-out duration-200">
        <div class="flex items-center gap-2">
          <FontAwesomeIcon
            class="text-blue-600"
            size="2x"
            :icon="faMoneyBill1Wave"
          />
          <span class="mb-2 text-2xl font-bold tracking-tight text-gray-800">
            Assets
          </span>
        </div>
        <p class="font-normal text-gray-70">
          Here you can manage your asset list
        </p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMoneyBill1Wave  } from '@fortawesome/free-solid-svg-icons';
</script>
