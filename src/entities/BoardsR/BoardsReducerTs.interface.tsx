export interface InitialStateType {
    projectArr: Array<ProjectBoardArrType>,
    currentProjectIndx: number,
}

export interface ProjectBoardArrType {
    boardArr: Array<BoardArrType>,
    boardName: string,
    id: number
}


export interface ItemsObjType {
    id: string,
    title: string,
    comments: Array<ItemsInnerType>,
    boardName: string
}


export interface ItemsInnerType {
    id: number,
    title: string,
    name: string,
    date: string,
    replied: Array<RepliedCommentsType>
}

export interface RepliedCommentsType {
    id: number,
    text: string,
    date: string,
}


export interface BoardArrType {
    id: number,
    title: string,
    boardName: string,
    items: Array<ItemsObjType>
}
