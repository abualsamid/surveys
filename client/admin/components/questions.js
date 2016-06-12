import React, { Component, PropTypes } from 'react'

export default class Questions extends Component {
  constructor(props) {
    super(props)
    this._update = this._update.bind(this)
    this._submit = this._submit.bind(this)
    this.state = {questions: this.props.questions}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({questions: nextProps.questions})
  }
  _update(e,i,id,language) {
    let q = this.state.questions
    q[i][language]=e.target.value
    q[i].isDirty=true
    this.setState({questions: q})
  }
  _submit() {
    this.props.onSave(this.state.questions.filter( q=>q.isDirty ))
  }
  render() {
    const self=this
    return (
      <div>
        <div>
          {
            this.state.questions.map(function(q,i) {
              return (
                <div className="minorcard" key={i}>
                  <div style={{color:"black", fontWeight: "bold"}}>{1+i}. {q.Name}</div>
                  <br/>
                  <div>
                    <textarea className="form-control" style={{minWidth:"100%"}} value={q.En}
                      onChange={(e)=>self._update(e,i,q.id,"En")}
                       ></textarea>
                  </div>
                  <br/>

                  <div>
                    <textarea className="form-control" style={{minWidth:"100%"}} value={q.Es}
                      onChange={(e)=>self._update(e,i,q.id,"Es")}
                      ></textarea>
                  </div>

                </div>
              )
            })
          }
        </div>
        <br/>
        <div>
          <button className="btn btn-primary btn-block btn-lg" onClick={ (e) => self._submit()}>Save</button>
        </div>
      </div>
    )
  }
}
