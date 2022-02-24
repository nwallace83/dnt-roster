import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { saveCharacter } from '../reducers/characterSlice'

const mapStateToProps = (state) => {
    return {
        character: state.character
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCharacter: (character) => dispatch(saveCharacter(character)),
    }
}

class CharacterBody extends React.Component {
    render() {
        return (
            <div className="container bg-light-grey">
                <div className="row txt-center">
                    <div>
                        <hr />
                    </div>
                </div>
                <EditCharacterForm character={this.props.character} saveCharacter={this.props.saveCharacter}/>
            </div>
        )
    }
}

class EditCharacterForm extends React.Component {
    saveCharacter = () => {
        let charToSave = {crafting:{}}

        charToSave.characterName = document.characterform.charactername.value ? document.characterform.charactername.value.trim() : ""
        charToSave.primaryWeapon1 = document.characterform.primaryweapon1.value ? document.characterform.primaryweapon1.value : ""
        charToSave.primaryWeapon2 = document.characterform.primaryweapon2.value ? document.characterform.primaryweapon2.value : ""
        charToSave.primaryRole = document.characterform.primaryrole.value ? document.characterform.primaryrole.value : ""
        charToSave.primaryArmor = document.characterform.primaryarmor.value ? document.characterform.primaryarmor.value : ""
        charToSave.primaryGS = document.characterform.primarygs.value ? document.characterform.primarygs.value : "500"
        charToSave.secondaryWeapon1 = document.characterform.secondaryweapon1.value ? document.characterform.secondaryweapon1.value : ""
        charToSave.secondaryWeapon2 = document.characterform.secondaryweapon2.value ? document.characterform.secondaryweapon2.value : ""
        charToSave.secondaryRole = document.characterform.secondaryrole.value ? document.characterform.secondaryrole.value : ""
        charToSave.secondaryArmor = document.characterform.secondaryarmor.value ? document.characterform.secondaryarmor.value : ""
        charToSave.secondaryGS = document.characterform.secondarygs.value ? document.characterform.secondarygs.value : "500"
        charToSave.crafting.weaponSmithing = document.characterform.weaponsmithing.checked ? true: false
        charToSave.crafting.armoring = document.characterform.armoring.checked ? true : false
        charToSave.crafting.engineering = document.characterform.engineering.checked ? true : false
        charToSave.crafting.jewelCrafting = document.characterform.jewelcrafting.checked ? true : false
        charToSave.crafting.arcana = document.characterform.arcana.checked ? true : false
        charToSave.crafting.cooking = document.characterform.cooking.checked ? true : false
        charToSave.crafting.furnishing = document.characterform.furnishing.checked ? true : false

        if (charToSave.characterName.length > 2 && charToSave.primaryWeapon1.length > 1 && charToSave.primaryWeapon2.length > 1 && charToSave.primaryRole.length > 1){
            fetch('/api/v1/character',{method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(charToSave)}).then(res => {
                if (res.ok) {
                    this.props.saveCharacter(charToSave)
                    toastr.success('Character Saved')
                }
            })
        } else {
            toastr.error('Missing Info','Fill out the damn form before submitting')
        }
    }

    optionIsSelected(fieldName,value) {
        return this.props.character[fieldName] === value ? true : false
    }

    render() {
        return (
            <div className="col-md-12">
                <form name="characterform" className="row g-3">
                    <div className ="col-md-12">
                        <div className="col-md-4">
                            <label className="form-label">Character Name</label>
                            <input name="charactername" maxlength="16" type="text" className="form-control" defaultValue={this.props.character.characterName}/>
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
                        <input name="primarygs" maxlength="3" type="Number" className="form-control" defaultValue={this.props.character.primaryGS}/>
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
                        <input name="secondarygs" maxlength="3" type="Number" className="form-control" defaultValue={this.props.character.secondaryGS}/>
                    </div>
                    <hr />
                    <TradeSkills character={this.props.character} />
                    <div className="col-md-3">
                      <button type="button" class="btn btn-primary" onClick={this.saveCharacter}>Save</button>
                    </div>
                </form>
                <hr />
            </div>
        )
    }
}

class TradeSkills extends React.Component {
    optionIsChecked(fieldName) {
        return this.props.character.crafting[fieldName]
    }

    render() {
        return (
            <div className="row">
                    <h5>Tradeskills:</h5>
                    <div class="form-check col-md-2">
                        <input class="form-check-input" name ="weaponsmithing" type="checkbox" value="" id="weaponsmithing" checked={this.optionIsChecked('weaponSmithing')} />
                        <label class="form-check-label" for="weaponsmithing">
                            Weaponsmithing
                        </label>
                    </div>
                    <div class="form-check col-md-2">
                        <input class="form-check-input" name ="armoring" type="checkbox" value="" id="armoring" checked={this.optionIsChecked('armoring')} />
                        <label class="form-check-label" for="armoring">
                            Armoring
                        </label>
                    </div>
                    <div class="form-check col-md-2">
                        <input class="form-check-input" name ="engineering" type="checkbox" value="" id="engineering" checked={this.optionIsChecked('engineering')} />
                        <label class="form-check-label" for="engineering">
                            Engineering
                        </label>
                    </div>
                    <div class="form-check col-md-2">
                        <input class="form-check-input" name ="jewelcrafting" type="checkbox" value="" id="jewelcrafting" checked={this.optionIsChecked('jewelCrafting')} />
                        <label class="form-check-label" for="jewelcrafting">
                            Jewelcrafting
                        </label>
                    </div>
                    <div class="form-check col-md-2">
                        <input class="form-check-input" name ="arcana" type="checkbox" value="" id="arcana" checked={this.optionIsChecked('arcana')} />
                        <label class="form-check-label" for="arcana">
                            Arcana
                        </label>
                    </div>
                    <div class="form-check col-md-2">
                        <input class="form-check-input" name ="cooking" type="checkbox" value="" id="cooking" checked={this.optionIsChecked('cooking')} />
                        <label class="form-check-label" for="cooking">
                            Cooking
                        </label>
                    </div>
                    <div class="form-check col-md-2">
                        <input class="form-check-input" name ="furnishing" type="checkbox" value="" id="furnishing" checked={this.optionIsChecked('furnishing')} />
                        <label class="form-check-label" for="furnishing">
                            Furnishing
                        </label>
                    </div>
                    <div class="col-md-12">
                       <span>*only check if you have 200 + trophies + gear*</span>
                    </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CharacterBody)