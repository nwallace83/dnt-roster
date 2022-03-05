import React from 'react'
import Roster from './roster'
import EditCharacter from './editCharacter'
import Crafters from './crafters'
import WarRoster from './admin/warRoster'
import { connect } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
            }  else if (this.props.activeTab === 'warRoster') {
                return (
                    <DndProvider backend={HTML5Backend}>
                        <WarRoster />
                    </DndProvider>
                )
            }
            else {
                return <Roster />
            }
    }
}

export default connect(mapStateToProps)(ContentBody)