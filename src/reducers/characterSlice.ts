import { createSlice } from '@reduxjs/toolkit'
import { current } from 'immer'
import Character, { CharacterCrafting } from '../interfaces/character'

interface CharacterState extends Character {

}

const initialState: CharacterState =  {
        characterName: '',
        primaryWeapon1: '',
        primaryWeapon2: '',
        primaryRole: '',
        primaryArmor: '',
        primaryGS: '',
        secondaryWeapon1: '',
        secondaryWeapon2: '',
        secondaryRole: '',
        secondaryArmor: '',
        secondaryGS: '',
        discordUserName: '',
        inactive: false,
        crafting: {
                weaponSmithing: false,
                armoring: false,
                engineering: false,
                jewelCrafting: false,
                arcana: false,
                cooking: false,
                furnishing: false
        }
    }

export const characterSlice = createSlice({
    name:'character',
    initialState: initialState,
    reducers: {
        saveCharacter: (state,payload: {type: string, payload: Character}) => {
            const character = payload.payload ?? initialState
            return character
        },
        clearCharacter: () => {
            return initialState
        },
        toggleTradeSkill: (state,payload: {type: string, payload: string}) => {
            const tradeSkill = payload.payload
            let currentState: CharacterState = current(state)
            let newValue: boolean = !currentState.crafting[tradeSkill as keyof CharacterCrafting]
            return {...state,crafting: {...state.crafting,[tradeSkill]: newValue}}
        }
    }
})

export const { clearCharacter, saveCharacter, toggleTradeSkill }  = characterSlice.actions

export default characterSlice.reducer