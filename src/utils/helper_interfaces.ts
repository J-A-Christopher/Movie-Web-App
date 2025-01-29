export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date: string;
  popularity: string;
  overview: string;
}

export interface SpecificMovieData {
  title: string;
  poster_path?: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}
