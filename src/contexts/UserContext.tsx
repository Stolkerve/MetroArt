import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";
import { getUserProfile } from "../firebase/users-service";
import { User } from "../models/IUser";
export const UserContext = React.createContext({});

export interface UserContext extends ReturnType<typeof useUser> {
  user: User;
  isLoadingUser: boolean;

}

export function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    phone: "",
  });
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoadingUser(true);
      if (firebaseUser && !user) {
        const userProfile: any = await getUserProfile(firebaseUser.email!);
        setUser(userProfile);
      } else {  
        if (auth.currentUser) {
          const userProfile: any = await getUserProfile(auth.currentUser.email!); 
          setUser(userProfile);
        } else {
          setUser({
            id: "",
            username: "admin",
            email: "",
            phone: "",
          });
        }
             
        
      }

      setIsLoadingUser(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoadingUser,
        setIsLoadingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
