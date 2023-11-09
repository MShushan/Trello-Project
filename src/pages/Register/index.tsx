import React from 'react'
import styles from './index.module.css'
import { Input, Button } from 'antd'

import { NavLink } from 'react-router-dom'

import { FaTrello, FaAtlassian, FaCircle } from "react-icons/fa6";

const Register: React.FC<OwnProps> = () => {
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
                        <Input placeholder="Please Write Your Email" />
                    </div>
                    <div className={styles.register_content_3_item_1_item}>
                        <Input placeholder="Please Write Your Password" />
                    </div>
                </div>

                {/* chorord mas */}

                <div className={styles.register_content_4_item}>
                    <NavLink to='/userPage'>
                        <Button type="primary">Log in</Button>
                    </NavLink>
                </div>

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


type OwnProps = {}