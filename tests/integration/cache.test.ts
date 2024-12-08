import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { afterAll, beforeAll, describe, expect, it, spyOn } from 'bun:test';

import { MetadataType } from '~/config/enum';
import { app } from '~/index';
import * as tidalUniversalLinkParser from '~/parsers/tidal-universal-link';
import { cacheStore } from '~/services/cache';

import deezerSongResponseMock from '../fixtures/deezer/songResponseMock.json';
import tidalSongResponseMock from '../fixtures/tidal/songResponseMock.json';
import youtubeSongResponseMock from '../fixtures/youtube/songResponseMock.json';
import { jsonRequest } from '../utils/request';
import {
  API_SEARCH_ENDPOINT,
  cachedSpotifyLink,
  getAppleMusicSearchLink,
  getDeezerSearchLink,
  getSoundCloudSearchLink,
  getTidalSearchLink,
  getYouTubeSearchLink,
  urlShortenerLink,
  urlShortenerResponseMock,
} from '../utils/shared';

const [
  spotifySongHeadResponseMock,
  appleMusicSongResponseMock,
  soundCloudSongResponseMock,
] = await Promise.all([
  Bun.file('tests/fixtures/spotify/songHeadResponseMock.html').text(),
  Bun.file('tests/fixtures/spotify/mobileHeadResponseMock.html').text(),
  Bun.file('tests/fixtures/apple-music/songResponseMock.html').text(),
  Bun.file('tests/fixtures/soundcloud/songResponseMock.html').text(),
]);

describe('Searches cache', () => {
  let mock: AxiosMockAdapter;
  const getUniversalMetadataFromTidalMock = spyOn(
    tidalUniversalLinkParser,
    'getUniversalMetadataFromTidal'
  );

  beforeAll(async () => {
    cacheStore.reset();

    mock = new AxiosMockAdapter(axios);

    const query = 'Do Not Disturb Drake';

    const tidalSearchLink = getTidalSearchLink(query, MetadataType.Song);
    const appleMusicSearchLink = getAppleMusicSearchLink(query);
    const youtubeSearchLink = getYouTubeSearchLink(query, MetadataType.Song);
    const deezerSearchLink = getDeezerSearchLink(query, 'track');
    const soundCloudSearchLink = getSoundCloudSearchLink(query);

    const request = jsonRequest(API_SEARCH_ENDPOINT, { link: cachedSpotifyLink });

    mock.onGet(cachedSpotifyLink).reply(200, spotifySongHeadResponseMock);

    mock.onGet(tidalSearchLink).reply(200, tidalSongResponseMock);
    mock.onGet(appleMusicSearchLink).reply(200, appleMusicSongResponseMock);
    mock.onGet(deezerSearchLink).reply(200, deezerSongResponseMock);
    mock.onGet(soundCloudSearchLink).reply(200, soundCloudSongResponseMock);
    mock.onGet(youtubeSearchLink).reply(200, youtubeSongResponseMock);

    getUniversalMetadataFromTidalMock.mockResolvedValue(undefined);
    mock.onPost(urlShortenerLink).reply(200, urlShortenerResponseMock);

    // fill cache
    await app.handle(request);

    expect(mock.history.get).toHaveLength(5);
  });

  afterAll(() => {
    mock.reset();
  });

  it('should return 200 from cache', async () => {
    const request = jsonRequest(API_SEARCH_ENDPOINT, { link: cachedSpotifyLink });
    const response = await app.handle(request).then(res => res.json());

    expect(response.source).toEqual(cachedSpotifyLink);
    expect(response.links).toBeArray();
  });
});
