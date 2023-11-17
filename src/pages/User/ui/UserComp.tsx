import React, { useState, useEffect } from 'react'
import styles from '../styles/index.module.css'

import { FaUser } from 'react-icons/fa6'
import { Tabs, TabsProps } from 'antd'


import { auth } from '../../../firebase'
import { onAuthStateChanged, User } from 'firebase/auth';


const UserComp: React.FC<OwnProps> = () => {


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

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser);

        })

        return unsubscribe
    }, [])



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



                <div className={styles.user_content_2_item}>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>

        </div>
    )
}


export default UserComp

type OwnProps = {}