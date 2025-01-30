import { User } from "@/utils/helper_interfaces";

export interface UserAuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  error: string[];
  auth: UserAuthState;
}
