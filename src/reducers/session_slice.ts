import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'

export interface SessionState {
    id: string,
    sessionToken: string,
    userName:string,
    avatarURL:string,
    isAdmin: boolean
}

const initialState: SessionState = {
    id: '',
    sessionToken: '',
    userName:'',
    avatarURL:'',
    isAdmin: false
}

interface DecodedWebToken {
    id: string,
    userName: string,
    isAdmin: boolean,
    avatar: string
}

export const sessionSlice = createSlice({
    name:'session',
    initialState: initialState,
    reducers: {
        setSession: (state,payload: {type: string, payload: string}) => {
            const session = payload.payload
            try {
                const decodedWebToken: DecodedWebToken = jwt_decode(session)
                return {...state,
                    sessionToken: session,
                    id: decodedWebToken.id,
                    userName: decodedWebToken.userName,
                    isAdmin: decodedWebToken.isAdmin,
                    avatarURL: 'https://cdn.discordapp.com/avatars/' + decodedWebToken.id + '/' + decodedWebToken.avatar,
                }
            } catch {
                return initialState
            }
        },
        clearSession:() => {
            return initialState
        }
    }
})

export const { setSession, clearSession }  = sessionSlice.actions

export default sessionSlice.reducer