import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import Character from '../../interfaces/character'
import { replaceCharacter } from '../../reducers/rosterSlice'
import { RootState } from '../../store'
import { confirm } from 'react-confirm-box'

interface ActiveStatusProps {
  character: Character
}
export default function ActiveStatus(props: ActiveStatusProps) {
  const session = useSelector((state: RootState) => state.session)
  const player = props.character
  const dispatch = useDispatch()

  return (
    <td className="txt-center d-none d-lg-table-cell">
      <FontAwesomeIcon onClick={() => changeActiveStatus()} className={getClasses()} icon={player.inactive ? faThumbsDown as IconProp : faThumbsUp as IconProp} />
    </td>
  )

  function getClasses(): string {
    if (session.isAdmin) {
      return player.inactive ? 'inactive-player-icon-admin' : 'active-player-icon-admin'
    } else {
      return player.inactive ? 'inactive-player-icon' : 'active-player-icon'
    }
  }

  async function changeActiveStatus() {
    if (!session.isAdmin) {
      return null
    }

    const result = await confirm('Change ' + player.characterName + ' to ' + (player.inactive ? 'active?' : 'inactive?'))
    if (result) {
      const endPoint = '/api/v1/admin/character/inactive/' + session.id + '/' + !player.inactive
      fetch(endPoint, { method: 'POST' }).then(res => {
        if (res.ok) {
          res.json().then(res => {
            dispatch(replaceCharacter(res))
            toastr.success('success', player.characterName + ' is now ' + (player.inactive ? 'inactive' : 'active'))
          })
        } else {
          toastr.error('Error', 'Tell Kavion where you touched it')
        }
      })
    }
  }
}