export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  imdb_id?: string;
  origin_country?: string[];
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  videos?: {
    results: Video[];
  };
}

export interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type SortByType =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'vote_count.desc'
  | 'vote_count.asc';

export interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
}
