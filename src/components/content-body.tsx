import Roster from './roster/roster'
import EditCharacter from './edit-character/edit-character'
import CraftersTable from './crafters'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export default function ContentBody()  {
    const activeTab = useSelector((state: RootState) => state.menu.activeTab)

    if (activeTab === 'editCharacter') {
        return <EditCharacter />
    } else if (activeTab === 'crafters') {
        return <CraftersTable />
    } else {
        return <Roster />
    }
}
