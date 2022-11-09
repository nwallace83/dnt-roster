import { createSlice } from '@reduxjs/toolkit'
import Character, { getNewCharacter } from '../types/character'
interface CharacterState extends Character {
}
const initialState: CharacterState =  getNewCharacter()

export const characterSlice = createSlice({
    name:'character',
    initialState: initialState,
    reducers: {
        saveCharacter: (state,payload: {type: string, payload: Character}) => {
            const character = payload.payload
            return character
        },
        clearCharacter: () => {
            return initialState
        },
        setCharacterField: (state,payload: {type: string, payload: {field: string, value: string | boolean | number}}) => {
            return {...state,[payload.payload.field]:payload.payload.value}
        },
        setCharacrCraftingField: (state,payload: {type: string, payload: {field: string, value: string | boolean | number}}) => {
          return {...state,[payload.payload.field]:payload.payload.value}
      },
    }
})
export const { clearCharacter, saveCharacter }  = characterSlice.actions
export default characterSlice.reducer