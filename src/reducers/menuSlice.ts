import { createSlice } from '@reduxjs/toolkit'

interface State {
    activeTab: string | null
}

const initialState: State = {activeTab: localStorage.getItem('activeTab') ? localStorage.getItem('activeTab') : 'roster'}

export const menuSlice = createSlice({
    name:'menu',
    initialState: initialState,
    reducers: {
        changeTab: (state,tab: {type: string, payload: string}): State => {
            localStorage.setItem('activeTab',tab.payload)
            return {...state,activeTab: tab.payload}
        }
    }
})

export const { changeTab }  = menuSlice.actions

export default menuSlice.reducer