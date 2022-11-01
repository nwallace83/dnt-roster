import { useDispatch, useSelector } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { saveCharacter, toggleTradeSkill } from '../reducers/characterSlice'
import Character, { CharacterCrafting } from '../interfaces/character'
import { RootState } from '../store'

export default function CharacterBody() {
    return (
        <div className="row bg-light-grey">
            <div className="row txt-center">
                <div>
                    <hr />
                </div>
            </div>
            <EditCharacterForm />
        </div>
    )
}

function EditCharacterForm() {
    const dispatch = useDispatch()
    const character = useSelector((state: RootState) => state.character)

    return (
        <div className="col-md-12">
            <form name="characterform" className="row g-3">
                <div className="col-md-12">
                    <div className="col-md-4">
                        <label className="form-label">Character Name</label>
                        <input name="charactername" maxLength={16} type="text" className="form-control" defaultValue={character.characterName} />
                    </div>
                </div>
                <hr />
                <div className="col-md-3">
                    <label className="form-label font-weight-bold">Main Weapon</label>
                    <select name="primaryweapon1" className="form-select">
                        <option selected={optionIsSelected('primaryWeapon1', '')}></option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Bow')}>Bow</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Fire Staff')}>Fire Staff</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Great Axe')}>Great Axe</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Hatchet')}>Hatchet</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Ice Gauntlet')}>Ice Gauntlet</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Life Staff')}>Life Staff</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Musket')}>Musket</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Rapier')}>Rapier</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Spear')}>Spear</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Sword')}>Sword</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'Void Gauntlet')}>Void Gauntlet</option>
                        <option selected={optionIsSelected('primaryWeapon1', 'War Hammer')}>War Hammer</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label font-weight-bold">Main Weapon</label>
                    <select name="primaryweapon2" className="form-select">
                        <option></option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Bow')}>Bow</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Fire Staff')}>Fire Staff</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Great Axe')}>Great Axe</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Hatchet')}>Hatchet</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Ice Gauntlet')}>Ice Gauntlet</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Life Staff')}>Life Staff</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Musket')}>Musket</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Rapier')}>Rapier</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Spear')}>Spear</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Sword')}>Sword</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'Void Gauntlet')}>Void Gauntlet</option>
                        <option selected={optionIsSelected('primaryWeapon2', 'War Hammer')}>War Hammer</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label font-weight-bold">Role</label>
                    <select name="primaryrole" className="form-select">
                        <option></option>
                        <option selected={optionIsSelected('primaryRole', 'DPS')}>DPS</option>
                        <option selected={optionIsSelected('primaryRole', 'Healer')}>Healer</option>
                        <option selected={optionIsSelected('primaryRole', 'Tank')}>Tank</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label font-weight-bold">Armor</label>
                    <select name="primaryarmor" className="form-select">
                        <option></option>
                        <option selected={optionIsSelected('primaryArmor', 'Light')}>Light</option>
                        <option selected={optionIsSelected('primaryArmor', 'Medium')}>Medium</option>
                        <option selected={optionIsSelected('primaryArmor', 'Heavy')}>Heavy</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label">Gear Score</label>
                    <input name="primarygs" maxLength={3} type="Number" className="form-control" defaultValue={character.primaryGS} />
                </div>
                <div className="col-md-3">
                    <label className="form-label font-weight-bold">Alt Weapon</label>
                    <select name="secondaryweapon1" className="form-select">
                        <option></option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Bow')}>Bow</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Fire Staff')}>Fire Staff</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Great Axe')}>Great Axe</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Hatchet')}>Hatchet</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Ice Gauntlet')}>Ice Gauntlet</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Life Staff')}>Life Staff</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Musket')}>Musket</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Rapier')}>Rapier</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Spear')}>Spear</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Sword')}>Sword</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'Void Gauntlet')}>Void Gauntlet</option>
                        <option selected={optionIsSelected('secondaryWeapon1', 'War Hammer')}>War Hammer</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label font-weight-bold">Alt Weapon</label>
                    <select name="secondaryweapon2" className="form-select">
                        <option></option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Bow')}>Bow</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Fire Staff')}>Fire Staff</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Great Axe')}>Great Axe</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Hatchet')}>Hatchet</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Ice Gauntlet')}>Ice Gauntlet</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Life Staff')}>Life Staff</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Musket')}>Musket</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Rapier')}>Rapier</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Spear')}>Spear</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Sword')}>Sword</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'Void Gauntlet')}>Void Gauntlet</option>
                        <option selected={optionIsSelected('secondaryWeapon2', 'War Hammer')}>War Hammer</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label font-weight-bold">Role</label>
                    <select name="secondaryrole" className="form-select">
                        <option selected></option>
                        <option selected={optionIsSelected('secondaryRole', 'DPS')}>DPS</option>
                        <option selected={optionIsSelected('secondaryRole', 'Healer')}>Healer</option>
                        <option selected={optionIsSelected('secondaryRole', 'Tank')}>Tank</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label font-weight-bold">Armor</label>
                    <select name="secondaryarmor" className="form-select">
                        <option></option>
                        <option selected={optionIsSelected('secondaryArmor', 'Light')}>Light</option>
                        <option selected={optionIsSelected('secondaryArmor', 'Medium')}>Medium</option>
                        <option selected={optionIsSelected('secondaryArmor', 'Heavy')}>Heavy</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label">Gear Score</label>
                    <input name="secondarygs" maxLength={3} type="Number" className="form-control" defaultValue={character.secondaryGS} />
                </div>
                <hr />
                <TradeSkills character={character} />
                <div className="col-md-3">
                    <button type="button" className="btn btn-primary" onClick={saveCharacterToServer}>Save</button>
                </div>
            </form>
            <hr />
        </div>
    )


    function saveCharacterToServer() {
        let charToSave: Character = {
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
            id: '',
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

        // @ts-ignore
        charToSave.characterName = document.characterform.charactername.value ? document.characterform.charactername.value.trim() : ''
        // @ts-ignore
        charToSave.primaryWeapon1 = document.characterform.primaryweapon1.value ? document.characterform.primaryweapon1.value : ''
        // @ts-ignore
        charToSave.primaryWeapon2 = document.characterform.primaryweapon2.value ? document.characterform.primaryweapon2.value : ''
        // @ts-ignore
        charToSave.primaryRole = document.characterform.primaryrole.value ? document.characterform.primaryrole.value : ''
        // @ts-ignore
        charToSave.primaryArmor = document.characterform.primaryarmor.value ? document.characterform.primaryarmor.value : ''
        // @ts-ignore
        charToSave.primaryGS = document.characterform.primarygs.value ? document.characterform.primarygs.value : '500'
        // @ts-ignore
        charToSave.secondaryWeapon1 = document.characterform.secondaryweapon1.value ? document.characterform.secondaryweapon1.value : ''
        // @ts-ignore
        charToSave.secondaryWeapon2 = document.characterform.secondaryweapon2.value ? document.characterform.secondaryweapon2.value : ''
        // @ts-ignore
        charToSave.secondaryRole = document.characterform.secondaryrole.value ? document.characterform.secondaryrole.value : ''
        // @ts-ignore
        charToSave.secondaryArmor = document.characterform.secondaryarmor.value ? document.characterform.secondaryarmor.value : ''
        // @ts-ignore
        charToSave.secondaryGS = document.characterform.secondarygs.value ? document.characterform.secondarygs.value : '500'
        // @ts-ignore
        charToSave.crafting.weaponSmithing = document.characterform.weaponsmithing.checked ? true : false
        // @ts-ignore
        charToSave.crafting.armoring = document.characterform.armoring.checked ? true : false
        // @ts-ignore
        charToSave.crafting.engineering = document.characterform.engineering.checked ? true : false
        // @ts-ignore
        charToSave.crafting.jewelCrafting = document.characterform.jewelcrafting.checked ? true : false
        // @ts-ignore
        charToSave.crafting.arcana = document.characterform.arcana.checked ? true : false
        // @ts-ignore
        charToSave.crafting.cooking = document.characterform.cooking.checked ? true : false
        // @ts-ignore
        charToSave.crafting.furnishing = document.characterform.furnishing.checked ? true : false

        if (charToSave.characterName.length > 2 && charToSave.primaryWeapon1.length > 1 && charToSave.primaryWeapon2.length > 1 && charToSave.primaryRole.length > 1) {
            fetch('/api/v1/character', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(charToSave) }).then(res => {
                if (res.ok) {
                    dispatch(saveCharacter(charToSave))
                    toastr.success('Character Saved', '')
                }
            })
        } else {
            toastr.error('Missing Info', 'Fill out the damn form before submitting')
        }
    }

    function optionIsSelected(fieldName: string, value: string) {
        return character[fieldName as keyof Character] === value ? true : false
    }
}


interface TradeSkillsProps {
    character: Character
}
function TradeSkills(props: TradeSkillsProps) {
    const dispatch = useDispatch()
    const character = props.character

    function optionIsChecked(fieldName: string) {
        return character.crafting[fieldName as keyof CharacterCrafting]
    }

    return (
        <div className="row">
            <h5>Tradeskills:</h5>
            <div className="form-check col-md-3">
                <input className="form-check-input" name="weaponsmithing" type="checkbox" value="" id="weaponsmithing" onClick={() => dispatch(toggleTradeSkill('weaponSmithing'))} checked={optionIsChecked('weaponSmithing')} />
                <label className="form-check-label" htmlFor="weaponsmithing">
                    Weaponsmithing
                </label>
            </div>
            <div className="form-check col-md-3">
                <input className="form-check-input" name="armoring" type="checkbox" value="" id="armoring" onClick={() => dispatch(toggleTradeSkill('armoring'))} checked={optionIsChecked('armoring')} />
                <label className="form-check-label" htmlFor="armoring">
                    Armoring
                </label>
            </div>
            <div className="form-check col-md-3">
                <input className="form-check-input" name="engineering" type="checkbox" value="" id="engineering" onClick={() => dispatch(toggleTradeSkill('engineering'))} checked={optionIsChecked('engineering')} />
                <label className="form-check-label" htmlFor="engineering">
                    Engineering
                </label>
            </div>
            <div className="form-check col-md-3">
                <input className="form-check-input" name="jewelcrafting" type="checkbox" value="" id="jewelcrafting" onClick={() => dispatch(toggleTradeSkill('jewelCrafting'))} checked={optionIsChecked('jewelCrafting')} />
                <label className="form-check-label" htmlFor="jewelcrafting">
                    Jewelcrafting
                </label>
            </div>
            <div className="form-check col-md-3">
                <input className="form-check-input" name="arcana" type="checkbox" value="" id="arcana" onClick={() => dispatch(toggleTradeSkill('arcana'))} checked={optionIsChecked('arcana')} />
                <label className="form-check-label" htmlFor="arcana">
                    Arcana
                </label>
            </div>
            <div className="form-check col-md-3">
                <input className="form-check-input" name="cooking" type="checkbox" value="" id="cooking" onClick={() => dispatch(toggleTradeSkill('cooking'))} checked={optionIsChecked('cooking')} />
                <label className="form-check-label" htmlFor="cooking">
                    Cooking
                </label>
            </div>
            <div className="form-check col-md-3">
                <input className="form-check-input" name="furnishing" type="checkbox" value="" id="furnishing" onClick={() => dispatch(toggleTradeSkill('furnishing'))} checked={optionIsChecked('furnishing')} />
                <label className="form-check-label" htmlFor="furnishing">
                    Furnishing
                </label>
            </div>
            <div className="col-md-12">
                <span>*only check if you have 200 + trophies + gear*</span>
            </div>
        </div>
    )
}