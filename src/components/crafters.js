import React from "react";
import { connect } from "react-redux";
import weaponSmithing from '../images/tradeskills/weaponsmithing.png'
import armoring from '../images/tradeskills/armoring.png'
import engineering from '../images/tradeskills/engineering.png'
import jewelCrafting from '../images/tradeskills/jewelcrafting.png'
import arcana from '../images/tradeskills/arcana.png'
import cooking from '../images/tradeskills/cooking.png'
import furnishing from '../images/tradeskills/furnishing.png'

const mapStateToProps = (state) => {
    return {
        crafters: state.roster.crafters,
    }
}

class Crafters extends React.Component {
    render() {
        return (
            <div className="row bg-light-grey padding-top-4">
                <table className="table table-striped table-bordered">
                    <thead className="txt-center"  id="crafter-table">
                        <tr>
                            <th scope="col">
                                <h4>Weaponsmithing</h4>
                                <img src={weaponSmithing} width="50px" />
                            </th>
                            <th scope="col">
                                <h4>Armoring</h4>
                                <img src={armoring} width="50px" />
                            </th>
                            <th scope="col">
                                <h4>Engineering</h4>
                                <img src={engineering} width="50px" />
                            </th>
                            <th scope="col">
                                <h4>JewelCrafting</h4>
                                <img src={jewelCrafting} width="50px" />
                            </th>
                            <th scope="col">
                                <h4>Arcana</h4>
                                <img src={arcana} width="50px" />
                            </th>
                            <th scope="col">
                                <h4>Furnishing</h4>
                                <img src={furnishing} width="50px" />
                            </th>
                            <th scope="col">
                                <h4>Cooking</h4>
                                <img src={cooking} width="50px " />
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
            </div>
        )
    }
}

export default connect(mapStateToProps)(Crafters)