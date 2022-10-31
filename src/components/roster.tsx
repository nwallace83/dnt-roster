import React from 'react'
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
import Character from '../interfaces/character'
import Session from '../interfaces/session'
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { setRoster, applyFilter, replaceCharacter, toggleShowInactive } from '../reducers/rosterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { confirm } from "react-confirm-box"
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const mapStateToProps = (state: any) => {
    return {
        roster: state.roster.filteredRoster,
        showInactive: state.roster.showInactive,
        session: state.session
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setRoster: (roster: Array<Character>) => dispatch(setRoster(roster)),
        applyFilter: (filterText: string) => dispatch(applyFilter(filterText)),
        replaceCharacter: (character: Character) => dispatch(replaceCharacter(character)),
        toggleShowInactive: () => dispatch(toggleShowInactive())
    }
}

interface RosterProps {
    roster: Array<Character>,
    showInactive: boolean,
    session: Session
}
interface RosterActionProps {
    setRoster: (c: Array<Character>) => void,
    applyFilter: (s: string) => void,
    replaceCharacter: (c: Character) => void,
    toggleShowInactive: () => void
}
class Roster extends React.Component<RosterProps & RosterActionProps> {
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

interface RosterFilterProps {
    toggleShowInactive: any,
    showInactive: any,
    roster: any,
    applyFilter: any
}
class RosterFilter extends React.Component<RosterFilterProps> {
    render() {
        return (
            <div className="row roster-filter-div">
                <div className="col-md-12" id="roster-filter">
                    <label className="form-check-label" htmlFor="rosterfilterinput">Filter:</label>
                    <input id="rosterfilterinput" type="text" name="filter" onChange={this.applyFilter} />
                </div>
                <div className="col-md-12 showinactive-div">
                    <input className="form-check-input" name ="showinactive" type="checkbox" value="" onClick={this.applyInactiveFilter} id="showinactive" checked={this.props.showInactive} />
                    <label className="form-check-label" htmlFor="showinactive">Show Inactive</label>
                </div>
            </div>
        )
    }

     applyFilter = (): void => {
        let getFilterValueFromHTML = (): string => {
            let element: HTMLInputElement = document.getElementById('rosterfilterinput') as HTMLInputElement
            return element ? element.value.trim() : ''
        }

        let filterValue: string = getFilterValueFromHTML()
        setTimeout(() => {
            if (filterValue === getFilterValueFromHTML()) {
                this.props.applyFilter(filterValue)
            }
        },250)
    }

    applyInactiveFilter = () => {
        this.props.toggleShowInactive()
        let element: HTMLInputElement = document.getElementById('rosterfilterinput') as HTMLInputElement
        if (element) {
            let filterValue: string = element.value.trim()
            this.props.applyFilter(filterValue)
        }
    }
}

interface RosterHeaderProps {
    session: Session
}
class RosterHeader extends React.Component<RosterHeaderProps> {
    render() {
        return (
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th className="d-none d-lg-table-cell" scope="col">Discord</th>
                <th scope="col" colSpan={5}>Main</th>
                <th className="d-none d-lg-table-cell" scope="col" colSpan={5}>Alt</th>
                <th className="d-none d-lg-table-cell" scope="col">Active</th>
            </tr>
        </thead>
        )
    }
}

interface PlayerProps {
    replaceCharacter: any,
    session: Session,
    player: Character
}
class Player extends React.Component<PlayerProps> {
    render() {
        return (
            <tr>
                <th>{this.props.player.characterName}</th>
                <td className="d-none d-lg-table-cell">
                    {this.props.player.discordUserName}
                </td>
                <td>
                    <img className="padding-bottom-4" height='15px' src={this.getWeaponIcon(this.props.player.primaryWeapon1)} />
                    <span>{this.props.player.primaryWeapon1}</span>

                    <br/><img className="padding-bottom-4 d-md-none" height='15px' src={this.getWeaponIcon(this.props.player.primaryWeapon2)} />
                    <span className="d-lg-none">{this.props.player.primaryWeapon2}</span>
                    <span className="d-lg-none"><br/>{this.props.player.primaryArmor}</span>
                    <span className="d-lg-none"><br/>{this.props.player.primaryRole}</span>
                    <span className="d-lg-none"><br/>{this.props.player.primaryGS}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <img className="padding-bottom-4" height='15px' src={this.getWeaponIcon(this.props.player.primaryWeapon2)} />
                    <span>{this.props.player.primaryWeapon2}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <span>{this.props.player.primaryArmor}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <span>{this.props.player.primaryRole}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <span>{this.props.player.primaryGS}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.secondaryWeapon1)} />
                    <span>{this.props.player.secondaryWeapon1}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <img className='padding-bottom-4' height='15px' src={this.getWeaponIcon(this.props.player.secondaryWeapon2)} />
                    <span>{this.props.player.secondaryWeapon2}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <span>{this.props.player.secondaryArmor}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <span>{this.props.player.secondaryRole}</span>
                </td>
                <td className="d-none d-lg-table-cell">
                    <span>{this.props.player.secondaryGS}</span>
                </td>
                <ActiveStatus replaceCharacter={this.props.replaceCharacter} session={this.props.session} player={this.props.player} />
            </tr>
        )
    }

    getWeaponIcon(weapon: string): string {
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


interface ActiveStatusProps {
    replaceCharacter: any,
    session: Session,
    player: Character
}
class ActiveStatus extends React.Component<ActiveStatusProps> {
    render() {
        return (
            <td className="txt-center d-none d-lg-table-cell">
                <FontAwesomeIcon onClick={() => this.changeActiveStatus()} className={this.getClasses()} icon={this.props.player.inactive ? faThumbsDown as IconProp: faThumbsUp as IconProp} />
            </td>
        )
    }

    getClasses(): string {
        if (this.props.session.isAdmin) {
            return this.props.player.inactive ? "inactive-player-icon-admin" : "active-player-icon-admin"
        } else {
            return this.props.player.inactive ? "inactive-player-icon" : "active-player-icon"
        }    
    }

    async changeActiveStatus(): Promise<any> {
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