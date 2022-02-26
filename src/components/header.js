import React from 'react';
import logo from '../images/logo-green.png'
import discordLogo from '../images/discordLogo.png'
import { connect } from 'react-redux'
import { setSession, clearSession } from '../reducers/sessionSlice';
import { clearCharacter, saveCharacter } from '../reducers/characterSlice';
import { changeTab } from '../reducers/menuSlice'
import Cookies from 'js-cookie'
import { toastr } from 'react-redux-toastr';

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
    componentDidMount() {
        this.initializeSession()
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8" id="nav-menu">
                        <img src={logo} height="40px" id="logo"/>
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={() => this.props.changeTab('roster')}>
                                <a className={this.getButtonClasses('roster')} aria-current="page" href="#">Roster</a>
                            </li>
                            {this.showEditCharacersTab()}
                        </ul>
                    </div>
                    <div className="col-md-4 txt-right" id="login-logout-div">
                        <LoginLogoutButton session={this.props.session} logout={this.props.logout} />
                    </div>
                </div>
            </div>

        )
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
            let discord_url = 'https://discord.com/oauth2/authorize?response_type=code&client_id=944735010311786537&scope=identify%20guilds&state=BACONISGOOD&prompt=none&redirect_uri=' + encodeURIComponent(window.location.protocol + '//' + window.location.host)
            return (          
                <a href={discord_url}>
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
