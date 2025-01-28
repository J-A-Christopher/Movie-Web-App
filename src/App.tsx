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
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
