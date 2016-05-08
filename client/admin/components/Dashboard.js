import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import rd3 from 'rd3'
import * as api from '../../../common/middleware/botengine'


const BarChart = rd3.BarChart;

class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = { DashboarData: {},
        CombinedResults: [
          {name: "CombinedRatings", values: [ {"x": 1, "y":0 },{"x": 2, "y":0 },{"x": 3, "y":0 },{"x": 4, "y":0 },{"x": 5, "y":0 }  ] }
        ]
      };
    }

    refresh() {
      let self = this
      const { reviewId} = this.props
      api.getCombinedResults( reviewId)
      .then(function(data) {
        self.setState({CombinedResults: data })
      })
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
          {

            this.state.CombinedResults.map(function(one,i) {
              return (
                <div>
                  <br/>
                  <BarChart data = {[one]} width={500} height={200} fill={'#3182bd'} key={i}
                  yAxisLabel='Total'
                  xAxisLabel='Question'
                  title={one.name} />
                  <br/>
                </div>
              )
            })
          }
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
