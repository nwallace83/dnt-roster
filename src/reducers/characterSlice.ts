import { createSlice } from '@reduxjs/toolkit'
import { current } from 'immer'
import Character, { CharacterCrafting } from '../interfaces/character'

interface State {
    characterName: string,
    primaryWeapon1: string,
    primaryWeapon2: string,
    primaryRole: string,
    primaryArmor: string,
    primaryGS: string,
    secondaryWeapon1: string,
    secondaryWeapon2: string,
    secondaryRole: string,
    secondaryArmor: string,
    secondaryGS: string,
    discordUserName: string,
    inactive: boolean,
    crafting: {
            weaponSmithing: boolean,
            armoring: boolean,
            engineering: boolean,
            jewelCrafting: boolean,
            arcana: boolean,
            cooking: boolean,
            furnishing: boolean,
    } 
}
const initialState: State =  {
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
            const character = payload.payload
            if (character && character.characterName && character.crafting) {
                return character
            } else {
                return {...state,initialState}
            }
        },
        clearCharacter: () => {
            return initialState
        },
        toggleTradeSkill: (state,payload: {type: string, payload: string}) => {
            const tradeSkill = payload.payload
            let currentState: State = current(state)
            let newValue: boolean = !currentState.crafting[tradeSkill as keyof CharacterCrafting]
            return {...state,crafting: {...state.crafting,[tradeSkill]: newValue}}
        }
    }
})

export const { clearCharacter, saveCharacter, toggleTradeSkill }  = characterSlice.actions

export default characterSlice.reducer