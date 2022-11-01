/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect } from 'react'
import logo from '../images/logo-green.png'
import logoSquare from '../images/logo-square.png'
import discordLogo from '../images/discordLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { setSession, clearSession, SessionState } from '../reducers/sessionSlice'
import { clearCharacter, saveCharacter } from '../reducers/characterSlice'
import { setRoster } from '../reducers/rosterSlice'
import { changeTab } from '../reducers/menuSlice'
import Cookies from 'js-cookie'
import { toastr } from 'react-redux-toastr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { RootState } from '../store'

export default function Header() {
    const discordURL: string = 'https://discord.com/oauth2/authorize?response_type=code&client_id=944735010311786537&scope=identify%20guilds&state=ABCDEF&prompt=consent&redirect_uri=' + encodeURIComponent(window.location.protocol + '//' + window.location.host)
    const dispatch = useDispatch()
    const activeTab = useSelector((state: RootState) => state.menu.activeTab)
    const session = useSelector((state: RootState) => state.session)

    const logout = useCallback(() => {
        dispatch(clearSession())
        dispatch(clearCharacter())
        dispatch(changeTab('roster'))
        Cookies.remove('authorization')
        toastr.success('Logged Out','Successfully logged out')
    },[dispatch])

    const initializeRoster = useCallback(() => {
        fetch('/api/v1/roster').then(res => {
            if (res.ok) {
                res.json().then(res => dispatch(setRoster(res))).catch(res => console.error(res))
            } else {
                window.alert('Problem loading roster, tell Kavion where you touched it')
            }
        })
    },[dispatch])

    const initializeCharacter = useCallback(() => {
        fetch('/api/v1/character/').then(res => {
            if (res.ok) {
                res.json().then(res => dispatch(saveCharacter(res)))
            } else {
                logout()
                toastr.error('Error','Unable to get your character, refresh page and yell at Kavion')
            }
        })
    },[dispatch, logout])

    const setSessionFromCookie = useCallback(() => {
        const authCookie: string | undefined = Cookies.get('authorization')

        if (authCookie) {
            fetch('/api/v1/auth')
            .then (res => {
                if (res.ok) {
                    res.json().then(res => {
                        dispatch(setSession(res.token))
                        Cookies.set('authorization',res.token,{expires: 30})
                        initializeCharacter()
                    })
                } else {
                    logout()
                    dispatch(changeTab('roster'))
                }
            })
        } 
    },[dispatch, initializeCharacter, logout])

    const initializeSession = useCallback(() => {
        const queryString: string = window.location.search
        const urlParams: URLSearchParams = new URLSearchParams(queryString)

        if (urlParams.get('code')) {
            fetch('/api/v1/discord/login/' + urlParams.get('code'),{method: 'POST'})
            .then( res => {
                if (res.ok) {
                    window.history.replaceState({}, document.title, '/')
                    res.json().then(res => {
                        const token = res.token
                        dispatch(setSession(token))
                        Cookies.set('authorization',token,{expires: 30})
                        initializeCharacter()
                        toastr.success('Logged in', 'Welcome ' + session.userName)
                    }).catch(res => console.error(res))
                }
            })
        } else {
            setSessionFromCookie()
        }
    },[dispatch, initializeCharacter, session.userName, setSessionFromCookie])

    useEffect(() => {
        if (!session.sessionToken) {
            initializeSession()
        }
        initializeRoster()  
    },[session, initializeRoster, initializeSession])

    return (
        <div className="row">
            <div className="col-md-8 d-none d-lg-inline-block" id="nav-menu">
                <img src={logo} height="40px" id="logo" alt="logo"/>
                <ul className="nav nav-tabs">
                    <li className="nav-item" onClick={() => dispatch(changeTab('roster'))}>
                        
                        <a className={getButtonClasses('roster')} aria-current="page" href="#">Roster</a>
                    </li>
                    <li className="nav-item" onClick={() => dispatch(changeTab('crafters'))}>
                        <a className={getButtonClasses('crafters')} aria-current="page" href="#">Crafters</a>
                    </li>
                    {showEditCharacersTab()}
                </ul>
            </div>
            <div className="col-md-4 txt-right d-none d-lg-inline-block" id="login-logout-div">
                <LoginLogoutButton discordURL={discordURL} session={session} logout={logout} />
            </div>
            <div className="row d-lg-none">
                <div className="col-auto"><img src={logoSquare} height="24px" id="logo" alt="logo"/></div>
                <div className="col-auto" onClick={() => dispatch(changeTab('roster'))} style={getMobileButtonStyle('roster')}><span>&#8226;roster&#8226;</span></div>
                <div className="col-auto" onClick={() => dispatch(changeTab('crafters'))} style={getMobileButtonStyle('crafters')}><span>&#8226;crafters&#8226;</span></div>
                {session.sessionToken ? <div className="col-auto" onClick={() => dispatch(changeTab('editCharacter'))} style={getMobileButtonStyle('editCharacter')}><span>&#8226;character&#8226;</span></div> : null }  
                <MobileLoginLogoutButton discordURL={discordURL} session={session} logout={logout}/>
            </div>
        </div>
    )

    function showEditCharacersTab() {
        if (session.sessionToken && session.userName) {
            return(
                <li className="nav-item" onClick={() => dispatch(changeTab('editCharacter'))}>
                    <a className={getButtonClasses('editCharacter')} aria-current="page" href="#">Edit Character</a>
                </li>
            )
        }
    }

    function getButtonClasses(tabName: string): string {
        return 'nav-link ' + (activeTab === tabName ? 'active' : 'inactive')
    }
    
    interface GetMobileButtonStyle {
        color: string
    }
    function getMobileButtonStyle(tabName: string): GetMobileButtonStyle { 
        return {color: activeTab === tabName ? 'green' : 'white'}
    }
}

interface MobileLoginLogoutButtonProps {
    discordURL: string,
    session: SessionState,
    logout: () => void
}
function MobileLoginLogoutButton(props: MobileLoginLogoutButtonProps) {
    if (props.session.sessionToken && props.session.userName) {
        return (
            <div className="col-1" onClick={props.logout}>
                    <img className="round-image" src={props.session.avatarURL} height="24px" alt="discord avatar"/>
            </div>
        )
    } else {
        return (
            <div className="col-1">
                <a href={props.discordURL}><FontAwesomeIcon icon={faUser as IconProp} style={{color:'green'}}/></a>
            </div>
        )
    }
}

interface LoginLogoutButtonProps {
    discordURL: string,
    session: SessionState,
    logout: () => void
}
function LoginLogoutButton(props: LoginLogoutButtonProps) {
    const discordURL = props.discordURL
    const session = props.session
    const logout = props.logout
    
        if (session.sessionToken && session.userName) {
            return (
                    <button type="button" className="btn btn-success" onClick={logout}>
                        <img className="round-image" src={session.avatarURL} height="25px"alt="discord avatar"/>
                        <span>Logout</span>
                    </button>
             )
        } else {
            return (          
                <a href={discordURL}>
                    <button type="button" className="btn btn-success" >
                        <img src={discordLogo} height="20px" alt="discord logo"/>
                        <span>Login</span>
                    </button>
                </a>
            )
        }
}
