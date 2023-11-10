import React from 'react'
import styles from './index.module.css'
import Header from '../Header'
import { FaUser } from 'react-icons/fa6'
import { Tabs, TabsProps } from 'antd'

const User: React.FC<OwnProps> = () => {

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


    return (
        <div className={styles.user_content}>
            <Header />

            <div className={styles.user_content_container}>
                <div className={styles.user_content_1_item}>
                    <div className={styles.user_content_1_item_1_item}>
                        <FaUser />
                    </div>
                    <div className={styles.user_content_1_item_2_item}>
                        <div className={styles.user_content_1_item_2_item_1_item}>
                            Shushanik Mirzoyan
                        </div>
                        <div className={styles.user_content_1_item_2_item_2_item}>
                            @shushanikmirzoyan
                        </div>
                    </div>
                </div>

                <div className={styles.user_content_2_item}>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>

        </div>
    )
}

export default User

type OwnProps = {}