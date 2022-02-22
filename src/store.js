import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menuSlice'
import sessionReducer from './reducers/sessionSlice'
import characterReducer from './reducers/characterSlice'

export default configureStore({
    reducer: {
        menu: menuReducer,
        session: sessionReducer,
        character: characterReducer
    }
})