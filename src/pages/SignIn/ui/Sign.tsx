import React from 'react'
import { auth } from '../../../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'


import styles from '../styles/SignIn.module.css'

import { useNavigate } from 'react-router-dom'

const SignIn: React.FC<OwnProps> = () => {

    const navigate = useNavigate();


    const signInCompFunc = async () => {

        const provider = new GoogleAuthProvider()

        try {
            await signInWithPopup(auth, provider)

            navigate("/userPage")
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <button onClick={signInCompFunc}>
            Sign In With Google
        </button>
    )

}

export default SignIn

type OwnProps = {}