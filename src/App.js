/* Container */

import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import NavBar from './components/NavBar';
import './styles/App.css';
import Sidepane from './components/Sidepane';
import ReactGA from 'react-ga';
import config from './shared/config';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getAllMarkers } from './actions/markerActions';
import FilterByDayButton from './components/FilterEvents/filterDayButton';
import { firestoreConnect } from 'react-redux-firebase';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createEventContainerOpen: false,
    };

    this.toggleCreateEventContainer = this.toggleCreateEventContainer.bind(
      this
    );
  }

  componentDidMount() {
    initializeReactGA();
  }
  
  /* If show is true, CreateEventContainer is opened, otherwise it is closed*/
  toggleCreateEventContainer(show) {
    this.setState({ createEventContainerOpen: show });
  }
  
  render() {
    if (this.props.events) {
      this.props.getAllMarkers(this.props.events);
    }
    initializeReactGA();
    return (
      <div className="App">
        <FilterByDayButton />
        <NavBar />
        <MapContainer />
        <Sidepane />
      </div>
    );
  }
}

/**
 * Calling function will increase hit count on Google Analytics by 1
 */
function initializeReactGA() {
  ReactGA.initialize(config.GOOGLE_ANALYTICS_ID);
  ReactGA.pageview('/');
}

const mapStateToProps = (state) => ({
  events: state.firestore.ordered.events,
});

const mapDispatchToProps = (dispatch) => {
  // What to return? The action you want the component to have access to
  return {
    getAllMarkers: (events) => dispatch(getAllMarkers(events)),
  };
};

export default compose(
  firestoreConnect(() => [{ collection: 'events' }]),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
