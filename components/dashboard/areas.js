import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as languageHelper  from '../../helpers/language'
import * as api from '../../middleware/botengine'

import StoresDropDown from '../StoresDropDown'

import addedItem from '../../actions'
import loadedAreas from '../../actions'
import loadedStores from '../../actions'


function addItem(what, newItem, parent) {
  newItem = newItem.trim()
  // optimistic caching. push to server, fire and forget.
  switch(what) {
    case "area":
      return api
          .addArea(newItem);
    case "store":
      return api
          .addStore(parent, newItem)
  }
}


class Areas extends Component {
  constructor(props) {
    super(props)
    this.state = {selectedArea: ""}
  }
  handleClick(what) {
    const { addedItem } = this.props
    const newItem = this.area.value.trim()
    this.area.value=""
    switch(what) {
      case "area":
        addItem(what,newItem)
        .then(
          addedItem("ADD_AREA",newItem)
        )
        break;
      case "store":
        try {
          let parentId = this.state.selectedArea || this.areaList.options[0].value
          addItem(what,newItem,parentId)
          .then(addedItem("ADD_STORE",{client:"leye", areaId: parentId, name: newItem} ))

        } catch(x) {
          console.log(x)
          alert("could not add store, please select an area and try again.");
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
      console.log("received areas from api ", areas)
      try {
        if(areas.length>0) {
          self.setState({selectedArea: areas[0].id})
        }

      } catch(x) {
        console.log(x)
      }
      self.props.loadedAreas(areas)
    })
    .catch(function(doh) {
      self.props.loadedAreas([])
    })

    api.getStores("leye")
    .then(function(stores) {
      self.props.loadedStores(stores)
    })
    .catch(function(doh) {
      self.props.loadedStores([])
    })

  }

  render() {
    const {language} = this.props
    return (
      <div className="col-md-12">
        <div>
          <div><h3>{languageHelper.tr("stores", language)}</h3></div>

          <form className="form-horizontal" onSubmit={(e) => e.preventDefault()}>

            <div className="form-group">
              <select className="form-control" value={this.state.selectedArea} ref={ a => this.areaList = a}  onChange={this.selectArea.bind(this)}>
              {this.props.areas.map( (one) =>  <option key={one.id} value={one.id}> {one.name} </option> )}
              </select>
            </div>
            <div className="form-group">
              <StoresDropDown areas={this.props.areas} stores={this.props.stores} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" ref={(area) => this.area = area} placeholder="Add Area or Store" />
            </div>

            <span style={{padding:"1em"}}>
              <button type="submit"  className="btn btn-primary" onClick={this.handleClick.bind(this,"area")}>
                {languageHelper.tr("Add Area",language)}
              </button>

            </span>
            <span style={{padding:"1em"}}>
              <button type="submit"  className="btn btn-primary" onClick={this.handleClick.bind(this,"store")}>
                {languageHelper.tr("Add Store",language)}
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
      stores: state.admin.stores
    }

  ),
  {
    addedItem,
    loadedAreas,
    loadedStores
  }
)(Areas)
