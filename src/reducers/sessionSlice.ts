import { createSlice, Slice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode"


export interface Session {
    id: string,
    sessionToken: string,
    userName:string,
    avatarURL:string,
    isAdmin: boolean
}

const initialState: Session = {
    id: "",
    sessionToken: "",
    userName:"",
    avatarURL:"",
    isAdmin: false
}

interface DecodedWebToken {
    id: string,
    userName: string,
    isAdmin: boolean,
    avatar: string
}

export const sessionSlice: Slice<any> = createSlice({
    name:'session',
    initialState: initialState,
    reducers: {
        setSession: (state,session: {type: string, payload: string}): Session => {
            try {
                const decodedWebToken: DecodedWebToken = jwt_decode(session.payload)
                return {...state,
                    sessionToken: session.payload,
                    id: decodedWebToken.id,
                    userName: decodedWebToken.userName,
                    isAdmin: decodedWebToken.isAdmin,
                    avatarURL: "https://cdn.discordapp.com/avatars/" + decodedWebToken.id + "/" + decodedWebToken.avatar,
                }
            } catch {
                return initialState
            }
        },
        clearSession:(): Session => {
            return initialState
        }
    }
})

export const { setSession, clearSession }  = sessionSlice.actions

export default sessionSlice.reducer