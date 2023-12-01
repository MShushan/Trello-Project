import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { FaCheck, FaComment, FaDeleteLeft, FaPencil, FaPlus, FaXmark } from 'react-icons/fa6'
// import { BoardArrType, ItemsInnerType, ItemsObjType } from 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import IssueInfo from '../../../features/Comments';
import { BoardArrType, ItemsInnerType, ItemsObjType } from '../../../entities/BoardsR/BoardsReducerTs.interface';
import { addIssueAFunc, createBoard, deleteBoardItem, fetchPosts } from '../../../entities/BoardsR/BoardsReducer';
import IssueComp from '../../../features/IssueItems';
import { useParams } from 'react-router-dom';
import { AppStateType, useAppDispatch } from '../../../entities/Store/store';


const BoardsItems: React.FC<OwnProps> = ({ boardArr, setChangeBoard, changeBoard }) => {

    const [bv, setbv] = useState<Array<BoardArrType>>([])

    const ss = useSelector((state: AppStateType) => state.boardsReducer.currentProjectIndx)
    console.log(ss)



    const arr = useSelector((state: AppStateType) => state.boardsReducer.projectArr)

    useEffect(() => {

        for (let i in arr) {
            if (arr[i].id === ss.num) {
                setbv(arr[i].boardArr)
            }
        }
        console.log(arr, ss)
    }, [arr])



    const asyncDispatch = useAppDispatch()


    let activeId = useParams()
    let activeIdNum = activeId.id

    const currentProject = useSelector((state: AppStateType) => state.boardsReducer.projectArr[Number(activeIdNum)])

    const [isShowModal, setIsShowModal] = useState<boolean>(false)


    const [commentsArr, setCommentsArr] = useState<Array<ItemsInnerType>>([])
    const [commentsItem, setCommentsItem] = useState<ItemsObjType | null>(null)

    const [addCardHktp, setAddCardHktp] = useState<number | null>(null)
    const [newCardVal, setnewCardVal] = useState<string>('')

    const [addBoardValnwName, setAddBoardValnwName] = useState<string>('')

    const [addBoardValCnt, setAddBoardValCnt] = useState<boolean>(false)


    const [commentCurrentId, setCommentCurrentId] = useState<string>('')
    const [commentCurrentBoardName, setCommentCurrentBoardName] = useState<string>('')

    const [cuurentItem, setCuurentItem] = useState<ItemsObjType | null>(null)




    const dispatch = useDispatch()




    const onDragEnd = (result: any) => {

        debugger

        const { source, destination, draggableId } = result;

        console.log(source, destination, draggableId)


        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }



        const sourceColumn: BoardArrType = bv?.find((column) => column.id + '' === source.droppableId) as BoardArrType;

        const destinationColumn: BoardArrType = bv?.find((column) => column.id + '' === destination.droppableId) as BoardArrType;


        const newSourceCards: ItemsObjType[] = Array.from(sourceColumn?.items as ItemsObjType[])


        let [removedCard] = newSourceCards.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {




            newSourceCards.splice(destination.index, 0, removedCard);

            const newColumn: BoardArrType = {
                ...sourceColumn,
                items: newSourceCards,
            };

            if (bv) {
                setbv(bv.map(column => column.id === newColumn.id ? newColumn : column))

            }


        } else {

            const newDestinationCards: ItemsObjType[] = Array.from(destinationColumn.items);
            // removedCard.boardName = destinationColumn.boardName
            removedCard = { ...removedCard, boardName: destinationColumn.boardName }
            newDestinationCards.splice(destination.index, 0, removedCard);


            const newSourceColumn: BoardArrType = {
                ...sourceColumn,
                items: newSourceCards
            }


            const newDestinationColumn: BoardArrType = {
                ...destinationColumn,
                items: newDestinationCards
            }

            if (bv) {
                setbv(bv.map(column => {
                    if (column.id === newSourceColumn.id) return newSourceColumn;
                    if (column.id === newDestinationColumn.id) return newDestinationColumn;
                    return column
                }))
            }
        }



    }




    const changeCommentsFunc = (id: string, boardName: string) => {

        bv.map((val) => {

            // val.boardArr.map((val1) => {
            if (val.boardName === boardName) {

                val.items.map((val1) => {

                    if (val1.id === id) {
                        debugger
                        // setCommentsArr(val1.comments)
                        setCommentsItem(val1)

                        setCommentCurrentBoardName(boardName)
                        setCommentCurrentId(id)
                    }
                })
            }
            // })

        })

    }





    const addCardCompFunc = async (boardName: string) => {
        let cardCloneObj: ItemsObjType = {
            id: uuidv4(),
            boardName: boardName,
            description: '',
            title: newCardVal,
            comments: []
        }
        await asyncDispatch(addIssueAFunc(cardCloneObj))
        await asyncDispatch(fetchPosts())
        setnewCardVal('')
    }

    const addBoardCompFunc = async () => {


        let newBoarObjClone: BoardArrType = {
            id: bv.length,
            title: addBoardValnwName,
            boardName: addBoardValnwName.toLowerCase(),
            items: []
        }

        await asyncDispatch(createBoard(newBoarObjClone))
        await asyncDispatch(fetchPosts())

    }

    const deleteBoardItemCompFunc = async (val: BoardArrType) => {
        await asyncDispatch(deleteBoardItem({ val }))
        await asyncDispatch(fetchPosts())

    }

    return (
        <>

            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <div className={styles.boards_item_content}>
                        <div className={styles.boards_item_title}>
                            {/* {currentProject.boardName} */}
                        </div>
                        <div className={styles.boards_item_content_container}>

                            {

                                bv.map((val, index) => {
                                    return (
                                        <>
                                            <Droppable droppableId={`${val.id}`} key={val.id}>
                                                {
                                                    (provided) => {
                                                        return (
                                                            <div
                                                                {...provided.droppableProps}
                                                                ref={provided.innerRef}
                                                                className={styles.boards_item_content_container_overlay}
                                                            >
                                                                <div className={styles.boards_item_content_container_1_item}>
                                                                    <div className={styles.boards_item_content_container_1_item_1_item}>
                                                                        {val.title}
                                                                    </div>
                                                                    <div className={styles.boards_item_content_container_item_content}>
                                                                        {
                                                                            val.items.map((val1, ind) => {
                                                                                return (
                                                                                    <IssueComp
                                                                                        setCuurentItem={setCuurentItem}
                                                                                        val1={val1}
                                                                                        ind={ind}
                                                                                        changeCommentsFunc={changeCommentsFunc}
                                                                                        setIsShowModal={setIsShowModal}
                                                                                    />
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>


                                                                    {
                                                                        addCardHktp === val.id
                                                                            ?

                                                                            <div>
                                                                                <input type='text' onChange={(e) => setnewCardVal(e.target.value)} />
                                                                                <div>
                                                                                </div>
                                                                                <div onClick={() => {
                                                                                    setAddCardHktp(null)
                                                                                    addCardCompFunc(val.boardName)
                                                                                }} >
                                                                                    <FaCheck />
                                                                                </div>
                                                                                <div onClick={() => setAddCardHktp(null)} >
                                                                                    <FaXmark />
                                                                                </div>

                                                                            </div>

                                                                            :
                                                                            <div onClick={() => setAddCardHktp(val.id)} className={styles.boards_item_content_container_1_item_2_item} >
                                                                                <div className={styles.boards_item_content_container_1_item_2_item_1_item}>
                                                                                    <FaPlus />
                                                                                </div>
                                                                                <div className={styles.boards_item_content_container_1_item_2_item_2_item}>
                                                                                    Add a card
                                                                                </div>
                                                                            </div>

                                                                    }
                                                                    <div onClick={() => deleteBoardItemCompFunc(val)} className={styles.boards_item_content_delete_board}>
                                                                        Delete
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            </Droppable>
                                        </>
                                    )
                                })
                            }

                            {
                                addBoardValCnt
                                    ?
                                    <div className={styles.comment_modal_part_4_item_1_item}>
                                        <input className={styles.comment_modal_part_4_item_2_item} type='text' onChange={(e) => setAddBoardValnwName(e.target.value)} />


                                        <div className={styles.comment_modal_part_4_item_1_item_1_item}>
                                            <div onClick={() => {
                                                // setAddCardHktp(null)
                                                // addCardCompFunc(val.boardName)
                                                setAddBoardValCnt(false)
                                                addBoardCompFunc()
                                            }}
                                                className={styles.comment_modal_part_4_item_3_item}>
                                                <FaCheck />
                                            </div>
                                            <div onClick={() => setAddBoardValCnt(false)} className={styles.comment_modal_part_4_item_3_item}>
                                                <FaXmark />
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    <div onClick={() => setAddBoardValCnt(true)} className={styles.boards_item_content_container_2_item}>
                                        <div className={styles.boards_item_content_container_2_item_1_item}>
                                            <FaPlus />
                                        </div>
                                        <div className={styles.boards_item_content_container_2_item_2_item}>
                                            Add another list
                                        </div>
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            </DragDropContext >

            {
                isShowModal
                    ?
                    <IssueInfo commentCurrentId={commentCurrentId} commentCurrentBoardName={commentCurrentBoardName} commentsItem={commentsItem} setIsShowModal={setIsShowModal} commentsArr={commentsArr} />
                    :
                    null
            }

        </>
    )
}



export default BoardsItems

interface OwnProps {
    boardArr: Array<BoardArrType> | null,
    setChangeBoard: (arr: Array<BoardArrType>) => void,
    changeBoard: Array<BoardArrType> | null
}