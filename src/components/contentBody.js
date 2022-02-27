import React from 'react'
import Roster from './roster'
import EditCharacter from './editCharacter'
import Crafters from './crafters'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        activeTab: state.menu.activeTab,
    }
}

class ContentBody extends React.Component {
    render() {
            if (this.props.activeTab === 'editCharacter') {
                return <EditCharacter />
            } else if (this.props.activeTab === 'crafters') {
                return <Crafters />
            } else {
                return <Roster />
            }
    }
}

export default connect(mapStateToProps)(ContentBody)