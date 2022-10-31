import React from 'react'
import { connect } from 'react-redux'
import weaponSmithing from '../images/tradeskills/weaponsmithing.png'
import armoring from '../images/tradeskills/armoring.png'
import engineering from '../images/tradeskills/engineering.png'
import jewelCrafting from '../images/tradeskills/jewelcrafting.png'
import arcana from '../images/tradeskills/arcana.png'
import cooking from '../images/tradeskills/cooking.png'
import furnishing from '../images/tradeskills/furnishing.png'
import CraftersInterface from '../interfaces/crafters'

const mapStateToProps = (state: any) => {
    return {
        crafters: state.roster.crafters,
    }
}

interface CraftersProps {
    crafters: CraftersInterface
}
class Crafters extends React.Component<CraftersProps> {
    render() {
        return (
            <div className="row bg-light-grey padding-top-4">
                <table className="table table-striped table-bordered d-none d-lg-table">
                    <thead className="txt-center"  id="crafter-table">
                        <tr>
                            <th scope="col">
                                <h4>Weaponsmithing</h4>
                                <img src={weaponSmithing} width="50px" alt="weapon smithing"/>
                            </th>
                            <th scope="col">
                                <h4>Armoring</h4>
                                <img src={armoring} width="50px" alt="jrmoring"/>
                            </th>
                            <th scope="col">
                                <h4>Engineering</h4>
                                <img src={engineering} width="50px" alt="jngineering"/>
                            </th>
                            <th scope="col">
                                <h4>JewelCrafting</h4>
                                <img src={jewelCrafting} width="50px" alt="jewel crafting"/>
                            </th>
                            <th scope="col">
                                <h4>Arcana</h4>
                                <img src={arcana} width="50px" alt="arcana"/>
                            </th>
                            <th scope="col">
                                <h4>Furnishing</h4>
                                <img src={furnishing} width="50px" alt="furnishing"/>
                            </th>
                            <th scope="col">
                                <h4>Cooking</h4>
                                <img src={cooking} width="50px" alt="cooking"/>
                            </th>
                        </tr>
                        <tr className="txt-left">
                            <td>{this.props.crafters.weaponSmithing.map((name) => {return <span>{name}<br /></span>})}</td>
                            <td>{this.props.crafters.armoring.map((name) => {return <span>{name}<br /></span>})}</td>
                            <td>{this.props.crafters.engineering.map((name) => {return <span>{name}<br /></span>})}</td>
                            <td>{this.props.crafters.jewelCrafting.map((name) => {return <span>{name}<br /></span>})}</td>
                            <td>{this.props.crafters.arcana.map((name) => {return <span>{name}<br /></span>})}</td>
                            <td>{this.props.crafters.furnishing.map((name) => {return <span>{name}<br /></span>})}</td>
                            <td>{this.props.crafters.cooking.map((name) => {return <span>{name}<br /></span>})}</td>
                        </tr>
                    </thead>
                </table>
                <div className="d-lg-none row">
                    <div className="col-6 border-bottom-black">
                     <img src={weaponSmithing} width="20px" alt="weapon smithing"/>
                        <span>Weaponsmithing</span>
                    </div>
                    <div className="col-6 border-bottom-black">
                        {this.props.crafters.weaponSmithing.map((name) => {return <span>{name}<br /></span>})}
                    </div>
                    <div className="col-6 border-bottom-black">
                       <img src={armoring} width="20px" alt="armoring"/>
                        <span>Armoring</span>
                    </div>
                    <div className="col-6 border-bottom-black">
                        {this.props.crafters.armoring.map((name) => {return <span>{name}<br /></span>})}
                    </div>
                    <div className="col-6 border-bottom-black">
                        <img src={engineering} width="20px" alt="engineering"/>
                        <span>Engineering</span>
                    </div>
                    <div className="col-6 border-bottom-black">
                        {this.props.crafters.engineering.map((name) => {return <span>{name}<br /></span>})}
                    </div>
                    <div className="col-6 border-bottom-black">
                        <img src={jewelCrafting} width="20px" alt="jewel crafting"/>
                        <span>JewelCrafting</span>
                    </div>
                    <div className="col-6 border-bottom-black">
                        {this.props.crafters.jewelCrafting.map((name) => {return <span>{name}<br /></span>})}
                    </div>
                    <div className="col-6 border-bottom-black">
                        <img src={arcana} width="20px" alt="arcana"/>
                        <span>Arcana</span>
                    </div>
                    <div className="col-6 border-bottom-black">
                        {this.props.crafters.arcana.map((name) => {return <span>{name}<br /></span>})}
                    </div>
                    <div className="col-6 border-bottom-black">
                        <img src={furnishing} width="20px" alt="furnishing"/>
                        <span>Furnishing</span>
                    </div>
                    <div className="col-6 border-bottom-black">
                        {this.props.crafters.furnishing.map((name) => {return <span>{name}<br /></span>})}
                    </div>
                    <div className="col-6 border-bottom-black">
                        <img src={cooking} width="20px " alt="cooking"/>
                        <span>Cooking</span>
                    </div>
                    <div className="col-6 border-bottom-black">
                        {this.props.crafters.cooking.map((name) => {return <span>{name}<br /></span>})}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Crafters)