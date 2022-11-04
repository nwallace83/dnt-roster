import { toastr } from 'react-redux-toastr'
import { getNewCharacter } from '../../interfaces/character'
import { useEffect, useState } from 'react'
import { EditCharacterSelect } from './edit_character_select'
import TradeSkills from './tradeskills'
import EditCharacterGS from './edit_character_gs'


export default function EditCharacter() {
  const [character, setCharacter] = useState(getNewCharacter())
  const armorOptions = ['', 'Light', 'Medium', 'Heavy']
  const roleOptions = ['', 'DPS', 'Healer', 'Tank']
  const weaponOptions = ['', 'Fire Staff', 'Great Axe', 'Hatchet', 'Ice Gauntlet', 'Bow', 'Life Staff', 'Musket', 'Rapier', 'Spear', 'Sword', 'Void Gauntlet', 'War Hammer']

  useEffect(() => {
    fetch('/api/v1/character/').then(res => {
      if (res.ok) {
        res.json().then(res => setCharacter(res))
      } else {
        toastr.error('Error', 'Unable to get your character, refresh page and yell at Kavion')
      }
    })
  }, [])

  function updateCharacterField(field: string, value: string | boolean | number) {
    setCharacter({ ...character, [field]: value })
  }

  function updateCharacterCraftingField(field: string, value: string | boolean | number) {
    setCharacter({ ...character, crafting: { ...character.crafting, [field]: value } })
  }

  return (
    <div className="row bg-light-grey">
      <form name="characterform" className="row g-3">
        <div className="col-md-12">
          <div className="col-md-4">
            <label className="form-label">Character Name</label>
            <input name="charactername" maxLength={16} type="text" className="form-control" defaultValue={character.characterName} 
              onChange={(e) => updateCharacterField('characterName',e.target.value)}
            />
          </div>
        </div>
        <hr />
        <EditCharacterSelect character={character} fieldName="primaryWeapon1" options={weaponOptions} onChange={updateCharacterField} width="3" labelText="Main Weapon" />
        <EditCharacterSelect character={character} fieldName="primaryWeapon2" options={weaponOptions} onChange={updateCharacterField} width="3" labelText="Main Weapon" />
        <EditCharacterSelect character={character} fieldName="primaryRole" options={roleOptions} onChange={updateCharacterField} width="2" labelText="Role" />
        <EditCharacterSelect character={character} fieldName="primaryArmor" options={armorOptions} onChange={updateCharacterField} width="2" labelText="Armor" />
        <EditCharacterGS character={character} fieldName="primaryGS" onChange={updateCharacterField} />
        <EditCharacterSelect character={character} fieldName="secondaryWeapon1" options={weaponOptions} onChange={updateCharacterField} width="3" labelText="Alt Weapon" />
        <EditCharacterSelect character={character} fieldName="secondaryWeapon2" options={weaponOptions} onChange={updateCharacterField} width="3" labelText="Alt Weapon" />
        <EditCharacterSelect character={character} fieldName="secondaryRole" options={roleOptions} onChange={updateCharacterField} width="2" labelText="Role" />
        <EditCharacterSelect character={character} fieldName="secondaryArmor" options={armorOptions} onChange={updateCharacterField} width="2" labelText="Armor" />
        <EditCharacterGS character={character} fieldName="secondaryGS" onChange={updateCharacterField} />
        <hr />
        <TradeSkills onChange={updateCharacterCraftingField} character={character} />
        <div className="col-md-3">
          <button type="button" className="btn btn-primary" onClick={saveCharacterToServer}>Save</button>
        </div>
      </form>
      <hr />
    </div>
  )

  function saveCharacterToServer() {
    if (character.characterName.length > 2 && character.primaryWeapon1.length > 1 && character.primaryWeapon2.length > 1 && character.primaryRole.length > 1) {
      fetch('/api/v1/character', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(character) }).then(res => {
        if (res.ok) {
          toastr.success('Character Saved', '')
        }
      })
    } else {
      toastr.error('Missing Info', 'Fill out the damn form before submitting')
    }
  }
}
