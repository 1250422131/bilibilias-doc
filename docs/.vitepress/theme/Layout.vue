<template>
  <div>
    <AsBanner />
    <Layout />
  </div>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import AsBanner from "./components/AsBanner.vue";
const { Layout } = DefaultTheme;
</script>
