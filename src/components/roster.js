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
import { setRoster, clearRoster } from '../reducers/rosterSlice';

const mapStateToProps = (state) => {
    return {
        roster: state.roster.roster,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRoster: (roster) => dispatch(setRoster(roster)),
        clearRoster: () => dispatch(clearRoster()),
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
            <div className="container bg-light-grey">
                <table className="table table-striped table-bordered ">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Weapon 1</th>
                            <th scope="col">Weapon 2</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.roster.map( (player,index) => {return <Player player={player} key={index} />})}
                    </tbody>
                </table>
            </div>
        )
    }
}

class Player extends React.Component {
    render() {
        return (
            <tr>
                <th>{this.props.player.characterName}</th>
                <td>
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.primaryWeapon1)} />
                    <span>{this.props.player.primaryWeapon1}</span>
                </td>
                <td>
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.primaryWeapon2)} />
                    <span>{this.props.player.primaryWeapon2}</span>
                </td>
                <td>
                    <span>{this.props.player.primaryRole}</span>
                </td>
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

export default connect(mapStateToProps,mapDispatchToProps)(Roster)