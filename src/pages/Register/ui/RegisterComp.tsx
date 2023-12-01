import React, { useEffect, useState } from 'react'
import styles from '../styles/index.module.css'
import { Input, Button } from 'antd'

import { NavLink, useNavigate } from 'react-router-dom'

import { FaTrello, FaAtlassian, FaCircle } from "react-icons/fa6";

import SignIn from '../../SignIn';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useAppDispatch } from '../../../entities/Store/store';
import { userInfoFunc } from '../../../entities/UserR/UserReducer';

const Register: React.FC<OwnProps> = ({ setLocalStorageHook }) => {

    const [emailtxt, setEmailtxt] = useState<string>('')
    const [passwordtxt, setPasswordtxt] = useState<string>('')


    const asyncDispatch = useAppDispatch()


    const loginEmailPassword = () => {



        signInWithEmailAndPassword(auth, emailtxt, passwordtxt)
            .then((userCredential) => {


                localStorage.setItem('user', JSON.stringify(userCredential.user));
                setLocalStorageHook(true)

                asyncDispatch(userInfoFunc({
                    name: null,
                    email: userCredential.user.email,
                    picture: null
                }))

            })

            .catch((error) => {

                // setErrorMessage(error.message)
            })

    }

    return (
        <div className={styles.register_bg}>

            <div className={styles.register_content}>

                {/* araji mas */}

                <div className={styles.register_content_1_item}>
                    <div className={styles.register_content_1_item_1_item}>
                        <FaTrello />
                    </div>
                    <div className={styles.register_content_1_item_2_item}>
                        Trello
                    </div>
                </div>

                {/* ekrord mas */}

                <div className={styles.register_content_2_item}>
                    Log out of your Atlassian account
                </div>

                {/* errord mas */}

                <div className={styles.register_content_3_item}>
                    <div className={styles.register_content_3_item_1_item}>
                        <Input onChange={(e) => setEmailtxt(e.target.value)} placeholder="Please Write Your Email" />
                    </div>
                    <div className={styles.register_content_3_item_1_item}>
                        <Input onChange={(e) => setPasswordtxt(e.target.value)} placeholder="Please Write Your Password" />
                    </div>
                </div>

                {/* chorord mas */}


                <div className={styles.register_content_4_item}>
                    <Button onClick={loginEmailPassword} type="primary" >Log in</Button>
                </div>

                <SignIn setLocalStorageHook={setLocalStorageHook} />

                {/* hingerord mas */}

                <div className={styles.register_content_5_item}>
                    <NavLink to='/'>
                        Log in to another account
                    </NavLink>
                </div>

                {/* vecerord mas */}

                <div className={styles.register_content_6_item}>
                    <div className={styles.register_content_6_item_1_item}>
                        <FaAtlassian />
                    </div>
                    <div className={styles.register_content_6_item_2_item}>
                        ATLASSIAN
                    </div>
                </div>

                {/* yoterord mas */}

                <div className={styles.register_content_6_item}>
                    One account for Trello, Jira, Confluence and <NavLink to='/'>more</NavLink>.
                </div>

                {/* uterord mas */}

                <div className={styles.register_content_7_item}>
                    <NavLink to='/'>
                        Privacy Policy
                    </NavLink>
                    <span><FaCircle /></span>
                    <NavLink to='/'>
                        User Notice
                    </NavLink>
                </div>

            </div>
        </div>
    )
}

export default Register

type OwnProps = {
    setLocalStorageHook: (type: boolean) => void

}