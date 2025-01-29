import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setError } from "../state/slices/errorSlice";
import { store } from "../state/store/movie_store";

export function errorHandler(error: FetchBaseQueryError | SerializedError) {
  let message = "An unknown error occurred";
  const { dispatch } = store;

  if ("status" in error) {
    // FetchBaseQueryError
    console.log("FETCH BASE QUERY ERROR", JSON.stringify(error));

    switch (error.status) {
      case "FETCH_ERROR":
        message = "Please check your internet connection and try again";
        break;
      case "PARSING_ERROR":
        message =
          "Invalid JSON data provided or an error occurred during data transformation";
        break;
      case "TIMEOUT_ERROR":
        message = "Response took too long, please try again later";
        break;
      case "CUSTOM_ERROR":
        // Handle custom errors if needed
        break;
      default:
        // Handle server-side errors (e.g., 401, 404, 500, etc.)
        if (error.data && typeof error.data === "object") {
          const serverError = error.data as {
            status_code?: number;
            status_message?: string;
            success?: boolean;
          };

          if (serverError.status_message) {
            message = serverError.status_message;
          } else {
            message = `Server error: ${error.status}`;
          }
        }
        break;
    }

    dispatch(setError(message));
  } else {
    // SerializedError (unexpected errors)
    console.log("SERIALIZED ERROR", JSON.stringify(error));
    dispatch(
      setError(error.message || "Something went wrong, please try again later")
    );
  }
}