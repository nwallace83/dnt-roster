import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";

export const sessionSlice = createSlice({
    name:'session',
    initialState: {
        sessionToken: "",
        userName:""
    },
    reducers: {
        setSession: (state,session) => {
            const decodedWebToken = jwt_decode(session.payload)
            return {...state,
                sessionToken: session.payload,
                userName: decodedWebToken.userName
            }
        },
        clearSession:(state) => {
            return{...state,sessionToken:"", userName:""}
        }
    }
})

export const { setSession, clearSession }  = sessionSlice.actions

export default sessionSlice.reducer