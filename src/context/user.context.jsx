import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//default value/structure of user context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user); //if signout, user obj becomes null
    });
    return unsubscribe; //return from useEffect is always a clean up function
  }, []); //empty array in useEffect is equivalent to ComponentDidMount

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
