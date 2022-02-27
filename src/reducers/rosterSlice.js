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

function getCraftersForSkill(roster,skill) {
    let crafters = []
    roster.forEach(character => {
        if (!character.inactive) {
            if (character && character.crafting && character.crafting[skill]) {
                crafters.push(character.characterName)
            }
        }
    })
    return crafters
}

export const rosterSlice = createSlice({
    name:'roster',
    initialState: {
        roster:[],
        filteredRoster: [],
        crafters: {
                weaponSmithing: [],
                armoring: [],
                engineering: [],
                jewelCrafting: [],
                arcana: [],
                cooking: [],
                furnishing: []
        },
        showInactive: false
    },
    reducers: {
        setRoster: (state,roster) => {
            let sortedRoster = sortRoster(roster.payload)
            let crafters = {
                weaponSmithing: getCraftersForSkill(sortedRoster,'weaponSmithing'),
                armoring: getCraftersForSkill(sortedRoster,'armoring'),
                engineering: getCraftersForSkill(sortedRoster,'engineering'),
                jewelCrafting: getCraftersForSkill(sortedRoster,'jewelCrafting'),
                arcana: getCraftersForSkill(sortedRoster,'arcana'),
                cooking: getCraftersForSkill(sortedRoster,'cooking'),
                furnishing: getCraftersForSkill(sortedRoster,'furnishing')
            }

            return {...state,crafters: crafters, roster: sortedRoster,filteredRoster: removeInactive(sortedRoster)}
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