import React from 'react';
import logo from '../images/logo-green.png'
import logoSquare from '../images/logo-square.png'
import discordLogo from '../images/discordLogo.png'
import { connect } from 'react-redux'
import { setSession, clearSession } from '../reducers/sessionSlice';
import { clearCharacter, saveCharacter } from '../reducers/characterSlice';
import { setRoster } from '../reducers/rosterSlice';
import { changeTab } from '../reducers/menuSlice'
import Cookies from 'js-cookie'
import { toastr } from 'react-redux-toastr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state) => {
    return {
        activeTab: state.menu.activeTab,
        session: state.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTab: (tabName) => dispatch(changeTab(tabName)),
        setSession: (session) => dispatch(setSession(session)),
        saveCharacter: (character) => dispatch(saveCharacter(character)),
        setRoster: (roster) => dispatch(setRoster(roster)),
        logout: () => {
            dispatch(clearSession())
            dispatch(clearCharacter())
            dispatch(changeTab('roster'))
            Cookies.remove("authorization")
            toastr.success('Logged Out','Successfully logged out')
        }
    }
}

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            discordURL: 'https://discord.com/oauth2/authorize?response_type=code&client_id=944735010311786537&scope=identify%20guilds&state=' + this.randomhash() + '&prompt=consent&redirect_uri=' + encodeURIComponent(window.location.protocol + '//' + window.location.host)
        }
    }

    randomhash() {
        let text = ''
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 40; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text
    }

    componentDidMount() {
        this.initializeSession()
        this.initializeRoster()
    }

    initializeRoster() {
        fetch('/api/v1/roster').then(res => {
            if (res.ok) {
                res.json().then(res => this.props.setRoster(res))
            } else {
                window.alert('Problem loading roster, tell Kavion where you touched it')
            }
        })
    }

    initializeSession() {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)

        if (urlParams.get('code')) {
            fetch('/api/v1/discord/login/' + urlParams.get('code'),{method: "POST"})
            .then( res => {
                window.history.replaceState({}, document.title, "/")
                if (res.ok) {
                    res.json().then(res => {
                        this.props.setSession(res)
                        Cookies.set('authorization',res,{expires: 30})
                        this.initializeCharacter()
                        toastr.success('Logged in', 'Welcome ' + this.props.session.userName)
                    })
                }
            })
        } else {
            this.setSessionFromCookie()
        }
    }

    setSessionFromCookie() {
        const authCookie = Cookies.get("authorization")
        if (authCookie) {
            fetch('/api/v1/auth')
            .then (res => {
                if (res.ok) {
                    res.json().then(res => {
                        this.props.setSession(res)
                        Cookies.set('authorization',res,{expires: 30})
                        this.initializeCharacter()
                    })
                } else {
                    this.props.logout()
                    this.props.changeTab('roster')
                }
            })
        } else {
            this.props.changeTab('roster')
        }
    }

    initializeCharacter() {
        fetch('/api/v1/character/').then(res => {
            if (res.ok) {
                res.json().then(res => this.props.saveCharacter(res))
            } else {
                this.props.logout()
                toastr.error('Error','Unable to get your character, refresh page and yell at Kavion')
            }
        })
    }

    showEditCharacersTab() {
        if (this.props.session.sessionToken && this.props.session.userName) {
            return(
                <li className="nav-item" onClick={() => this.props.changeTab('editCharacter')}>
                    <a className={this.getButtonClasses('editCharacter')} aria-current="page" href="#">Edit Character</a>
                </li>
            )
        }
    }

    getButtonClasses(tabName) {
        return "nav-link " + (this.props.activeTab === tabName ? "active" : "inactive")
    }

    getMobileButtonStyle(tabName) { 
        return {color: this.props.activeTab === tabName ? 'green' : 'white'}
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 d-none d-lg-inline-block" id="nav-menu">
                    <img src={logo} height="40px" id="logo"/>
                    <ul className="nav nav-tabs">
                        <li className="nav-item" onClick={() => this.props.changeTab('roster')}>
                            <a className={this.getButtonClasses('roster')} aria-current="page" href="#">Roster</a>
                        </li>
                        <li className="nav-item" onClick={() => this.props.changeTab('crafters')}>
                            <a className={this.getButtonClasses('crafters')} aria-current="page" href="#">Crafters</a>
                        </li>
                        {this.showEditCharacersTab()}
                    </ul>
                </div>
                <div className="col-md-4 txt-right d-none d-lg-inline-block" id="login-logout-div">
                    <LoginLogoutButton discordURL={this.state.discordURL} session={this.props.session} logout={this.props.logout} />
                </div>
                <div className="row d-lg-none">
                    <div className="col-auto"><img src={logoSquare} height="24px" id="logo"/></div>
                    <div className="col-auto" onClick={() => this.props.changeTab('roster')} style={this.getMobileButtonStyle('roster')}><span>&#8226;roster&#8226;</span></div>
                    <div className="col-auto" onClick={() => this.props.changeTab('crafters')} style={this.getMobileButtonStyle('crafters')}><span>&#8226;crafters&#8226;</span></div>
                    {this.props.session.sessionToken ? <div className="col-auto" onClick={() => this.props.changeTab('editCharacter')} style={this.getMobileButtonStyle('crafeditCharacterters')}><span>&#8226;character&#8226;</span></div> : null }  
                    <MobileLoginLogoutButton discordURL={this.state.discordURL} session={this.props.session} logout={this.props.logout}/>
                </div>
            </div>
        )
    }
}

class MobileLoginLogoutButton extends React.Component {
    render() {
        if (this.props.session.sessionToken && this.props.session.userName) {
            return (
                <div className="col-1" onClick={this.props.logout}>
                     <img className="round-image" src={this.props.session.avatarURL} height='24px'/>
                </div>
            )
        } else {
            return (
                <div className="col-1">
                    <a href={this.props.discordURL}><FontAwesomeIcon icon={faUser} style={{color:'green'}}/></a>
                </div>
            )
        }
    }
}

class LoginLogoutButton extends React.Component {
    render() {
        if (this.props.session.sessionToken && this.props.session.userName) {
            return (
                    <button type="button" className="btn btn-success" onClick={this.props.logout}>
                        <img className="round-image" src={this.props.session.avatarURL} height='25px'/>
                        <span>Logout</span>
                    </button>
             )
        } else {
            return (          
                <a href={this.props.discordURL}>
                    <button type="button" className="btn btn-success" >
                        <img src={discordLogo} height='20px' />
                        <span>Login</span>
                    </button>
                </a>
            )
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)
