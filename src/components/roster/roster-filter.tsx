import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { applyFilter } from '../../reducers/roster-slice'

export default function RosterFilter() {
  const dispatch = useDispatch()
  const [showInactive, setShowInactive] = useState(false)
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    const currentShowInactive = showInactive
    const currentFilterValue = filterValue

    setTimeout(() => {
      if (filterValue === currentFilterValue && showInactive === currentShowInactive) {
        dispatch(applyFilter({showInactive, filterValue}))
      }
    }, 250)
  }, [showInactive, filterValue, dispatch])

  return (
    <div className="row roster-filter-div">
      <div className="col-md-12" id="roster-filter">
        <label className="form-check-label" htmlFor="rosterfilterinput">Filter:</label>
        <input id="rosterfilterinput" type="text" name="filter" onChange={(e) => setFilterValue(e.target.value)} />
      </div>
      <div className="col-md-12 showinactive-div">
        <input className="form-check-input" name="showinactive" type="checkbox" value="" onClick={(e: any) => setShowInactive(e.target.checked)} id="showinactive" />
        <label className="form-check-label" htmlFor="showinactive">Show Inactive</label>
      </div>
    </div>
  )
}