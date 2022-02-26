import { createSlice } from '@reduxjs/toolkit'
import { current } from 'immer'

const initialState =  {
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

export const characterSlice = createSlice({
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
            let currentState = current(state)
            let newValue = !currentState.crafting[tradeSkill.payload]
            return {...state,crafting: {...state.crafting,[tradeSkill.payload]: newValue}}
        }
    }
})

export const { clearCharacter, saveCharacter, toggleTradeSkill }  = characterSlice.actions

export default characterSlice.reducer