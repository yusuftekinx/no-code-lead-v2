import { UserType } from "../User";


export interface InitialAuthState {
    user: UserType | null;
    isLoggedIn: boolean;
    loading: boolean;
}