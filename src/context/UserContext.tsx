import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../utils/types/User";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserVerify } from "../features/Auth/AuthSlice";

interface ContextUser {
  children: JSX.Element;
}

const UserContext = createContext<UserType | null>(null);

const ContextUser: React.FunctionComponent<ContextUser> = ({ children }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(UserVerify());
  }, []);

  if(auth.loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <span className="text-lg font-semibold">
        Yükleniyor...
      </span>
    </div>
  }
  else {
    return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
  }
};

export default ContextUser;
