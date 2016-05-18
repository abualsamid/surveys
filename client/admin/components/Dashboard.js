import React, { Component, PropTypes } from 'react'
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
    componentDidMount() {
      this.refresh.bind(this)()
    }
    selectArea() {

    }
    selectStore(storeId) {
      this.setState({selectedStore: storeId})
    }
    render() {
      const {email, token, managers} = this.props
      return (
        <div>
          <h2>
            Dashboard <a href="#" onClick={this.refresh}><span className="glyphicon glyphicon-refresh"></span></a>
          </h2>

          <br/>
          <br/>
            <div className="form-group">
              <select className="form-control" value={this.state.selectedArea} ref={ a => this.areaList = a}  onChange={this.selectArea}>
              {this.props.areas.map( (one) =>  <option key={one.id} value={one.id}> {one.name} </option> )}
              </select>
            </div>
            <div className="form-group">
              <StoresDropDown areas={this.props.areas} stores={this.props.stores} setStoreId={this.selectStore} />
            </div>
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
              <button className="btn btn-primary btn-lg" onClick={this.addManager}>Add Manager</button>
            </div>
          <br/>
          <div>
              <span style={{fontWeight: "bold"}}>Legend: </span>
              <span>
                1: Our work environment is positive.
                2: The communication is clear and effective.
                3: We have the tools/supplies we need to do our job.
                4: My training was thorough and effective.
                5: I have opportunities to learn and grow at work.
              </span>
          </div>
          <br/>

          <hr/>
          <div>
            <br/>
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
