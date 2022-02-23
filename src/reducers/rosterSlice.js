import { createSlice } from '@reduxjs/toolkit'
import { current } from 'immer'
import _ from 'lodash'

export const rosterSlice = createSlice({
    name:'roster',
    initialState: {
        roster:[],
        filteredRoster: []
    },
    reducers: {
        setRoster: (state,roster) => {
            let sortedRoster = _.sortBy(roster.payload,(character) => {
                return character.characterName
            })

            return {...state,roster: sortedRoster,filteredRoster: sortedRoster}
        },
        clearRoster:() => {
            return this.initialState
        },
        applyFilter: (state,filterValue) => {
            if (filterValue.length === 0) {
                return {roster: [...state.roster],filteredRoster: [...state.roster]}
            }

            let roster = current(state.roster)

            let filteredCharacters = _.filter(roster,(character) => {
                return character.characterName.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.primaryRole.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.primaryArmor.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.primaryWeapon1.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.primaryWeapon2.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.secondaryRole.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.secondaryArmor.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.secondaryWeapon1.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.secondaryWeapon2.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.discordUserName.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1
            })
            return {roster: [...state.roster],filteredRoster: filteredCharacters}
        }
    }
})

export const { setRoster, clearRoster, applyFilter }  = rosterSlice.actions

export default rosterSlice.reducer