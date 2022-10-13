import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useShowSearchStore, useShowsStore } from '../shows';
import { mockFetch, mockGet } from 'vi-fetch';
import 'vi-fetch/setup';
import { Routes } from '@/constants/routes.constant';

describe('Shows store', () => {
  beforeEach(() => {
    mockFetch.clearAll();
    setActivePinia(createPinia());
  });

  it('loadMoreShows() success and has more shows', async () => {
    mockGet(`${Routes.apiShows}?page=1`).willResolve([
      {
        id: 1,
        url: 'https://www.tvmaze.com/shows/1/under-the-dome',
        name: 'Under the Dome',
        type: 'Scripted',
        language: 'English',
        genres: ['Drama', 'Science-Fiction', 'Thriller'],
        status: 'Ended',
        runtime: 60,
        averageRuntime: 60,
        premiered: '2013-06-24',
        ended: '2015-09-10',
        officialSite: 'http://www.cbs.com/shows/under-the-dome/',
        schedule: {
          time: '22:00',
          days: ['Thursday'],
        },
        rating: {
          average: 6.5,
        },
        weight: 99,
        network: {
          id: 2,
          name: 'CBS',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
          officialSite: 'https://www.cbs.com/',
        },
        webChannel: null,
        dvdCountry: null,
        externals: {
          tvrage: 25988,
          thetvdb: 264492,
          imdb: 'tt1553656',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
        },
        summary:
          "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
        updated: 1631010933,
        _links: {
          self: {
            href: 'https://api.tvmaze.com/shows/1',
          },
          previousepisode: {
            href: 'https://api.tvmaze.com/episodes/185054',
          },
        },
      },
      {
        id: 2,
        url: 'https://www.tvmaze.com/shows/2/person-of-interest',
        name: 'Person of Interest',
        type: 'Scripted',
        language: 'English',
        genres: ['Action', 'Crime', 'Science-Fiction'],
        status: 'Ended',
        runtime: 60,
        averageRuntime: 60,
        premiered: '2011-09-22',
        ended: '2016-06-21',
        officialSite: 'http://www.cbs.com/shows/person_of_interest/',
        schedule: {
          time: '22:00',
          days: ['Tuesday'],
        },
        rating: {
          average: 8.8,
        },
        weight: 98,
        network: {
          id: 2,
          name: 'CBS',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
          officialSite: 'https://www.cbs.com/',
        },
        webChannel: null,
        dvdCountry: null,
        externals: {
          tvrage: 28376,
          thetvdb: 248742,
          imdb: 'tt1839578',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg',
        },
        summary:
          "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \"irrelevant\". They wouldn't act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You'll never find us. But victim or perpetrator, if your number is up, we'll find you.</p>",
        updated: 1631565378,
        _links: {
          self: {
            href: 'https://api.tvmaze.com/shows/2',
          },
          previousepisode: {
            href: 'https://api.tvmaze.com/episodes/659372',
          },
        },
      },
    ]);

    const showsStore = useShowsStore();
    expect(showsStore.shows).toStrictEqual([]);
    expect(showsStore.hasMoreShows).toBe(true);

    await showsStore.loadMoreShows();
    expect(showsStore.shows).toHaveLength(2);
    expect(showsStore.hasMoreShows).toBe(true);
  });

  it('loadMoreShows() success and does not have more shows', async () => {
    mockGet(`${Routes.apiShows}?page=1`).willResolve([]);

    const showsStore = useShowsStore();
    expect(showsStore.shows).toStrictEqual([]);
    expect(showsStore.hasMoreShows).toBe(true);

    await showsStore.loadMoreShows();
    expect(showsStore.shows).toHaveLength(0);
    expect(showsStore.hasMoreShows).toBe(false);
  });

  it('loadMoreShows() failure', async () => {
    mockGet(`${Routes.apiShows}?page=1`).willFail();

    const showsStore = useShowsStore();
    expect(showsStore.error).toBe('');

    await showsStore.loadMoreShows();
    expect(showsStore.error).toBe('Internal Server Error');
  });

  it('showsByGenre() filters genres and shows right shows sorted on genre', async () => {
    mockGet(`${Routes.apiShows}?page=1`).willResolve([
      {
        id: 1,
        url: 'https://www.tvmaze.com/shows/1/under-the-dome',
        name: 'Under the Dome',
        type: 'Scripted',
        language: 'English',
        genres: ['Drama', 'Science-Fiction', 'Thriller'],
        status: 'Ended',
        runtime: 60,
        averageRuntime: 60,
        premiered: '2013-06-24',
        ended: '2015-09-10',
        officialSite: 'http://www.cbs.com/shows/under-the-dome/',
        schedule: {
          time: '22:00',
          days: ['Thursday'],
        },
        rating: {
          average: 6.5,
        },
        weight: 99,
        network: {
          id: 2,
          name: 'CBS',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
          officialSite: 'https://www.cbs.com/',
        },
        webChannel: null,
        dvdCountry: null,
        externals: {
          tvrage: 25988,
          thetvdb: 264492,
          imdb: 'tt1553656',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
        },
        summary:
          "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
        updated: 1631010933,
        _links: {
          self: {
            href: 'https://api.tvmaze.com/shows/1',
          },
          previousepisode: {
            href: 'https://api.tvmaze.com/episodes/185054',
          },
        },
      },
      {
        id: 2,
        url: 'https://www.tvmaze.com/shows/2/person-of-interest',
        name: 'Person of Interest',
        type: 'Scripted',
        language: 'English',
        genres: ['Action', 'Crime', 'Science-Fiction'],
        status: 'Ended',
        runtime: 60,
        averageRuntime: 60,
        premiered: '2011-09-22',
        ended: '2016-06-21',
        officialSite: 'http://www.cbs.com/shows/person_of_interest/',
        schedule: {
          time: '22:00',
          days: ['Tuesday'],
        },
        rating: {
          average: 8.8,
        },
        weight: 98,
        network: {
          id: 2,
          name: 'CBS',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
          officialSite: 'https://www.cbs.com/',
        },
        webChannel: null,
        dvdCountry: null,
        externals: {
          tvrage: 28376,
          thetvdb: 248742,
          imdb: 'tt1839578',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg',
        },
        summary:
          "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \"irrelevant\". They wouldn't act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You'll never find us. But victim or perpetrator, if your number is up, we'll find you.</p>",
        updated: 1631565378,
        _links: {
          self: {
            href: 'https://api.tvmaze.com/shows/2',
          },
          previousepisode: {
            href: 'https://api.tvmaze.com/episodes/659372',
          },
        },
      },
    ]);

    const showsStore = useShowsStore();
    expect(showsStore.shows).toStrictEqual([]);
    expect(showsStore.hasMoreShows).toBe(true);

    await showsStore.loadMoreShows();
    expect(showsStore.shows).toHaveLength(2);
    expect(showsStore.genres).toEqual(
      new Set<string>([
        'Drama',
        'Crime',
        'Action',
        'Thriller',
        'Science-Fiction',
      ])
    );
    expect(showsStore.showsByGenre('Drama')).toHaveLength(1);
    expect(showsStore.showsByGenre('Crime')).toHaveLength(1);
  });
});

describe('ShowSearch store', () => {
  beforeEach(() => {
    mockFetch.clearAll();
    setActivePinia(createPinia());
  });

  it('searchShows() success', async () => {
    mockGet(`${Routes.apiSearchShows}?q=search`).willResolve([
      {
        id: 1,
        url: 'https://www.tvmaze.com/shows/1/under-the-dome',
        name: 'Under the Dome',
        type: 'Scripted',
        language: 'English',
        genres: ['Drama', 'Science-Fiction', 'Thriller'],
        status: 'Ended',
        runtime: 60,
        averageRuntime: 60,
        premiered: '2013-06-24',
        ended: '2015-09-10',
        officialSite: 'http://www.cbs.com/shows/under-the-dome/',
        schedule: {
          time: '22:00',
          days: ['Thursday'],
        },
        rating: {
          average: 6.5,
        },
        weight: 99,
        network: {
          id: 2,
          name: 'CBS',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
          officialSite: 'https://www.cbs.com/',
        },
        webChannel: null,
        dvdCountry: null,
        externals: {
          tvrage: 25988,
          thetvdb: 264492,
          imdb: 'tt1553656',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
        },
        summary:
          "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
        updated: 1631010933,
        _links: {
          self: {
            href: 'https://api.tvmaze.com/shows/1',
          },
          previousepisode: {
            href: 'https://api.tvmaze.com/episodes/185054',
          },
        },
      },
    ]);

    const showSearchStore = useShowSearchStore();
    expect(showSearchStore.searchResults).toStrictEqual([]);

    await showSearchStore.searchShows('search');
    expect(showSearchStore.searchResults).toHaveLength(1);
  });

  it('searchShows() failure', async () => {
    mockGet(`${Routes.apiSearchShows}?q=search`).willFail();

    const showSearchStore = useShowSearchStore();
    expect(showSearchStore.error).toBe('');

    await showSearchStore.searchShows('search');
    expect(showSearchStore.error).toBe('Internal Server Error');
  });
});
