export default interface Character {
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
  id?: string,
  inactive: boolean,
  crafting: CharacterCrafting
}

export interface CharacterCrafting {
  weaponSmithing: boolean,
  armoring: boolean,
  engineering: boolean,
  jewelCrafting: boolean,
  arcana: boolean,
  cooking: boolean,
  furnishing: boolean
}

export function getNewCharacter(): Character {
  return {
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
}
