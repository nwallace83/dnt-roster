import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { saveCharacter } from '../reducers/characterSlice'

const mapStateToProps = (state) => {
    return {
        session: state.session,
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
        let charToSave = {}

        charToSave.characterName = document.characterform.charactername.value.trim()
        charToSave.primaryWeapon1 = document.characterform.primaryweapon1.value
        charToSave.primaryWeapon2 = document.characterform.primaryweapon2.value
        charToSave.primaryRole = document.characterform.primaryrole.value
        charToSave.secondaryWeapon1 = document.characterform.secondaryweapon1.value
        charToSave.secondaryWeapon2 = document.characterform.secondaryweapon2.value
        charToSave.secondaryRole = document.characterform.secondaryrole.value

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
            <div className="col-md-8">
                <form name="characterform" className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Character Name</label>
                        <input name="charactername" type="text" className="form-control" defaultValue={this.props.character.characterName}/>
                        <hr />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label font-weight-bold">Weapon(primary)</label>
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
                    <div className="col-md-5">
                        <label className="form-label font-weight-bold">Weapon(primary)</label>
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
                        <label className="form-label font-weight-bold">Role(primary)</label>
                        <select name="primaryrole" className="form-select">
                            <option></option>
                            <option selected={this.optionIsSelected('primaryRole','DPS')}>DPS</option>
                            <option selected={this.optionIsSelected('primaryRole','Healer')}>Healer</option>
                            <option selected={this.optionIsSelected('primaryRole','Tank')}>Tank</option>
                        </select>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label font-weight-bold">Weapon(secondary)</label>
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
                    <div className="col-md-5">
                        <label className="form-label font-weight-bold">Weapon(secondary)</label>
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
                        <label className="form-label font-weight-bold">Role(secondary)</label>
                        <select name="secondaryrole" className="form-select">
                            <option selected>{this.props.character.secondaryRole}</option>
                            <option selected={this.optionIsSelected('secondaryRole','DPS')}>DPS</option>
                            <option selected={this.optionIsSelected('secondaryRole','Healer')}>Healer</option>
                            <option selected={this.optionIsSelected('secondaryRole','Tank')}>Tank</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                      <button type="button" class="btn btn-primary" onClick={this.saveCharacter}>Save</button>
                    </div>
                </form>
                <hr />
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CharacterBody)