import React, { Component, PropTypes } from 'react'

export default class StoresDropDown extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {setStoreId} = this.props
    setStoreId(this.storeId||"")
  }
  handleChange(e) {
    const {setStoreId} = this.props
    setStoreId(e.target.value ||this.storeId||"", e.target.text)

  }
  render() {
    const {areas, stores} = this.props
    return (
      <select className="form-control" ref={(ref)=>this.storeId= (ref?ref.value:"")} onChange={this.handleChange.bind(this)}  >
        {
          areas.map( one => (
            <optgroup label={one.name} key={one.id}>
              {
                stores
                .filter( l => l.areaId==one.id)
                .map( l => <option key={l.id} value={l.id}>{l.name}</option>  )
              }
            </optgroup>
          ))
        }
      </select>
    )

  }
}
