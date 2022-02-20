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

class rosterBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [
                {
                    name:'Kavion',
                    weapon1:'lifeStaff',
                    weapon2:'rapier',
                    role: 'Healer'
                },
                {
                    name:'Sir Patch',
                    weapon1: 'greatAxe',
                    weapon2: 'warHammer',
                    role: 'DPS'
                },
                {
                    name: 'Morelynn',
                    weapon1: 'greatAxe',
                    weapon2: 'warHammer',
                    role: 'DPS'
                }
            ]
        }
    }

    render() {
        return (
            <div className="container bg-light-grey">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Weapon 1</th>
                            <th scope="col">Weapon 2</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.players.map( (player,index) => {return <Player player={player} key={index} />})}
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
                <th>{this.props.player.name}</th>
                <td>
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.weapon1)} />
                    <span>{this.getWeaponName(this.props.player.weapon1)}</span>
                </td>
                <td>
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.weapon2)} />
                    <span>{this.getWeaponName(this.props.player.weapon2)}</span>
                </td>
                <td>
                    <span>{this.props.player.role}</span>
                </td>
            </tr>
        )
    }

    getWeaponIcon(weapon) {
        let weaponIcon=''

        switch(weapon) {
            case 'lifeStaff': 
                weaponIcon = lifeStaff; 
                break;
            case 'bow': 
                weaponIcon = bow; 
                break;
            case 'fireStaff': 
                weaponIcon = fireStaff; 
                break;
            case 'greatAxe': 
                weaponIcon = greatAxe; 
                break;
            case 'hatchet': 
                weaponIcon = hatchet; 
                break;
            case 'iceGauntlet': 
                weaponIcon = iceGauntlet; 
                break;
            case 'musket': 
                weaponIcon = musket; 
                break;
            case 'rapier': 
                weaponIcon = rapier; 
                break;
            case 'spear': 
                weaponIcon = spear; 
                break;
            case 'sword': 
                weaponIcon = sword; 
                break;
            case 'voidGauntlet': 
                weaponIcon = voidGauntlet; 
                break;
            case 'warHammer': 
                weaponIcon = warHammer; 
                break;
            default:
                weaponIcon = "";
        }

        return weaponIcon;
    }

    getWeaponName(weapon) {
        let weaponName=''

        switch(weapon) {
            case 'lifeStaff': 
                weaponName = 'Life Staff'; 
                break;
            case 'bow': 
                weaponName = 'Bow'; 
                break;
            case 'fireStaff': 
                weaponName = 'Fire Staff'; 
                break;
            case 'greatAxe': 
                weaponName = 'Great Axe'; 
                break;
            case 'hatchet': 
                weaponName = 'Hatchet'; 
                break;
            case 'iceGauntlet': 
                weaponName = 'Ice Gauntlet'; 
                break;
            case 'musket': 
                weaponName = 'Musket'; 
                break;
            case 'rapier': 
                weaponName = 'Rapier'; 
                break;
            case 'spear': 
                weaponName = 'Spear'; 
                break;
            case 'sword': 
                weaponName = 'Sword'; 
                break;
            case 'voidGauntlet': 
                weaponName = 'Void Gauntlet'; 
                break;
            case 'warHammer': 
                weaponName = 'War Hammer'; 
                break;
            default:
                weaponName = '';
        }

        return weaponName;
    }
}

export default rosterBody
