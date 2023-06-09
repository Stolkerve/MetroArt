import {
  doc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./client";
import { getAuth, updateEmail } from "firebase/auth";
import { User } from "../models/IUser";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const usersCollection = "users";

export async function createUser(data: any) {
  const { uid, ...restData } = data;

  if (uid) {
    return setDoc(doc(db, usersCollection, uid), restData);
  }

  return addDoc(collection(db, usersCollection), restData);
}

//   export async function updateUserFavorites(userId, newFavs) {
//     const allFavs = [];
//     const userRef = doc(db, usersCollection, userId);
//     const oldFavs = await getUserMovies(userId);

//     if (oldFavs.includes(newFavs)) {
//       return console.error("USER ALREADY HAS THAT MOVIE AS FAVORITE");
//     } else {
//       if (oldFavs.length < 1) {
//         allFavs.push(newFavs);
//       } else {

//         for (let index = 0; index < oldFavs.length; index++) {
//           const element = oldFavs[index];
//           allFavs.push(element);
//         }
//         allFavs.push(newFavs)

//         try {
//           await updateDoc(userRef, { "favorites": allFavs });
//           console.log('FAVORITES UPDATED SUCCESFULLY');
//         } catch (error) {
//           console.error('ERROR UPDATING FAVORITES:', error);
//         }
//       }
//     }
//   }

export async function getUserById(userId: string) {
  const userRef = doc(db, usersCollection, userId);
  return getDoc(userRef);
}

export async function getUserProfile(email: string) {
  const userQuery = query(collection(db, usersCollection), where("email", "==", email));

  const results = await getDocs(userQuery);

  if (results.size > 0) {
    const [user] = results.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    return user;
  }

  return null;
}

export async function updateUser(uid: string, userInfo: User) {
  const auth = await getAuth();
  const currentUser = auth.currentUser;
  const userDocRef = doc(db, "users", uid);

  if (userInfo.email && currentUser && userInfo.email !== currentUser.email ) {
    // If the user has updated their email, update it in Firebase Authentication as well
    await updateEmail(currentUser, userInfo.email);
  }

  await updateDoc(userDocRef, {
    "username": userInfo.username,
    "email": userInfo.email,
    "phone": userInfo.phone});

}

export async function getProfilePicture(userId: string): Promise<string> {
  try {
    // Obtener una referencia al servicio de almacenamiento de Firebase
    const storage = getStorage();

    // Obtener una referencia a la foto de perfil del usuario en el almacenamiento
    const storageRef = ref(storage, `users/${userId}/profilePicture`);

    // Obtener la URL de descarga de la foto de perfil
    const downloadURL = await getDownloadURL(storageRef);

    // Devolver la URL de descarga de la foto de perfil
    return downloadURL;
  } catch (error) {
    console.error("Error al obtener la foto de perfil:", error);
    throw error;
  }
}

export async function updateProfilePicture(userId: string, file: File): Promise<string> {
  try {
    // Get a reference to the storage service
    const storage = getStorage();

    // Create a reference to the user's profile picture in storage
    const storageRef = ref(storage, `users/${userId}/profilePicture`);

    // Upload the new profile picture file to storage
    await uploadBytes(storageRef, file);

    // Get the download URL for the new profile picture
    const downloadURL = await getDownloadURL(storageRef);

    // TODO: Update the user's profile picture URL in your database

    // Return the download URL for the new profile picture
    return downloadURL;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error;
  }
}