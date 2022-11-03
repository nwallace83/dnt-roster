
import { useSelector } from 'react-redux'
import RosterFilter from './roster_filter'
import { RootState } from '../../store'
import Player from './player'

export default function Roster() {
    const roster = useSelector((state: RootState) => state.roster.filteredRoster)

    return (
        <div className="row bg-light-grey padding-top-4">
            <RosterFilter />
            <table className="table table-striped table-bordered ">
                    <RosterHeader />
                <tbody>
                    {roster.map( (player,index) => {return <Player player={player} key={index} />})}
                </tbody>
            </table>
        </div>
    )
}

function RosterHeader() {
        return (
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th className="d-none d-lg-table-cell" scope="col">Discord</th>
                <th scope="col" colSpan={5}>Main</th>
                <th className="d-none d-lg-table-cell" scope="col" colSpan={5}>Alt</th>
                <th className="d-none d-lg-table-cell" scope="col">Active</th>
            </tr>
        </thead>
        )
}



