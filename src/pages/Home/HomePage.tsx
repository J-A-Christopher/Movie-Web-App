import { useState, useEffect } from "react";
import cinema from "../../assets/cinema.jpg";
import { Movie, SpecificMovieData } from "@/utils/helper_interfaces";
import { useGetMoviesListQuery } from "@/api/movi_api";
import MovieGridShimmer from "@/components/common/movie_grid_shimmer";
import { errorHandler } from "@/error/error";
import MovieDialog from "./MovieDialog";
import { useLazyGetSpecificMovieDataQuery } from "@/api/movi_api";
import { useLazyGetMovieSearchInputQuery } from "@/api/movi_api";
import pholder from "../../assets/pholder.jpg";
import Pagination from "./Pagination";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/state/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "@/state/slices/errorSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollOpacity, setScrollOpacity] = useState<number>(1);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>("");
  const [movieData, setMovieData] = useState<Movie[]>();
  const [searchMovieData, setSearchMovieData] = useState<Movie[]>();
  const [individuLMData, setIndividualMovieData] =
    useState<SpecificMovieData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState<number>(1);
  const [searchTotalPages, setTotalSearchPages] = useState<number>(1);
  const [isMovieDialogOpen, setMovieDialogOpen] = useState<boolean>();
  const [searchInput, setSearchInput] = useState<string | undefined>();
  const { isError, error, data, isLoading } =
    useGetMoviesListQuery(currentPage);
  const [
    getSpecificMovieData,
    {
      data: specificMovieData,
      error: specificMovieDataError,
      isError: isSpecificMDataError,
    },
  ] = useLazyGetSpecificMovieDataQuery();
  const [
    getSearchData,
    {
      data: searchData,
      error: searchError,
      isError: isSearchError,
      isLoading: isSearchLoading,
    },
  ] = useLazyGetMovieSearchInputQuery();

  useEffect(() => {
    if (isSearchError) {
      errorHandler(searchError);
    }
  }, [isSearchError, searchError]);

  useEffect(() => {
    if (data) {
      setMovieData(data?.results);
      setTotalPages(data?.total_pages);
    }
  }, [data]);

  useEffect(() => {
    if (specificMovieData) {
      setIndividualMovieData(specificMovieData);
    }
  }, [specificMovieData]);

  useEffect(() => {
    if (searchData) {
      setSearchMovieData(searchData?.results);
      setTotalSearchPages(searchData?.total_pages);
    }
  }, [searchData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - scrollPosition / (windowHeight * 0.5));
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const specificMovieDataHandler = async (movieId: number) => {
    setMovieDialogOpen(true);
    await getSpecificMovieData(movieId);
  };

  const searchHandler = async () => {
    if (!searchInput) return;
    setSearchCurrentPage(1);
    setLastSearchTerm(searchInput);
    await getSearchData({ movie: searchInput, page: 1 });
    setSearchInput("");
  };

  const handleSearchPageChange = async (newPage: number) => {
    setSearchCurrentPage(newPage);
    await getSearchData({ movie: lastSearchTerm, page: newPage });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (searchData) {
      setSearchMovieData(searchData.results);
      setTotalSearchPages(searchData.total_pages);
    }
  }, [searchData]);

  useEffect(() => {
    if (isError) {
      errorHandler(error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSpecificMDataError) {
      errorHandler(specificMovieDataError);
    }
  }, [specificMovieDataError, isSpecificMDataError]);

  if (isLoading) {
    return <MovieGridShimmer />;
  }

  if (isSearchLoading) {
    return <MovieGridShimmer />;
  }
  const handleLogout = async() => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white relative">
        <Button
          className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all z-50"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout
        </Button>
        <div
          className="relative h-screen flex items-center justify-center"
          style={{
            backgroundImage: `url(${cinema})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: scrollOpacity,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Great Recommendations that suit your needs !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search keyword"
                className="w-full sm:w-2/3 px-4 py-3 text-black rounded"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                disabled={searchInput === undefined}
                className={`w-full sm:w-auto px-8 py-3 rounded font-semibold transition-colors ${
                  searchInput === undefined
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={searchHandler}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Popular Titles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchMovieData === undefined ? (
              movieData?.map((movie: Movie) => (
                <div
                  key={movie.id}
                  className="relative group cursor-pointer transition-transform duration-200 hover:scale-105"
                  onClick={() => specificMovieDataHandler(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                    <div className="absolute bottom-0 p-4">
                      <h3 className="text-sm font-semibold">{movie.title}</h3>
                      <p className="text-xs text-gray-300">
                        {movie.release_date}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : searchMovieData.length === 0 ? (
              <div className="flex justify-center items-center">
                <h1 className="text-3xl font-semibold">
                  No movie data available
                </h1>
              </div>
            ) : (
              <>
                {searchMovieData?.map((movie: Movie) => (
                  <div
                    key={movie.id}
                    className="relative group cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={() => specificMovieDataHandler(movie.id)}
                  >
                    <img
                      src={
                        movie.poster_path === null
                          ? pholder
                          : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      }
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                      <div className="absolute bottom-0 p-4">
                        <h3 className="text-sm font-semibold">{movie.title}</h3>
                        <p className="text-xs text-gray-300">
                          {movie.release_date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {isMovieDialogOpen && individuLMData && (
        <MovieDialog
          isMovieDialogOpen={isMovieDialogOpen}
          onMovieDialogOpen={setMovieDialogOpen}
          individualMData={individuLMData}
        />
      )}
      {movieData && searchMovieData === undefined && (
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          totalPages={totalPages}
          isLoading={isLoading}
        />
      )}
      {searchMovieData && searchMovieData.length > 0 && (
        <Pagination
          currentPage={searchCurrentPage}
          onPageChange={handleSearchPageChange}
          totalPages={searchTotalPages}
          isLoading={isSearchLoading}
        />
      )}
    </>
  );
}
