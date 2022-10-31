import { createSlice } from '@reduxjs/toolkit'
import { current } from 'immer'
import Character, { CharacterCrafting } from '../interfaces/character'
import Crafters from '../interfaces/crafters'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'

interface State {
    roster: Array<Character>,
    filteredRoster:  Array<Character>,
    showInactive: boolean,
    crafters: {
            weaponSmithing: Array<string>,
            armoring: Array<string>,
            engineering: Array<string>,
            jewelCrafting: Array<string>,
            arcana: Array<string>,
            cooking: Array<string>,
            furnishing: Array<string>
    }
}

let initialState: State = {
    roster:[],
    filteredRoster: [],
    showInactive: false,
    crafters: {
            weaponSmithing: [],
            armoring: [],
            engineering: [],
            jewelCrafting: [],
            arcana: [],
            cooking: [],
            furnishing: []
    }
}

function removeCharacter(roster: Array<Character>,character: Character): Array<Character> {
    return filter(roster,char => {return char.id !== character.id})
}

function removeInactive(roster: Array<Character>): Array<Character> {
    return filter(roster,char => {return !char.inactive })
}

function sortRoster(roster: Array<Character>): Array<Character> {
    return sortBy(roster,(character: Character) => {
        return character.characterName
    })
}


function getCraftersForSkill(roster: Array<Character>,skill: string): Array<string> {
    let crafters: Array<string> = []

    roster.forEach(character => {
        if (!character.inactive) {
            if (character && character.crafting && character.crafting[skill as keyof CharacterCrafting]) {
                crafters.push(character.characterName)
            }
        }
    })
    return crafters
}

export const rosterSlice = createSlice({
    name:'roster',
    initialState: initialState,
    reducers: {
        setRoster: (state,payload: {type: string, payload: Array<Character>}): State => {
            const roster = payload.payload
            let sortedRoster: Array<Character> = sortRoster(roster)
            let crafters: Crafters = {
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
        clearRoster:(): State => {
            return initialState
        },
        toggleShowInactive:(state) => {
            return {...state,showInactive: !state.showInactive}
        },
        replaceCharacter:(state,character: {type: string, payload: Character}): State => {
            let roster: Array<Character> = removeCharacter(current(state.roster),character.payload)
            let filteredRoster: Array<Character> = removeCharacter(current(state.filteredRoster),character.payload)

            roster.push(character.payload)
            filteredRoster.push(character.payload)

            let rosterSorted: Array<Character>  = sortRoster(roster)
            let filteredRosterSorted: Array<Character> = sortRoster(filteredRoster)

            return {...state,roster: rosterSorted, filteredRoster: filteredRosterSorted}

        },
        applyFilter: (state,filterValue: {type: string, payload: string}): State => {
            let filteredCharacters: Array<Character>

            if (filterValue.payload.length === 0) {
                if (!state.showInactive) {
                    filteredCharacters = removeInactive(current(state.roster))
                } else {
                    filteredCharacters = current(state.roster)
                }
                return {...state,filteredRoster: filteredCharacters}
            }

            let roster: Array<Character> = current(state.roster)

            filteredCharacters = filter(roster,(character) => {
                let dataString: string = character.characterName +
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