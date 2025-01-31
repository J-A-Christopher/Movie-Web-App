import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setError } from "../../../state/slices/authSlice";
import { logoutUser } from "../../../utils/helper_functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface LogOutProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LogOutDialog = ({ isOpen, setIsOpen }: LogOutProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      dispatch(logout());
      navigate("/", { replace: true });
    } else {
      dispatch(setError(result.error ?? null));
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700"
        >
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-[95%] sm:max-w-md p-6 bg-gray-900 text-white mx-auto my-6 rounded-lg shadow-lg">
        <AlertDialogHeader className="space-y-2 sm:space-y-4">
          <AlertDialogTitle className="text-2xl sm:text-3xl font-bold text-white">
            Are you sure you want to logout?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base text-gray-300">
            You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end space-x-4">
          <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
