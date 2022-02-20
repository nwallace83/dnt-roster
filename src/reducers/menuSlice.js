import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
    name:'menu',
    initialState: {
        activeTab: localStorage.getItem("activeTab") ? localStorage.getItem("activeTab") : "roster"
    },
    reducers: {
        changeTab: (state,tab) => {
            localStorage.setItem("activeTab",tab.payload)
            return {...state,activeTab: tab.payload}
        }
    }
})

export const { changeTab }  = menuSlice.actions

export default menuSlice.reducer