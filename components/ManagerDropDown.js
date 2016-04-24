import React, { Component, PropTypes } from 'react'

export default class ManagerDropDown extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    const { setManagerId, storeId, managers } = this.props

    try {
      setManagerId(this.managerId.value || managers[0].id ||"")

    } catch(x) {}
  }
  handleChange(e) {
    const {setStoreId} = this.props
    setManagerId(e.target.value || "")

  }
  render() {
    const { storeId, managers } = this.props
    console.log('rendering managers: ', managers)
    return (
      <select className="form-control"  onChange={this.handleChange.bind(this)}
        ref={(managerId) => this.managerId=managerId}
      >
        {
          managers
          .filter( m => m.storeId==storeId)
          .map( m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))

        }
      </select>
    )

  }
}
