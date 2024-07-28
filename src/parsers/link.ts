import { ParseError } from 'elysia';

import { SPOTIFY_LINK_REGEX, YOUTUBE_LINK_REGEX } from '~/config/constants';
import { Adapter } from '~/config/enum';
import { getSourceFromId } from '~/utils/encoding';

import { logger } from '~/utils/logger';

export type SearchParser = {
  id: string;
  type: string;
  source: string;
};

export const getSearchParser = (link?: string, searchId?: string) => {
  const decodedSource = searchId ? getSourceFromId(searchId) : undefined;

  let source = link;

  if (searchId && decodedSource) {
    logger.info(
      `[${getSearchParser.name}] (${searchId}) source decoded: ${decodedSource}`
    );
    source = decodedSource;
  }

  let id, type;

  const spotifyId = source!.match(SPOTIFY_LINK_REGEX)?.[3];
  if (spotifyId) {
    id = spotifyId;
    type = Adapter.Spotify;
  }

  const youtubeId = source!.match(YOUTUBE_LINK_REGEX)?.[1];
  if (youtubeId) {
    id = youtubeId;
    type = Adapter.YouTube;
  }

  if (!id || !type) {
    throw new ParseError('Service id could not be extracted from source.');
  }

  const searchParser = {
    id,
    type,
    source,
  } as SearchParser;

  return searchParser;
};
