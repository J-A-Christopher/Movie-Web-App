import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../../state/slices/authSlice";
import { LoginFormData, LoginFormErrors } from "../../utils/helper_interfaces";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import cinema from "../../assets/cinema.jpg";
import { RootState } from "@/state/slices/types";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (user && !loading) {
      navigate("/home", { replace: true });
    }
  }, [user, loading, navigate]);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof LoginFormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): LoginFormErrors => {
    const errors: LoginFormErrors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
        })
      );

      navigate("/home", { replace: true });
    } catch (error) {
      const errorMessage = (error as Error).message;
      const errorCode =
        errorMessage.match(/\(auth\/(.+?)\)/)?.[1] || "unknown-error";
      dispatch(setError(errorCode));
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
          <h1 className="text-3xl font-medium">Sign In</h1>
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
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-lg disabled:bg-red-800"
            >
              {loading ? "Signing in..." : "Sign In"}
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
            New to our site?{" "}
            <Link to="/sign-up" className="text-white hover:underline">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
