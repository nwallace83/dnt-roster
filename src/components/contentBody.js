import React from 'react'
import Roster from './roster'
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
                return <Roster />
            }
    }
}

export default connect(mapStateToProps)(ContentBody)