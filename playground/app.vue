<template>
  <div>basic</div>
</template>
<script lang="ts" setup>
import { useFetch } from 'nuxt/app';
import { onMounted } from './.nuxt/imports';

onMounted(async () => {
  const { data: count } = await useFetch('/gateway/api/count1')
  // const { data: aaa } = await useFetch('/cdn/api/count2')
})
</script>