import React from 'react'
import styles from './index.module.css'
import { Col, Dropdown, MenuProps, Row, Space } from 'antd'

import { FaTrello, FaCircleUser } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const Header: React.FC<OwnProps> = () => {

    const items: MenuProps['items'] = [
        {
            label: <NavLink to='/userPage'>Profile and visibility</NavLink>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <NavLink to='/'>Log out</NavLink>,
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