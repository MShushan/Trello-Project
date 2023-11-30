import React from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../../firebase'
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'


import styles from '../styles/SignIn.module.css'
import { fetchUserInfo, userInfoFunc } from '../../../entities/UserR/UserReducer'
import { useAppDispatch } from '../../../entities/Store/store'


const SignIn: React.FC<OwnProps> = ({ setLocalStorageHook }) => {


    const asyncDispatch = useAppDispatch()

    const authButtons = [
        {
            id: 1,
            title: 'Sign In With Google',
            image: '/images/authPictures/1.png'
        },
        {
            id: 2,
            title: 'Sign In With Github',
            image: '/images/authPictures/2.png'
        },
    ]


    const signInCompFunc: (id: number) => void = async (id: number) => {

        let provider = new GoogleAuthProvider()

        switch (id) {
            case 1: {

                provider = new GoogleAuthProvider()

                break
            }

            case 2: {

                provider = new GithubAuthProvider()

                break
            }


        }


        try {

            await signInWithPopup(auth, provider)

            localStorage.setItem('user', JSON.stringify(auth));
            await asyncDispatch(userInfoFunc({ name: auth.currentUser?.displayName, email: auth.currentUser?.email, picture: auth.currentUser?.photoURL }))
            await asyncDispatch(fetchUserInfo())
            setLocalStorageHook(true)

        } catch (err) {
            console.log(err)
        }


    }


    return (
        <>
            {
                authButtons.map((val) => {
                    return (
                        <div className={styles.button_styles} onClick={() => signInCompFunc(val.id)}>
                            <div className={styles.button_title}>
                                {val.title}
                            </div>
                            <div className={styles.button_image}>
                                <img src={val.image} />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

}

export default SignIn

type OwnProps = {
    setLocalStorageHook: (type: boolean) => void

}