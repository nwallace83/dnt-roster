import React from 'react';
import '../index.css'
import lifeStaff from '../images/weapons/lifestaff.png'
import bow from '../images/weapons/bow.png'
import fireStaff from '../images/weapons/firestaff.png'
import greatAxe from '../images/weapons/greataxe.png'
import hatchet from '../images/weapons/hatchet.png'
import iceGauntlet from '../images/weapons/icegauntlet.png'
import musket from '../images/weapons/musket.png'
import rapier from '../images/weapons/rapier.png'
import spear from '../images/weapons/spear.png'
import sword from '../images/weapons/sword.png'
import voidGauntlet from '../images/weapons/voidgauntlet.png'
import warHammer from '../images/weapons/warhammer.png'
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { setRoster, applyFilter, replaceCharacter, toggleShowInactive } from '../reducers/rosterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { confirm } from "react-confirm-box";

const mapStateToProps = (state) => {
    return {
        roster: state.roster.filteredRoster,
        showInactive: state.roster.showInactive,
        session: state.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRoster: (roster) => dispatch(setRoster(roster)),
        applyFilter: (filterText) => dispatch(applyFilter(filterText)),
        replaceCharacter: (character) => dispatch(replaceCharacter(character)),
        toggleShowInactive: () => dispatch(toggleShowInactive())
    }
}

class Roster extends React.Component {
    render() {
        return (
            <div className="row bg-light-grey padding-top-4">
                <RosterFilter toggleShowInactive={this.props.toggleShowInactive} showInactive={this.props.showInactive} roster={this.props.roster} applyFilter={this.props.applyFilter} />
                <table className="table table-striped table-bordered ">
                        <RosterHeader session={this.props.session} />
                    <tbody>
                        {this.props.roster.map( (player,index) => {return <Player replaceCharacter={this.props.replaceCharacter} session={this.props.session} player={player} key={index} />})}
                    </tbody>
                </table>
            </div>
        )
    }
}

class RosterFilter extends React.Component {
    render() {
        return (
            <div className="row roster-filter-div">
                <div className="col-md-12" id="roster-filter">
                    <span>Filter:</span>
                    <input id="rosterfilterinput" type="text" onChange={this.applyFilter} />
                </div>
                <div class="col-md-12 showinactive-div">
                    <input class="form-check-input" name ="showinactive" type="checkbox" value="" onClick={this.applyInactiveFilter} id="showinactive" checked={this.props.showInactive} />
                    <label class="form-check-label" for="showinactive">Show Inactive</label>
                </div>
            </div>
        )
    }

     applyFilter = () => {
        let filterValue = document.getElementById('rosterfilterinput').value.trim()
        setTimeout(() => {
            if (filterValue === document.getElementById('rosterfilterinput').value.trim()) {
                this.props.applyFilter(filterValue)
            }
        },250)
    }

    applyInactiveFilter = () => {
        this.props.toggleShowInactive()
        let filterValue = document.getElementById('rosterfilterinput').value.trim()
        this.props.applyFilter(filterValue)
    }
}

class RosterHeader extends React.Component {
    render() {
        return (
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th className="d-none d-md-table-cell" scope="col">Discord</th>
                <th scope="col" colSpan="5">Main</th>
                <th className="d-none d-md-table-cell" scope="col" colSpan="5">Alt</th>
                <th className="d-none d-md-table-cell" scope="col">Active</th>
            </tr>
        </thead>
        )
    }
}

class Player extends React.Component {
    render() {
        return (
            <tr>
                <th>{this.props.player.characterName}</th>
                <td>
                    {this.props.player.discordUserName}
                </td>
                <td>
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.primaryWeapon1)} />
                    <span>{this.props.player.primaryWeapon1}</span>
                </td>
                <td>
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.primaryWeapon2)} />
                    <span>{this.props.player.primaryWeapon2}</span>
                </td>
                <td>
                    <span>{this.props.player.primaryArmor}</span>
                </td>
                <td>
                    <span>{this.props.player.primaryRole}</span>
                </td>
                <td>
                    <span>{this.props.player.primaryGS}</span>
                </td>
                <td>
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.secondaryWeapon1)} />
                    <span>{this.props.player.secondaryWeapon1}</span>
                </td>
                <td>
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.secondaryWeapon2)} />
                    <span>{this.props.player.secondaryWeapon2}</span>
                </td>
                <td>
                    <span>{this.props.player.secondaryArmor}</span>
                </td>
                <td>
                    <span>{this.props.player.secondaryRole}</span>
                </td>
                <td>
                    <span>{this.props.player.secondaryGS}</span>
                </td>
                <ActiveStatus replaceCharacter={this.props.replaceCharacter} session={this.props.session} player={this.props.player} />
            </tr>
        )
    }

    getWeaponIcon(weapon) {
        let weaponIcon=''

        switch(weapon) {
            case 'Life Staff': 
                weaponIcon = lifeStaff; 
                break;
            case 'Bow': 
                weaponIcon = bow; 
                break;
            case 'Fire Staff': 
                weaponIcon = fireStaff; 
                break;
            case 'Great Axe': 
                weaponIcon = greatAxe; 
                break;
            case 'Hatchet': 
                weaponIcon = hatchet; 
                break;
            case 'Ice Gauntlet': 
                weaponIcon = iceGauntlet; 
                break;
            case 'Musket': 
                weaponIcon = musket; 
                break;
            case 'Rapier': 
                weaponIcon = rapier; 
                break;
            case 'Spear': 
                weaponIcon = spear; 
                break;
            case 'Sword': 
                weaponIcon = sword; 
                break;
            case 'Void Gauntlet': 
                weaponIcon = voidGauntlet; 
                break;
            case 'War Hammer': 
                weaponIcon = warHammer; 
                break;
            default:
                weaponIcon = '';
        }

        return weaponIcon;
    }
}

class ActiveStatus extends React.Component {
    render() {
        return (
            <td className="txt-center">
                <FontAwesomeIcon onClick={() => this.changeActiveStatus()} className={this.getClasses()} icon={this.props.player.inactive ? faThumbsDown : faThumbsUp} />
            </td>
        )
    }

    getClasses() {
        if (this.props.session.isAdmin) {
            return this.props.player.inactive ? "inactive-player-icon-admin" : "active-player-icon-admin"
        } else {
            return this.props.player.inactive ? "inactive-player-icon" : "active-player-icon"
        }    
    }

    async changeActiveStatus(){
        if (!this.props.session.isAdmin) {
            return null
        }

        const options = {
            labels: {
              confirmable: "Yes",
              cancellable: "No"
            }
          }

        const result = await confirm('Change ' + this.props.player.characterName + ' to ' + (this.props.player.inactive ? 'active?' : 'inactive?'));
        if (result) {
            const endPoint = '/api/v1/admin/character/inactive/' + this.props.player.id + '/' + !this.props.player.inactive
            fetch(endPoint,{method: 'POST'}).then(res => {
                if (res.ok) {
                    res.json().then(res => {
                        this.props.replaceCharacter(res)
                        toastr.success('success', this.props.player.characterName + ' is now ' + (this.props.player.inactive ? 'inactive' : 'active'))
                    })
                } else {
                    toastr.error('Error','Tell Kavion where you touched it')
                }
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Roster)