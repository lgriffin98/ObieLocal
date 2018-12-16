import React, { Component } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const StyledPane = styled.div`
  margin: 0px;
  padding: 0px;
  top: 60px;
  width: 25%;
  min-width: 150px;
  height: 85%;
  background-color: rgba(255, 0, 0, 0.6);
  border: 3px solid white;
  border-right: 12px solid rgb(75, 75, 75);
  border-radius: 0px;
  border-style: inset;
  transition: all 1s;

  h1,
  p {
    overflow: clip;
  }
  em {
    font-weight: bold;
  }
`;

export default class Sidepane extends Component {
  render() {
    // TODO Change this to the correct start time
    const startTime = new Date(this.props.eventInfo.start_time);
    const where = this.props.eventInfo.address + '. ' + startTime.toUTCString();
    // console.log(`The start time is ${startTime)}`);
    const desc = this.props.eventInfo.desc;

    return (
      <StyledPane
        className={this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'}
        onClick={this.props.handleSidepaneClick}
      >
        <h1>{this.props.eventInfo.title}</h1>
        <p>{desc}</p>
        <p className="event-details">
          <em>Where and When: </em>
          {where}
          </p>
          {ReactHtmlParser(this.props.eventInfo.description)}
      </StyledPane>
    );
  }
}
