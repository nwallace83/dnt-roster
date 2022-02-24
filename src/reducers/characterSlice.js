import { createSlice } from '@reduxjs/toolkit'
import { current } from 'immer'

export const characterSlice = createSlice({
    name:'character',
    initialState: {
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
        crafting: {
                weaponSmithing: false,
                armoring: false,
                engineering: false,
                jewelCrafting: false,
                arcana: false,
                cooking: false,
                furnishing: false
            }
    },
    reducers: {
        saveCharacter: (state,character) => {
            return character.payload
        },
        clearCharacter: (state) => {
            return this.initialState
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