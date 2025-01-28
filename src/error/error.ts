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
          "Invalid json Data provided or An error occurred during data transformation";
        break;
      case "TIMEOUT_ERROR":
        message = "Response took too long, Please try again later";
        break;
      case "CUSTOM_ERROR":
        break;
      default:
        // server side errors
        { const serverError = error.data as { error: { message: string } };

        message = serverError.error.message; }
    }

    dispatch(setError(message));
  } else {
    // SerializedError(If an unexpected error is thrown by user code rather than a handled error, that error will be transformed into a SerializedError shape)
    console.log("SERIALIZED ERROR", JSON.stringify(error));
    dispatch(
      setError(error.message || "Something went wrong, Please try again later")
    );
  }
}
