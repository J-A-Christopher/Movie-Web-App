import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { setUser, setLoading, setError } from "../../state/slices/authSlice";
import { RootState } from "@/state/slices/types";
import { useDispatch, useSelector } from "react-redux";
import { FormData, FormErrors } from "../../utils/helper_interfaces";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Input } from "../../components/ui/input";
import cinema from "../../assets/cinema.jpg";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): FormErrors => {
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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      dispatch(setLoading(true));
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.username,
      });

      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: formData.username,
        })
      );

      navigate("/", { replace: true });
    } catch (error) {
        console.log(error);
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0">
        <img
          src={cinema}
          alt="Cinema background"
          className="w-full h-full object-cover opacity-1"
        />
      </div>
      <div className="fixed inset-0 bg-black/70" />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-black/80 p-8 text-white backdrop-blur">
          <h1 className="text-3xl font-medium">Sign Up</h1>
          {error && <div className="text-red-500 text-lg">{error}</div>}
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 border-zinc-600 focus-visible:ring-0 focus-visible:border-white"
                />
                {formErrors.email && (
                  <span className="text-red-500 text-sm">
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 border-zinc-600 focus-visible:ring-0 focus-visible:border-white"
                />
                {formErrors.password && (
                  <span className="text-red-500 text-sm">
                    {formErrors.password}
                  </span>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 border-zinc-600 focus-visible:ring-0 focus-visible:border-white"
                />
                {formErrors.username && (
                  <span className="text-red-500 text-sm">
                    {formErrors.username}
                  </span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-lg disabled:bg-red-800"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="relative">
              <Separator className="bg-zinc-700" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 px-2 text-sm text-zinc-400">
                OR
              </span>
            </div>
          </div>

          <div className="text-lg text-zinc-400">
            Already have an account?{" "}
            <Link to="/" className="text-white hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
