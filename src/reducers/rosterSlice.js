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

            return {...state,roster: sortedRoster,filteredRoster: removeInactive(sortedRoster)}
        },
        clearRoster:() => {
            return this.initialState
        },
        toggleShowInactive:(state) => {
            return {...state,showInactive: !state.showInactive}
        },
        replaceCharacter:(state,character) => {
            let roster = removeCharacter(current(state.roster),character.payload)
            let filteredRoster = removeCharacter(current(state.filteredRoster),character.payload)

            roster.push(character.payload)
            filteredRoster.push(character.payload)

            let rosterSorted = sortRoster(roster)
            let filteredRosterSorted = sortRoster(filteredRoster)

            return {...state,roster: rosterSorted, filteredRoster: filteredRosterSorted}

        },
        applyFilter: (state,filterValue) => {
            let filteredCharacters
            if (filterValue.length === 0) {
                if (!state.showInactive) {
                    filteredCharacters = removeInactive(current(state.roster))
                }
                return {...state,filteredRoster: filteredCharacters}
            }

            let roster = current(state.roster)

            filteredCharacters = _.filter(roster,(character) => {
                let dataString = character.characterName +
                                     character.primaryRole +
                                     character.primaryArmor +
                                     character.primaryWeapon1 +
                                     character.primaryWeapon2 +
                                     character.discordUserName +
                                     character.primaryGS +
                                     character.secondaryGS
                dataString = dataString.toUpperCase()
                return dataString.indexOf(filterValue.payload.toUpperCase()) > -1
            })

            if (!state.showInactive) {
                filteredCharacters = removeInactive(filteredCharacters)
            }

            return {...state,filteredRoster: filteredCharacters}
        }
    }
})

export const { setRoster, clearRoster, applyFilter, replaceCharacter, toggleShowInactive }  = rosterSlice.actions

export default rosterSlice.reducer