import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './IssueCompStl.module.css'
import { BoardArrType, ItemsInnerType, ItemsObjType } from '../../../entities/BoardsR/BoardsReducerTs.interface'
import { Draggable } from 'react-beautiful-dnd'
import { FaCheck, FaComment, FaPencil, FaXmark } from 'react-icons/fa6'
import { changeIssueNameAFunc, deleteIssue, fetchPosts } from '../../../entities/BoardsR/BoardsReducer'
import { useAppDispatch } from '../../../entities/Store/store'
// import { changeIssueNameFunc } from '../../../entities/BoardsR/BoardsReducer'


const IssueComp: React.FC<OwnProps> = ({ val1, ind, changeCommentsFunc, setCuurentItem, setIsShowModal }) => {


    const dispatch = useDispatch()

    const asyncDispatch = useAppDispatch()


    const [changedIssueNameCntTp, setChangedIssueNameCntTp] = useState<boolean>(false)

    const [changedIssueName, setChangedIssueName] = useState<string>('')

    const changeIssueFunc = async () => {
        await asyncDispatch(changeIssueNameAFunc({ val1, str: changedIssueName }))
        await asyncDispatch(fetchPosts())

    }

    const deleteIssueCompFunc = async (val1: ItemsObjType) => {
        await asyncDispatch(deleteIssue({ issueInfo: val1 }))
        await asyncDispatch(fetchPosts())

    }


    return (

        <Draggable key={val1.id} draggableId={val1.id} index={ind}>
            {
                (provided) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='card'
                        >
                            <div className={styles.boards_item_content_container_item_content_container}>
                                <div className={styles.boards_item_content_container_item_content_title}>
                                    {val1.title}
                                </div>
                                <div className={styles.boards_item_content_container_item_content_text}>
                                    <div onClick={() => {

                                        changeCommentsFunc(val1.id, val1.boardName)
                                        setIsShowModal(true)
                                        setCuurentItem(val1)
                                    }
                                    } className={styles.boards_item_content_container_item_content_text_1_item}>
                                        <FaComment />
                                    </div>
                                    {
                                        !changedIssueNameCntTp
                                            ?
                                            <div onClick={() => setChangedIssueNameCntTp(true)} className={styles.boards_item_content_container_item_content_text_1_item}>
                                                <FaPencil />
                                            </div>
                                            :

                                            <div>
                                                <input type='text' onChange={(e) => setChangedIssueName(e.target.value)} />
                                                <div>
                                                </div>
                                                <div onClick={() => {
                                                    setChangedIssueNameCntTp(false)
                                                    changeIssueFunc()
                                                }} >
                                                    <FaCheck />
                                                </div>
                                                <div onClick={() => setChangedIssueNameCntTp(false)} >
                                                    <FaXmark />
                                                </div>
                                            </div>

                                    }
                                    <div onClick={() => deleteIssueCompFunc(val1)}>
                                        delete
                                    </div>

                                </div>
                            </div>

                        </div>
                    )
                }
            }
        </Draggable>
    )
}

export default IssueComp

interface OwnProps {
    val1: ItemsObjType,
    ind: number,
    changeCommentsFunc: (id: string, boardName: string) => void,
    setIsShowModal: (info: boolean) => void,
    setCuurentItem: (item: ItemsObjType) => void
}










