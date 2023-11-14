import React from 'react'
import styles from '../styles/index.module.css'
import { Col, Dropdown, MenuProps, Row, Space } from 'antd'

import { FaTrello, FaCircleUser } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';


const Header: React.FC<OwnProps> = () => {

    const navigate = useNavigate();


    const handleSignOut = () => {

        signOut(auth)
            .then(() => {
                navigate('/')
            })
            .catch(error => console.log(error))
    }

    const items: MenuProps['items'] = [
        {
            label: <NavLink to='/userPage'>Profile and visibility</NavLink>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <button onClick={() => handleSignOut()}>Log out</button>,
            key: '2',
        },
    ];


    return (
        <div className={styles.header_content}>
            <Row>
                <Col span={12} className={styles.header_content_first_col}>
                    <NavLink to='/userPage'>
                        <div className={styles.header_content_first_col_1_item}>
                            <div className={styles.header_content_first_col_1_item_1_item}>
                                <FaTrello />
                            </div>
                            <div className={styles.header_content_first_col_1_item_2_item}>
                                Trello
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to='/boards'>
                        <div className={styles.header_content_first_col_2_item}>
                            Boards
                        </div>
                    </NavLink>

                </Col>
                <Col span={12} className={styles.header_content_second_col}>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Space className={styles.header_content_second_col_icon}>
                            <FaCircleUser />
                        </Space>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    )
}


export default Header


type OwnProps = {}