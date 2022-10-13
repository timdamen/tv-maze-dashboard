import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { Show } from '@/api/models';
import { fetchSearchShows, fetchShows } from '@/api/fetchShows';

export const useShowsStore = defineStore('shows', () => {
  const shows = ref<Show[]>([]);
  const page = ref(1);
  const isLoading = ref(false);
  const error = ref<string>('');
  const hasMoreShows = ref(true);

  const loadMoreShows = async () => {
    isLoading.value = true;
    error.value = '';

    try {
      const result = await fetchShows(page.value);

      shows.value = shows.value.concat(result);
      page.value++;

      if (result.length === 0) {
        hasMoreShows.value = false;
      }
    } catch (e) {
      const err = e as Error;
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const showsByGenre = computed(() => {
    return (genre: string) => {
      return shows.value.filter((show) => {
        return show.genres.includes(genre);
      });
    };
  });

  const genres = computed(() => {
    return shows.value.reduce((allGenres, show) => {
      for (const genre of show.genres) {
        allGenres.add(genre);
      }
      return allGenres;
    }, new Set<string>());
  });

  return {
    shows,
    isLoading,
    error,
    hasMoreShows,
    loadMoreShows,
    showsByGenre,
    genres,
  };
});

export const useShowSearchStore = defineStore('showSearch', () => {
  const searchResults = ref<Show[]>([]);

  const isLoading = ref(false);
  const error = ref<string>('');

  const searchShows = async (searchTerm: string) => {
    isLoading.value = true;
    error.value = '';

    try {
      const result = await fetchSearchShows(searchTerm);

      searchResults.value = result;
    } catch (e) {
      const err = e as Error;
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { searchResults, isLoading, error, searchShows };
});
