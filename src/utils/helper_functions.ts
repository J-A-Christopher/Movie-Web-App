import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { store } from "@/state/store/movie_store";
import { setUser, setLoading, setError } from "../state/slices/authSlice";
import {NavigateFunction } from "react-router-dom";
import { FormErrors,FormData } from './helper_interfaces';

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: (error as Error).message 
    };
  }
};


export const handleGoogleSignUp = async (navigate: NavigateFunction) => {
  try {
    store.dispatch(setLoading(true));
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const displayName =
      userCredential.user.displayName ||
      userCredential.user.email?.split("@")[0] ||
      "User";
    store.dispatch(
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName,
      })
    );

    navigate("/home", { replace: true });
  } catch (error) {
    const errorMessage = (error as Error).message;
    const errorCode =
      errorMessage.match(/\(auth\/(.+?)\)/)?.[1] || "unknown-error";
    store.dispatch(setError(errorCode));
  } finally {
    store.dispatch(setLoading(false));
  }
};

 export const validateForm = (formData:FormData): FormErrors => {
   const errors: FormErrors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    return errors;
 };
  

 export const getPageNumbers = (currentPage:number,totalPages:number) => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push("...", totalPages);
  } else if (totalPages > 1) {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
};