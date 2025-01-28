import React from "react";

interface ShimmerProps {
  className?: string;
}

const ShimmerBlock: React.FC<ShimmerProps> = ({ className = "" }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0">
      <div className="animate-[shimmer_2s_infinite] absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
    </div>
  </div>
);

const MovieGridShimmer: React.FC = () => {
  const HeroShimmer: React.FC = () => (
    <div className="relative min-h-[100svh] flex items-center justify-center bg-gray-900">
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto p-4 md:p-6 space-y-4 md:space-y-8">
        <ShimmerBlock className="h-8 md:h-12 lg:h-14 bg-gray-800 rounded-lg mx-auto w-full max-w-2xl" />
        <ShimmerBlock className="h-6 md:h-8 bg-gray-800 w-3/4 mx-auto rounded-lg" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto w-full mt-8">
          <ShimmerBlock className="w-full sm:w-2/3 h-12 bg-gray-800 rounded-lg" />
          <ShimmerBlock className="w-full sm:w-40 h-12 bg-gray-800 rounded-lg" />
        </div>
      </div>
    </div>
  );

  const MovieGrid: React.FC = () => (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <ShimmerBlock className="h-8 md:h-10 w-32 md:w-48 bg-gray-800 rounded-lg mb-6 md:mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="aspect-[2/3] relative group">
            <ShimmerBlock className="w-full h-full bg-gray-800 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );

  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroShimmer />
      <MovieGrid />
    </div>
  );
};

export default MovieGridShimmer;
