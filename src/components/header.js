import React from 'react';
import logo from '../images/logo.jpg'
import discordLogo from '../images/discordLogo.jpg'

class Header extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8" id="nav-menu">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#" id="company-logo" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain' }}>
                                    {/* <img src={logo} height="20px" id="company-logo" /> */}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Roster</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4 txt-right">
                        <a href="https://discord.com/oauth2/authorize?response_type=code&client_id=944735010311786537&scope=identify%20guilds&state=15773059ghq9183habn&redirect_uri=http%3A%2F%2Flocalhost%3A3000&prompt=consent
    ">
                            <button type="button" className="btn btn-success" >
                                <img src={discordLogo} height='20px'/>
                                <span>Login</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>

        )
    }
}

export default Header
