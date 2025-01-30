import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import cinema from "../../assets/cinema.jpg";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/home", { replace: true });
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
          <form className="space-y-4">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Email or mobile number"
                className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 border-zinc-600 focus-visible:ring-0 focus-visible:border-white"
              />
              <Input
                type="password"
                placeholder="Password"
                className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 border-zinc-600 focus-visible:ring-0 focus-visible:border-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-lg"
              onClick={submitHandler}
            >
              Sign In
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
            New to our site? {" "}
            <Link to="/sign-up" className="text-white hover:underline">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
