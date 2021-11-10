import { useEffect, useState } from "react"
import {
    getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile
} from "firebase/auth";
import initializeFirebase from "../Firebase/firebase.init";
import axios from "axios";


initializeFirebase()
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState({})
    const [admin, setAdmin] = useState(false)

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        axios.get(`https://shrouded-stream-54821.herokuapp.com/users/${user?.email}`)
            .then(response => {
                setAdmin(response.data.admin)
            })
    }, [user?.email])

    const signInUsingGoogle = () => {
        setIsLoading(true)
        return signInWithPopup(auth, googleProvider);

    }

    //Observe whether user auth state has changed or not
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        })
        return () => unsubscribed;
    }, [auth])

    const logOut = () => {
        setIsLoading(false)
        return signOut(auth)
    }

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const setUserName = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })

    }

    const manualSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const saveUser = (email, displayName, method) => {
        const user = { email, displayName }
        if (method === 'POST') {
            axios.post('https://shrouded-stream-54821.herokuapp.com/users', user)
                .then(res => {
                    console.log(res)
                })
        } else if (method === 'PUT') {
            axios.put('https://shrouded-stream-54821.herokuapp.com/users', user)
                .then(res => {
                    console.log(res)
                })
        }

    }

    return {
        user,
        error,
        setError,
        signInUsingGoogle,
        createNewUser,
        setUserName,
        manualSignIn,
        logOut,
        isLoading,
        setIsLoading,
        admin,
        saveUser
    }
}

export default useFirebase;