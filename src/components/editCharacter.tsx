import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { saveCharacter, toggleTradeSkill } from '../reducers/characterSlice'
import Character, { CharacterCrafting } from '../interfaces/character'

const mapStateToProps = (state: any) => {
    return {
        character: state.character
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveCharacter: (character: Character) => dispatch(saveCharacter(character)),
        toggleTradeSkill: (tradeSkill: string) => dispatch(toggleTradeSkill(tradeSkill))
    }
}

interface CharacterBodyProps {
    character: Character
}
interface CharacterBodyActionProps {
    saveCharacter: (c: Character) => void,
    toggleTradeSkill: (s: string) => void
}
class CharacterBody extends React.Component<CharacterBodyProps & CharacterBodyActionProps> {
    render() {
        return (
            <div className="row bg-light-grey">
                <div className="row txt-center">
                    <div>
                        <hr />
                    </div>
                </div>
                <EditCharacterForm character={this.props.character} saveCharacter={this.props.saveCharacter} toggleTradeSkill={this.props.toggleTradeSkill} />
            </div>
        )
    }
}

interface EditCharacterFormProps {
    character: Character,
    saveCharacter: (c: Character) => void,
    toggleTradeSkill: (s: string) => void
}
class EditCharacterForm extends React.Component<EditCharacterFormProps> {
    saveCharacter = () => {
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
        charToSave.crafting.weaponSmithing = document.characterform.weaponsmithing.checked ? true: false
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

        if (charToSave.characterName.length > 2 && charToSave.primaryWeapon1.length > 1 && charToSave.primaryWeapon2.length > 1 && charToSave.primaryRole.length > 1){
            fetch('/api/v1/character',{method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(charToSave)}).then(res => {
                if (res.ok) {
                    this.props.saveCharacter(charToSave)
                    toastr.success('Character Saved','')
                }
            })
        } else {
            toastr.error('Missing Info','Fill out the damn form before submitting')
        }
    }

    optionIsSelected(fieldName: string, value: string) {
        return this.props.character[fieldName as keyof Character] === value ? true : false
    }

    render() {
        return (
            <div className="col-md-12">
                <form name="characterform" className="row g-3">
                    <div className ="col-md-12">
                        <div className="col-md-4">
                            <label className="form-label">Character Name</label>
                            <input name="charactername" maxLength={16} type="text" className="form-control" defaultValue={this.props.character.characterName}/>
                        </div>
                    </div>
                    <hr />
                    <div className="col-md-3">
                        <label className="form-label font-weight-bold">Main Weapon</label>
                        <select name="primaryweapon1" className="form-select">
                            <option selected={this.optionIsSelected('primaryWeapon1','')}></option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Bow')}>Bow</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Fire Staff')}>Fire Staff</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Great Axe')}>Great Axe</option>      
                            <option selected={this.optionIsSelected('primaryWeapon1','Hatchet')}>Hatchet</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Ice Gauntlet')}>Ice Gauntlet</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Life Staff')}>Life Staff</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Musket')}>Musket</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Rapier')}>Rapier</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Spear')}>Spear</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Sword')}>Sword</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','Void Gauntlet')}>Void Gauntlet</option>
                            <option selected={this.optionIsSelected('primaryWeapon1','War Hammer')}>War Hammer</option>                                                                                                                                                                                                                                                                                                            
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label font-weight-bold">Main Weapon</label>
                        <select name="primaryweapon2" className="form-select">
                            <option></option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Bow')}>Bow</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Fire Staff')}>Fire Staff</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Great Axe')}>Great Axe</option>      
                            <option selected={this.optionIsSelected('primaryWeapon2','Hatchet')}>Hatchet</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Ice Gauntlet')}>Ice Gauntlet</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Life Staff')}>Life Staff</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Musket')}>Musket</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Rapier')}>Rapier</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Spear')}>Spear</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Sword')}>Sword</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','Void Gauntlet')}>Void Gauntlet</option>
                            <option selected={this.optionIsSelected('primaryWeapon2','War Hammer')}>War Hammer</option>   
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label font-weight-bold">Role</label>
                        <select name="primaryrole" className="form-select">
                            <option></option>
                            <option selected={this.optionIsSelected('primaryRole','DPS')}>DPS</option>
                            <option selected={this.optionIsSelected('primaryRole','Healer')}>Healer</option>
                            <option selected={this.optionIsSelected('primaryRole','Tank')}>Tank</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label font-weight-bold">Armor</label>
                        <select name="primaryarmor" className="form-select">
                            <option></option>
                            <option selected={this.optionIsSelected('primaryArmor','Light')}>Light</option>
                            <option selected={this.optionIsSelected('primaryArmor','Medium')}>Medium</option>
                            <option selected={this.optionIsSelected('primaryArmor','Heavy')}>Heavy</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Gear Score</label>
                        <input name="primarygs" maxLength={3} type="Number" className="form-control" defaultValue={this.props.character.primaryGS}/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label font-weight-bold">Alt Weapon</label>
                        <select name="secondaryweapon1" className="form-select">
                            <option></option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Bow')}>Bow</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Fire Staff')}>Fire Staff</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Great Axe')}>Great Axe</option>      
                            <option selected={this.optionIsSelected('secondaryWeapon1','Hatchet')}>Hatchet</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Ice Gauntlet')}>Ice Gauntlet</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Life Staff')}>Life Staff</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Musket')}>Musket</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Rapier')}>Rapier</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Spear')}>Spear</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Sword')}>Sword</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','Void Gauntlet')}>Void Gauntlet</option>
                            <option selected={this.optionIsSelected('secondaryWeapon1','War Hammer')}>War Hammer</option>   
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label font-weight-bold">Alt Weapon</label>
                        <select name="secondaryweapon2" className="form-select">
                            <option></option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Bow')}>Bow</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Fire Staff')}>Fire Staff</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Great Axe')}>Great Axe</option>      
                            <option selected={this.optionIsSelected('secondaryWeapon2','Hatchet')}>Hatchet</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Ice Gauntlet')}>Ice Gauntlet</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Life Staff')}>Life Staff</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Musket')}>Musket</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Rapier')}>Rapier</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Spear')}>Spear</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Sword')}>Sword</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','Void Gauntlet')}>Void Gauntlet</option>
                            <option selected={this.optionIsSelected('secondaryWeapon2','War Hammer')}>War Hammer</option>   
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label font-weight-bold">Role</label>
                        <select name="secondaryrole" className="form-select">
                            <option selected></option>
                            <option selected={this.optionIsSelected('secondaryRole','DPS')}>DPS</option>
                            <option selected={this.optionIsSelected('secondaryRole','Healer')}>Healer</option>
                            <option selected={this.optionIsSelected('secondaryRole','Tank')}>Tank</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label font-weight-bold">Armor</label>
                        <select name="secondaryarmor" className="form-select">
                            <option></option>
                            <option selected={this.optionIsSelected('secondaryArmor','Light')}>Light</option>
                            <option selected={this.optionIsSelected('secondaryArmor','Medium')}>Medium</option>
                            <option selected={this.optionIsSelected('secondaryArmor','Heavy')}>Heavy</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Gear Score</label>
                        <input name="secondarygs" maxLength={3} type="Number" className="form-control" defaultValue={this.props.character.secondaryGS}/>
                    </div>
                    <hr />
                    <TradeSkills character={this.props.character} toggleTradeSkill={this.props.toggleTradeSkill}/>
                    <div className="col-md-3">
                      <button type="button" className="btn btn-primary" onClick={this.saveCharacter}>Save</button>
                    </div>
                </form>
                <hr />
            </div>
        )
    }
}


interface TradeSkillsProps {
    character: Character
    toggleTradeSkill: (s: string) => void
}
class TradeSkills extends React.Component<TradeSkillsProps> {
    optionIsChecked(fieldName: string) {
        return this.props.character.crafting[fieldName as keyof CharacterCrafting]
    }

    render() {
        return (
            <div className="row">
                    <h5>Tradeskills:</h5>
                    <div className="form-check col-md-3">
                        <input className="form-check-input" name ="weaponsmithing" type="checkbox" value="" id="weaponsmithing" onClick={() => this.props.toggleTradeSkill('weaponSmithing')} checked={this.optionIsChecked('weaponSmithing')} />
                        <label className="form-check-label" htmlFor="weaponsmithing">
                            Weaponsmithing
                        </label>
                    </div>
                    <div className="form-check col-md-3">
                        <input className="form-check-input" name ="armoring" type="checkbox" value="" id="armoring" onClick={() => this.props.toggleTradeSkill('armoring')} checked={this.optionIsChecked('armoring')} />
                        <label className="form-check-label" htmlFor="armoring">
                            Armoring
                        </label>
                    </div>
                    <div className="form-check col-md-3">
                        <input className="form-check-input" name ="engineering" type="checkbox" value="" id="engineering" onClick={() => this.props.toggleTradeSkill('engineering')} checked={this.optionIsChecked('engineering')} />
                        <label className="form-check-label" htmlFor="engineering">
                            Engineering
                        </label>
                    </div>
                    <div className="form-check col-md-3">
                        <input className="form-check-input" name ="jewelcrafting" type="checkbox" value="" id="jewelcrafting" onClick={() => this.props.toggleTradeSkill('jewelCrafting')} checked={this.optionIsChecked('jewelCrafting')} />
                        <label className="form-check-label" htmlFor="jewelcrafting">
                            Jewelcrafting
                        </label>
                    </div>
                    <div className="form-check col-md-3">
                        <input className="form-check-input" name ="arcana" type="checkbox" value="" id="arcana" onClick={() => this.props.toggleTradeSkill('arcana')} checked={this.optionIsChecked('arcana')} />
                        <label className="form-check-label" htmlFor="arcana">
                            Arcana
                        </label>
                    </div>
                    <div className="form-check col-md-3">
                        <input className="form-check-input" name ="cooking" type="checkbox" value="" id="cooking" onClick={() => this.props.toggleTradeSkill('cooking')} checked={this.optionIsChecked('cooking')} />
                        <label className="form-check-label" htmlFor="cooking">
                            Cooking
                        </label>
                    </div>
                    <div className="form-check col-md-3">
                        <input className="form-check-input" name ="furnishing" type="checkbox" value="" id="furnishing" onClick={() => this.props.toggleTradeSkill('furnishing')} checked={this.optionIsChecked('furnishing')} />
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
}

export default connect(mapStateToProps,mapDispatchToProps)(CharacterBody)