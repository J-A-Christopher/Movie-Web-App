import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./state/slices/types";
import { useToast } from "./hooks/use-toast";
import { ToastAction } from "./components/ui/toast";
import { clearError } from "./state/slices/errorSlice";
import { Toaster } from "./components/ui/toaster";
import LoginPage from "./pages/login/login_page";
import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider } from "./components/AuthProvider";
import { ProtectedRoute } from "./protected/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const errors = useSelector((state: RootState) => state.error);
  const { toast } = useToast();

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
          action: (
            <ToastAction
              onClick={() => dispatch(clearError(error))}
              altText="Clear Error"
            >
              Clear
            </ToastAction>
          ),
        });
      });
    }
  }, [dispatch, errors, toast]);

  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;