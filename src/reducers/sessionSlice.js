import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";

export const sessionSlice = createSlice({
    name:'session',
    initialState: {
        id: "",
        sessionToken: "",
        userName:"",
        avatarURL:""
    },
    reducers: {
        setSession: (state,session) => {
            const decodedWebToken = jwt_decode(session.payload)
            return {...state,
                sessionToken: session.payload,
                id: decodedWebToken.id,
                userName: decodedWebToken.userName,
                avatarURL: "https://cdn.discordapp.com/avatars/" + decodedWebToken.id + "/" + decodedWebToken.avatar,
            }
        },
        clearSession:(state) => {
            return{...state,sessionToken:"", userName:"",id:"",avatar:""}
        }
    }
})

export const { setSession, clearSession }  = sessionSlice.actions

export default sessionSlice.reducer