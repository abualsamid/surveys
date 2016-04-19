import React, { Component, PropTypes } from 'react'
import { API_ROOT } from '../middleware/botengine'
import { connect } from 'react-redux'
import rd3 from 'rd3'

import Areas from '../components/dashboard/areas'

const PieChart = rd3.PieChart;
class Chart extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    var el = React.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  }
  componentDidUpdate() {
    var el = React.findDOMNode(this);
    d3Chart.update(el, this.getChartState());
  }
  getChartState() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  }
  componentWillUnmount() {
    var el = React.findDOMNode(this);
    d3Chart.destroy(el);
  }
  render() {
    return (
      <div className="Chart"></div>
    );
  }
}
class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = { DashboarData: {}};
    }
    addArea(areaName) {
      console.log("adding area ", areaName)
    }
    componentDidMount() {
      let self = this
      const {email, token} = this.props
      fetch(API_ROOT  + "api/v1/survey/getAnswers", {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json' ,
         'Authorization' : 'Bearer ' + token
        },
        method:"GET",
        mode: "cors",
        cache: "default",
        credentials: true
      })
      .then(function(res) {
        console.log(res)
        if (res.ok) {
          return res.json();
        } else {
          console.log("Network error in response.")
        }
      })
      .then(function(data) {
        console.log("Data from server ", data)
        self.setState({DashboarData: data})
        // localStorage.setItem('token',token.token)
        // successfulLogin(token.token, profile)
        // router.push('/Dashboard');
      })
      .catch(function(err) {
        console.log("Error in dashboard render:", err)
      })
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
          <h2>Dashboard</h2>
          <br/>
          <br/>
          <div>
            <PieChart data = {renderData} width={400} height={400} radius={125} innerRadius={20} title="Combined Ratings per Store" />
            <div>
              <span style={{fontWeight: "bold"}}>Legend: </span>
              <span>
                5: Excellent. 4: Good. 3: Fair. 2: Needs Improvement. 1: Needs Significant Improvement.
              </span>
            </div>
          </div>
          <hr/>
          <div>
            <Areas areas={this.props.areas} callBack={this.addArea} language={this.props.language} />
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
      areas: state.admin.areas,
      locations: state.admin.locations
    }

  )

)(Dashboard)
