import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'
import Character, { CharacterCrafting } from '../interfaces/character'
import Crafters from '../interfaces/crafters'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'

let initialState: RosterState = {
  roster: [],
  filteredRoster: [],
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

function removeInactive(roster: Character[]): Character[] {
  return filter(roster, char => { return !char.inactive })
}

function sortRoster(roster: Character[]): Character[] {
  return sortBy(roster, (character: Character) => {
    return character.characterName
  })
}


function getCraftersForSkill(roster: Character[], skill: string): string[] {
  let crafters: string[] = []

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
  name: 'roster',
  initialState: initialState,
  reducers: {
    setRoster: (state, payload: { type: string, payload: Character[] }): RosterState => {
      const roster = payload.payload
      let sortedRoster: Character[] = sortRoster(roster)
      let crafters: Crafters = {
        weaponSmithing: getCraftersForSkill(sortedRoster, 'weaponSmithing'),
        armoring: getCraftersForSkill(sortedRoster, 'armoring'),
        engineering: getCraftersForSkill(sortedRoster, 'engineering'),
        jewelCrafting: getCraftersForSkill(sortedRoster, 'jewelCrafting'),
        arcana: getCraftersForSkill(sortedRoster, 'arcana'),
        cooking: getCraftersForSkill(sortedRoster, 'cooking'),
        furnishing: getCraftersForSkill(sortedRoster, 'furnishing')
      }

      return { ...state, crafters: crafters, roster: sortedRoster, filteredRoster: removeInactive(sortedRoster) }
    },
    clearRoster: (): RosterState => {
      return initialState
    },
    replaceCharacter: (state, character: { type: string, payload: Character }): RosterState => {
      if (state.roster.length === 0) {
        return state
      }

      let roster = produce(state.roster,(draft) => {
        return filter(draft, char => { return char.id !== character.payload.id })
      })
      let filteredRoster = produce(state.filteredRoster,(draft) => {
        return filter(draft, char => { return char.id !== character.payload.id })
      })

      roster.push(character.payload)
      filteredRoster.push(character.payload)

      let rosterSorted: Character[] = sortRoster(roster)
      let filteredRosterSorted: Character[] = sortRoster(filteredRoster)

      return { ...state, roster: rosterSorted, filteredRoster: filteredRosterSorted }

    },
    applyFilter: (state, payload: { type: string, payload: applyFilterPayload }): RosterState => {
      const filterpayload = payload.payload
      let newState = produce(state.roster,(rosterClone) => {
        let filteredCharacters = rosterClone

        if (filterpayload.filterValue.length === 0) {
          if (!filterpayload.showInactive) {
            filteredCharacters = removeInactive(rosterClone)
          }
          return filteredCharacters
        }
  
        filteredCharacters = filter(rosterClone, (character) => {
          let dataString: string = character.characterName +
            character.primaryRole +
            character.primaryArmor +
            character.primaryWeapon1 +
            character.primaryWeapon2 +
            character.discordUserName +
            character.primaryGS +
            character.secondaryGS
          dataString = dataString.toUpperCase()
          return dataString.indexOf(filterpayload.filterValue.toUpperCase()) > -1
        })
  
        if (!filterpayload.showInactive) {
          filteredCharacters = removeInactive(filteredCharacters)
        }

        return filteredCharacters
      })

      return { ...state, filteredRoster: newState }
    }
  }
})

interface RosterState {
  roster: Character[],
  filteredRoster: Character[],
  crafters: {
    weaponSmithing: string[],
    armoring: string[],
    engineering: string[],
    jewelCrafting: string[],
    arcana: string[],
    cooking: string[],
    furnishing: string[]
  }
}

interface applyFilterPayload {
  showInactive: boolean
  filterValue: string
}

export const { setRoster, clearRoster, applyFilter, replaceCharacter } = rosterSlice.actions

export default rosterSlice.reducer
