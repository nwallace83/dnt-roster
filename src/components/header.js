import React from 'react';
import logo from '../images/logo.jpg'

class Header extends React.Component {
    render() {
        return (
            <div class="row">
                <div class="col-md-1">
                 <img src={logo} height='40px' />
                </div>
                <div class="col-md-8">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Roster</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header
