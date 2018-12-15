import React, { Component, Children } from 'react';
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import './App.css';
import UserButton from './UserButton';
import PlusButton from './PlusButton';
import Sidepane from './Sidepane';
import Marker from './Marker';
import CreateEventContainer from './CreateEventContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      activeEventInfo: {
        ID: 0,
        title: 'NoTitle',
        date: 'NoDate',
        time: 'NoTime',
        location: 'No Location',
        price: 0,
        desc: 'No description',
        photo_url: 'None',
        address: 'No address',
        filters: 'None'
      },
      sidepaneOpen: false,
      createEventContainerOpen: false
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.toggleSidepane = this.toggleSidepane.bind(this);
    this.toggleCreateEventContainer = this.toggleCreateEventContainer.bind(
      this
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  // CONTINUE(ML): Finish rendering Markers onto the map
  fetchData() {
    fetch('http://obielocal.cs.oberlin.edu:3001/query')
      .then(response => response.json())
      .then(arr => {
        console.log(arr);
        const newArr = arr.map(obj => (
          <Marker
            lat={obj.latitude}
            lng={obj.longitude}
            handleMarkerClick={this.handleMarkerClick}
            eventInfo={obj}
          />
        ));
        this.setState({ markers: newArr });
      })
      .catch(error => console.log('parsing failed', error));
  }

  handleMarkerClick(eventInfo) {
    // If the CreateEvent panel is open, Sidepane can't be opened
    if (this.state.createEventContainerOpen) return;
    this.setState({ activeEventInfo: eventInfo, sidepaneOpen: true });
  }

  /* Closes or opens sidepane. If close is true, just close side pane */
  toggleSidepane(close = false) {
    if (close) this.setState({sidepaneOpen: false});
    else if (this.state.activeEventInfo.ID !== 0)
      this.setState({ sidepaneOpen: !this.state.sidepaneOpen });
    else alert('You must select an event marker to view event information.');
  }

  /* If show is true, CreateEventContainer is opened, otherwise it is closed*/
  toggleCreateEventContainer(show) {
    this.setState({createEventContainerOpen: show});
  }

  render() {
    return (
      <div className="App">
        <MapContainer zoom={18}>
          {Children.toArray(this.state.markers)}
        </MapContainer>
        <Sidepane
          eventInfo={this.state.activeEventInfo}
          active={this.state.sidepaneOpen}
          handleSidepaneClick={this.toggleSidepane}
        />
        <NavBar />
        <PlusButton
          toggleCreateEventContainer={this.toggleCreateEventContainer}
          toggleSidepane={this.toggleSidepane}
        />
        <UserButton />
        <CreateEventContainer active={this.state.createEventContainerOpen} toggleCreateEventContainer={this.toggleCreateEventContainer} />
      </div>
    );
  }
}

export default App;
