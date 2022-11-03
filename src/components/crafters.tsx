import { useSelector } from 'react-redux'
import weaponSmithing from '../images/tradeskills/weaponsmithing.png'
import armoring from '../images/tradeskills/armoring.png'
import engineering from '../images/tradeskills/engineering.png'
import jewelCrafting from '../images/tradeskills/jewelcrafting.png'
import arcana from '../images/tradeskills/arcana.png'
import cooking from '../images/tradeskills/cooking.png'
import furnishing from '../images/tradeskills/furnishing.png'
import { RootState } from '../store'

export default function Crafters() {
  const crafters = useSelector((state: RootState) => state.roster.crafters)

  return (
    <div className="row bg-light-grey padding-top-4">
      <table className="table table-striped table-bordered d-none d-lg-table">
        <thead className="txt-center" id="crafter-table">
          <tr>
            <th scope="col">
              <h4>Weaponsmithing</h4>
              <img src={weaponSmithing} width="50px" alt="weapon smithing" />
            </th>
            <th scope="col">
              <h4>Armoring</h4>
              <img src={armoring} width="50px" alt="jrmoring" />
            </th>
            <th scope="col">
              <h4>Engineering</h4>
              <img src={engineering} width="50px" alt="jngineering" />
            </th>
            <th scope="col">
              <h4>JewelCrafting</h4>
              <img src={jewelCrafting} width="50px" alt="jewel crafting" />
            </th>
            <th scope="col">
              <h4>Arcana</h4>
              <img src={arcana} width="50px" alt="arcana" />
            </th>
            <th scope="col">
              <h4>Furnishing</h4>
              <img src={furnishing} width="50px" alt="furnishing" />
            </th>
            <th scope="col">
              <h4>Cooking</h4>
              <img src={cooking} width="50px" alt="cooking" />
            </th>
          </tr>
          <tr className="txt-left">
            <td>{crafters.armoring.map((name, index) => <Crafter name={name} key={index} /> )}</td>
            <td>{crafters.weaponSmithing.map((name, index) => <Crafter name={name} key={index} /> )}</td>
            <td>{crafters.engineering.map((name, index) => <Crafter name={name} key={index} /> )}</td>
            <td>{crafters.jewelCrafting.map((name, index) => <Crafter name={name} key={index} /> )}</td>
            <td>{crafters.arcana.map((name, index) => <Crafter name={name} key={index} /> )}</td>
            <td>{crafters.furnishing.map((name, index) => <Crafter name={name} key={index} /> )}</td>
            <td>{crafters.cooking.map((name, index) => <Crafter name={name} key={index} /> )}</td>
          </tr>
        </thead>
      </table>
      <div className="d-lg-none row">
        <div className="col-6 border-bottom-black">
          <img src={weaponSmithing} width="20px" alt="weapon smithing" />
          <span>Weaponsmithing</span>
        </div>
        <div className="col-6 border-bottom-black">
          {crafters.weaponSmithing.map((name,index) => <Crafter name={name} key={index} />)}
        </div>
        <div className="col-6 border-bottom-black">
          <img src={armoring} width="20px" alt="armoring" />
          <span>Armoring</span>
        </div>
        <div className="col-6 border-bottom-black">
          {crafters.armoring.map((name,index) => <Crafter name={name} key={index} />)}
        </div>
        <div className="col-6 border-bottom-black">
          <img src={engineering} width="20px" alt="engineering" />
          <span>Engineering</span>
        </div>
        <div className="col-6 border-bottom-black">
          {crafters.engineering.map((name,index) => <Crafter name={name} key={index} />)}
        </div>
        <div className="col-6 border-bottom-black">
          <img src={jewelCrafting} width="20px" alt="jewel crafting" />
          <span>JewelCrafting</span>
        </div>
        <div className="col-6 border-bottom-black">
          {crafters.jewelCrafting.map((name,index) => <Crafter name={name} key={index} />)}
        </div>
        <div className="col-6 border-bottom-black">
          <img src={arcana} width="20px" alt="arcana" />
          <span>Arcana</span>
        </div>
        <div className="col-6 border-bottom-black">
          {crafters.arcana.map((name,index) => <Crafter name={name} key={index} />)}
        </div>
        <div className="col-6 border-bottom-black">
          <img src={furnishing} width="20px" alt="furnishing" />
          <span>Furnishing</span>
        </div>
        <div className="col-6 border-bottom-black">
          {crafters.furnishing.map((name,index) => <Crafter name={name} key={index} />)}
        </div>
        <div className="col-6 border-bottom-black">
          <img src={cooking} width="20px " alt="cooking" />
          <span>Cooking</span>
        </div>
        <div className="col-6 border-bottom-black">
          {crafters.cooking.map((name,index) => <Crafter name={name} key={index} />)}
        </div>
      </div>
    </div>
  )
}

interface CrafterProps {
  name: string
}
function Crafter(props: CrafterProps) {
  return (
    <span>{props.name}<br /></span>
  )
}