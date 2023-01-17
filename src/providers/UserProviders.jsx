import React, { createContext } from 'react'
import { useContext, useState } from 'react';

const userContext = createContext();
const usertToggleContext = createContext();

export const useUserContext = () => useContext(userContext);
export const useToggleContext = () => useContext(usertToggleContext);

const UserProviders = (props) => {
    const [user, setUser] = useState({user: 'admin', password: 'password'});

    const changeUser = (us, pass) => {
        setUser({user: us, password: pass});
    }

    return (
        <userContext.Provider value={user}>
            <usertToggleContext.Provider value={(us, pass) => changeUser(us, pass)}>
                {props.children}
            </usertToggleContext.Provider>
        </userContext.Provider>
    )
}

export default UserProviders