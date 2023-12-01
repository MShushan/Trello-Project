import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/index.module.css'
import { FaPen, FaUnlockKeyhole, FaUser, FaXmark } from 'react-icons/fa6'
import { Col, Row, Select } from 'antd'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProjectFunc, fetchPosts, getCurrentProjectIndexFunc } from '../../../entities/BoardsR/BoardsReducer'
import { AppStateType, useAppDispatch } from '../../../entities/Store/store'
import { Firestore, collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'
import { ProjectBoardArrType } from '../../../entities/BoardsR/BoardsReducerTs.interface'
import { v4 as uuidv4 } from 'uuid';
import { UserInfoType } from '../../../entities/UserR/UserReducer'




const Boards: React.FC<OwnProps> = () => {

    const dispatch = useDispatch()
    const asyncDispatch = useAppDispatch()


    const allProjectsArr = useSelector((state: AppStateType) => state.boardsReducer.projectArr)

    const [allProjectsHkArr, setAllProjectsHkArr] = useState<Array<ProjectBoardArrType>>(allProjectsArr)


    const userInfo = useSelector((state: AppStateType) => state.userReducer.userInfo)


    useEffect(() => {

        setAllProjectsHkArr(allProjectsArr)

    }, [allProjectsArr])

    console.log(allProjectsArr)

    const templateArr = [
        {
            id: 0,
            title: 'Template',
            type: 'Project Management',
        },
        {
            id: 1,
            title: 'Template',
            type: 'Kanban Template',
        },
        {
            id: 2,
            title: 'Template',
            type: 'Simple Project Board',
        },
        {
            id: 3,
            title: 'Template',
            type: 'Remote Team Hub',
        },
    ]

    const [newProjectModal, setNewProjectModal] = useState<boolean>(false)

    const [newProjectName, setNewProjectName] = useState<string>('')


    const createNewProjectCompFunc = async () => {
        let newProjectInfoClone: ProjectBoardArrType = {
            id: uuidv4(),
            boardArr: [
                {
                    id: 0,
                    title: 'To do',
                    boardName: 'todo',
                    items: []
                },
                {
                    id: 1,
                    title: 'Doing',
                    boardName: 'doing',
                    items: []

                },
                {
                    id: 2,
                    title: 'Done',
                    boardName: 'done',
                    items: []
                },
            ],
            boardName: newProjectName
        }
        await asyncDispatch(addProjectFunc(newProjectInfoClone))
        await asyncDispatch(fetchPosts())
    }

    const foo = async (num: string) => {

        await asyncDispatch(getCurrentProjectIndexFunc({ num }))
        await asyncDispatch(fetchPosts())
    }


    return (
        <>
            <div className={styles.boards_content}>


                <div className={styles.boards_content_container}>
                    <div className={styles.boards_content_container_in_item_1}>
                        <div className={styles.boards_content_container_in_item_1_1_item}>
                            <img src={`${userInfo.picture}`} />
                        </div>
                        <div className={styles.boards_content_container_in_item_1_2_item}>
                            <div className={styles.boards_content_container_in_item_1_2_item_1_item}>
                                <div className={styles.boards_content_container_in_item_1_2_item_1_item_1_item}>
                                    {userInfo.name} {userInfo.email}
                                </div>
                                <div className={styles.boards_content_container_in_item_1_2_item_1_item_2_item}>
                                    <FaPen />
                                </div>
                            </div>
                            <div className={styles.boards_content_container_in_item_1_2_item_2_item}>
                                <FaUnlockKeyhole /> <span>Private</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.boards_content_container_in_item_2}>
                        <Row className={styles.boards_content_container_in_item_2_1_item}>
                            <Col span={12} className={styles.boards_content_container_in_item_2_1_item_1_item}>
                                Most popular templates
                            </Col>
                            <Col span={12} className={styles.boards_content_container_in_item_2_1_item_2_item}>
                                <FaXmark />
                            </Col>
                        </Row>
                        <div className={styles.boards_content_container_in_item_2_2_item}>
                            <div className={styles.boards_content_container_in_item_2_2_item_1_item}>
                                Get going faster with a template from the Trello community
                            </div>
                        </div>
                        <div className={styles.boards_content_container_in_item_2_3_item}>
                            <div className={styles.boards_content_container_in_item_2_3_item_1_item}>
                                {
                                    templateArr.map((val) => {
                                        return (
                                            <>
                                                <div key={val.id} className={styles.boards_content_container_in_item_2_3_item_1_item_1_item}>
                                                    <div className={styles.boards_content_container_in_item_2_3_item_1_item_1_item_2}>
                                                        {val.title}
                                                    </div>
                                                    <div className={styles.boards_content_container_in_item_2_3_item_1_item_1_item_1}>
                                                        {val.type}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>

                            <NavLink to={'/'}>
                                Browse the full template gallery
                            </NavLink>
                        </div>

                        <div className={styles.boards_content_container_in_item_2_4_item}>
                            <div className={styles.boards_content_container_in_item_2_4_item_1_item}>
                                <div className={styles.boards_content_container_in_item_2_4_item_1_item_1_item}>
                                    <FaUser />
                                </div>
                                <div className={styles.boards_content_container_in_item_2_4_item_1_item_2_item}>
                                    Your boards
                                </div>
                            </div>

                            <div className={styles.boards_content_container_in_item_2_4_item_1_item_1_0_item}>
                                <div className={styles.boards_content_container_in_item_2_4_item_1_item_1_0_item_1_item}>

                                    {
                                        allProjectsHkArr.map((val: any) => {

                                            return (
                                                <NavLink onClick={() => foo(val.id)} to={`/currentBoard/${val.id}`} >
                                                    <div className={styles.boards_content_container_in_item_2_4_item_1_item_1_0_item_1_item_1_item}>
                                                        {val.boardName}
                                                    </div>
                                                </NavLink>
                                            )
                                        })
                                    }
                                </div>

                                <div onClick={() => setNewProjectModal(true)} className={styles.boards_content_container_in_item_2_4_item_1_item_1_0_item_2_item}>
                                    Create new board
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            {
                newProjectModal
                    ?
                    <div className={styles.board_modal}>
                        <div className={styles.board_modal_1_item} onClick={() => setNewProjectModal(false)}>
                            <FaXmark />
                        </div>

                        <input className={styles.board_modal_3_item} onChange={(e) => setNewProjectName(e.target.value)} />
                        <div onClick={() => {
                            setNewProjectModal(false)
                            createNewProjectCompFunc()
                        }

                        }
                            className={styles.board_modal_2_item}>
                            Create
                        </div>
                    </div>
                    :
                    null
            }


        </>
    )
}

type OwnProps = {}


export default Boards