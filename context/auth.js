import React, { createContext, useEffect, useState } from 'react';
import { Storage } from '@capacitor/storage';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [jwt, setJwt] = useState()

    useEffect(() => {
        getAuthenticated()
    }, [])

    const getAuthenticated = async () => {
        const accessToken = await Storage.get({key: 'accessToken'})
        if(accessToken.value) {
            setLoggedIn(true)
            setJwt(accessToken.value)
        } else {
            setLoggedIn(false)
        }
    }

    return (
        <React.Fragment>
            <AuthContext.Provider value={{loggedIn, setLoggedIn, jwt, setJwt}} >
                {props.children}
            </AuthContext.Provider>
        </React.Fragment>
    )
}

export default AuthContextProvider;