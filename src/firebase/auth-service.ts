import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, getAdditionalUserInfo, GoogleAuthProvider } from "@firebase/auth";
import { auth, googleProvider } from "./client";
import { createUser } from "./users-service";

// HANDLE SING IN OR REGISTER USING GOOGLE PROVIDER
export const googleLogin = async ( onSuccess: any, onFail: any) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const newUser = getAdditionalUserInfo(result)?.isNewUser;
  
      if (newUser) {
        const { uid, email, displayName } = result.user;
        await createUser({
          uid,
          email,
          name: displayName,
          age: "",
          favorites: [],
        });
      }
  
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
  
      if (onFail) {
        onFail();
      }
  
      console.error("FAILED SIGN IN WITH GOOGLE", {
        errorCode,
        errorMessage,
        email,
        credential,
      });
    }
  };
  
  // HANDLE REGISTER WITH EMAIL AND PASSWORD
  export const emailPasswordRegister = async (
    userData: any,
    onSuccess: any,
    onFail: any,
  ) => {
    try {
      const { email, password, ...restData } = userData;
      const firebaseResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      await createUser({
        ...restData,
        email,
        uid: firebaseResult.user.uid,
      });
  
      // SUCCESS CALLBACK
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("REGISTER FAILED", { error });
      if (onFail) {
        onFail();
      }
    }
  };
  
  // HANDLE LOGIN WITH EMAIL AND PASSWORD
  export const emailPasswordLogin = async (
    userData: any,
    onSuccess: any,
    onFail: any,
  ) => {
    try {
      const { email, password } = userData;
      await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
  
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("LOGIN FAILED", { error });
  
      if (onFail) {
        onFail();
      }
    }
  };
  
  // HANDLE USER SIGN OUT
  export const logout = async (callback: any) => {
    try {
      await signOut(auth);
  
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("SIGN OUT FAILED", { error });
    }
  };