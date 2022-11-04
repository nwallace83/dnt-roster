import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menuSlice'
import sessionReducer from './reducers/sessionSlice'
import rosterReducer from './reducers/rosterSlice'
import { reducer as toastrReducer } from 'react-redux-toastr'

let store =  configureStore({
    reducer: {
        menu: menuReducer,
        session: sessionReducer,
        roster: rosterReducer,
        toastr: toastrReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch