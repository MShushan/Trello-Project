import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/index.module.css'
import { FaComment, FaPencil, FaPlus } from 'react-icons/fa6'
import { BoardArrType, ItemsInnerType, ItemsObjType } from '../../../app/App'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CommentsComp from '../../../features/Comments';



const BoardsItems: React.FC<OwnProps> = ({ boardArr, setChangeBoard, changeBoard }) => {

    const [isShowModal, setIsShowModal] = useState<boolean>(false)


    const [commentsArr, setCommentsArr] = useState<Array<ItemsInnerType>>([])



    const onDragEnd = (result: any) => {

        // debugger

        const { source, destination, draggableId } = result;

        console.log(source, destination, draggableId)


        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }



        const sourceColumn: BoardArrType = changeBoard.find((column) => column.id + '' === source.droppableId) as BoardArrType;

        const destinationColumn: BoardArrType = changeBoard.find((column) => column.id + '' === destination.droppableId) as BoardArrType;


        const newSourceCards: ItemsObjType[] = Array.from(sourceColumn?.items as ItemsObjType[])


        const [removedCard] = newSourceCards.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {




            newSourceCards.splice(destination.index, 0, removedCard);

            const newColumn: BoardArrType = {
                ...sourceColumn,
                items: newSourceCards,
            };

            setChangeBoard(changeBoard.map(column => column.id === newColumn.id ? newColumn : column))

        } else {

            const newDestinationCards: ItemsObjType[] = Array.from(destinationColumn.items);
            removedCard.boardName = destinationColumn.boardName
            newDestinationCards.splice(destination.index, 0, removedCard);


            const newSourceColumn: BoardArrType = {
                ...sourceColumn,
                items: newSourceCards
            }


            const newDestinationColumn: BoardArrType = {
                ...destinationColumn,
                items: newDestinationCards
            }


            setChangeBoard(changeBoard.map(column => {
                if (column.id === newSourceColumn.id) return newSourceColumn;
                if (column.id === newDestinationColumn.id) return newDestinationColumn;
                return column
            }))
        }



    }



    const changeCommentsFunc = (id: string, boardName: string) => {
        changeBoard.map((val) => {
            if (val.boardName === boardName) {
                val.items.map((val1) => {
                    if (val1.id === id) {
                        setCommentsArr(val1.comments)
                    }
                })
            }
        })

    }





    return (
        <>

            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <div className={styles.boards_item_content}>
                        <div className={styles.boards_item_title}>
                            My Trello board
                        </div>
                        <div className={styles.boards_item_content_container}>

                            {
                                changeBoard.map((val, index) => {
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
                                                                                                                }
                                                                                                                } className={styles.boards_item_content_container_item_content_text_1_item}>
                                                                                                                    <FaComment />
                                                                                                                </div>
                                                                                                                <div className={styles.boards_item_content_container_item_content_text_1_item}>
                                                                                                                    <FaPencil />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                        }
                                                                                    </Draggable>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className={styles.boards_item_content_container_1_item_2_item}>
                                                                        <div className={styles.boards_item_content_container_1_item_2_item_1_item}>
                                                                            <FaPlus />
                                                                        </div>
                                                                        <div className={styles.boards_item_content_container_1_item_2_item_2_item}>
                                                                            Add a card
                                                                        </div>
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



                            <div className={styles.boards_item_content_container_2_item}>
                                <div className={styles.boards_item_content_container_2_item_1_item}>
                                    <FaPlus />
                                </div>
                                <div className={styles.boards_item_content_container_2_item_2_item}>
                                    Add another list
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </DragDropContext>

            {
                isShowModal
                    ?
                    <CommentsComp setIsShowModal={setIsShowModal} commentsArr={commentsArr} />
                    :
                    null
            }

        </>
    )
}



export default BoardsItems

interface OwnProps {
    boardArr: Array<BoardArrType>,
    setChangeBoard: (arr: Array<BoardArrType>) => void,
    changeBoard: Array<BoardArrType>
}