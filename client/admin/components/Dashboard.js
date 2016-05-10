import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as api from '../../../common/middleware/botengine'
import StoresDropDown from './StoresDropDown'
import ManagerDropDown from './ManagerDropDown'

const BarChart = rd3.BarChart;

class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = { DashboarData: {},

      };
    }

    refresh() {
      let self = this
      const { reviewId} = this.props

    }
    componentDidMount() {
      this.refresh.bind(this)()
    }

    render() {
      const {email, token} = this.props
      return (
        <div>
          <h2>
            Dashboard <a href="#" onClick={this.refresh.bind(this)}><span className="glyphicon glyphicon-refresh"></span></a>
          </h2>

          <br/>
          <br/>
            <div className="form-group">
              <select className="form-control" value={this.state.selectedArea} ref={ a => this.areaList = a}  onChange={this.selectArea.bind(this)}>
              {this.props.areas.map( (one) =>  <option key={one.id} value={one.id}> {one.name} </option> )}
              </select>
            </div>
            <div className="form-group">
              <StoresDropDown areas={this.props.areas} stores={this.props.stores} setStoreId={this.selectStore.bind(this)} />
            </div>
            <div>
              <ManagerDropDown storeId={this.state.selectedStore}  managers={managers}
                setManagerId={()=>console.log("...")}
                 />
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
      reviewId: state.admin.reviewId
    }

  )

)(Dashboard)
