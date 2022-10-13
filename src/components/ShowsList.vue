<script setup lang="ts">
import { ref, computed } from 'vue';

import ShowPoster from '@/components/ShowPoster.vue';
import type { Show } from '@/api/models';
import { Routes } from '@/constants/routes.constant';
import router from '@/router';

const props = withDefaults(
  defineProps<{
    title: string;

    shows: Show[];

    canLoadMore?: boolean;
    isLoading?: boolean;
  }>(),
  {
    canLoadMore: false,
    isLoading: false,
  }
);

const itemsPerPage = ref<number>(3);
const currentItem = ref<number>(0);

const totalShows = computed(() => props.shows.length);
const paginatedShows = computed(() => {
  return props.shows.slice(
    currentItem.value,
    currentItem.value + itemsPerPage.value
  );
});

const setOffset = (offset: number): void => {
  if (offset < 0) {
    return;
  }
  if (offset > totalShows.value) {
    return;
  }

  currentItem.value = offset;
};

const changeRoute = (route: string): void => {
  router.push(route);
};

const canLoadMore = (): boolean => {
  return (
    props.canLoadMore &&
    currentItem.value + itemsPerPage.value * 2 > totalShows.value
  );
};
</script>

<template>
  <section class="shows">
    <h1 class="text-h4">{{ title }}</h1>

    <table class="shows__table">
      <tr class="shows__table-row">
        <th class="shows__table-header">Poster</th>
        <th class="shows__table-header">Title</th>
      </tr>
      <tr
        class="shows__table-row"
        v-for="show in paginatedShows"
        :key="show.id"
        @click="changeRoute(`${Routes.show}/${show.id}`)"
      >
        <td class="shows__table-col">
          <ShowPoster :src="show.image?.medium" :name="show.name" />
        </td>
        <td class="shows__table-col">
          {{ show.name }}
        </td>
      </tr>
    </table>
    <div class="shows__pagination">
      <div @click.stop="setOffset(currentItem - itemsPerPage)">
        <q-icon
          class="shows__pagination-icon"
          data-test="prev-page"
          name="arrow_back"
          size="md"
        />
      </div>
      <div>
        <q-icon
          v-if="!isLoading"
          data-test="next-page"
          class="shows__pagination-icon"
          name="arrow_forward"
          size="md"
          @click.stop="
            () => {
              setOffset(currentItem + itemsPerPage);

              if (canLoadMore()) {
                $emit('load-more');
              }
            }
          "
        />
        <q-circular-progress indeterminate v-else />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.shows {
  &__table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;

    &-col,
    &-header {
      border: 1px solid #ddd;
      padding: 8px;
    }

    &-row {
      cursor: pointer;

      &:nth-child(even) {
        background-color: #f2f2f2;
      }

      &:hover {
        background-color: #ddd;
      }
    }

    &-header {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
    }
  }

  &__pagination {
    display: flex;
    justify-content: end;
    margin-top: 10px;

    &-icon {
      cursor: pointer;
    }
  }
}
</style>
