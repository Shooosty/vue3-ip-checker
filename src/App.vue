<template>
  <LayoutHeader />

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from '@/components/Layout/LayoutHeader.vue'
</script>

<style lang="scss">
@import "@/assets/styles/app.scss";
</style>
