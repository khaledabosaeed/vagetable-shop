import { toast } from "react-toastify";
import { ValidationError, AuthError, NetworkError, ApiError } from "./error";

export function handleError(error: unknown): void {
  if (error instanceof ValidationError) {
    // console.error("validation Error :", error.message);
    toast.error("Please check your input.");
  } else if (error instanceof NetworkError) {
    // console.error("Network Error : ", error.message);
    toast.error(". No internet connection. Please try again.");
  } else if (error instanceof AuthError) {
    // console.error("Auth Error", error.message);
    toast.error("Invalid credentials. Please try again.");
  } else if (error instanceof ApiError) {
    console.error(`API Error ${error.status}`, error.message);
    toast.error(error.message);
  } else {
    // console.error("Unknown error:", error);
    toast.error('Something went wrong. Please try again.');
  }
}
