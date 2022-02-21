import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menuSlice'
import sessionReducer from './reducers/sessionSlice'

export default configureStore({
    reducer: {
        menu: menuReducer,
        session: sessionReducer
    }
})