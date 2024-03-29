
import { useDispatch, useSelector } from 'react-redux'
import RosterFilter from './roster-filter'
import { RootState } from '../../store'
import Player from './player'
import { useEffect, useState } from 'react'
import { setRoster } from '../../reducers/roster-slice'
import { toastr } from 'react-redux-toastr'

export default function Roster() {
  const dispatch = useDispatch()
  const roster = useSelector((state: RootState) => state.roster.roster)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (roster.length === 0) {
      fetchRoster()
    } else if (roster.length > 0) {
      setIsLoading(false)
    }

    async function fetchRoster() {
      await fetch('/api/v1/roster').then(res => {
        if (res.ok) {
          res.json().then(res => {
            dispatch(setRoster(res))
            setIsLoading(false)
          }).catch(res => console.error(res))
        } else {
          setIsLoading(false)
          toastr.error('Error', 'Unable to load roster, refresh page and yell at Kavion')
        }
      })
    }
  }, [dispatch, roster])

  return (
    <div className="row bg-light-grey padding-top-4">
      <RosterFilter />
      <table className="table table-striped table-bordered ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th className="d-none d-lg-table-cell" scope="col">Discord</th>
            <th scope="col" colSpan={5}>Main</th>
            <th className="d-none d-lg-table-cell" scope="col" colSpan={5}>Alt</th>
            <th className="d-none d-lg-table-cell" scope="col">Active</th>
          </tr>
        </thead>
        {isLoading ? null : <RosterPlayers />}
      </table>
    </div>
  )
}

function RosterPlayers() {
  const roster = useSelector((state: RootState) => state.roster.filteredRoster)

    return (
      <tbody>
        {roster.map((player, index) => { return <Player player={player} key={index} /> })}
      </tbody>
    )
}

