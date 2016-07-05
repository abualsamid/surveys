import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as api from '../../../common/middleware/botengine'
import StoresDropDown from './StoresDropDown'
import ManagerDropDown from './ManagerDropDown'
import * as actions  from '../actions'


class OverAllManagerAverage extends Component {
  render() {
      const choices = [ { value:5, caption: "Excellent" },
        { value: 4, caption: "Exceeds Expectations"},
        { value: 3, caption: "Meets Expectations"},
        { value: 2, caption: "Needs Improvement"},
        { value: 1, caption: "Unsatisfactory"},
        { value: 0, caption: "N/A"}
      ]

      const v = this.props.v || {}
      const c = this.props.c || {}
      const {storeSummary} = this.props
      let total = 0
      let countme = 0;
      let storeTotal = 0;
      let storeCount = 0;
      console.log('Overall Managers Choices: ', c, v)
      choices.map((row, index) => {
        let current = row.value
        try {
          if (v[current]) {
            total+= v[current]*current
            countme+= v[current];
          }
        } catch(x) {
          console.log(x);
        }

        try {
          if(storeSummary[current]) {
            storeTotal+=storeSummary[current]*current
            storeCount+= storeSummary[current]
          }
        } catch(x) {console.log(x)}

      })


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
                <th>Manager Score</th>
                <th>Store Score</th>
              </tr>
            </thead>
            <tbody>
              {
                choices.map((row,index) => {
                  return (
                    <tr key={index}>
                      <th>{row.caption}</th>
                      <td>
                        { v[row.value] || 0 }
                      </td>
                      <td>
                        { (v[row.value]*row.value)  || 0}
                      </td>
                      <td>
                        {(storeSummary[row.value] * row.value) || 0 }
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
class ManagerChoices extends Component {

  render() {
    function percentage(v,total) {
      return !total||!v ? 0: (100*v / total).toFixed(2)
    }

    const choices = [ { value:5, caption: "Excellent" },
      { value: 4, caption: "Exceeds Expectations"},
      { value: 3, caption: "Meets Expectations"},
      { value: 2, caption: "Needs Improvement"},
      { value: 1, caption: "Unsatisfactory"},
      { value: 0, caption: "N/A"}
    ]

    const v = this.props.v || {}
    const c = this.props.c || {}
    const {storeSummary} = this.props
    let total = 0
    let countme = 0;
    let storeTotal = 0;
    let storeCount = 0;
    choices.map((row, index) => {
      let current = row.value
      try {
        if (v[current]) {
          total+= v[current]*current
          countme+= v[current];
        }
      } catch(x) {
        console.log(x);
      }

      try {
        if(storeSummary[current]) {
          storeTotal+=storeSummary[current]*current
          storeCount+= storeSummary[current]
        }
      } catch(x) {console.log(x)}

    })


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
              <th>Manager Score</th>
              <th>Store Score</th>
            </tr>
          </thead>
          <tbody>
            {
              choices.map((row,index) => {
                return (
                  <tr key={index}>
                    <th>{row.caption}</th>
                    <td>
                      { v[row.value] || 0 }
                    </td>
                    <td>
                      { (v[row.value]*row.value)  || 0}
                    </td>
                    <td>
                      {(storeSummary[row.value] * row.value) || 0 }
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
    const props = this.props
    const choices = [ { value:1, caption: "Yes" }, { value: 2, caption: "No"}, { value: 3, caption: "Sometimes"},
                    { value: 0, caption: "No Answer"} ]
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>{ this.props.dataSourceTypeId==1 ? "Choice" :  "Assessment" }</th>
              <th>Count</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>

            { this.props.dataSourceTypeId==0 &&
              choices.map( (choice, index) => {
                let value = choice["value"]
                let caption = choice["caption"]
                return (
                  <tr key={index}>
                    <th>
                      { caption || "No Answer"}
                    </th>
                    <td>
                      { v[value] || 0 }
                    </td>
                    <td>
                      { percentage(v[value]|| 0, total )}
                    </td>
                  </tr>
                )
              } )

            }
            {
              this.props.dataSourceTypeId==1 &&
              this.props.managers.map( (manager, index) => {
                return (
                  <tr key={index} >
                    <th> { manager.lastName } , { manager.firstName}</th>
                    <td> { v[manager.id] || 0 }</td>
                    <td></td>
                  </tr>
                )
              } )
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

Choices.propTypes = {
  v: React.PropTypes.object,
  c: React.PropTypes.object,
  questionTypeId: React.PropTypes.number,
  dataSourceTypeId: React.PropTypes.number
}

class Values extends Component {
  render() {
    const v = this.props.v || []
    try {
      return (
        <div>
          {
            v.map( (one,i) => <div key={i}> <span className='badge'>{one.Count}</span> {one.Text} </div>)
          }
        </div>
      )
    } catch(x) {
      console.log('render ', x)
    }

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
    console.log('overall avg ', data)
    return data
      .filter(i=> (i.ManagerId>0  && (i.QuestionTypeId == 2 || i.QuestionTypeId==3)) )
      .reduce(function(summary, oneItem) {
        summary["5"] += oneItem.Choice["5"] || 0;
        summary["4"] += oneItem.Choice["4"] || 0;
        summary["3"] += oneItem.Choice["3"] || 0;
        summary["2"] += oneItem.Choice["2"] || 0;
        summary["1"] += oneItem.Choice["1"] || 0;
      return summary
    },{ "5":0, "4":0, "3":0, "2":0, "1":0})

  }

  _myOverallAvg(data, managerId) {
    console.log('_myOverallAvg ', data)
    let summary = null
    data
    .filter(i=>i.ManagerId == managerId && (i.QuestionTypeId == 2 || i.QuestionTypeId==3))
    .forEach( (oneItem, i, arr) => {
      if (summary) {
        summary["5"]+=  (oneItem.Choice[5] || 0)
        summary["4"]+=  (oneItem.Choice[4]|| 0)
        summary["3"]+=  (oneItem.Choice[3]|| 0)
        summary["2"]+= (oneItem.Choice[2]|| 0)
        summary["1"]+=  (oneItem.Choice[1]|| 0)
        summary["0"]+=  (oneItem.Choice[0]|| 0)
      } else {
        summary = {
          "5": oneItem.Choice[5] || 0,
          "4": oneItem.Choice[4] || 0,
          "3": oneItem.Choice[3] || 0,
          "2": oneItem.Choice[2] || 0,
          "1": oneItem.Choice[1] || 0,
          "0": oneItem.Choice[0] || 0
        }

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
        if (summary && summary[oneItem.QuestionId]) {
          summary[oneItem.QuestionId][5]+= (oneItem.Choice[5] || 0 )
          summary[oneItem.QuestionId][4]+= (oneItem.Choice[4] || 0)
          summary[oneItem.QuestionId][3]+=(oneItem.Choice[3] || 0 )
          summary[oneItem.QuestionId][2]+=(oneItem.Choice[2] || 0 )
          summary[oneItem.QuestionId][1]+=(oneItem.Choice[1] || 0 )
          summary[oneItem.QuestionId][0]+=(oneItem.Choice[0] || 0 )
        } else {
          summary=summary || {}
          summary[oneItem.QuestionId]= summary[oneItem.QuestionId] || {}
          summary[oneItem.QuestionId][4]=oneItem.Choice[4] ||0
          summary[oneItem.QuestionId][5]=oneItem.Choice[5] ||0
          summary[oneItem.QuestionId][3]=oneItem.Choice[3] || 0
          summary[oneItem.QuestionId][2]=oneItem.Choice[2] || 0
          summary[oneItem.QuestionId][1]=oneItem.Choice[1] || 0
          summary[oneItem.QuestionId][0]=oneItem.Choice[0] ||0
        }
        return summary
      },{})
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
                        { r.QuestionTypeId == 5 && <Values v={r.Value}  /> }
                        { r.QuestionTypeId == 6 && <Values v={r.Value} /> }
                      </div>
                    )
                })
          }
          <hr/>
          { managerId &&
            <div className="minorcard" style={{margin:"2em"}}>
              <h2>Overall Average</h2>
              <br/>
              <OverAllManagerAverage v={this.state.myavg}
                       storeSummary={this.state.overallAverage} />
            </div>
          }
      </div>
    )
  }
}
class StoreDash extends Component {

  render() {
    const {data, managerId, managers } = this.props
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

                { (r.QuestionTypeId == 3 || r.QuestionTypeId==2) &&
                  <Choices
                    v={r.Choice}
                    c={r.CompanyChoice}
                    questionTypeId={r.QuestionTypeId}
                    dataSourceTypeId={r.DataSourceTypeId}
                    managers = {managers}
                  />
                }

                { r.QuestionTypeId == 4 && <Values  v={r.Value}  /> }
                { r.QuestionTypeId == 5 && <Values  v={r.Value}   /> }
                { r.QuestionTypeId == 6 && <Values  v={r.Value}  /> }
              </div>
            )

          })
        }
        <hr/>

      </div>
    )
  }
}
class Results extends Component {
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
      api.downloadSurveyResults(customerId, campaignId,surveyId,self.state.selectedStore || 0,0)
      .then(function(data) {
        var mime="text/csv"
        var blob = new Blob([data], {type: mime})
        , url = URL.createObjectURL(blob)
        self.saveAs(url, "results.csv")
      })

    }

    _downloadAllData() {
      const self = this
      const {customerId, campaignId, surveyId } = this.props
      api.downloadSurveyResults(customerId, campaignId,surveyId, 0,0)
      .then(function(data) {
        var mime="text/csv"
        var blob = new Blob([data], {type: mime})
        , url = URL.createObjectURL(blob)
        self.saveAs(url, "all_results.csv")
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
            Results
          </h2>

          <br/>
          <br/>
          <br/>
            <br/>
              <div className="form-group">
                <StoresDropDown areas={this.props.areas} stores={this.props.stores}
                  setStoreId={this.selectStore.bind(this)}
                />
              </div>
            <br/>
              <button className="btn btn-primary" onClick={this._downloadData.bind(this)}>Download Store Results - CSV </button>
                <br/>
              <br/>
              <button className="btn btn-primary" onClick={this._downloadAllData.bind(this)}>Download All Results - CSV </button>
            <br/>
            <br/>
            <StoreDash data={this.state.StoreData} managerId={this.state.managerId}
              managers = {managers.filter(m=>m.homeLocationId==this.state.selectedStore)}
              />
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

)(Results)
