export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date: string;
  popularity: number;
  overview: string;
}

export interface SpecificMovieData {
  title: string;
  poster_path?: string;
  overview: string;
  vote_average: number;
  release_date: string;
  popularity: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface FormData {
  email: string;
  password: string;
  username: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  username?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}