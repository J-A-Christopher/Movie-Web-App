import { describe, it, expect, vi, Mock } from "vitest";
import { auth } from "../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { handleGoogleSignUp } from "@/utils/helper_functions";
import { store } from "@/state/store/movie_store";
import { setUser, setLoading, setError } from "../state/slices/authSlice";
import { NavigateFunction } from "react-router-dom";

vi.mock("../firebase/firebase", () => ({
  auth: {},
}));

vi.mock("firebase/auth", () => ({
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));

vi.mock("@/state/store/movie_store", () => ({
  store: {
    dispatch: vi.fn(),
  },
}));

vi.mock("../state/slices/authSlice", () => ({
  setUser: vi.fn(),
  setLoading: vi.fn(),
  setError: vi.fn(),
}));

describe("handleGoogleSignUp", () => {
  const navigate = vi.fn() as unknown as NavigateFunction;

  it("should sign in the user and set the display name", async () => {
    const userCredential = {
      user: {
        uid: "123",
        email: "test@example.com",
        displayName: "Test User",
      },
    };
    (signInWithPopup as Mock).mockResolvedValueOnce(userCredential);

    await handleGoogleSignUp(navigate);

    expect(store.dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
    expect(store.dispatch).toHaveBeenCalledWith(
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      })
    );
    expect(navigate).toHaveBeenCalledWith("/home", { replace: true });
    expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it("should set the display name to email prefix if displayName is not available", async () => {
    const userCredential = {
      user: {
        uid: "123",
        email: "test@example.com",
        displayName: null,
      },
    };
    (signInWithPopup as Mock).mockResolvedValueOnce(userCredential);

    await handleGoogleSignUp(navigate);

    expect(store.dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
    expect(store.dispatch).toHaveBeenCalledWith(
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: "test",
      })
    );
    expect(navigate).toHaveBeenCalledWith("/home", { replace: true });
    expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it("should handle errors during sign in", async () => {
    const errorMessage = "Sign in failed";
    (signInWithPopup as Mock).mockRejectedValueOnce(new Error(errorMessage));

    await handleGoogleSignUp(navigate);

    expect(store.dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
    expect(store.dispatch).toHaveBeenCalledWith(setError("unknown-error"));
    expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
  });
});