import React from 'react'
import styles from './CommentsStl.module.css'
import { ItemsInnerType } from '../../../app/App'

const CommentsComp: React.FC<OwnProps> = ({ commentsArr, setIsShowModal }) => {

    console.log(commentsArr)


    return (
        <div className={styles.comment_modal_part}>
            {
                commentsArr.map((val) => {
                    return (
                        <div>
                            {val.title}
                        </div>
                    )
                })
            }

            <button onClick={() => setIsShowModal(false)}>Close</button>
        </div>
    )
}

export default CommentsComp

interface OwnProps {
    commentsArr: Array<ItemsInnerType>,
    setIsShowModal: (val: boolean) => void
}