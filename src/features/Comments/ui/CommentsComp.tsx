import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './CommentsStl.module.css'
import { ItemsInnerType, ItemsObjType, ProjectBoardArrType } from '../../../entities/BoardsR/BoardsReducerTs.interface'
import { FaAlipay, FaCheck, FaXmark } from 'react-icons/fa6'
import { AppStateType, useAppDispatch } from '../../../entities/Store/store'
import { addCommentFunc, addCommentGlbFunc, addDescription, fetchPosts, removeCommentFunc } from '../../../entities/BoardsR/BoardsReducer'


const IssueInfo: React.FC<OwnProps> = ({ commentCurrentId, setIsShowModal, commentsItem, commentCurrentBoardName }) => {

    const dispatch = useDispatch()
    const asyncDispatch = useAppDispatch()

    const [commentArr, setCommentArr] = useState<Array<ItemsInnerType>>([])
    const arr = useSelector((state: AppStateType) => state.boardsReducer.projectArr)
    const ss = useSelector((state: AppStateType) => state.boardsReducer.currentProjectIndx)

    const [descriptionTxti, setDescriptionTxti] = useState<string>('')



    useEffect(() => {

        arr.map((val) => {
            if (val.id === ss.num) {

                // val.boardArr.map((val1) => {

                val.boardArr.map((val2) => {

                    val2.items.map((val1) => {

                        if (val1.id === commentCurrentId) {

                            setCommentArr(val1.comments)
                            setDescriptionTxti(val1.description)
                        }
                    })

                })


                // })
            }
        })
    }, [arr])



    const [commentText, setCommentText] = useState<string>('')
    const [commentTextContTp, setCommentTextContTp] = useState<number | null>(null)

    const [addGlbComment, setAddGlbComment] = useState<boolean>(false)
    const [commentSecText, setCommentSecText] = useState<string>('')


    const addCommentCompFunc = async (val: ItemsInnerType, str: string) => {
        await asyncDispatch(addCommentFunc({ val, str, commentsItem }))
        await asyncDispatch(fetchPosts())

    }

    const addCommentSecCompFunc = async (proj: string) => {

        await asyncDispatch(addCommentGlbFunc({ item: commentsItem, proj, str: commentSecText }))
        await asyncDispatch(fetchPosts())

    }

    const [addDescriptionTxt, setAddDescriptionTxt] = useState<string>('')

    const addDescriptionFunc = async (str: string) => {



        await asyncDispatch(addDescription({ item: commentsItem, str }))
        await asyncDispatch(fetchPosts())

    }

    const removeCommentCompFunc = async (proj: string, id: number) => {
        await asyncDispatch(removeCommentFunc({ item: commentsItem, proj, str: commentSecText, id }))
        await asyncDispatch(fetchPosts())

    }

    return (
        <div className={styles.comment_modal_part}>
            <div >
                Wiret description
                <input type="text" onChange={(e) => setAddDescriptionTxt(e.target.value)} />
                <button onClick={() => addDescriptionFunc(addDescriptionTxt)}>Add desctiption</button>
            </div>
            <div>
                here is description
                {
                    descriptionTxti
                }
            </div>

            {
                commentArr.map((val) => {
                    return (
                        <div>
                            {val.title}
                            <div onClick={() => removeCommentCompFunc(commentCurrentBoardName, val.id)}>
                                <FaAlipay />
                            </div>
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
    commentCurrentBoardName: string,
    commentCurrentId: string

}