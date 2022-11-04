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
import Character from '../../interfaces/character'
import ActiveStatus from './active_status'

interface PlayerProps {
  player: Character,
  key: number,
}
export default function Player(props: PlayerProps) {
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
          <ActiveStatus character={player} />
      </tr>
  )

  function getWeaponIcon(weapon: string): string {
      let weaponIcon=''

  switch (weapon) {
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