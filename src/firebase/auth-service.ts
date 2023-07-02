import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
  GoogleAuthProvider,
} from "@firebase/auth";
import { auth } from "./client";
import { createUser } from "./users-service";
import { FacebookAuthProvider } from "firebase/auth/cordova";


export const loginWithProvider = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
  const result = await signInWithPopup(auth, provider);
  const newUser = getAdditionalUserInfo(result)?.isNewUser;

  if (newUser) {
    const { uid, email, displayName, phoneNumber } = result.user;
    await createUser({
      uid,
      email,
      username: displayName,
      phone: phoneNumber,
    });

  }
};

export const emailPasswordRegister = async (
  email: string,
  password: string,
  username: string,
  phone: string,
) => {
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  await createUser({
    uid: userCredentials.user.uid,
    email,
    username,
    phone,
  });
};

export const emailPasswordLogin = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  await signOut(auth);
};
