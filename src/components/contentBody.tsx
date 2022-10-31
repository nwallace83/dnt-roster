import React from 'react'
import Roster from './roster'
import EditCharacter from './editCharacter'
import Crafters from './crafters'
import { connect } from 'react-redux'

interface State {
    menu: {
        activeTab: string;
    }
}

const mapStateToProps = (state: State) => {
    return {
        activeTab: state.menu.activeTab
    }
}

class ContentBody extends React.Component<{activeTab: string}> {
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