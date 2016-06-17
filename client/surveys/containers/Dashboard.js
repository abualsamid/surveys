import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as api from '../../../common/middleware/botengine'
import StoresDropDown from './StoresDropDown'
import ManagerDropDown from './ManagerDropDown'
import * as actions  from '../actions'


class ManagerChoices extends Component {

  render() {
    function percentage(v,total) {
      return !total||!v ? 0: (100*v / total).toFixed(2)
    }
    function weight(value) {
      switch(value) {
        case "Excellent":
          return 5;

        case "Exceeds Expectations":
          return 4;
        case "Meets Expectations":
          return 3;
        case "Needs Improvement":
          return 2;
        case "Unsatisfactory":
          return 1;
        default:
          return 0;
      }
    }
    const v = this.props.v || {}
    const c = this.props.c || {}
    const {storeSummary} = this.props
    let total = 0
    let countme = 0;
    let storeTotal = 0;
    let storeCount = 0;
    ["Excellent","Exceeds Expectations","Meets Expectations","Needs Improvement","Unsatisfactory"].map(function(value,index) {
      if (v[value]) {
        total+= v[value]*weight(value)
        countme+= v[value];
      }
      if(storeSummary[value]) {
        storeTotal+=storeSummary[value]*weight(value)
        storeCount+= storeSummary[value]
      }
    });

    const avg = countme==0 ? 0 : total/countme;
    const storeAvg = storeCount ? storeTotal/storeCount : 0
    const positive = {color: "green"}
    const negative = {color: "red"}
    const neutral = {color:"black"}
    let   style = neutral
    if (avg.toFixed(2) > storeAvg.toFixed(2) ) {
      style = positive
    } else {
      if (avg.toFixed(2) <storeAvg.toFixed(2)) {
        style = negative
      }
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Assessment</th>
              <th>Count</th>
              <th>Score</th>
              <th>Store Total</th>
            </tr>
          </thead>
          <tbody>

            {
              ["Excellent","Exceeds Expectations","Meets Expectations","Needs Improvement","Unsatisfactory",
              "No Answer"].map(function(value,index) {
                return (
                  <tr key={value}>
                    <th>
                      {value || "No Answer"}
                    </th>
                    <td>
                      { v[value] }
                    </td>
                    <td>
                      { v[value || "No Answer"]*weight(value) }
                    </td>
                    <td>
                      { storeSummary[value] * weight(value)}
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
                {countme.toFixed(0)}
              </th>
              <th>
                <span style={style}>
                  {avg.toFixed(2)}
                </span>
              </th>
              <th>
                {storeAvg.toFixed(2)}
              </th>
            </tr>
          </tfoot>
        </table>

      </div>
    )
  }
}


class Choices extends Component {

  render() {
    function percentage(v,total) {
      return !total||!v ? 0: (100*v / total).toFixed(2)
    }
    const v = this.props.v || {}
    const c = this.props.c || {}
    let total = 0
    for(var o in v) {
      total+= (v[o] || 0)
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Assessment</th>
              <th>Count</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>

            {
              ["Yes","No","Sometimes","No Answer"].map(function(value,index) {
                return (
                  <tr key={value}>
                    <th>
                      {value || "No Answer"}
                    </th>
                    <td>
                      { v[value] }
                    </td>
                    <td>
                      { percentage(v[value]|| 0, total )}
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
class ManagerDash extends Component {

  constructor(props) {
    super(props)
    this.state={myavg: {}, overallAverage: {}}
    this._myOverallAvg  = this._myOverallAvg.bind(this)
    this._overallAvg  = this._overallAvg.bind(this)
  }

  _overallAvg(data) {
    return data
      .filter(i=> (i.ManagerId>0  && (i.QuestionTypeId == 2 || i.QuestionTypeId==3)) )
      .reduce(function(summary, oneItem) {
      if (summary) {
        summary["Excellent"]=(summary["Excellent"] || 0) +  oneItem.Choice["Excellent"]
        summary["Exceeds Expectations"]=(summary["Exceeds Expectations"] || 0) +  oneItem.Choice["Exceeds Expectations"]

        summary["Meets Expectations"]=(summary["Meets Expectations"] || 0) +  oneItem.Choice["Meets Expectations"]
        summary["Needs Improvement"]=(summary["Needs Improvement"] || 0) +  oneItem.Choice["Needs Improvement"]

        summary["Unsatisfactory"]=(summary["Unsatisfactory"] || 0) +  oneItem.Choice["Unsatisfactory"]
        summary["No Answer"]=(summary["No Answer"] || 0) +  oneItem.Choice["No Answer"]

      } else {
        summary = {
          "Excellent": oneItem.Choice["Excellent"] || 0,
          "Exceeds Expectations": oneItem.Choice["Exceeds Expectations"] || 0,
          "Meets Expectations": oneItem.Choice["Meets Expectations"] || 0,
          "Needs Improvement": oneItem.Choice["Needs Improvement"] || 0,
          "Unsatisfactory": oneItem.Choice["Unsatisfactory"] || 0,
          "No Answer": oneItem.Choice["No Answer"] || 0
        }

      }
      return summary
    },{})

  }

  _myOverallAvg(data, managerId) {
    let summary = null
    data
    .filter(i=>i.ManagerId == managerId && (i.QuestionTypeId == 2 || i.QuestionTypeId==3))
    .forEach( (oneItem, i, arr) => {
      if (summary) {
        summary["Excellent"]+=  (oneItem.Choice["Excellent"] || 0)
        summary["Exceeds Expectations"]+=  (oneItem.Choice["Exceeds Expectations"]|| 0)
        summary["Meets Expectations"]+=  (oneItem.Choice["Meets Expectations"]|| 0)
        summary["Needs Improvement"]+= (oneItem.Choice["Needs Improvement"]|| 0)
        summary["Unsatisfactory"]+=  (oneItem.Choice["Unsatisfactory"]|| 0)
        summary["No Answer"]+=  (oneItem.Choice["No Answer"]|| 0)
        console.log('dig yp ', summary)
      } else {
        summary = {
          "Excellent": oneItem.Choice["Excellent"] || 0,
          "Exceeds Expectations": oneItem.Choice["Exceeds Expectations"] || 0,
          "Meets Expectations": oneItem.Choice["Meets Expectations"] || 0,
          "Needs Improvement": oneItem.Choice["Needs Improvement"] || 0,
          "Unsatisfactory": oneItem.Choice["Unsatisfactory"] || 0,
          "No Answer": oneItem.Choice["No Answer"] || 0
        }
        console.log('sup you ', oneItem.Choice, summary)

      }
    })

    return summary
  }

  componentWillMount() {
    const {data, managerId } = this.props
    this.setState({myavg:{}, overallAverage: {}})

    const myavg = this._myOverallAvg(data, managerId)
    const overallAverage=this._overallAvg(data)
    this.setState({myavg: myavg, overallAverage:overallAverage})
  }

  componentWillReceiveProps(props) {
    const {data, managerId } = props
    this.setState({myavg:{}, overallAverage: {}})

    const myavg = this._myOverallAvg(data, managerId)
    const overallAverage=this._overallAvg(data)
    this.setState({myavg: myavg, overallAverage:overallAverage})
  }

  render() {
    const {data, managerId } = this.props
    if (!managerId) {
      return (
        <div/>
      )
    }
    function _storeSummary(data) {
      return data.reduce(function(summary, oneItem) {
        if (summary[oneItem.QuestionId]) {
          summary[oneItem.QuestionId]["Exceeds Expectations"]+=oneItem.Choice["Exceeds Expectations"]
          summary[oneItem.QuestionId]["Excellent"]+=oneItem.Choice["Excellent"]
          summary[oneItem.QuestionId]["Meets Expectations"]+=oneItem.Choice["Meets Expectations"]
          summary[oneItem.QuestionId]["Needs Improvement"]+=oneItem.Choice["Needs Improvement"]
          summary[oneItem.QuestionId]["No Answer"]+=oneItem.Choice["No Answer"]
          summary[oneItem.QuestionId]["Unsatisfactory"]+=oneItem.Choice["Unsatisfactory"]
        } else {
          summary[oneItem.QuestionId]["Exceeds Expectations"]=oneItem.Choice["Exceeds Expectations"] ||0
          summary[oneItem.QuestionId]["Excellent"]=oneItem.Choice["Excellent"] ||0
          summary[oneItem.QuestionId]["Meets Expectations"]=oneItem.Choice["Meets Expectations"] || 0
          summary[oneItem.QuestionId]["Needs Improvement"]=oneItem.Choice["Needs Improvement"] || 0
          summary[oneItem.QuestionId]["No Answer"]=oneItem.Choice["No Answer"] ||0
          summary[oneItem.QuestionId]["Unsatisfactory"]=oneItem.Choice["Unsatisfactory"] || 0
        }
        return summary
      },null)
    }




    const storeSummary=_storeSummary(data)
    return (
      <div>
          {
            data.filter(a => a.ManagerId==managerId && a.ManagerId && managerId)
                .map(function(r,i) {
                    return (
                      <div key={i} className="minorcard" style={{margin:"2em"}}>
                        <h3 key={i}>
                          {r.Question}
                          <br/>
                        </h3>
                        { r.QuestionTypeId == 1 && <Checkboxes v={r.Checked} /> }
                        {
                          r.QuestionTypeId == 2 && <ManagerChoices v={r.Choice}  c={r.CompanyChoice}
                             storeSummary={storeSummary[r.QuestionId]} />
                        }
                        {
                          r.QuestionTypeId == 3 && <ManagerChoices v={r.Choice} c={r.CompanyChoice}
                              storeSummary={storeSummary[r.QuestionId]} />
                        }
                        { r.QuestionTypeId == 4 && <Values v={r.Value} /> }
                        { r.QuestionTypeId == 5 && <Values v={r.Value} /> }
                        { r.QuestionTypeId == 6 && <Values v={r.Value}/> }
                      </div>
                    )
                })
          }
          <hr/>
          { managerId &&
            <div className="minorcard" style={{margin:"2em"}}>
              <h2>Overall Average</h2>
              <br/>
              <ManagerChoices v={this.state.myavg}
                       storeSummary={this.state.overallAverage} />
            </div>
          }
      </div>
    )
  }
}
class StoreDash extends Component {

  render() {
    const {data, managerId } = this.props
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
      }
      this.getData = this.getData.bind(this)
    }

    refresh() {
      let self = this
      try {
        this.getData(this.state.selectedStore)
        console.debug("refreshed...")
      } catch(x) {
        console.error("doh ", x)
      }
    }
    componentDidMount() {
      const self = this
      let {managers} = this.props
      this.refresh.bind(this)()
      const {customerId, locationId} = this.props
      if (managers.length==0) {
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

    selectStore(locationId) {
      const self = this
      const {customerId, campaignId, surveyId } = this.props
      try {
        this.setState({selectedStore: locationId})
        if (locationId) {
          this.getData(locationId)

        } else {
          self.setState({StoreData: []})
        }
      } catch(x) {
        console.error(x, ' in select store');
      }
    }
    getData(locationId) {

      const self = this
      const {customerId, campaignId, surveyId } = this.props

      if (!locationId) {
        self.setState({StoreData: []})
        return
      }
      try {
        api.getSurveyResults(customerId, campaignId,surveyId, locationId,0)
        .then(function(data) {
          self.setState({StoreData:data})
        })
      } catch(x) {
        console.error(x, ' in select store');
      }
    }

    selectManager(id) {
      console.debug("setting manager id to ", id)
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
            <br/>
            <br/>
            <StoreDash data={this.state.StoreData} managerId={this.state.managerId} />
            <hr/>
            <h3>Manager Review</h3>

            <div className="form-group">
                <ManagerDropDown managers={this.props.managers} stores={this.props.stores} setManagerId={ this.selectManager.bind(this) } storeId={this.state.selectedStore} showButton={false} addEmpty={true} />
              </div>
            <ManagerDash data={this.state.StoreData} managerId={this.state.managerId} />
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
