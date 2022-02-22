import { createSlice } from '@reduxjs/toolkit'

export const rosterSlice = createSlice({
    name:'roster',
    initialState: {
        roster:[]
    },
    reducers: {
        setRoster: (state,roster) => {
            return {...state,roster: roster.payload}
        },
        clearRoster:() => {
            return []
        }
    }
})

export const { setRoster, clearRoster }  = rosterSlice.actions

export default rosterSlice.reducer