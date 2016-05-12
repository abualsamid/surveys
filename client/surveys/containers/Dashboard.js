import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as api from '../../../common/middleware/botengine'
import StoresDropDown from './StoresDropDown'
import ManagerDropDown from './ManagerDropDown'
import * as actions  from '../actions'


class Choices extends Component {
  render() {
    const v = this.props.v || {}
    const c = this.props.c || {}
    let total = 0
    for(var o in v) {
      total+= v[o]
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Assessment</th>
              <th>Count</th>
              <th>Percent</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>

            {
              Object.keys(v).map(function(value,index) {
                return (
                  <tr key={value}>
                    <th>
                      {value || "No Answer"}
                    </th>
                    <td>
                      { v[value] }
                    </td>
                    <td>
                      { ( 100* (v[value] || 0) / total).toFixed(2) }
                    </td>
                    <td>
                      { c[value] }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <th>
                Total
              </th>
              <th>
                {total}
              </th>
              <th>
                100%
              </th>
            </tr>
          </tfoot>
        </table>

      </div>
    )
  }
}
class Values extends Component {
  render() {
    const v = this.props.v || []
    return (
      <div>
        {
          v.map( (one,i) => <div key={i}>{one}</div>)

        }
      </div>
    )
  }
}
class Checkboxes extends Component {
  render() {
    const checked = this.props.checked ||0
    return (
      <div>Yes: {checked}</div>
    )
  }
}
class StoreDash extends Component {

  render() {
    const {data, managerId } = this.props
    console.log(managerId, data)
    return (
      <div>
        {
          data.filter(a => a.ManagerId==0)
              .map(function(r,i) {
            return (
              <div key={i} className="minorcard" style={{margin:"2em"}}>
                <h3 key={i}>
                  {r.Question}
                  <br/>
                </h3>
                { r.QuestionTypeId == 1 && <Checkboxes v={r.Checked} /> }

                { r.QuestionTypeId == 2 && <Choices v={r.Choice} c={r.CompanyChoice} /> }
                { r.QuestionTypeId == 3 && <Choices v={r.Choice} c={r.CompanyChoice} /> }

                { r.QuestionTypeId == 4 && <Values v={r.Value} /> }
                { r.QuestionTypeId == 5 && <Values v={r.Value} /> }
                { r.QuestionTypeId == 6 && <Values v={r.Value}/> }
              </div>
            )

          })
        }
        <hr/>
        <h3>Manager Review</h3>
          {
            data.filter(a => a.ManagerId==managerId)
                .map(function(r,i) {
              return (
                <div key={i} className="minorcard" style={{margin:"2em"}}>
                  <h3 key={i}>
                    {r.Question}
                    <br/>
                  </h3>
                  { r.QuestionTypeId == 1 && <Checkboxes v={r.Checked} /> }

                  { r.QuestionTypeId == 2 && <Choices v={r.Choice}  c={r.CompanyChoice} /> }
                  { r.QuestionTypeId == 3 && <Choices v={r.Choice} c={r.CompanyChoice} /> }

                  { r.QuestionTypeId == 4 && <Values v={r.Value} /> }
                  { r.QuestionTypeId == 5 && <Values v={r.Value} /> }
                  { r.QuestionTypeId == 6 && <Values v={r.Value}/> }
                </div>
              )

            })
          }
      </div>
    )
  }
}
class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = {
        DashboarData: {},
        StoreData: [],
        selectedArea: 0,
        selectedStore: 0,
        managerId: 0
      };
    }

    refresh() {
      let self = this
      const { reviewId} = this.props

    }
    componentDidMount() {
      const self = this
      let {managers} = this.props
      this.refresh.bind(this)()
      const {customerId, locationId} = this.props
      console.log("current managers list, ", managers)
      if (managers.length==0) {
        console.log("getting new managers list.")
        api.getManagers(customerId, 0)
        .then(function(managers) {
          self.props.loadedManagers(managers)
        })
      }
    }

    saveAs(uri, filename) {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = uri;
        link.click();
        document.body.removeChild(link); //remove the link when done
      } else {
        location.replace(uri);
      }
    }
    _downloadData() {
      const self = this
      const {customerId, campaignId, surveyId } = this.props
      api.downloadSurveyResults(customerId, campaignId,surveyId, 0,0)
      .then(function(data) {
        var mime="text/csv"
        var blob = new Blob([data], {type: mime})
        , url = URL.createObjectURL(blob)
        self.saveAs(url, "results.csv")
      })

    }

    selectArea(e) {
      try {
        this.setState({selectedArea: e.target.value})

      } catch(x) {
        console.log(x, ' in select area');
      }
    }

    selectStore(id) {
      const self = this
      const {customerId, campaignId, surveyId } = this.props
      try {
        this.setState({selectedStore: id})
        api.getSurveyResults(customerId, campaignId,surveyId, id,0)
        .then(function(data) {
          self.setState({StoreData:data})
        })
      } catch(x) {
        console.log(x, ' in select store');
      }
    }
    selectManager(id) {
      console.log("setting manager id to ", id)
      this.setState({managerId: id})
    }
    render() {
      const {email, token, areas, stores, managers} = this.props
      return (
        <div>
          <h2>
            Dashboard <a href="#" onClick={this.refresh.bind(this)}><span className="glyphicon glyphicon-refresh"></span></a>
          </h2>

          <br/>
          <button className="btn btn-primary" onClick={this._downloadData.bind(this)}>Download All Results - CSV </button>
          <br/>
          <br/>
          <br/>
            <br/>
              <div className="form-group">
                <StoresDropDown areas={this.props.areas} stores={this.props.stores} setStoreId={this.selectStore.bind(this)} />
              </div>
              <div className="form-group">
                <ManagerDropDown managers={this.props.managers} stores={this.props.stores} setManagerId={ this.selectManager.bind(this) } storeId={this.state.selectedStore} showButton={false} />
              </div>
            <br/>

          <br/>
            <StoreDash data={this.state.StoreData} managerId={this.state.managerId} />
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
      areas: state.admin.areas,
      stores: state.admin.stores,
      managers: state.admin.managers ||[],
      customerId: state.admin.customerId || 1,
      campaignId: state.admin.campaignId || 1,
      surveyId: state.admin.surveyId || 1,

    }
  ),
  actions

)(Dashboard)
