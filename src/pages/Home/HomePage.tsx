import { useState, useEffect } from "react";
import cinema from "../../assets/cinema.jpg";
import { Movie } from "@/utils/helper_interfaces";
import { useGetMoviesListQuery } from "@/api/movi_api";
import MovieGridShimmer from "@/components/common/movie_grid_shimmer";
import { errorHandler } from "@/error/error";

export default function HomePage() {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const { isError, error, data, isLoading } = useGetMoviesListQuery({});
  const [movieData, setMovieData] = useState<Movie[]>();


  useEffect(() => {
    if (data) {
      setMovieData(data?.results);
    }
  }, [data]);

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

  useEffect(() => {
    if (isError) {
      errorHandler(error)
    }
    
  },[error, isError])

  if (isLoading) {
    return <MovieGridShimmer />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
              type="email"
              placeholder="Email address"
              className="w-full sm:w-2/3 px-4 py-3 text-black rounded"
            />
            <button className="w-full sm:w-auto px-8 py-3 bg-red-600 rounded font-semibold hover:bg-red-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Titles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movieData?.map((movie: Movie) => (
            <div
              key={movie.id}
              className="relative group cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-sm font-semibold">{movie.title}</h3>
                  <p className="text-xs text-gray-300">{movie.release_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
