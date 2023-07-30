<template>
  <TheHeader />
  <main>
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<script setup>
import TheHeader from "./components/TheHeader.vue";
</script>

<style lang="scss" scoped></style>
