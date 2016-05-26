import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as api from '../../../common/middleware/botengine'
import StoresDropDown from './StoresDropDown'
import ManagerDropDown from './ManagerDropDown'
import * as actions from '../actions'



class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = {
        DashboarData: {},
      }
      this.selectArea= this.selectArea.bind(this)
      this.refresh = this.refresh.bind(this)
      this.selectStore = this.selectStore.bind(this)
      this.addManager  = this.addManager.bind(this)
      this.addArea  = this.addArea.bind(this)
      this.addLocation  = this.addLocation.bind(this)
    }

    refresh() {
      let self = this
      const { reviewId} = this.props

    }
    addManager() {
      const {addedItem, customerId} = this.props
      const self = this
      try {
        api
          .addManager(customerId, self.state.selectedStore, self.managerLastName.value,self.managerFirstName.value)
          .then(function(newManager) {
            addedItem("ADD_MANAGER", newManager)
            self.managerLastName.value=""
            self.managerFirstName.value=""
          })

      } catch(x) {
        console.log(x)
      }
    }
    addArea() {
      const self = this
      const {addedItem, customerId} = this.props
        try {
          api.addArea(customerId, this.newAreaName.value)
          .then(function(newArea) {
            addedItem("ADD_AREA", newArea)
            self.newAreaName.value=""
          })
          .catch(api.HandleError)

        } catch(x) {
          console.log(x)
        }
    }
    addLocation() {
      const self = this
      const {addedItem, customerId, loadedStores} = this.props
      try {
        var areaId=this.state.selectedArea ||this.areaList.options[0].value
        api.addStore(customerId,areaId, this.newLocationName.value)
        .then(function(newLocation) {
          addedItem("ADD_LOCATION", newLocation)
          self.newLocationName.value = ""
          // lazily load the new store list.
          api.getStores("leye")
          .then(function(stores) {
            loadedStores(stores)
          })
          .catch(function(doh) {
            console.log(doh)
            // loadedStores([])
          })
        })
        .catch(api.HandleError)
      } catch(x) {
        console.log(x)
      }
    }

    componentDidMount() {
      this.refresh.bind(this)()
      console.log("current managers: ", this.props.managers)
      this.areaName = this.areaList.options[this.areaList.selectedIndex || 0 ].text
    }

    selectArea(e) {
      this.setState({selectedArea: e.target.value})
      this.areaName = e.target.options[e.target.selectedIndex || 0 ].text
    }
    selectStore(storeId, storeName) {
      this.setState({selectedStore: storeId})
      this.selectedStoreName = storeName
    }

    render() {
      const {email, token, managers} = this.props
      return (
        <div>
          <h2>
            Admin
          </h2>
          <br/>
          <br/>
            <div className="form-group">
              <select className="form-control" value={this.state.selectedArea} ref={ a => this.areaList = a}  onChange={this.selectArea}>
              {this.props.areas.map( (one) =>  <option key={one.id} value={one.id}> {one.name} </option> )}
              </select>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="area" ref={m=>this.newAreaName=m} />
            </div>
            <div>
              <button className="btn btn-primary btn-lg" onClick={this.addArea}>Add Area</button>
            </div>
            <br/>
            <div className="form-group">
              <StoresDropDown areas={this.props.areas} stores={this.props.stores} setStoreId={this.selectStore} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="store" ref={m=>this.newLocationName=m} />
            </div>
            <div>
              <button className="btn btn-primary btn-lg" onClick={this.addLocation} ref={m=>this.addStoreButton=m}>
                Add Store {this.areaName}
              </button>
              {  }
              <br/>
              <br/>
              <Link to={`/admin/dashboard/codes/${this.state.selectedStore}`}  className="btn btn-primary"> Manage Codes {this.selectedStoreName}</Link>
            </div>
            <br/>
            <div>
              <ManagerDropDown storeId={this.state.selectedStore}  managers={managers}
                setManagerId={(managerId)=> this.setState({selectedManager: managerId})}
                 />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="manager first name" ref={m=>this.managerFirstName=m} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="manager last name" ref={m=>this.managerLastName=m} />
            </div>
            <div>
              <button className="btn btn-primary btn-lg" onClick={this.addManager}>Add Manager  { this.selectedStoreName }</button>
            </div>
          <br/>


          <hr/>
          <div>
            <br/>
          </div>
        </div>

      )
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
)(Dashboard)
