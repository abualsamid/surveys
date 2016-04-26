import React, { Component, PropTypes } from 'react'

export default class ManagerDropDown extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    const { setManagerId, storeId, managers } = this.props

    try {
      let mine = managers.filter(m=>m.storeId==storeId)
      if (mine && mine.length) {
        let v = mine[0].id
        setManagerId(this.managerId.value || v ||"")
      } else {
        setManagerId("")
      }

    } catch(x) {console.log("doh ..!. ", x)}
  }

  componentWillReceiveProps(nextProps) {
    const { setManagerId, storeId, managers } = nextProps

    try {
      let v = (managers.filter(m=>m.storeId==storeId))[0].id
      try {
        this.managerId.value = v
      } catch(x) {console.log('ouch...', x)}
      setManagerId( v ||"")

    } catch(x) {console.log("doh ... ", x)}
  }
  handleChange(e) {
    const {setStoreId, setManagerId} = this.props
    setManagerId(e.target.value || "")

  }
  render() {
    const { storeId, managers, caption } = this.props
    return (
      <div className="form-group">
        <label>{caption}</label>

      <select className="form-control"  onChange={this.handleChange.bind(this)}
        ref={(managerId) => this.managerId=managerId} >
        {
          managers
          .filter( m => m.storeId==storeId)
          .map( m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))

        }
      </select>
    </div>
    )

  }
}
