import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

class CharacterBody extends React.Component {
    render() {
        return (
            <div className="container bg-light-grey">
                <div className="row txt-center">
                    <div col-md-1>
                        <hr />
                    </div>
                </div>
                <EditCharacterForm />
            </div>
        )
    }
}

class EditCharacterForm extends React.Component {
    render() {
        return (
            <div className="col-md-8 offset-md-2">
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Character Name</label>
                        <input type="text" className="form-control" />
                        <hr />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label font-weight-bold">Weapon 1</label>
                        <select className="form-select">
                            <option selected></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label font-weight-bold">Weapon 2</label>
                        <select className="form-select">
                            <option selected></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label font-weight-bold">Role</label>
                        <select className="form-select">
                            <option selected></option>
                            <option>DPS</option>
                            <option>Healer</option>
                            <option>Tank</option>
                        </select>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label font-weight-bold">Weapon 1</label>
                        <select className="form-select">
                            <option selected></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label font-weight-bold">Weapon 2</label>
                        <select className="form-select">
                            <option selected></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label font-weight-bold">Role</label>
                        <select className="form-select">
                            <option selected></option>
                            <option>DPS</option>
                            <option>Healer</option>
                            <option>Tank</option>
                        </select>
                    </div>
                </form>
                <hr />
            </div>
        )
    }
}

export default connect(mapStateToProps)(CharacterBody)