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
        selectedManager: 0,
        selectedStore:0,
        selectedArea:0
      }
      this.selectArea= this.selectArea.bind(this)
      this.refresh = this.refresh.bind(this)
      this.selectStore = this.selectStore.bind(this)
      this.addManager  = this.addManager.bind(this)
      this.addArea  = this.addArea.bind(this)
      this.deleteArea  = this.deleteArea.bind(this)
      this.updateArea  = this.updateArea.bind(this)
      this.addLocation  = this.addLocation.bind(this)

      this.updateLocation  = this.updateLocation.bind(this)
      this.deleteLocation  = this.deleteLocation.bind(this)
      this.deleteManager  = this.deleteManager.bind(this)
      this._boot = this._boot.bind(this)
    }

    refresh() {
      let self = this
      const { reviewId} = this.props

    }
    addManager() {
      const {addedItem, customerId} = this.props
      const self = this
      try {
        if (!self.managerLastName.value && !self.managerFirstName.value) {
          alert("Please enter name to continue.")
          return false
        }

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
    updateManager() {
      const {addedItem, customerId} = this.props
      const self = this
      try {
        if (!self.managerLastName.value && !self.managerFirstName.value) {
          alert("Please enter name to continue.")
          return false
        }

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

    updateArea() {
      const self = this
      const { addedItem, customerId} = this.props
        try {
          if (!self.newAreaName.value) {
            alert("Please enter name to continue.")
            return false
          }
          api.updateArea(customerId,self.state.selectedArea, self.newAreaName.value)
          .then(function(newArea) {
            addedItem("UPDATED_AREA", {id: self.state.selectedArea, name: self.newAreaName.value })
            self.newAreaName.value=""
          })
          .catch(api.HandleError)
        } catch(x) {
          console.log(x)
        }
    }

    deleteManager() {
      const self = this
      const {addedItem, customerId} = this.props
      let managerId=self.state.selectedManager

      if(!self.state.selectedManager) {
        managerId = self.props.managers.filter(m=>m.homeLocationId==self.state.selectedStore)[0].id
        if (!managerId) {
          alert("sorry, could not delete manager. Can you please try to reselect from the drop down and try again.")
          return false;
        }
      }
      const {lastName, firstName} = self.props.managers.filter(m=>m.id==managerId)[0]
      if (!confirm("Confirm Deleting " + firstName + " " + lastName + "?")) {
        return false
      }
      try {
          if (!managerId) {
            alert("sorry, could not delete: " + managerId)
            return false
          }
          api.deleteManager(customerId, managerId)
          .then(function(manager) {
            addedItem("DELETED_MANAGER",{id: managerId} )
          })
          .catch(api.HandleError)

        } catch(x) {
          console.log(x)
        }
    }
    deleteArea() {
      if (!confirm("Confirm Delete?")) {
        return false
      }
      const self = this
      const {addedItem, customerId} = this.props
        try {
          api.deleteArea(customerId, self.state.selectedArea, this.newAreaName.value)
          .then(function(newArea) {
            addedItem("DELETED_AREA",{id: self.state.selectedArea, name: self.newAreaName.value || ""} )
            self.newAreaName.value=""
            this.setState({selectedArea: self.state.areas[0].id})

          })
          .catch(api.HandleError)

        } catch(x) {
          console.log(x)
        }
    }

    updateLocation() {
      const self = this
      const {addedItem, customerId, loadedStores} = this.props
      try {
        var areaId=this.state.selectedArea ||this.areaList.options[0].value
        const id=self.state.selectedStore
        const name=self.newLocationName.value
        if(!name) {
          alert("Please enter name to contine.")
          return false
        }
        api.updateLocation(customerId,areaId,id,name)
        .then(function(newLocation) {
          addedItem("UPDATED_LOCATION",{id: id, name: name } )
          self.newLocationName.value = ""
        })
        .catch(api.HandleError)
      } catch(x) {
        console.log(x)
      }
    }
    deleteLocation() {
      if (!confirm("Confirm Delete?")) {
        return false
      }
      const self = this
      const {addedItem, customerId, loadedStores} = this.props
      try {
        var areaId=this.state.selectedArea ||this.areaList.options[0].value
        api.deleteLocation(customerId,areaId,self.state.selectedStore, this.newLocationName.value)
        .then(function(newLocation) {
          addedItem("DELETED_LOCATION", {id: self.state.selectedStore, name: self.newLocationName.value || ""} )
          self.newLocationName.value = ""
          this.setState({selectedArea: self.state.stores[0].id})

          // lazily load the new store list.
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

        })
        .catch(api.HandleError)
      } catch(x) {
        console.log(x)
      }
    }

    _boot() {
      const {loadedAreas, loadedStores, loadedManagers, setReviewId} = this.props;
      const self = this;
      try {
        if (!this.props.areas.length) {
          api.getAreas("")
          .then(function(areas) {
            loadedAreas(areas)
            self.setState({selectedArea: areas[0].id})
          })
          .catch(function(doh) {
            console.log(doh)
          })

        }
      } catch(x) {console.log(x)}

      try {
        if(!this.props.stores.length) {
          api.getStores("")
          .then(function(stores) {
            loadedStores(stores)
            var parentId = self.props.areas[0].id || 0;
            var storeId=stores.filter(s=>s.parentId==parentId)[0].id
            self.setState({selectedStore: storeId})
          })
          .catch(function(doh) {
            console.log(doh)
          })
        }
      } catch(x) {console.log(x)}

      try {
        if (!this.props.managers.length) {
          api.getManagers()
          .then(function(managers) {
            loadedManagers(managers)
          })
          .catch(function(doh) {
            console.log(doh)
          })
        }

      } catch(x) {
        console.error("failed to load managers: ", x)
      }
    }
    componentDidMount() {
      this._boot()
      if (this.areaList && this.areaList.length) {
        this.areaName = this.areaList.options[this.areaList.selectedIndex || 0 ].text
      }
      try {
        if (!this.state.selectedArea) {
          this.setState({selectedArea: this.areaList.options[this.areaList.selectedIndex || 0 ].value})
        }
      } catch(x) {console.log(x)}
      try {
        if (!this.state.selectedStore) {
          const s = this.props.stores.filter(o => o.parentId== (this.state.selectedArea || this.areaList.options[this.areaList.selectedIndex || 0 ].value))[0]
          this.setState({selectedStore: s.id})
          this.selectedStoreName = s.name
        }
      } catch(x) {console.log(x)}
    }

    componentWillReceiveProps(newProps) {
      // const self = this
      // self.setState({selectedArea: newProps.areas[0].id})
      // var parentId = newProps.areas[0].id || 0;
      // var storeId=newProps.stores.filter(s=>s.parentId==parentId)[0].id
      // self.setState({selectedStore: storeId})
    }

    selectArea(e) {
      this.setState({selectedArea: e.target.value})
      this.areaName = e.target.options[e.target.selectedIndex || 0 ].text
      try {
        const s = this.props.stores.filter(o => o.parentId==e.target.value)[0]
        this.setState({selectedStore: s.id})
        this.selectedStoreName = s.name

      } catch(x) {
        console.log(x)
      }

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
              <span style={{margin: "1em"}}>
                <button className="btn btn-primary btn-lg" onClick={this.addArea}>Add Area</button>
              </span>

              <span style={{margin: "1em"}}>
                <button className="btn btn-lg btn-info" onClick={this.updateArea}>Update Area</button>
              </span>
              <span style={{margin: "1em"}}>
                <button className="btn btn-lg btn-danger" onClick={this.deleteArea}>Delete Area</button>
              </span>

            </div>
            <br/>
            <div className="form-group">
              <StoresDropDown areas={this.props.areas.filter(e=>e.id==this.state.selectedArea)} stores={this.props.stores} setStoreId={this.selectStore} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="store" ref={m=>this.newLocationName=m} />
            </div>
            <div>
              <span style={{margin: "1em"}}>
                <button className="btn btn-primary btn-lg" onClick={this.addLocation} ref={m=>this.addStoreButton=m}>
                  Add Store {this.areaName}
                </button>
              </span>
              <span style={{margin: "1em"}}>
                <button className="btn btn-lg btn-info" onClick={this.updateLocation} >Update Location</button>
              </span>
              <span style={{margin: "1em"}}>
                <button className="btn btn-lg btn-danger" onClick={this.deleteLocation} >Delete Location</button>
              </span>

              {  }
              <br/>
              <br/>
            </div>
            <div>
              <Link to={`/admin/dashboard/codes/${this.state.selectedStore}`}  className="btn btn-primary"> Manage Codes {this.selectedStoreName}</Link>
            </div>
            <br/>
            <div>
              <ManagerDropDown storeId={this.state.selectedStore}  managers={managers} selectedManager={this.state.selectedManager}
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
              <span style={{margin:"1em"}}>
                <button className="btn btn-primary btn-lg" onClick={this.addManager}>Add Manager  { this.selectedStoreName }</button>
              </span>
              <span style={{margin:"1em"}}>
                <button className="btn btn-lg btn-danger" onClick={this.deleteManager}>Delete Manager</button>
              </span>
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
