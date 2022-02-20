import React from 'react';
import logo from '../images/logo.jpg'

class Header extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-1">
                 <img src={logo} height='40px' />
                </div>
                <div className="col-md-8">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Roster</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header
