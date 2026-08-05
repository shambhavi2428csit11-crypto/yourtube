import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { provider, auth } from "./firebase";
import axiosInstance from "./axiosinstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userdata) => {
    setUser(userdata);
    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const handlegooglesignin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const firebaseuser = result.user;
    const payload = {
      email: firebaseuser.email,
      name: firebaseuser.displayName,
      image: firebaseuser.photoURL || "https://github.com/shadcn.png",
    };
    const response = await axiosInstance.post("/user/login", payload);
    login(response.data.result);
  } catch (error) {
    console.error("Error during sign in:", error);
  }
};

  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then(async (result) => {
  //       if (result?.user) {
  //         const firebaseuser = result.user;
  //         const payload = {
  //           email: firebaseuser.email,
  //           name: firebaseuser.displayName,
  //           image: firebaseuser.photoURL || "https://github.com/shadcn.png",
  //         };
  //         const response = await axiosInstance.post("/user/login", payload);
  //         login(response.data.result);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Redirect sign-in error:", error);
  //     });
  // }, []);
  

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (firebaseuser) => {
      if (firebaseuser) {
        try {
          const payload = {
            email: firebaseuser.email,
            name: firebaseuser.displayName,
            image: firebaseuser.photoURL || "https://github.com/shadcn.png",
          };
          const response = await axiosInstance.post("/user/login", payload);
          login(response.data.result);
        } catch (error) {
          console.error(error);
          logout();
        }
      }
    });
    return () => unsubcribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, handlegooglesignin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;