<script setup lang="ts">
defineProps<{
  src?: string;
  name: string;
}>();
</script>

<template>
  <figure class="poster">
    <img v-if="!!src" class="poster__img" :src="src" :alt="name" />
    <figcaption v-else>{{ name }}</figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.poster {
  &__img {
    max-width: 100px;
  }
}
</style>
