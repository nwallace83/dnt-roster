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
import { toastr } from 'react-redux-toastr'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilter, replaceCharacter, toggleShowInactive } from '../reducers/rosterSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { confirm } from 'react-confirm-box'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { RootState } from '../store'

export default function Roster() {
    const roster = useSelector((state: RootState) => state.roster.filteredRoster)

    return (
        <div className="row bg-light-grey padding-top-4">
            <RosterFilter />
            <table className="table table-striped table-bordered ">
                    <RosterHeader />
                <tbody>
                    {roster.map( (player,index) => {return <Player player={player} key={index} />})}
                </tbody>
            </table>
        </div>
    )
}

function RosterFilter() {
    const dispatch = useDispatch()
    const showInactive = useSelector((state: RootState) => state.roster.showInactive)

    return (
        <div className="row roster-filter-div">
            <div className="col-md-12" id="roster-filter">
                <label className="form-check-label" htmlFor="rosterfilterinput">Filter:</label>
                <input id="rosterfilterinput" type="text" name="filter" onChange={applyFilterAction} />
            </div>
            <div className="col-md-12 showinactive-div">
                <input className="form-check-input" name ="showinactive" type="checkbox" value="" onClick={applyInactiveFilter} id="showinactive" checked={showInactive} />
                <label className="form-check-label" htmlFor="showinactive">Show Inactive</label>
            </div>
        </div>
    )

    function applyFilterAction() {
        let getFilterValueFromHTML = (): string => {
            let element: HTMLInputElement = document.getElementById('rosterfilterinput') as HTMLInputElement
            return element ? element.value.trim() : ''
        }

        let filterValue: string = getFilterValueFromHTML()
        setTimeout(() => {
            if (filterValue === getFilterValueFromHTML()) {
                dispatch(applyFilter(filterValue))
            }
        },250)
    }

    function applyInactiveFilter() {
        dispatch(toggleShowInactive())
        let element: HTMLInputElement = document.getElementById('rosterfilterinput') as HTMLInputElement
        if (element) {
            let filterValue: string = element ? element.value.trim() : ''
            dispatch(applyFilter(filterValue))
        }
    }
}

function RosterHeader() {
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

interface PlayerProps {
    player: Character,
    key: number,
}
function Player(props: PlayerProps) {
    const player = props.player
    return (
        <tr>
            <th>{player.characterName}</th>
            <td className="d-none d-lg-table-cell">
                {player.discordUserName}
            </td>
            <td>
                <img className="padding-bottom-4" height="15px" src={getWeaponIcon(player.primaryWeapon1)} alt=""/>
                <span>{player.primaryWeapon1}</span>

                <br/><img className="padding-bottom-4 d-md-none" height="15px" src={getWeaponIcon(player.primaryWeapon2)} alt=""/>
                <span className="d-lg-none">{player.primaryWeapon2}</span>
                <span className="d-lg-none"><br/>{player.primaryArmor}</span>
                <span className="d-lg-none"><br/>{player.primaryRole}</span>
                <span className="d-lg-none"><br/>{player.primaryGS}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <img className="padding-bottom-4" height="15px" src={getWeaponIcon(player.primaryWeapon2)} alt=""/>
                <span>{player.primaryWeapon2}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <span>{player.primaryArmor}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <span>{player.primaryRole}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <span>{player.primaryGS}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <img className="padding-bottom-4" height="15px" src={getWeaponIcon(player.secondaryWeapon1)} alt=""/>
                <span>{player.secondaryWeapon1}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <img className="padding-bottom-4" height="15px" src={getWeaponIcon(player.secondaryWeapon2)} alt=""/>
                <span>{player.secondaryWeapon2}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <span>{player.secondaryArmor}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <span>{player.secondaryRole}</span>
            </td>
            <td className="d-none d-lg-table-cell">
                <span>{player.secondaryGS}</span>
            </td>
            <ActiveStatus player={player} />
        </tr>
    )

    function getWeaponIcon(weapon: string): string {
        let weaponIcon=''

        switch(weapon) {
            case 'Life Staff': 
                weaponIcon = lifeStaff
                break
            case 'Bow': 
                weaponIcon = bow
                break
            case 'Fire Staff': 
                weaponIcon = fireStaff
                break
            case 'Great Axe': 
                weaponIcon = greatAxe
                break
            case 'Hatchet': 
                weaponIcon = hatchet
                break
            case 'Ice Gauntlet': 
                weaponIcon = iceGauntlet
                break
            case 'Musket': 
                weaponIcon = musket
                break
            case 'Rapier': 
                weaponIcon = rapier
                break
            case 'Spear': 
                weaponIcon = spear
                break
            case 'Sword': 
                weaponIcon = sword
                break
            case 'Void Gauntlet': 
                weaponIcon = voidGauntlet
                break
            case 'War Hammer': 
                weaponIcon = warHammer
                break
            default:
                weaponIcon = ''
        }

        return weaponIcon
    }
}


interface ActiveStatusProps {
    player: Character
}
function ActiveStatus(props: ActiveStatusProps) {
    const session = useSelector((state: RootState) => state.session)
    const player = props.player
    const dispatch = useDispatch()

    return (
        <td className="txt-center d-none d-lg-table-cell">
            <FontAwesomeIcon onClick={() => changeActiveStatus()} className={getClasses()} icon={player.inactive ? faThumbsDown as IconProp: faThumbsUp as IconProp} />
        </td>
    )

    function getClasses(): string {
        if (session.isAdmin) {
            return player.inactive ? 'inactive-player-icon-admin' : 'active-player-icon-admin'
        } else {
            return player.inactive ? 'inactive-player-icon' : 'active-player-icon'
        }    
    }

    async function changeActiveStatus(): Promise<any> {
        if (!session.isAdmin) {
            return null
        }

        const result = await confirm('Change ' + player.characterName + ' to ' + (player.inactive ? 'active?' : 'inactive?'))
        if (result) {
            const endPoint = '/api/v1/admin/character/inactive/' + player.id + '/' + !player.inactive
            fetch(endPoint,{method: 'POST'}).then(res => {
                if (res.ok) {
                    res.json().then(res => {
                        dispatch(replaceCharacter(res))
                        toastr.success('success', player.characterName + ' is now ' + (player.inactive ? 'inactive' : 'active'))
                    })
                } else {
                    toastr.error('Error','Tell Kavion where you touched it')
                }
            })
        }
    }
}