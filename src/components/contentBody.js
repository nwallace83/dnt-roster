import React from 'react'
import RosterBody from './rosterBody'
import EditCharacter from './editCharacter'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        activeTab: state.menu.activeTab,
    }
}

class ContentBody extends React.Component {
    render() {
            if (this.props.activeTab == 'editCharacter') {
                return <EditCharacter />
            } else {
                return <RosterBody />
            }
    }
}

export default connect(mapStateToProps)(ContentBody)