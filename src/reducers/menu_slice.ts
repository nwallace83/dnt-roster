import { createSlice } from '@reduxjs/toolkit'

interface MenuState {
    activeTab: string
}

const initialState: MenuState = {activeTab: localStorage.getItem('activeTab') ?? 'roster'}

export const menuSlice = createSlice({
    name:'menu',
    initialState: initialState,
    reducers: {
        changeTab: (state,tab: {type: string, payload: string}): MenuState => {
            localStorage.setItem('activeTab',tab.payload)
            return {...state,activeTab: tab.payload}
        }
    }
})

export const { changeTab }  = menuSlice.actions

export default menuSlice.reducer