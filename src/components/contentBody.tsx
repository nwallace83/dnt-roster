import Roster from './roster'
import EditCharacter from './editCharacter'
import Crafters from './crafters'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export default function ContentBody()  {
    const activeTab = useSelector((state: RootState) => state.menu.activeTab)

    if (activeTab === 'editCharacter') {
        return <EditCharacter />
    } else if (activeTab === 'crafters') {
        return <Crafters />
    } else {
        return <Roster />
    }
}
