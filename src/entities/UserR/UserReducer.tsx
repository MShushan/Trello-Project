import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialState: InitialStateType = {
    userInfo: {
        name: '',
        email: '',
        picture: '',
        userName: '',
        bio: ''
    },
    loading: false,
    error: false
}

export const fetchUserInfo = createAsyncThunk(
    'boards/fetchUserInfo',
    async () => {

        const querySnapshot = await getDocs(collection(db, 'user'))

        return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    }
)

export const userInfoFunc = createAsyncThunk(
    'boards/userInfoFunc',
    async (item: { name: string | null | undefined, email: string | null | undefined, picture: string | null | undefined }) => {

        let collectionRef = await getDocs(collection(db, 'user'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'user', 'cqOVSFbPh2NhHd1WOWA4');

        let projectArrCLone = { ...data[0].projectArrCLone }

        projectArrCLone.name = item.name
        projectArrCLone.email = item.email
        projectArrCLone.picture = item.picture


        await updateDoc(docRef, {
            userInfo: projectArrCLone
        });

        return { ...item }
    }
)


export const userNameChangeFunc = createAsyncThunk(
    'boards/userNameChangeFunc',
    async (item: { str: string }) => {

        let collectionRef = await getDocs(collection(db, 'user'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'user', 'cqOVSFbPh2NhHd1WOWA4');



        let projectArrCLone = { ...data[0].userInfo }

        projectArrCLone.userName = item.str


        await updateDoc(docRef, {
            userInfo: projectArrCLone
        });

        return { ...item }
    }
)

export const userBioChangeFunc = createAsyncThunk(
    'boards/userBioChangeFunc',
    async (item: { str: string }) => {

        let collectionRef = await getDocs(collection(db, 'user'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'user', 'cqOVSFbPh2NhHd1WOWA4');

        let projectArrCLone = { ...data[0].userInfo }

        projectArrCLone.bio = item.str



        await updateDoc(docRef, {
            userInfo: projectArrCLone
        });

        return { ...item }
    }
)


export const userReducerSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserInfo.pending as any]: (state) => {
            state.loading = true
            state.error = false

        },
        [fetchUserInfo.fulfilled as any]: (state, action) => {
            state.loading = false
            state.error = false

            state.userInfo = action.payload[0].userInfo
            // debugger
            // console.log(action)

        },
        [fetchUserInfo.rejected as any]: (state) => {
            state.loading = false
            state.error = true

        },
    }
})


export default userReducerSlice.reducer


interface InitialStateType {
    userInfo: UserInfoType,
    loading: boolean
    error: boolean,
}

export interface UserInfoType {
    name: string,
    email: string,
    picture: string,
    userName: string,
    bio: string
}

