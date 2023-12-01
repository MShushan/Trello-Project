import React, { useState, useEffect } from 'react'
import styles from '../styles/index.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa6'
import { Tabs, TabsProps } from 'antd'


import { auth } from '../../../firebase'
import { onAuthStateChanged, User } from 'firebase/auth';
import { fetchUserInfo, userBioChangeFunc, userInfoFunc, userNameChangeFunc } from '../../../entities/UserR/UserReducer'
import { AppStateType, useAppDispatch } from '../../../entities/Store/store'

import pic from '../images/1.svg'

const UserComp: React.FC<OwnProps> = () => {

    const dispatch = useDispatch()
    const asyncDispatch = useAppDispatch()

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <div className={styles.user_content_2_item_1_item_title}>
                    Profile and visibility
                </div>
            ),
            children: (
                <div className={styles.user_content_2_item_1_item}>
                    Content of Tab Pane 1
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className={styles.user_content_2_item_1_item_title}>
                    Acitivity
                </div>
            ),
            children: (
                <div className={styles.user_content_2_item_1_item}>
                    Content of Tab Pane 2
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div className={styles.user_content_2_item_1_item_title}>
                    Cards
                </div>
            ),
            children: (
                <div className={styles.user_content_2_item_1_item}>
                    Content of Tab Pane 3
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div className={styles.user_content_2_item_1_item_title}>
                    Settings
                </div>
            ),
            children: (
                <div className={styles.user_content_2_item_1_item}>
                    Content of Tab Pane 4
                </div>
            ),
        },
    ];

    const userInfo = useSelector((state: AppStateType) => state.userReducer.userInfo)

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser);

        })


        return unsubscribe
    }, [])


    const [userName, setUserName] = useState<string>('')
    const [biochange, setBiochange] = useState<string>('')

    const changeUserNameCompFunc = async (str: string) => {

        await asyncDispatch(userNameChangeFunc({ str }))
        await asyncDispatch(fetchUserInfo())

    }

    const changeBioCompFunc = async (str: string) => {
        await asyncDispatch(userBioChangeFunc({ str }))
        await asyncDispatch(fetchUserInfo())
    }

    const [userNameShow, setUserNameShow] = useState<boolean>(false)
    const [emailShow, setEmailShow] = useState<boolean>(false)



    return (
        <div className={styles.user_content}>


            <div className={styles.user_content_container}>

                {
                    user
                        ?
                        <div>
                            <div className={styles.user_content_1_item}>
                                <div className={styles.user_content_1_item_1_item}>
                                    <img src={`${user.photoURL}`} />
                                </div>
                                <div className={styles.user_content_1_item_2_item}>
                                    <div className={styles.user_content_1_item_2_item_1_item}>
                                        {user.displayName}
                                    </div>
                                    <div className={styles.user_content_1_item_2_item_2_item}>
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                        null
                }
            </div>

            <div className={styles.user_content_sec_content}>
                <div className={styles.user_content_sec_content_item_1}>
                    <div className={styles.user_content_sec_content_item_1_1_item}>
                        <img src={pic} />
                    </div>
                    <div className={styles.user_content_sec_content_item_1_2_item}>
                        Manage your personal information
                    </div>
                    <div className={styles.user_content_sec_content_item_1_3_item}>
                        <div className={styles.user_content_sec_content_item_1_3_item_1_item}>
                            This is an Atlassian account. Edit your personal information and visibility settings through your <span>Atlassian profile.</span>
                        </div>
                        <div className={styles.user_content_sec_content_item_1_3_item_2_item}>
                            To learn more, view our <span>Terms of Service</span> or <span>Privacy Policy.</span>
                        </div>
                    </div>
                </div>
                <div className={styles.user_content_sec_content_item_2}>
                    <div className={styles.user_content_sec_content_item_2_1_item}>
                        About
                    </div>
                    <div className={styles.user_content_sec_content_item_2_1_item_1_item}>
                        <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item}>
                            <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item_1_item}>
                                User Name
                            </div>
                            {
                                !userNameShow
                                    ?
                                    <div>

                                        <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item_2_item}>
                                            <input type="text" onChange={(e) => setUserName(e.target.value)} />

                                        </div>
                                        <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item_2_item}>
                                            <button onClick={() => {
                                                changeUserNameCompFunc(userName)
                                                setUserNameShow(true)
                                            }}>save</button>
                                        </div>
                                    </div>
                                    :
                                    <div onClick={() => setUserNameShow(false)} className={styles.user_content_sec_content_item_2_1_item_1_item_2_item}>

                                        <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item_1_item}>
                                            {userInfo.userName}
                                        </div>
                                    </div>
                            }


                        </div>

                        <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item}>
                            <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item_1_item}>
                                bio
                            </div>
                            {
                                !emailShow
                                    ?
                                    <div className={styles.user_content_sec_content_item_2_1_item_1_item_3_item}>

                                        <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item_2_item}>
                                            <input type="text" onChange={(e) => setBiochange(e.target.value)} />

                                        </div>
                                        <div className={styles.user_content_sec_content_item_2_1_item_1_item_1_item_2_item}>
                                            <button onClick={() => {
                                                changeBioCompFunc(biochange)
                                                setEmailShow(true)
                                            }}>save</button>
                                        </div>
                                    </div>
                                    :
                                    <div onClick={() => setEmailShow(false)} className={styles.user_content_sec_content_item_2_1_item_1_item_1_item_1_item}>
                                        {userInfo.bio}
                                    </div>
                            }
                        </div>



                    </div>
                </div>
            </div>

        </div>
    )
}


export default UserComp

type OwnProps = {}