import { describe, it, expect, vi, Mock } from "vitest";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { logoutUser } from "@/utils/helper_functions";

vi.mock("../firebase/firebase", () => ({
  auth: {},
}));

vi.mock("firebase/auth", () => ({
  signOut: vi.fn(),
}));

describe("logoutUser", () => {
  it("should log out the user successfully", async () => {
    (signOut as Mock).mockResolvedValueOnce(undefined);

    const result = await logoutUser();

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(result).toEqual({ success: true });
  });

  it("should return an error if sign out fails", async () => {
    const errorMessage = "Sign out failed";
    (signOut as Mock).mockRejectedValueOnce(new Error(errorMessage));

    const result = await logoutUser();

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(result).toEqual({ success: false, error: errorMessage });
  });
});
