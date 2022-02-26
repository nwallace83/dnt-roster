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
import { connect } from 'react-redux';
import { setRoster, clearRoster, applyFilter } from '../reducers/rosterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'


const mapStateToProps = (state) => {
    return {
        roster: state.roster.filteredRoster,
        session: state.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRoster: (roster) => dispatch(setRoster(roster)),
        clearRoster: () => dispatch(clearRoster()),
        applyFilter: (filterText) => dispatch(applyFilter(filterText))
    }
}

class Roster extends React.Component {
    componentDidMount() {
        fetch('/api/v1/roster').then(res => {
            if (res.ok) {
                res.json().then(res => this.props.setRoster(res))
            } else {
                window.alert('problem loading roster')
            }
        })
    }

    render() {
        return (
            <div className="row bg-light-grey padding-top-4">
                <RosterFilter roster={this.props.roster} applyFilter={this.props.applyFilter} />
                <table className="table table-striped table-bordered ">
                        <RosterHeader session={this.props.session} />
                    <tbody>
                        {this.props.roster.map( (player,index) => {return <Player session={this.props.session} player={player} key={index} />})}
                    </tbody>
                </table>
            </div>
        )
    }
}

class RosterFilter extends React.Component {
    render() {
        return (
            <div className="col-md-12" id="roster-filter">
                <span>Filter:</span>
                <input id="rosterfilterinput" type="text" onChange={this.applyFilter} />
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
}

class RosterHeader extends React.Component {
    render() {
        return (
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Discord</th>
                <th scope="col" colSpan="5">Main</th>
                <th scope="col" colSpan="5">Alt</th>
                {this.props.session.isAdmin ? <th scope="col">Active</th> : null}
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
                {this.props.session.isAdmin ? <ActiveStatus player={this.props.player} /> : null}
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
                <FontAwesomeIcon className={this.getClasses(this.props.player.inactive)} icon={this.props.player.inactive ? faThumbsDown : faThumbsUp} />
            </td>
        )
    }

    getClasses(isInactive) {
        return isInactive ? "inactive-player-icon" : "active-player-icon"
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Roster)