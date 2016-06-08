import React, { Component, PropTypes } from 'react'

export default class StoresDropDown extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {setStoreId, stores } = this.props
    if (this.storeId && this.storeId.options &&this.storeId.options.length) {
      try {
        setStoreId(this.storeId.value||   "", this.storeId.options[this.storeId.selectedIndex || 0].text)

      } catch(x) {
        console.log(x)
      }
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
      <select value={this.props.locationId} className="form-control" ref={(ref)=>this.storeId=ref}
        onChange={this.handleChange.bind(this)}  >
        {
          areas.map( one => (
            <optgroup label={one.name} key={one.id}>
              {
                stores
                .filter( l => l.parentId==one.id)
                .map( l => <option key={l.id} value={l.id}>{l.name}</option>  )
              }
            </optgroup>
          ))
        }
      </select>
    )

  }
}
