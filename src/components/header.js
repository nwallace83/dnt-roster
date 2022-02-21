import React from 'react';
import logo from '../images/logo.jpg'
import discordLogo from '../images/discordLogo.jpg'
import { connect } from 'react-redux'
import { setSession, clearSession } from '../reducers/sessionSlice';

const mapStateToProps = (state) => {
    return {
        // activeTab: state.menu.activeTab,
        session: state.session}
}

const mapDispatchToProps = (dispatch) => {
    return {
        // changeTab: (tabName) => dispatch(changeTab(tabName)),
        setSession: (session) => dispatch(setSession(session)),
        logout: () => {
            dispatch(clearSession())
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
                urlParams.delete('code')
                urlParams.delete('state')
                if (res.ok) {
                    res.json().then(res => this.props.setSession(res))
                }
            })
            .catch( err => console.log(err))
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8" id="nav-menu">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#" id="company-logo" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain' }}>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Roster</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 txt-right">
                        <LoginLogoutButton session={this.props.session}/>
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
                <a href="#">
                    <button type="button" className="btn btn-success" >
                        <img src={discordLogo} height='20px'/>
                        <span>{this.props.session.userName}</span>
                    </button>
                </a>
             )
        } else {
            return (
                <a href="https://discord.com/oauth2/authorize?response_type=code&client_id=944735010311786537&scope=identify%20guilds&state=BACONISGOOD&redirect_uri=http%3A%2F%2Flocalhost%3A3001&prompt=consent">
                    <button type="button" className="btn btn-success" >
                        <img src={discordLogo} height='20px'/>
                        <span>Login</span>
                    </button>
                </a>
            )
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)
