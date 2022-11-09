import { useDispatch, useSelector } from 'react-redux'
import weaponSmithing from '../images/tradeskills/weaponsmithing.png'
import armoring from '../images/tradeskills/armoring.png'
import jewelCrafting from '../images/tradeskills/jewelcrafting.png'
import arcana from '../images/tradeskills/arcana.png'
import cooking from '../images/tradeskills/cooking.png'
import furnishing from '../images/tradeskills/furnishing.png'
import { RootState } from '../store'
import { setRoster } from '../reducers/roster-slice'
import { useEffect, useState } from 'react'
import { toastr } from 'react-redux-toastr'
import Crafters from '../types/crafters'

export default function CraftersTable() {
  const dispatch = useDispatch()
  const crafters = useSelector((state: RootState) => state.roster.crafters)
  const roster = useSelector((state: RootState) => state.roster.roster)
  const [isLoading, setIsLoading] = useState(true)
  const tradeSkills = [
    { name: 'Weapon Smithing', image: weaponSmithing, fieldName: 'weaponSmithing' },
    { name: 'Armoring', image: armoring, fieldName: 'armoring' },
    { name: 'Engineering', image: armoring, fieldName: 'engineering' },
    { name: 'Jewel Crafting', image: jewelCrafting, fieldName: 'jewelCrafting' },
    { name: 'Arcana', image: arcana, fieldName: 'arcana' },
    { name: 'Furnishing', image: furnishing, fieldName: 'furnishing' },
    { name: 'Cooking', image: cooking, fieldName: 'cooking' }
  ]

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
      <table className="table table-striped table-bordered">
        <thead className="txt-center" id="crafter-table">
          <tr>
            {tradeSkills.map((tradeSkill, index) => <CrafterHeader name={tradeSkill.name} image={tradeSkill.image} key={index} />)}
          </tr>
        </thead>
        <tbody>
          <tr className="txt-left">
            {isLoading ? null : tradeSkills.map((skill, index) => <CrafterRow crafters={crafters[skill.fieldName as keyof Crafters]} key={index} />)}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

interface CrafterHeaderProps {
  name: string
  image: any
}
function CrafterHeader(props: CrafterHeaderProps) {
  return (
    <th scope="col">
      <h4>{props.name}</h4>
      <img src={props.image} width="50px" alt={props.name} />
    </th>
  )
}

interface CrafterRowProps {
  crafters: string[]
}
function CrafterRow(props: CrafterRowProps) {
    return (
      <td>{props.crafters.map((name, index) => <span key={index}>{name}<br /></span>)}</td>
    )
}
