<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useShowsStore, useShowSearchStore } from '@/store/shows';
import ShowsList from '../components/ShowsList.vue';
import ShowsSearchResults from '../components/ShowsSearchResults.vue';

const search = ref<string>('');
const showSearchStore = useShowSearchStore();
const showsStore = useShowsStore();

onMounted(async () => {
  if (!showsStore.shows.length) {
    showsStore.loadMoreShows();
  }
});
</script>

<template>
  <section>
    <q-input
      type="text"
      v-model="search"
      placeholder="Search for a show"
      debounce="250"
      @update:model-value="(search) => showSearchStore.searchShows(search as string)"
    >
      <template v-slot:append>
        <q-icon
          v-if="search"
          name="clear"
          @click="search = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <ShowsSearchResults
      v-if="search.length > 0"
      :shows="showSearchStore.searchResults"
      :is-loading="showSearchStore.isLoading"
    />

    <ShowsList
      v-else
      v-for="genre in showsStore.genres"
      :key="genre"
      :title="genre"
      :shows="showsStore.showsByGenre(genre)"
      :can-load-more="showsStore.hasMoreShows"
      :is-loading="showsStore.isLoading"
      @load-more="showsStore.loadMoreShows"
    />
  </section>
</template>
