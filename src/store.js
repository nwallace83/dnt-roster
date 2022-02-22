import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menuSlice'
import sessionReducer from './reducers/sessionSlice'
import characterReducer from './reducers/characterSlice'
import rosterReducer from './reducers/rosterSlice'

export default configureStore({
    reducer: {
        menu: menuReducer,
        session: sessionReducer,
        character: characterReducer,
        roster: rosterReducer
    }
})