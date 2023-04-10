import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (!user) {
          // console.log("No User")
          axios.get("/profile").then(({ data }) => {
            // console.log("Data is ", data)
            setUser(data);
            setReady(true);
          });
        }
      }, [user]);

      // console.log("Data is ", user)

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider >
    )
}

export default UserContextProvider