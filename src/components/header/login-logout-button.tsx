import { useSelector } from 'react-redux'
import { DISCORD_URL } from '../../constants'
import { RootState } from '../../store'
import discordLogo from '../../images/discordLogo.png'

interface LoginLogoutButtonProps {
  logout: () => void
}
export default function LoginLogoutButton(props: LoginLogoutButtonProps) {
  const session = useSelector((state: RootState) => state.session)
  const logout = props.logout

  if (session.userName) {
    return (
      <button type="button" className="btn btn-success" onClick={logout}>
        <img className="round-image" src={session.avatarURL} height="25px" alt="discord avatar" />
        <span>Logout</span>
      </button>
    )
  } else {
    return (
      <a href={DISCORD_URL}>
        <button type="button" className="btn btn-success" >
          <img src={discordLogo} height="20px" alt="discord logo" />
          <span>Login</span>
        </button>
      </a>
    )
  }
}