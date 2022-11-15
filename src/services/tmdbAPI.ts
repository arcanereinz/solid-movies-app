/**
 * API url
 */
const TMDB_API_URL = 'https://api.themoviedb.org/3';

const TMDB_API_PARAMS = {
  api_key: import.meta.env.VITE_TMDB_API_KEY,
  // language: process.env.API_LANG
};

/**
 * Different types of lists
 */
const LISTS = {
  MOVIE: [
    { TITLE: 'Trending Movies', QUERY: 'trending' },
    { TITLE: 'Popular Movies', QUERY: 'popular' },
    { TITLE: 'Top Rated Movies', QUERY: 'top_rated' },
    { TITLE: 'Upcoming Movies', QUERY: 'upcoming' },
    { TITLE: 'Now Playing Movies', QUERY: 'now_playing' },
  ],
  TV: [
    { TITLE: 'Trending TV Shows', QUERY: 'trending' },
    { TITLE: 'Popular TV Shows', QUERY: 'popular' },
    { TITLE: 'Top Rated TV Shows', QUERY: 'top_rated' },
    { TITLE: 'Currently Airing TV Shows', QUERY: 'on_the_air' },
    { TITLE: 'TV Shows Airing Today', QUERY: 'airing_today' },
  ],
};

async function fetchTMD<T = any>(path, params = {}): Promise<T> {
  const url = new URL(TMDB_API_URL + '/' + path);
  url.searchParams.set('api_key', TMDB_API_PARAMS.api_key);
  Object.entries(params).forEach(([key, value]: [string, string]) => {
    if (value !== void 0) {
      url.searchParams.set(key, value);
    }
  });
  const response = await fetch(url);
  if (!response.ok) {
    console.error(path);
    throw new Error(response.statusText);
  }
  return await response.json();
}

/**
 * Get list item
 */

function getListItem(type, query) {
  if (type === 'movie') {
    return LISTS.MOVIE.find((list) => list.QUERY === query);
  } else if (type === 'tv') {
    return LISTS.TV.find((list) => list.QUERY === query);
  }
}

/**
 * Get movies (listing)
 */

function getMovies(query, page = 1) {
  return fetchTMD(`movie/${query}`, { page });
}

export interface IFeatured {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Record<string, string | number>;
  budget: number;
  genres: Record<string, string | number>[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Record<string, string | number>[];
  production_countries: Record<string, string | number>[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Record<string, string | number>;
  status: string;
  tagline: string;
  title?: string;
  name?: string;
  number_of_seasons?: number;
  first_air_date?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: Record<string, string | number>[];
  };
  external_ids: Record<string, string | number>;
  images: {
    backdrops: Record<string, string | number>[];
    logos: Record<string, string | number>[];
    posters: Record<string, string | number>[];
  };
  credits: {
    cast: Record<string, string | number>[];
    crew: Record<string, string | number>[];
  };
  release_dates: {
    results: Record<string, any>[];
  };
}

/**
 * Get movie (single)
 */

function getMovie(id) {
  return fetchTMD<IFeatured>(`movie/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,release_dates',
    include_image_language: 'en',
  });
}

/**
 * Get movie recommended (single)
 */

function getMovieRecommended(id, page = 1) {
  return fetchTMD<IFeatured>(`movie/${id}/recommendations`, { page });
}

/**
 * Get TV shows (listing)
 */

function getTvShows(query, page = 1) {
  return fetchTMD<ITvShows>(`tv/${query}`, { page });
}

/**
 * Get TV show (single)
 */

function getTvShow(id) {
  return fetchTMD<IFeatured>(`tv/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,content_ratings',
    include_image_language: 'en',
  });
}

/**
 * Get TV show recommended (single)
 */

function getTvShowRecommended<IFeatured>(id, page = 1) {
  return fetchTMD(`tv/${id}/recommendations`, { page });
}

/**
 * Get TV show episodes from season (single)
 */

function getTvShowEpisodes(id, season) {
  return fetchTMD(`tv/${id}/season/${season}`);
}

export interface ITrendingMovies {
  page: number;
  // movie
  results: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
}

export interface ITrendingTvShows {
  page: number;
  // tv
  results: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
  }[];
}

interface ITvShows {
  page: number;
  results: {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}

export type TMediaItems =
  | ITrendingMovies['results'][0]
  | ITrendingTvShows['results'][0]
  | ITvShows['results'][0]; // & { name?: string; title?: string };

/**
 * Get trending
 */

function getTrending<T = ITrendingMovies | ITrendingTvShows>(media, page = 1) {
  return fetchTMD<T>(`trending/${media}/week`, {
    page,
  });
}

/**
 * Discover media by genre
 */

function getMediaByGenre(media, genre, page = 1) {
  return fetchTMD(`discover/${media}`, {
    with_genres: genre,
    page,
  });
}

/**
 * Get credits
 */

function getCredits(id, type) {
  return fetchTMD(`person/${id}/${type}`);
}

/**
 * Get genre list
 */

function getGenreList(media) {
  return fetchTMD(`genre/${media}/list`, { language: undefined }).then(
    (res) => res.genres,
  );
}

/**
 * Get person (single)
 */

function getPerson(id) {
  return fetchTMD(`person/${id}`, {
    append_to_response: 'images,combined_credits,external_ids',
    include_image_language: 'en',
  });
}

/**
 * Search (searches movies, tv and people)
 */

function search(query, page = 1) {
  return fetchTMD<{
    page: 1;
    results: {
      adult: boolean;
      backdrop_path: string;
      genre_ids: [number, number, number];
      id: number;
      media_type: string;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
  }>('search/multi', { query, page });
}

/**
 * Get YouTube video info
 */

function getYouTubeVideo(id) {
  return fetch(
    'https://www.googleapis.com/youtube/v3/videos?' +
      new URLSearchParams({
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        id: id,
        part: 'contentDetails',
      }),
  );
}

export {
  getListItem,
  getMovies,
  getMovie,
  getMovieRecommended,
  getTvShows,
  getTvShow,
  getTvShowRecommended,
  getTvShowEpisodes,
  getTrending,
  getMediaByGenre,
  getCredits,
  getGenreList,
  getPerson,
  search,
  getYouTubeVideo,
};
