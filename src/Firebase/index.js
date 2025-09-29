import { app, firestore, storage } from "../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { shuffleItems } from "../utils/functions";
import { MdOutlineCloudUpload } from "react-icons/md";

// --- IMAGE FUNCTIONS ---
export const firebaseUploadImage = (
  imageFile,
  promise,
  progressHandler,
  action,
  to
) => {
  promise(true);
  toast.info(`Upload started.....`, {
    icon: <MdOutlineCloudUpload className="text-blue-600" />,
  });
  const storageRef = ref(
    storage,
    `Images/${to}/${Date.now()}-${imageFile.name}`
  );
  const uploadTask = uploadBytesResumable(storageRef, imageFile);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      progressHandler(
        `Upload status: ${Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )}%`
      );
    },
    (error) => {
      console.log(error);
      toast.error("Error while uploading, Try again🤗");
      action(null);
      setTimeout(() => {
        promise(false);
      }, 3000);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        action(downloadUrl);
        promise(false);
        toast.success("Photo Uploaded Successfully😊");
      });
    }
  );
};

export const firebaseRemoveUploadedImage = (
  ImageFile,
  imageHandler,
  promise
) => {
  const dummy = "https://firebasestorage.googleapis.com/v0/b/"; // Generic check
  promise(true);
  toast.info(`Removing Image.....`, { toastId: "remove-image" });
  if (ImageFile.includes(dummy)) {
    const deleteRef = ref(storage, ImageFile);
    deleteObject(deleteRef).then(() => {
      imageHandler(null);
      promise(false);
      toast.success("Photo removed Successfully😊", { toastId: "remove-image" });
    });
  } else {
    imageHandler(null);
    promise(false);
    toast.success("Photo removed Successfully😊", { toastId: "remove-image" });
  }
};

// --- PRODUCT FUNCTIONS ---
export const firebaseSaveProduct = async (data) => {
  const newDocRef = doc(collection(firestore, "Food"));
  await setDoc(newDocRef, { ...data, id: newDocRef.id }, { merge: true });
};

export const firebaseFetchFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "Food"), orderBy("id", "desc"))
  );
  const shuffledItems = shuffleItems(items.docs.map((doc) => doc.data()));
  return shuffledItems;
};

export const firebaseDeleteFood = async (id) => {
  await deleteDoc(doc(firestore, "Food", id));
};

// --- AUTH FUNCTIONS ---
export const AUTHPROVIDER = async (provider) => {
  const firebaseAuth = getAuth(app);
  const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
  const user = await firebaseAddUser(providerData[0]);
  return { refreshToken, userData: user };
};

export const EMAILSIGNUP = async (email, password) => {
  const firebaseAuth = getAuth(app);
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const EMAILSIGNIN = async (email, password) => {
  const firebaseAuth = getAuth(app);
  const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  const userProviderData = result.user; // Use the main user object for UID
  
  const userDataArray = await firebaseGetUser(userProviderData.uid);
  if (userDataArray.length > 0) {
    return userDataArray[0]; // Return existing user from your collection
  } else {
    // Edge case: User exists in Auth but not in your 'Users' collection
    return await firebaseAddUser(result.user.providerData[0]);
  }
};

export const firebaseLogout = async () => {
  const firebaseAuth = getAuth(app);
  await firebaseAuth.signOut();
};

// --- USER FUNCTIONS ---
export const firebaseAddUser = async (data) => {
  const userArray = await firebaseGetUser(data.uid);
  if (userArray.length === 0) {
    await setDoc(doc(firestore, "Users", data.uid), data, { merge: true });
    return data;
  }
  return userArray[0];
};

export const firebaseGetUser = async (uid) => {
  const q = query(collection(firestore, "Users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const firebaseUpdateUser = async (data) => {
  await setDoc(doc(firestore, "Users", data.uid), data, { merge: true });
};

export const firebaseGetAllUsers = async () => {
  const users = await getDocs(query(collection(firestore, "Users")));
  return users.docs.map((doc) => doc.data());
};

// --- CART FUNCTIONS ---
export const firebaseAddToCart = async (data) => {
  const newCartItemRef = doc(collection(firestore, "CartItems"));
  await setDoc(newCartItemRef, { ...data, id: newCartItemRef.id }, {
    merge: true,
  });
};

export const firebaseFetchAllCartItems = async () => {
  const items = await getDocs(query(collection(firestore, "CartItems"), orderBy("id", "desc")));
  return items.docs.map((doc) => doc.data());
};

export const firebaseUpdateCartItem = async (data) => {
  await setDoc(doc(firestore, "CartItems", data.id), data, { merge: true });
};

export const firebaseDeleteCartItem = async (item) => {
  await deleteDoc(doc(firestore, "CartItems", item.id));
};

export const firebaseEmptyUserCart = async (cartItems) => {
  // Use Promise.all to delete all items concurrently for better performance
  const deletePromises = cartItems.map((item) => firebaseDeleteCartItem(item));
  await Promise.all(deletePromises);
};