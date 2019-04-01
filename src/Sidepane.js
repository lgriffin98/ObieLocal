import React, { Component } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

import Tabs from './Tabs';
import './tabs.css';
import SidepaneCloseButton from './SidepaneCloseButton';

import AgendaEventList from './AgendaEventList';

const StyledPane = styled.div`
  margin: 0px;
  padding: 0px;
  top: 0px;
  width: 90%;
  --pane-max-width: 450px;
  max-width: var(--pane-max-width);
  height: 100%;
  position: fixed;
  transition: all 1s;
  z-index: 2;
`;

const PaneBody = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  margin: 0px;
  padding: 0px;
  overflow: hidden auto;
  background-color: hsla(0, 0%, 96%, 1);
  border-radius: 0px;
  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.27);

  .event-details {
    margin: 0px;
  }
  h1 {
    background-color: #cedd0e;
    margin: 0px;
  }
  p {
    overflow: clip;
    padding: 15px;
    cursor: default;
  }
  em {
    font-weight: bold;
  }
  img {
    max-width: 95%;
    margin: auto;
  }
`;

const Div = styled.div`
  position: absolute;
  width: var(--pane-min-width);
  top: 0px;
  right: 0px;
  button {
    position: absolute;
    width: 50px;
    height: 40px;
    background-color: #73c9ffef;
    border: none;
    border-radius: 25%;
    box-shadow: 0 2px 5px rgb(0, 0, 0, 0.75);
    font-weight: bolder;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #a1dafdef;
  }
  #button-prev-event {
    left: 0;
    margin-left: 16%;
  }
  #button-next-event {
    right: 0;
    margin-right: 16%;
  }
`;
export default class Sidepane extends Component {
  constructor(props) {
    super(props);
    this.getEventTimeString = this.getEventTimeString.bind(this);
    this.getEventSwitchButtons = this.getEventSwitchButtons.bind(this);
  }

  /**
   * Returns the time string to be displayed in the sidepane for an event in
   * the active event array.
   * @param {Number} eventIdx An index of the event array.
   * @returns {String} The time string.
   */
  getEventTimeString(eventIdx) {
    let startTime = 'Time unknown.';
    let endTime;
    const dateTime = require('node-datetime');
    // TODO: (CP) Do we actually need to check for start time in the event
    // object here?
    if (this.props.eventArray[eventIdx].start_time) {
      /* Note that the Date constructor automatically adjusts for timezone */
      const startTimeUTC = new Date(this.props.eventArray[eventIdx].start_time);
      /*format times to display hour, minute, and period in 12 hour time*/
      startTime = dateTime.create(startTimeUTC, 'I:M p').format();
    }
    if (this.props.eventArray[eventIdx].end_time) {
      const endTimeUTC = new Date(this.props.eventArray[eventIdx].end_time);
      endTime = dateTime.create(endTimeUTC, 'I:M p').format();
    }
    endTime = endTime ? ` - ${endTime}` : ``;
    return `${startTime}${endTime}`;
  }

  /**
   * Determines whether there are multiple events at the current location and
   * creates buttons to switch through them if necessary.
   * @returns {JSX.Element} A div with 0, 1, or 2 buttons.
   */
  getEventSwitchButtons() {
    let prevButton, nextButton;
    if (this.props.eventIdx < this.props.eventArray.length - 1) {
      nextButton = (
        <button id="button-next-event" onClick={this.props.handleEventSwitch}>
          >>
        </button>
      );
    }
    if (this.props.eventIdx > 0) {
      prevButton = (
        <button
          id="button-prev-event"
          onClick={this.props.handleEventSwitch}
        >{`<<`}</button>
      );
    }
    return (
      <Div id="multi-event-buttons">
        {prevButton}
        {nextButton}
      </Div>
    );
  }

  render() {
    const timeString = this.getEventTimeString(this.props.eventIdx);
    const locationString =
      this.props.eventArray[this.props.eventIdx].address || 'Location unknown.';
    const eventSwitchButtons = this.getEventSwitchButtons();
    /* If no event is selected */
    console.log('Prop in sidepane');
    console.log(this.props.activeTab);
    if (this.props.eventArray[0].ID === 0)
      return (
        <StyledPane
          className={
            this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'
          }
          id="sidepane"
        >
          <PaneBody>
            <Tabs activeTab={this.props.activeTab}>
              {/* Event Tab */}
              <div label="Event">
                <p>Please select an event to view details</p>
              </div>
              {/* Agenda Tab */}
              <div label="Agenda">
                <AgendaEventList
                  checkEventTimes={this.props.checkEventTimes}
                  handleAgendaClick={this.props.handleAgendaClick}
                  timeFormatter={this.getEventTimeString}
                />
              </div>
            </Tabs>
          </PaneBody>
          <SidepaneCloseButton
            id="sidepane-close"
            handleSidepaneClick={this.props.handleSidepaneClick}
          />
          {eventSwitchButtons}
        </StyledPane>
      );
    else
      return (
        <StyledPane
          className={
            this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'
          }
        >
          <PaneBody>
            <Tabs activeTab={this.props.activeTab}>
              {/* Event Tab */}
              <div label="Event">
                <h1>{this.props.eventArray[this.props.eventIdx].title}</h1>
                <p className="event-details">
                  <em>Where and When: </em>
                  <br />
                  {`${locationString}`}
                  <br />
                  {`Today! ${timeString}`}
                </p>
                <img
                  src={this.props.eventArray[this.props.eventIdx].photo_url}
                  alt=""
                />
                {ReactHtmlParser(
                  this.props.eventArray[this.props.eventIdx].description
                )}
              </div>
              {/* Agenda Tab */}
              <div label="Agenda">
                <AgendaEventList
                  checkEventTimes={this.props.checkEventTimes}
                  handleAgendaClick={this.props.handleAgendaClick}
                  timeFormatter={this.getEventTimeString}
                />
              </div>
            </Tabs>
          </PaneBody>
          {eventSwitchButtons}
          <SidepaneCloseButton
            handleSidepaneClick={this.props.handleSidepaneClick}
            id="sidepane-close"
          />
        </StyledPane>
      );
  }
}
