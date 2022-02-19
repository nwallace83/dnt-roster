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
                    weapon2:'Rapier',
                },
                {
                    name:'Sir Patch',
                    weapon1: 'greatAxe',
                    weapon2: 'warHammer'
                },
                {
                    name: 'Morelynn',
                    weapon1: 'greatAxe',
                    weapon2: 'warHammer'
                }
            ]
        }
    }

    render() {
        return (
            <div className="container bg-light-grey">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Weapon</th>
                            <th scope="col">Weapon</th>
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
    getWeaponIcon(weapon) {
        let weaponIcon=''

        switch(weapon) {
            case 'lifeStaff': 
                weaponIcon = lifeStaff; 
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
            default:
                weaponName = "";
        }

        return weaponName;
    }

    render() {
        return (
            <tr>
                <th>{this.props.player.name}</th>
                <td>
                    <img height='15px' src={this.getWeaponIcon(this.props.player.weapon1)} />
                    <span>{this.getWeaponName(this.props.player.weapon1)}</span>
                </td>
                <td>
                    <img height='15px' src={this.getWeaponIcon(this.props.player.weapon2)} />
                    <span>{this.getWeaponName(this.props.player.weapon2)}</span>
                </td>
            </tr>
        )
    }
}

export default rosterBody
