import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './CommentsStl.module.css'
import { ItemsInnerType, ItemsObjType, ProjectBoardArrType } from '../../../entities/BoardsR/BoardsReducerTs.interface'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { addCommentFunc, addCommentGlbFunc } from '../../../entities/BoardsR/BoardsReducer'


const IssueInfo: React.FC<OwnProps> = ({ commentsArr, setIsShowModal, commentsItem, commentCurrentBoardName }) => {

    const dispatch = useDispatch()


    const [commentText, setCommentText] = useState<string>('')
    const [commentTextContTp, setCommentTextContTp] = useState<number | null>(null)

    const [addGlbComment, setAddGlbComment] = useState<boolean>(false)
    const [commentSecText, setCommentSecText] = useState<string>('')


    const addCommentCompFunc = (val: ItemsInnerType, str: string) => {
        dispatch(addCommentFunc({ val, str, commentsItem }))
    }

    const addCommentSecCompFunc = (proj: string) => {
        dispatch(addCommentGlbFunc({ item: commentsItem, proj, str: commentSecText }))
    }


    return (
        <div className={styles.comment_modal_part}>
            {
                commentsArr.map((val) => {
                    return (
                        <div>
                            {val.title}
                            <div style={{ paddingLeft: '3em' }}>
                                {
                                    val.replied.map((val1) => {
                                        return (
                                            <div>
                                                {val1.text}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>

                                {
                                    val.id === commentTextContTp
                                        ?
                                        <div>
                                            <input type='text' onChange={(e) => setCommentText(e.target.value)} />
                                            <div>
                                            </div>
                                            <div onClick={() => {
                                                setCommentTextContTp(null)
                                                addCommentCompFunc(val, commentText)
                                            }} >
                                                <FaCheck />
                                            </div>
                                            <div onClick={() => setCommentTextContTp(null)} >
                                                <FaXmark />
                                            </div>
                                        </div>
                                        :
                                        <div onClick={() => setCommentTextContTp(val.id)} className={styles.boards_item_content_container_2_item}>
                                            ___ replie comment
                                        </div>
                                }

                            </div>
                        </div>
                    )
                })
            }


            <div>
                {
                    addGlbComment
                        ?
                        <div>
                            <input type='text' onChange={(e) => setCommentSecText(e.target.value)} />
                            <div onClick={() => {
                                addCommentSecCompFunc(commentCurrentBoardName)
                                setAddGlbComment(true)
                            }}>
                                <FaCheck />
                            </div>
                            <div onClick={() => setAddGlbComment(false)}>
                                <FaXmark />
                            </div>
                        </div>
                        :
                        <div onClick={() => setAddGlbComment(true)}>
                            Add comment
                        </div>
                }
            </div>

            <button onClick={() => setIsShowModal(false)}>Close</button>
        </div>
    )
}

export default IssueInfo

interface OwnProps {
    commentsArr: Array<ItemsInnerType>,
    setIsShowModal: (val: boolean) => void,
    commentsItem: ItemsObjType | null,
    commentCurrentBoardName: string

}