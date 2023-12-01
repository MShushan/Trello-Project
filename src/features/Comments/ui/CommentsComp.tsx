import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './CommentsStl.module.css'
import { ItemsInnerType, ItemsObjType, ProjectBoardArrType } from '../../../entities/BoardsR/BoardsReducerTs.interface'
import { FaAlipay, FaCheck, FaDeleteLeft, FaXmark } from 'react-icons/fa6'
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
            <div className={styles.comment_modal_part_title}>
                {commentsItem?.title}
            </div>
            <div className={styles.comment_modal_part_1_item}>
                <div className={styles.comment_modal_part_1_item_1_item}>
                    Please write description
                </div>
                <div className={styles.comment_modal_part_1_item_2_item}>
                    <input type="text" onChange={(e) => setAddDescriptionTxt(e.target.value)} />
                </div>
                <div className={styles.comment_modal_part_1_item_3_item}>
                    <button onClick={() => addDescriptionFunc(addDescriptionTxt)}>Add desctiption</button>
                </div>
            </div>
            <div className={styles.comment_modal_part_2_item}>
                <div className={styles.comment_modal_part_2_item_1_item}>
                    Here is description
                </div>
                <div className={styles.comment_modal_part_2_item_2_item}>
                    {
                        descriptionTxti
                    }
                </div>
            </div>

            <div className={styles.comment_modal_part_3_item}>

                {
                    commentArr.map((val) => {
                        return (
                            <div className={styles.comment_modal_part_3_item_comment_txt_stl}>
                                <div className={styles.comment_modal_part_3_item_comment_txt_stl_eqs}>
                                    <div className={styles.comment_modal_part_3_item_comment_txt_stl_item}>
                                        {val.title}
                                    </div>


                                    <div onClick={() => removeCommentCompFunc(commentCurrentBoardName, val.id)} className={styles.comment_modal_part_3_item_comment_txt_stl_item_2_item}>
                                        <FaDeleteLeft />
                                    </div>
                                </div>

                                <div className={styles.comment_modal_part_3_item_comment_txt_stl_item_4_item}>

                                    <div className={styles.comment_modal_part_3_item_comment_txt_stl_item_3_item_replied_comment}>
                                        {
                                            val.replied.map((val1) => {
                                                return (
                                                    <div className={styles.comment_modal_part_3_item_comment_txt_stl_item_3_item_replied_comment_item}>
                                                        {val1.text}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        val.id === commentTextContTp
                                            ?
                                            <div className={styles.comment_modal_part_3_item_comment_item}>
                                                <input className={styles.comment_modal_part_3_item_comment_item_1_item} type='text' onChange={(e) => setCommentText(e.target.value)} />
                                                <div className={styles.comment_modal_part_4_item_1_item_1_item}>
                                                    <div onClick={() => {
                                                        setCommentTextContTp(null)
                                                        addCommentCompFunc(val, commentText)
                                                    }} className={styles.comment_modal_part_3_item_comment_item_2_item}>
                                                        <FaCheck />
                                                    </div>
                                                    <div onClick={() => setCommentTextContTp(null)} className={styles.comment_modal_part_3_item_comment_item_2_item}>
                                                        <FaXmark />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div onClick={() => setCommentTextContTp(val.id)} className={styles.boards_item_content_container_2_item}>
                                                Reply
                                            </div>
                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </div>


            <div className={styles.comment_modal_part_4_item}>
                {
                    addGlbComment
                        ?
                        <div className={styles.comment_modal_part_4_item_1_item}>
                            <input placeholder='Please write your comment' className={styles.comment_modal_part_4_item_2_item} type='text' onChange={(e) => setCommentSecText(e.target.value)} />
                            <div className={styles.comment_modal_part_4_item_1_item_1_item}>
                                <div onClick={() => {
                                    addCommentSecCompFunc(commentCurrentBoardName)
                                    setAddGlbComment(true)
                                }}

                                    className={styles.comment_modal_part_4_item_3_item}
                                >
                                    <FaCheck />
                                </div>
                                <div onClick={() => setAddGlbComment(false)} className={styles.comment_modal_part_4_item_3_item}>
                                    <FaXmark />
                                </div>
                            </div>
                        </div>
                        :
                        <div onClick={() => setAddGlbComment(true)} className={styles.comment_modal_part_4_item_1_item_1_item_ovrl}>
                            Add comment
                        </div>
                }
            </div>

            <div className={styles.comment_modal_part_5_item} onClick={() => setIsShowModal(false)}><FaXmark /></div>
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