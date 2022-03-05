import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import _ from "lodash";
import { connect } from "react-redux";
import { useDrag } from 'react-dnd'
import lifeStaff from '../../images/weapons/lifestaff.png'
import bow from '../../images/weapons/bow.png'
import fireStaff from '../../images/weapons/firestaff.png'
import greatAxe from '../../images/weapons/greataxe.png'
import hatchet from '../../images/weapons/hatchet.png'
import iceGauntlet from '../../images/weapons/icegauntlet.png'
import musket from '../../images/weapons/musket.png'
import rapier from '../../images/weapons/rapier.png'
import spear from '../../images/weapons/spear.png'
import sword from '../../images/weapons/sword.png'
import voidGauntlet from '../../images/weapons/voidgauntlet.png'
import warHammer from '../../images/weapons/warhammer.png'

const mapStateToProps = (state) => {
    return {
        roster: state.roster.roster,
    }
}

const PlayerCard = ({ playerName, primaryWeapon1, primaryWeapon2 }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'player',
        item: { playerName, primaryWeapon1, primaryWeapon2 },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    function getWeaponIcon(weapon) {
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

    const style = {
        backgroundColor:"white",
        borderRadius: "5px",
        margin: "5px"
    }

    return (
        <div className='col-2'>
            <div style={style} ref={dragRef}>
                <span>{playerName}</span>
                <img src={getWeaponIcon(primaryWeapon1)} height="20px" alt='' style={{marginLeft:"10px"}} title={primaryWeapon1}/>
                <img src={getWeaponIcon(primaryWeapon2)} height="20px" alt='' style={{marginLeft:"10px"}} title={primaryWeapon1}/>
                {isDragging && '😱'}
            </div>
        </div>
    )
}

export const PlayerBasket = () => {
    const [player, setPlayer] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: 'player',
        drop: (item) => setPlayer(item),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <React.Fragment>
            <div className="row" ref={dropRef}>
                <PlayerCard playerName={player.playerName} primaryWeapon1={player.primaryWeapon1} primaryWeapon2={player.primaryWeapon2} />
            </div>
        </React.Fragment>
    )
}

class WarRoster extends React.Component {
    getActivePlayers() {
        return _.filter(this.props.roster,player => {
            return !player.inactive
        })
    }

    render() {
        return (
            <div className="row bg-light-grey padding-top-4">
                <div className="col-12">
                    <div className="row">
                        <PlayerBasket />
                        {/* <WarRosterGroup roster={this.props.roster} groupNum="1"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="2"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="3"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="4"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="5"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="6"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="7"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="8"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="9"/>
                        <WarRosterGroup roster={this.props.roster} groupNum="10"/> */}
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        {this.getActivePlayers().map(character => {return (
                            <PlayerCard playerName={character.characterName} primaryWeapon1={character.primaryWeapon1}  primaryWeapon2={character.primaryWeapon2}/>
                            )})}
                    </div>
                </div>
            </div>
        )
    }
}


class WarRosterGroup extends React.Component {
    render() {
        return (
            <div className="col-2">
                <h3>Group {this.props.groupNum} </h3>
                <WarRosterSlot roster={this.props.roster} />
                <WarRosterSlot roster={this.props.roster} />
                <WarRosterSlot roster={this.props.roster} />
                <WarRosterSlot roster={this.props.roster} />
                <WarRosterSlot roster={this.props.roster} />
            </div>
        )}
}

class WarRosterSlot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchedValues:[],
            selectedPlayer: {},
            style: {
                paddingBottom: "2px"
            }
        }
    }

    resetSearch = () => {
        this.setState({searchedValues:[]})
    }

    searchValue = (e) => {
        if (e.target.value.length < 1) {
            return this.setState({searchedValues: []})
        }
        this.setState({searchedValues:[]})
        const searchValue = e.target.value.toUpperCase()

        let valuesFound = _.filter(this.props.roster,character => {
            return !character.inactive && (character.characterName.toUpperCase().indexOf(searchValue) > -1)
        })

        if (valuesFound.length > 10) {
            this.setState({searchedValues: valuesFound.slice(0,10)})
        } else {
            this.setState({searchedValues: valuesFound})
        }
    }

    render() {
        return (
            <div className="col-12" style={this.state.style}>
                <input type="text" onChange={this.searchValue} onBlur={this.resetSearch}/>
                <WarRosterTypeAhead searchedValues={this.state.searchedValues}/>
            </div>
        )
    }
}

class WarRosterTypeAhead extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            styles: {
                styleUL: {
                    backgroundColor: "darkgrey",
                    listStyleType: "none",
                    position: "absolute",
                    width: "191px",
                    paddingLeft: "0px"
                },
                styleLI: {
                    border: "1px solid black",
                    cursor: "pointer"
                }
            }
        }
    }

    render() {
        return (
            <ul className="war-roster-ul" style={this.state.styles.styleUL}>
                {this.props.searchedValues.map(character => {return (
                    <li className="war-roster-li" style={this.state.styles.styleLI}>{character.characterName}</li>
                )
            })}
            </ul>
        ) }
}

export default connect(mapStateToProps)(WarRoster)