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
            <tbody>
              <tr>
                <th>Assessment</th>
                <th>Count</th>
                <th>Manager Score</th>
                <th>Store Score</th>
              </tr>
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
    const self = this

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

    return <div className="minorcard" style={{margin:"0.5rem"}}>
      <table className="table-condensed">
        <tbody>
          <tr>
            {
              choices.map( r => <th>{r.caption}</th>)
            }
            <th>Manager Avg</th>
            <th>Store Avg</th>
          </tr>
        </tbody>
          {
            self.props.data
            .map(
              (r,i) => {
                let v = r.Choice
                let c = r.CompanyChoice
                let storeSummary=self.props.storeSummary[r.QuestionId]

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


                let avg = countme==0 ? 0 : total/countme;
                let storeAvg = storeCount ? storeTotal/storeCount : 0
                let positive = {color: "green"}
                let negative = {color: "red"}
                let neutral = {color:"black"}
                let   style = neutral
                if (avg.toFixed(2) > storeAvg.toFixed(2) ) {
                  style = positive
                } else {
                  if (avg.toFixed(2) <storeAvg.toFixed(2)) {
                    style = negative
                  }
                }

                return (
                  <tbody>
                    <tr>
                      <th colSpan="7">
                        {r.Question}
                      </th>
                    </tr>
                    <tr>
                      {
                        choices.map((row,index) => {
                          return (
                              <td>

                                <span>
                                  { (v[row.value])  || 0}
                                </span>

                              </td>
                          )
                        })
                      }
                      <th>
                        <span style={style}>
                          {avg.toFixed(2)}
                        </span>
                      </th>
                      <th>
                        <span>
                          {storeAvg.toFixed(2)}
                        </span>
                      </th>
                    </tr>
                  </tbody>
                )
              }
            )
          }
      </table>
    </div>


  }
}

const ManagerChoicesTR = ({question, managers,v}) => {
  if (!managers) {
    return <tr></tr>
  }

  if (managers.length==0) {
    return <tr></tr>
  }

  return (
      managers.map(
        (manager, index) =>
            (
              <tr key={index} >
                <th> { manager.lastName } , { manager.firstName}</th>
                <td> { v[manager.id] || 0 }</td>
                <td></td>
              </tr>
            )
      )
  )
}
class ChoicesTR extends Component {

  render() {
    function percentage(v,total) {
      return !total||!v ? 0: Math.round((100*v / total))
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
          <tr>
            <td>
              <b>
                {props.Question}
              </b>
            </td>
            { this.props.dataSourceTypeId==0 &&

              choices.map( (choice, index) => {
                let value = choice["value"]
                let caption = choice["caption"]
                return (
                    <td key={index} valign='top'>
                      { v[value] || 0 }
                      &nbsp;
                      ( { percentage(v[value]|| 0, total )}%)
                    </td>
                )
              })
            }
            <td>{total}</td>

            {
              this.props.dataSourceTypeId==1 &&
              this.props.managers.map( (manager, index) => {
                return (
                    <td> { manager.lastName } , { manager.firstName}
                   { v[manager.id] || 0 }
                    </td>
                )
              } )
            }

          </tr>
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

  constructor(props) {
    super(props)
    this.state = {
      isEditing: 0,
      text: ""
    }
  }
  render() {
    const self = this
    try {
      if(self.props.v) {
        return (<div>
          {
            self.props.v.map(
              (one,i) => {
                if (one.id==self.state.isEditing) {
                  return (
                    <div key={i}>
                      <br/>
                      <form>
                        <div className="form-group">
                          <textarea value={self.state.text} className="form-control"
                            onChange={
                              (e) => {
                                  self.setState({text: e.target.value })
                              }
                            }
                            rows={self.state.text.length/70}></textarea>
                        </div>
                        <button className="btn btn-primary"
                          onClick={
                            (e)=> {
                              e.preventDefault()
                              console.log(self.state.text)
                              self.props.onSave(self.state.isEditing, self.state.text )
                              self.setState({isEditing: 0 , text: ""})
                              return false;
                            }
                          }
                        >Save</button>
                      </form>
                      <br/>
                    </div>
                  )
                } else {
                  return (
                    <div key={i}>
                      <i className="fa fa-edit noprint"
                        onClick={
                          (e) => this.setState({isEditing: one.id, text: one.Text.trim()})
                        }>

                      </i>
                      <i className="fa fa-square-o noscreen"></i>
                      { }
                      &nbsp;
                      { }
                      {one.Text.trim()}
                      <br/>
                    </div>
                  )
                }
              }
            )
          }
        </div>)
      } else {
        return <div/>
      }

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
    this._saveAnswer = this._saveAnswer.bind(this)
  }

  _overallAvg(data) {
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

  _saveAnswer(id, text ) {
    console.log('in manager dash save answer ')
    this.props.onSave(id, text)

  }

  render() {
    const {data, managerId, managers } = this.props
    const self = this
    if (managerId==0 || managerId=="0") {
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
    function managerName(id) {
      return managers.reduce(
        (prev, current, index, array) => {
          if (current.id==id) {
            return current.firstName + " " + current.lastName
          } else {
            return prev
          }
        },
        ""
      )
    }
    const storeSummary=_storeSummary(data)

    function hasAnswers(managerId) {
      var has = false
      data
      .filter(a => a.ManagerId==managerId && a.ManagerId && managerId)
      .map(
        (r,i) => {
          if(r.Checked) {
            has=true
          }
          if (r.Value) {
            has = true
          }
          if (!has) {
            for(var x in r.Choice) {
              if (r.Choice[x]) {
                has = true
              }
            }
          }
        }
      )
      return has
      console.log(managerId, has)
    }

    return (
      <div>
          {
            managers
            .filter(m => m.id==managerId || managerId==-1 )
            .map( (m,index) =>
              <div  key={index} style={{pageBreakBefore: "always"}} className={hasAnswers(m.id)?"":"noprint"}>
                  <h2>
                    {m.firstName} {m.lastName}
                  </h2>
                <br/>
                  {

                    data
                    .filter(a => a.ManagerId==m.id && a.ManagerId && m.id)
                    .filter(a => a.QuestionTypeId==1  )
                    .map(function(r,i) {
                        return (
                          <div key={i} className="minorcard" style={{margin:"0.5rem"}}>
                            <h3 key={i}>
                              {r.Question}
                              <br/>
                            </h3>
                            { r.QuestionTypeId == 1 && <Checkboxes v={r.Checked} /> }

                          </div>
                        )
                    })
                  }

                  <ManagerChoices
                    storeSummary={storeSummary}
                    data={
                      data
                      .filter(a => a.ManagerId==m.id && a.ManagerId && m.id)
                      .filter(a => a.QuestionTypeId==2 || a.QuestionTypeId==3  )
                    }
                  />

                {
                  data
                  .filter(a => a.ManagerId==m.id && a.ManagerId && m.id)
                  .filter(a => a.QuestionTypeId==4 || a.QuestionTypeId==5 || a.QuestionTypeId==6 )
                  .map(function(r,i) {
                      return (
                        <div key={i} className="minorcard" style={{margin:"1em"}}>
                          <h3 key={i}>
                            {r.Question}
                            <br/>
                          </h3>

                          { r.QuestionTypeId == 4 && <Values v={r.Value} onSave={self._saveAnswer} /> }
                          { r.QuestionTypeId == 5 && <Values v={r.Value}  onSave={self._saveAnswer}  /> }
                          { r.QuestionTypeId == 6 && <Values v={r.Value}  onSave={self._saveAnswer} /> }
                        </div>
                      )
                  })
                }
              </div>
            )
          }


          { managerId>0 &&
            <div className="minorcard" style={{margin:"1em"}}>
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

const CompactCheckBoxes = ({data}) =>  {

    if (data && data.length) {
      return (
        <div  className="minorcard" style={{margin:"1em"}}>
          <table
            className="table-condensed">
            <thead>
              <tr>
                <th>Question</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(
                  (r, i) => (
                              <tr key={i}>
                                <td>{r.Question}</td>
                                <td><Checkboxes v={r.Checked} /> </td>
                              </tr>
                            )
                )
              }
            </tbody>
          </table>
        </div>
      )
    } else {
      return <div/>
    }
}

const CompactValues = ({answers}) => {
  if (answers && answers.length) {
    return (
      <div  className="minorcard" style={{margin:"1em"}}>
        <table className="table-condensed">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>
            {answers.map( (a, i) => {
                if(a.Value && a.Value.length) {
                  return (
                    <tr>
                      <td><strong>{a.Question}</strong></td>
                      <td>
                        {
                          a.Value.map(
                            (r, i) => (
                              <div>
                                <strong>{1+i}. </strong>
                                {r.Text.trim()}
                              </div>
                            )
                          )
                        }
                      </td>
                    </tr>
                  )
                }

              })
            }

          </tbody>
        </table>
      </div>
      )
  } else {
    return <div/>
  }
}
const CompactChoices = ({data, managers, dataSourceTypeId}) => {
  return(
    <div  className="minorcard" style={{margin:"1em"}}>

      { dataSourceTypeId==1 &&
        data.filter(a => a.ManagerId==0)
                .map(function(r,i) {
                  return <h2>{r.Question}</h2>
                })
      }

      <table className="table-condensed">
        <tbody>
          {
            dataSourceTypeId==0 &&
            <tr>
              <th> Question </th>
              <th style={{width:"6em;"}}>  Yes  </th>
              <th style={{width:"6em;"}}>  No  </th>
              <th> Sometimes </th>
              <th> No Answer </th>
              <th> TOTAL </th>
            </tr>
          }

        </tbody>
          {
            data &&
            data.filter(a => a.ManagerId==0)
                .map(function(r,i) {
                  switch(dataSourceTypeId) {
                    case 0:
                      return (
                        <tbody>
                          <ChoicesTR
                            v={r.Choice}
                            c={r.CompanyChoice}
                            questionTypeId={r.QuestionTypeId}
                            dataSourceTypeId={r.DataSourceTypeId}
                            managers = {managers}
                            Question={r.Question}
                          />
                        </tbody>
                      )

                    break;
                    case 1:
                      return (
                        <tbody>
                          <tr>
                            <th> Manager </th>
                            <th> Count </th>
                          </tr>
                          {
                            managers
                            .sort( (a,b) => {
                              if (r.Choice[a.id] < r.Choice[b.id]) return -1;
                              return 1
                            })
                            .map(
                            (manager, index) =>
                              (
                                <tr key={index} >
                                  <td> { manager.lastName } , { manager.firstName}</td>
                                  <td> { r.Choice[manager.id] || 0 }</td>
                                </tr>
                              )
                            )
                          }
                        </tbody>

                      )


                    // case 1:
                    //   return <ManagerChoicesTR question={r.Question} managers={managers} v={r.Choice} />
                    // break;
                  }
            })
          }
      </table>
    </div>
  )

}
class CompactStoreDash extends Component {
  constructor(props) {
    super(props)
    this._saveAnswer = this._saveAnswer.bind(this)
  }
  _saveAnswer(id, text ) {
    this.props.onSave(id, text)
  }


  render() {
    const {data, managerId, managers } = this.props
    const self = this
    return (
      <div className="container">
        <CompactCheckBoxes data={data.filter(a => a.ManagerId==0 && a.QuestionTypeId==1)} />
        <CompactValues answers={data.filter(a => a.ManagerId==0 && (a.QuestionTypeId==4 || a.QuestionTypeId==5 || a.QuestionTypeId==6 ))} />

      </div>
    )
  }
}
class StoreDash extends Component {

  constructor(props) {
    super(props)
    this._saveAnswer = this._saveAnswer.bind(this)
  }
  _saveAnswer(id, text ) {
    this.props.onSave(id, text)


  }
  render() {
    const {data, managerId, managers } = this.props
    const self = this
    return (
      <div>
        {
          data.filter(a => a.ManagerId==0 && (a.QuestionTypeId==1))
              .map(function(r,i) {
                return (
                  <div key={i} className="minorcard" style={{margin:"1em"}}>
                    <h3 key={i}>
                      {r.Question}
                      <br/>
                    </h3>
                    { r.QuestionTypeId == 1 && <Checkboxes v={r.Checked} /> }


                  </div>
                )

          })
        }

        <CompactChoices managers={managers}
          dataSourceTypeId={0}
          data={data.filter(a => a.ManagerId==0 && a.DataSourceTypeId==0 && (a.QuestionTypeId==2 || a.QuestionTypeId==3 ))} />

        <CompactChoices managers={managers}
          dataSourceTypeId={1}
          data={data.filter(a => a.ManagerId==0 && a.DataSourceTypeId==1 && (a.QuestionTypeId==2 || a.QuestionTypeId==3 ))} />



        {
          data.filter(a => a.ManagerId==0 && (a.QuestionTypeId==4 || a.QuestionTypeId==5 || a.QuestionTypeId==6))
              .map(function(r,i) {
                return (
                  <div key={i} className="minorcard" style={{margin:"1em", pageBreakBefore: "always"}}>
                    <h2 key={i}>
                      {r.Question}
                      <br/>
                    </h2>
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

                    { r.QuestionTypeId == 4 && <Values  v={r.Value}  onSave={self._saveAnswer}   /> }
                    { r.QuestionTypeId == 5 && <Values  v={r.Value}  onSave={self._saveAnswer}    /> }
                    { r.QuestionTypeId == 6 && <Values  v={r.Value}  onSave={self._saveAnswer}  /> }
                  </div>
                )

          })
        }

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
      this._saveAnswer = this._saveAnswer.bind(this)
    }

    refresh() {
      let self = this
      try {
        this.getData(this.state.selectedStore)
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
      this.setState({managerId: id})
    }
    _saveAnswer(id, text ) {
      console.log('saving answer Results: ',id, text,  this.state.StoreData)
      const self = this
      const {customerId, campaignId, surveyId } = this.props
      let data = [...this.state.StoreData]
      data
        .map( (r,i) => {
          if (r.Value ) {
            r.Value.map(
              (one, j) => {
                if(one.id==id) {
                  r.Value[j].Text = text
                  console.log('updated ', r.Value[j] )
                  api.SaveComment
                    api.SaveComment(customerId, campaignId,surveyId,{id: r.Value[j].id, Value: r.Value[j].Text })
                    .then(function(res) {
                      console.log(res)
                    })
                }
              }
            )
          }
          return r
        })
      this.setState({StoreData: data})
    }
    render() {
      const {email, token, areas, stores, managers} = this.props
      return (
        <div style={{marginTop: "0px"}}>
          <h3>
            Results
          </h3>
              <div className="form-group">
                <StoresDropDown areas={this.props.areas} stores={this.props.stores}
                  setStoreId={this.selectStore.bind(this)}
                />
              </div>
              <div className="btn-toolbar noprint" role="toolbar">
                <div className="btn-group" role="group">
                  <button className="btn btn-primary noprint"
                    onClick={this._downloadData.bind(this)}>Download Store Results - CSV
                  </button>

                </div>
                <div className="btn-group" role="group">
                  <button className="btn btn-primary noprint"
                    onClick={this._downloadAllData.bind(this)}>Download All Results - CSV
                  </button>
                </div>

              </div>
            <br/>

            <StoreDash data={this.state.StoreData} managerId={this.state.managerId}
              managers = {managers.filter(m=>m.homeLocationId==this.state.selectedStore)}
              onSave={this._saveAnswer}
              />
            <hr/>
            <div className="noprint">
              <h3 className="noprint">Manager Review</h3>

              <div className="form-group noprint">
                  <ManagerDropDown managers={this.props.managers}
                    stores={this.props.stores}
                    setManagerId={ this.selectManager.bind(this) }
                    storeId={this.state.selectedStore}
                    showButton={false}
                    addAll={true}
                    addEmpty={true} />
              </div>
            </div>

            <ManagerDash data={this.state.StoreData}
              managerId={this.state.managerId}
              managers = {managers.filter(m=>m.homeLocationId==this.state.selectedStore)}
              onSave={this._saveAnswer}
              />
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
