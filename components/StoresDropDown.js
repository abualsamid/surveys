import React, { Component, PropTypes } from 'react'

export default class StoresDropDown extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {setStoreId, stores } = this.props
    if (this.storeId) {
      setStoreId(this.storeId.value||   "", this.storeId.options[this.storeId.selectedIndex || 0].text)
    } else {
      if (stores && stores.length) {
        setStoreId(stores[0].id, stores[0].name)
      }
    }
  }
  handleChange(e) {
    const {setStoreId} = this.props
    setStoreId(e.target.value || this.storeId.value ||"", e.target.options[e.target.selectedIndex].text )
  }
  render() {
    const {areas, stores} = this.props
    return (
      <select className="form-control" ref={(ref)=>this.storeId=ref} onChange={this.handleChange.bind(this)}  >
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
