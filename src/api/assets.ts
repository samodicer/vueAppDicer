import request from '../api.ts';
import { AxiosPromise } from 'axios';
import { CreateAssetData, Asset } from '../types/assets.ts';

export function apiGetAssets(): AxiosPromise<Asset[]> {
  return request({
    url: '/assets',
    method: 'get',
  });
}

export function apiGetAssetById(id: number): AxiosPromise<Asset> {
  return request({
    url: `/assets/${id}`,
    method: 'get',
  });
}

export function apiCreateAsset(data: CreateAssetData): AxiosPromise<Asset> {
  return request({
    url: '/assets',
    method: 'post',
    data,
  });
}

export function apiUpdateAsset(id: number, data: CreateAssetData): AxiosPromise<Asset> {
  return request({
    url: `/assets/${id}`,
    method: 'put',
    data,
  });
}

export function apiDeleteAsset(id: number): AxiosPromise<Asset> {
  return request({
    url: `/assets/${id}`,
    method: 'delete',
  });
}