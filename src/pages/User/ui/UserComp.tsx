import React, { useState, useEffect } from 'react'
import styles from '../styles/index.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa6'
import { Tabs, TabsProps } from 'antd'


import { auth } from '../../../firebase'
import { onAuthStateChanged, User } from 'firebase/auth';
import { fetchUserInfo, userBioChangeFunc, userInfoFunc, userNameChangeFunc } from '../../../entities/UserR/UserReducer'
import { AppStateType, useAppDispatch } from '../../../entities/Store/store'


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

                <div>
                    <div>
                        About
                    </div>
                    <div>
                        <div>
                            User Name
                            <input type="text" onChange={(e) => setUserName(e.target.value)} />

                        </div>
                        <div>
                            {userInfo.userName}
                        </div>
                        <button onClick={() => changeUserNameCompFunc(userName)}>save</button>

                        <div>
                            Bio
                            <input type="text" onChange={(e) => setBiochange(e.target.value)} />
                        </div>
                        <div>
                            {userInfo.bio}
                        </div>

                        <button onClick={() => changeBioCompFunc(biochange)}>save</button>

                    </div>
                </div>

                {/* <div className={styles.user_content_2_item}>
                    <Tabs defaultActiveKey="1" items={items} />
                </div> */}
            </div>

        </div>
    )
}


export default UserComp

type OwnProps = {}