import React from 'react'
import styles from '../styles/index.module.css'
import { FaPlus } from 'react-icons/fa6'



const BoardsItems: React.FC<OwnProps> = () => {

    let boardArr = [
        {
            id: 0,
            title: 'To do'
        },
        {
            id: 1,
            title: 'Doing'
        },
        {
            id: 2,
            title: 'Done'
        },
    ]



    return (
        <div>


            <div className={styles.boards_item_content}>
                <div className={styles.boards_item_title}>
                    My Trello board
                </div>
                <div className={styles.boards_item_content_container}>
                    {
                        boardArr.map((val) => {
                            return (
                                <div className={styles.boards_item_content_container_1_item}>
                                    <div className={styles.boards_item_content_container_1_item_1_item}>
                                        {val.title}
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
    )
}



export default BoardsItems

type OwnProps = {}