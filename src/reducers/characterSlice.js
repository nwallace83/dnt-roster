import { createSlice } from '@reduxjs/toolkit'

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
        }
    }
})

export const { clearCharacter, saveCharacter }  = characterSlice.actions

export default characterSlice.reducer