import { createSlice } from '@reduxjs/toolkit'
import { current } from 'immer'
import _ from 'lodash'

function removeCharacter(roster,character) {
    return _.filter(roster,char => {return char.id !== character.id})
}

function removeInactive(roster) {
    return _.filter(roster,char => {return !char.inactive })
}

function sortRoster(roster) {
    return _.sortBy(roster,(character) => {
        return character.characterName
    })
}

export const rosterSlice = createSlice({
    name:'roster',
    initialState: {
        roster:[],
        filteredRoster: [],
        showInactive: false
    },
    reducers: {
        setRoster: (state,roster) => {
            let sortedRoster = sortRoster(roster.payload)

            return {...state,showInactive: state.showInactive,roster: sortedRoster,filteredRoster: removeInactive(sortedRoster)}
        },
        clearRoster:() => {
            return this.initialState
        },
        replaceCharacter:(state,character) => {
            let roster = removeCharacter(current(state.roster),character.payload)
            let filteredRoster = removeCharacter(current(state.filteredRoster),character.payload)

            roster.push(character.payload)
            filteredRoster.push(character.payload)

            let rosterSorted = sortRoster(roster)
            let filteredRosterSorted = sortRoster(filteredRoster)

            return {roster: rosterSorted, filteredRoster: filteredRosterSorted}

        },
        applyFilter: (state,filterValue) => {
            let filteredCharacters
            if (filterValue.length === 0) {
                if (!state.showInactive) {
                    filteredCharacters = removeInactive(current(state.roster))
                }
                return {roster: [...state.roster],filteredRoster: filteredCharacters}
            }

            let roster = current(state.roster)

            filteredCharacters = _.filter(roster,(character) => {
                return character.characterName.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.primaryRole.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.primaryArmor.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.primaryWeapon1.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.primaryWeapon2.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1 || 
                            character.discordUserName.toUpperCase().indexOf(filterValue.payload.toUpperCase()) > -1
            })

            if (!state.showInactive) {
                filteredCharacters = removeInactive(filteredCharacters)
            }

            return {roster: [...state.roster],filteredRoster: filteredCharacters}
        }
    }
})

export const { setRoster, clearRoster, applyFilter, replaceCharacter }  = rosterSlice.actions

export default rosterSlice.reducer