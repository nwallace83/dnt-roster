import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { DISCORD_URL } from '../../constants'
import { RootState } from '../../store'

interface MobileLoginLogoutButtonProps {
  logout: () => void
}
export default function MobileLoginLogoutButton(props: MobileLoginLogoutButtonProps) {
  const session = useSelector((state: RootState) => state.session)
  if (session.sessionToken && session.userName) {
    return (
      <div className="col-1" onClick={props.logout}>
        <img className="round-image" src={session.avatarURL} height="24px" alt="discord avatar" />
      </div>
    )
  } else {
    return (
      <div className="col-1">
        <a href={DISCORD_URL}><FontAwesomeIcon icon={faUser as IconProp} style={{ color: 'green' }} /></a>
      </div>
    )
  }
}