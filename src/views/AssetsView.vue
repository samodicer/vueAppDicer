<template>
  <div>
    <div class="flex justify-between items-center p-2">
      <div class="flex gap-2">
      <RouterLink to="/" class="font-bold"><</RouterLink>
      <span class="text-lg font-bold">ASSETS</span>
    </div>
      <div calss="flex items-center">
        <input v-model="newAssetName" type="text" placeholder="New asset name" class="bg-orange-100"/>
        <span class="font-bold text-2xl cursor-pointer" @click="createAsset({name: newAssetName})">+</span>
      </div>
    </div>
    <AssetsList 
      :assets="assets"
      @asset:delete="deleteAsset($event)"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import AssetsList from '../components/AssetsList.vue';
import { API } from "../config.ts";
import { ref } from 'vue';

export interface CustomAsset { 
  id: number;
  name: string;
}

export interface CreateAssetData { 
  name: string;
}

const assets = ref<CustomAsset[]>([]);
const newAssetName = ref('');

function createAsset(asset: CreateAssetData) { 
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${API}/assets`,
      data: asset,
    })
      .then((response) => {
        console.log(response);
        getAssets();
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

function deleteAsset(id: number) { 
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: `${API}/assets/${id}`,
    })
      .then((response) => {
        console.log(response);
        getAssets();
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

function getAssets() { 
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API}/assets/`,
    })
      .then((response) => {
        console.log(response);
        assets.value = response.data;
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

function onCreated() { 
  getAssets();
}

onCreated();
</script>