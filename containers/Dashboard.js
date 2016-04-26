import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import rd3 from 'rd3'

import * as api from '../middleware/botengine'


const PieChart = rd3.PieChart;
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
        data.shift()
        console.log("Dashboard data ", data)
        let o = data.map(function(a,i) {
          return {"x": i+1, "y": a}
        })
        self.setState({CombinedResults: [ { name:"Combined", values: o } ] })
      })
    }
    componentDidMount() {
      this.refresh.bind(this)()
    }

    render() {
      const {email, token} = this.props
      var pieData = this.state.DashboarData.combinedRatings || {}
      var renderData = [
        {label: '5', value: 0},
        {label: '4', value: 0},
        {label: '3', value: 0 },
        {label: '2', value: 0 },
        {label: '1', value: 0 }
      ];
      var total = 0;

      if (pieData) {
        total = pieData["5"] + pieData["4"] + pieData["3"] + pieData["2"] + pieData["1"];
        if (total) {
          renderData[0].value = (100*pieData[5] / total).toFixed(2);
          renderData[1].value = (100*pieData[4] / total).toFixed(2);
          renderData[2].value = (100*pieData[3] / total).toFixed(2);
          renderData[3].value = (100*pieData[2] / total).toFixed(2);
          renderData[4].value = (100*pieData[1] / total).toFixed(2);
        }

      }

      return (
        <div>
          <h2>
            Dashboard <a href="#" onClick={this.refresh.bind(this)}><span className="glyphicon glyphicon-refresh"></span></a>
          </h2>

          <br/>
          <br/>
          <div>
            <BarChart data = {this.state.CombinedResults} width={500} height={200} fill={'#3182bd'}
            yAxisLabel='Total'
            xAxisLabel='Question'
            title="Combined Ratings for LEYE" />
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

          </div>
          <hr/>

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
