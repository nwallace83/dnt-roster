import { createSlice, Slice } from '@reduxjs/toolkit'
import { current } from 'immer'
import { CharacterCrafting } from '../interfaces/character'

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
        characterName: "",
        primaryWeapon1: "",
        primaryWeapon2: "",
        primaryRole: "",
        primaryArmor: "",
        primaryGS: "",
        secondaryWeapon1: "",
        secondaryWeapon2: "",
        secondaryRole: "",
        secondaryArmor: "",
        secondaryGS: "",
        discordUserName: "",
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

export const characterSlice: Slice<any> = createSlice({
    name:'character',
    initialState: initialState,
    reducers: {
        saveCharacter: (state,character) => {
            if (character.payload && character.payload.characterName && character.payload.crafting) {
                return character.payload
            } else {
                return initialState
            }

        },
        clearCharacter: (state) => {
            return initialState
        },
        toggleTradeSkill: (state,tradeSkill) => {
            let currentState: State = current(state)
            let newValue = !currentState.crafting[tradeSkill.payload as keyof CharacterCrafting]
            return {...state,crafting: {...state.crafting,[tradeSkill.payload]: newValue}}
        }
    }
})

export const { clearCharacter, saveCharacter, toggleTradeSkill }  = characterSlice.actions

export default characterSlice.reducer