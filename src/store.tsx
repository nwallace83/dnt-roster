import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menuSlice'
import sessionReducer from './reducers/sessionSlice'
import characterReducer from './reducers/characterSlice'
import rosterReducer from './reducers/rosterSlice'
import { reducer as toastrReducer } from 'react-redux-toastr'

let store =  configureStore({
    reducer: {
        menu: menuReducer,
        session: sessionReducer,
        character: characterReducer,
        roster: rosterReducer,
        toastr: toastrReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch