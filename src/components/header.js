import React from 'react';
import logo from '../images/logo.jpg'
import discordLogo from '../images/discordLogo.png'
import { connect } from 'react-redux'
import { setSession, clearSession } from '../reducers/sessionSlice';
import { changeTab } from '../reducers/menuSlice'
import Cookies from 'js-cookie'

const mapStateToProps = (state) => {
    return {
        activeTab: state.menu.activeTab,
        session: state.session}
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTab: (tabName) => dispatch(changeTab(tabName)),
        setSession: (session) => dispatch(setSession(session)),
        logout: () => {
            dispatch(clearSession())
            dispatch(changeTab('roster'))
            Cookies.remove("authorization")
        }
    }
}

class Header extends React.Component {
    componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        if (urlParams.get('code')) {
            fetch('/api/v1/discord/login/' + urlParams.get('code'),{method: "POST"})
            .then( res => {
                window.history.replaceState({}, document.title, "/")
                if (res.ok) {
                    res.json().then(res => {
                        this.props.setSession(res)
                        Cookies.set('authorization',res,{expires: 30})
                    })
                }
            })
            .catch( err => console.log(err))
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
                    this.props.setSession(authCookie)
                } else {
                    this.props.logout()
                    this.props.changeTab('roster')
                }
            })
        } else {
            this.props.changeTab('roster')
        }
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
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#" id="company-logo" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain' }} />
                            </li>
                            <li className="nav-item" onClick={() => this.props.changeTab('roster')}>
                                <a className={this.getButtonClasses('roster')} aria-current="page" href="#">Roster</a>
                            </li>
                            {this.showEditCharacersTab()}
                        </ul>
                    </div>
                    <div className="col-md-4 txt-right">
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
            let discord_url = 'https://discord.com/oauth2/authorize?response_type=code&client_id=944735010311786537&scope=identify%20guilds&state=BACONISGOOD&prompt=consent&redirect_uri=' + encodeURIComponent(window.location.protocol + '//' + window.location.host)
            return (          
                <a href={discord_url}>
                    <button type="button" className="btn btn-success" >
                        <img src={discordLogo} height='25px'/>
                        <span>Login</span>
                    </button>
                </a>
            )
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)
