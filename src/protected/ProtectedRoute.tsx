import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/state/slices/types";
import MovieGridShimmer from "@/components/common/movie_grid_shimmer";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <MovieGridShimmer />;
  }

  if (!user && !loading) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
