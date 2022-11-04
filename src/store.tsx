import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menu_slice'
import sessionReducer from './reducers/session_slice'
import rosterReducer from './reducers/roster_slice'
import characterReducer from './reducers/character_slice'
import { reducer as toastrReducer } from 'react-redux-toastr'

let store =  configureStore({
    reducer: {
        menu: menuReducer,
        session: sessionReducer,
        roster: rosterReducer,
        character: characterReducer,
        toastr: toastrReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch