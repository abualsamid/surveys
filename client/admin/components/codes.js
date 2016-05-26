import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import StoresDropDown from './StoresDropDown'
import * as api from '../../../common/middleware/botengine'

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.genCodes = this.genCodes.bind(this)
    this.selectStore = this.selectStore.bind(this)
    this.loadCodes = this.loadCodes.bind(this)
    this.state = {"codes": []}
  }

  loadCodes(storeId) {
    const self = this
    var data = {
      customerId: 1,
      campaignId: 1,
      locationId: parseInt(storeId) || 1,
      surveyId: 1
    }

    api.getCodes(data)
        .then(function(codes) {
          self.setState({"codes": codes })
          console.log("the codes we got: ", codes)
        })
        .catch(function(doh) {
          console.log("crap ", doh)
        })
  }

  selectStore(storeId) {
    const self = this
    this.storeId=storeId
    console.log('stores...', storeId, this.storeId )
    self.loadCodes(this.storeId)
  }

  componentDidMount() {
    const {loadedAreas, loadedStores} = this.props
    const self = this
    var startDate = new Date()
    var endDate = startDate
    endDate.setDate(endDate.getDate() + 7 )

    try {
      console.log("setting ", this.endDate, " to ", endDate )
      this.endDate.valueAsDate= new Date()
    } catch(x) { console.error("could not set end date ", x, endDate, this.endDate, this.endDate.value)}
    try {
      this.startDate.valueAsDate= new Date()

    } catch(x) { console.log(x); }

    if (this.props.areas.length==0) {
      api.getAreas("")
      .then(function(areas) {
        loadedAreas(areas)
      })
      .catch(function(doh) {
        console.log(doh)
      })

      api.getStores("leye")
      .then(function(stores) {
        loadedStores(stores)
        self.loadCodes(self.storeId)
      })
      .catch(function(doh) {
        console.log(doh)
      })
    }
  }
  genCodes(e) {
    const self = this
    e.preventDefault()
    var btn = e.target
    btn.disabled=true
    var data = {
      customerId: 1,
      campaignId: 1,
      locationId: parseInt(this.storeId) || 1,
      surveyId: 1,
      startDate: new Date(this.startDate.value).toJSON(),
      endDate: new Date(this.endDate.value).toJSON(),
      count: parseInt(this.count.value) ||10
    }
    api.genCodes(data )
      .then(function(result) {
        self.loadCodes(self.storeId)


        alert(result)
        try {
          btn.disabled=false
        } catch(x) {
          console.log(x)
        }
      })
      .catch(function(doh) {
        console.log(doh)
        btn.disabled=false
      })
  }
  goBack() {
    browserHistory.push("/admin/Dashboard")
  }
  render() {
    return <div>

      <div className="form-group">
        <label>Store</label>
        <StoresDropDown areas={this.props.areas} stores={this.props.stores} setStoreId={this.selectStore} />
      </div>
      <div className="form-group">
        <label>Start Date </label>
        <input name="startDate" type="date" className="form-control" placeholder="start date" ref={ (e) => this.startDate=e } />
      </div>
      <div className="form-group">
        <label>End Date </label>
        <input name="endDate" type="date" className="form-control" placeholder="end date" ref={e=>this.endDate=e} />
      </div>
      <div className="form-group">
        <label>Number of Codes to Generate</label>
        <input name="count" type="number" className="form-control" placeholder="100" defaultValue="100" ref={e=>this.count=e} />
      </div>

      <div>
        <button className="btn btn-primary" onClick={this.genCodes}>Generate Codes </button>
      </div>
      <br/>
      <div>
        <button className="btn btn-info" onClick={this.goBack}>Cancel</button>
      </div>
      <hr/>
      <table className='table-striped table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Survey Code</th>
            <th>Start</th>
            <th>Expires</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.codes.map(function(one,i) {
            return <tr key={i} >
              <td>{i+1}</td>
              <td>{one.Code}</td>
              <td>{one.StartDate.slice(0,10)}</td>
              <td>{one.EndDate.slice(0,10)}</td>
            </tr>
          })
        }
        </tbody>
      </table>

    </div>
  }
}

export default connect(
  (state) => (
    {
      token: state.login.token,
      email: state.login.email,
      language: state.login.language || "en",
      reviewId: state.admin.reviewId,
      areas: state.admin.areas ||[],
      stores: state.admin.stores ||[],
      managers: state.admin.managers || [],
      customerId: 1 // this needs todo
    }

  ),
  actions
)(Container)
