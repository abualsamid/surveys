import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as languageHelper  from '../../helpers/language'
import * as api from '../../middleware/botengine'

function addItem(w, v, parent) {
  v = v.trim()


  // optimistic caching. push to server, fire and forget.
  switch(w) {
    case "area":
      return api
          .addArea(v);
    case "location":
      return api
          .addLocation(parent, v)
  }

}

function addedItem(type, item) {
  return {
    type: type,
    item: item
  }
}

function loadedAreas(areas) {
  return {
    type:"LOADED_AREAS",
    areas: areas
  }
}
function loadedLocations(locations){
  return {
    type: "LOADED_LOCATIONS",
    locations: locations
  }
}

class LocationsDropDown extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {areas, locations} = this.props
    return (
      <select className="form-control"  >
        {
          areas.map( one => (
            <optgroup label={one} key={one}>
              {
                locations
                .filter( l => l.area==one)
                .map( l => <option key={one + ':' + l.lcation}>{l.location} </option>  )
              }
            </optgroup>
          ))
        }
      </select>
    )

  }
}
class Areas extends Component {
  constructor(props) {
    super(props)
    this.state = {selectedArea: ""}
  }
  handleClick(w) {
    const { addedItem } = this.props
    var v = this.area.value.trim()
    this.area.value=""
    switch(w) {
      case "area":
        addItem(w,v)
        .then(
          addedItem("ADD_AREA",v)
        )
        break;
      case "location":
        try {
          let parent = this.state.selectedArea || this.areaList.options[0].value
          addItem(w,v,this.state.selectedArea)
          .then(addedItem("ADD_LOCATION",{client:"leye", area: this.state.selectedArea, location: v} ))

        } catch(x) {
          alert("could not add location, please select an area and try again.");
        }
        break;
    }

  }
  selectArea(e) {
    try {
      this.setState({selectedArea: e.target.value})

    } catch(x) {
      console.log(x, ' in select area');
    }
  }
  componentWillReceiveProps(nextProps) {
      const {areas} = nextProps

  }
  componentDidMount() {
    var self = this;
    api.getAreas("leye")
    .then(function(areas) {
      try {
        if(areas.length>0) {
          self.setState({selectedArea: areas[0]})
        }

      } catch(x) {
        console.log(x)
      }
      self.props.loadedAreas(areas)
    })
    .catch(function(doh) {
      self.props.loadedAreas([])
    })

    api.getLocations("leye")
    .then(function(locations) {
      self.props.loadedLocations(locations)
    })
    .catch(function(doh) {
      self.props.loadedLocations([])
    })

  }
  render() {
    const {language} = this.props
    return (
      <div className="col-md-12">
        <div>
          <div><h3>{languageHelper.tr("Locations", language)}</h3></div>

          <form className="form-horizontal" onSubmit={(e) => e.preventDefault()}>

            <div className="form-group">
              <select className="form-control" value={this.state.selectedArea} ref={ a => this.areaList = a}  onChange={this.selectArea.bind(this)}>
              {this.props.areas.map( (one) =>  <option key={one}>{one}</option> )}
              </select>
            </div>
            <div className="form-group">
              <LocationsDropDown areas={this.props.areas} locations={this.props.locations} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" ref={(area) => this.area = area} placeholder="Add Area or Location" />
            </div>

            <span style={{padding:"1em"}}>
              <button type="submit"  className="btn btn-primary" onClick={this.handleClick.bind(this,"area")}>
                {languageHelper.tr("Add Area",language)}
              </button>

            </span>
            <span style={{padding:"1em"}}>
              <button type="submit"  className="btn btn-primary" onClick={this.handleClick.bind(this,"location")}>
                {languageHelper.tr("Add Location",language)}
              </button>

            </span>

            <br/>

          </form>
          <br/>
          <br/>
        </div>
        <br/>
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
      areas: state.admin.areas || [],
      locations: state.admin.locations
    }

  ),
  {
    addedItem,
    loadedAreas,
    loadedLocations
  }
)(Areas)
