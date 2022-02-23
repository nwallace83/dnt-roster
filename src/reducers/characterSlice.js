import { createSlice } from '@reduxjs/toolkit'

export const characterSlice = createSlice({
    name:'character',
    initialState: {
        characterName: "",
        primaryWeapon1: "",
        primaryWeapon2: "",
        primaryRole: "",
        secondaryWeapon1: "",
        secondaryWeapon2: "",
        secondaryRole: "",
        discordUserName: ""
    },
    reducers: {
        saveCharacter: (state,character) => {
            return character.payload
        },
        clearCharacter: (state) => {
            return {
                characterName: "",
                primaryWeapon1: "",
                primaryWeapon2: "",
                primaryRole: "",
                secondaryWeapon1: "",
                secondaryWeapon2: "",
                secondaryRole: "",
                discordUserName: ""
            }
        }
    }
})

export const { clearCharacter, saveCharacter }  = characterSlice.actions

export default characterSlice.reducer