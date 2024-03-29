/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useEffect, useState } from 'react'
import logo from '../../images/logo-green.png'
import logoSquare from '../../images/logo-square.png'
import { useDispatch, useSelector } from 'react-redux'
import { setSession, clearSession } from '../../reducers/session-slice'
import { changeTab } from '../../reducers/menu-slice'
import { toastr } from 'react-redux-toastr'
import { RootState } from '../../store'
import LoginLogoutButton from './login-logout-button'
import MobileLoginLogoutButton from './mobile-login-logout-button'
import { clearCharacter } from '../../reducers/character-slice'

export default function Header() {
  const dispatch = useDispatch()
  const activeTab = useSelector((state: RootState) => state.menu.activeTab)
  const session = useSelector((state: RootState) => state.session)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    fetch('/logout', { method: 'POST' }).then(() => {
      dispatch(clearSession())
      dispatch(changeTab('roster'))
      toastr.success('Logged Out', 'Successfully logged out')
      dispatch(clearCharacter())
    }).catch(() => toastr.error('Unable to log out', ''))
  }, [dispatch])

  useEffect(() => {
    const urlParams: URLSearchParams = new URLSearchParams(window.location.search)
    if (urlParams.get('code')) {
      fetch('/api/v1/discord/login/' + urlParams.get('code'), { method: 'POST' })
        .then(res => {
          if (res.ok) {
            window.history.replaceState({}, document.title, '/')
            res.json().then(res => {
              dispatch(setSession(res))
              toastr.success('Logged in', 'Welcome ' + session.userName)
              setIsLoading(false)
            }).catch(res => { console.error(res); setIsLoading(false) })
          }
          setIsLoading(false)
        }).catch(() => setIsLoading(false))
    } else if (session?.userName === '' || session?.userName == null) {
      fetch('/api/v1/auth')
        .then(res => {
          if (res.ok) {
            res.json().then(res => {
              dispatch(setSession(res))
            })
          }
          setIsLoading(false)
        }).catch(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [dispatch, session.userName])

  if (isLoading) {
    return null
  } else {
    return (
      <div className="row">
        <div className="col-md-8 d-none d-lg-inline-block" id="nav-menu">
          <img src={logo} height="40px" id="logo" alt="logo" />
          <ul className="nav nav-tabs">
            <HeaderTab tabName={'roster'} displayName={'Roster'} adminOnly={false} />
            <HeaderTab tabName={'crafters'} displayName={'Crafters'} adminOnly={false} />
            <HeaderTab tabName={'editCharacter'} displayName={'Edit Character'} adminOnly={true} />
          </ul>
        </div>
        <div className="col-md-4 txt-right d-none d-lg-inline-block" id="login-logout-div">
          <LoginLogoutButton logout={logout} />
        </div>
        <div className="row d-lg-none">
          <div className="col-auto"><img src={logoSquare} height="24px" id="logo" alt="logo" /></div>
          <div className="col-auto" onClick={() => dispatch(changeTab('roster'))} style={getMobileButtonStyle('roster')}><span>&#8226;roster&#8226;</span></div>
          <div className="col-auto" onClick={() => dispatch(changeTab('crafters'))} style={getMobileButtonStyle('crafters')}><span>&#8226;crafters&#8226;</span></div>
          {session.sessionToken ? <div className="col-auto" onClick={() => dispatch(changeTab('editCharacter'))} style={getMobileButtonStyle('editCharacter')}><span>&#8226;character&#8226;</span></div> : null}
          <MobileLoginLogoutButton logout={logout} />
        </div>
      </div>
    )
  }

  function getMobileButtonStyle(tabName: string) {
    return { color: activeTab === tabName ? 'green' : 'white' }
  }
}

interface HeaderTabProps {
  tabName: string,
  displayName: string,
  adminOnly: boolean
}
function HeaderTab(props: HeaderTabProps) {
  const dispatch = useDispatch()
  const activeTab = useSelector((state: RootState) => state.menu.activeTab)
  const isAdmin = useSelector((state: RootState) => state.session.isAdmin)

  if (props.adminOnly && !isAdmin) {
    return null
  } return (
    <li className="nav-item" onClick={() => dispatch(changeTab(props.tabName))}>
      <a className={'nav-link ' + (props.tabName === activeTab ? 'active' : 'inactive')} aria-current="page" href="#">{props.displayName}</a>
    </li>
  )
}
