import { createSlice } from '@reduxjs/toolkit'

const initialState: SessionState = {
  id: '',
  sessionToken: '',
  userName: '',
  avatarURL: '',
  isAdmin: false
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    setSession: (state, payload: { type: string, payload: User }) => {
      const session = payload.payload
      try {
        return {
          ...state,
          id: session.id,
          userName: session.user_name,
          isAdmin: session.is_admin,
          avatarURL: 'https://cdn.discordapp.com/avatars/' + session.id + '/' + session.avatar,
        }
      } catch {
        return initialState
      }
    },
    clearSession: () => {
      return initialState
    }
  }
})

export interface SessionState {
  id: string,
  sessionToken: string,
  userName: string,
  avatarURL: string,
  isAdmin: boolean
}

interface User {
  id: string,
  user_name: string,
  is_admin: boolean,
  avatar: string
}

export const { setSession, clearSession } = sessionSlice.actions

export default sessionSlice.reducer