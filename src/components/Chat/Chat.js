import React from 'react';
import { Segment, Header, Button, Modal, Image, Grid, List, Card, Icon, Label } from "semantic-ui-react";

import { subscribeToRef } from '../../services/chat';

export default class RentAdvertise extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  async componentDidMount() {
    // this.setState({
    //   ...this.props.data
    // })
    subscribeToRef("a", console.log)
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.data && this.props.data) {
    //   this.setState({
    //     ...this.props.data
    //   })
    // }
  }



  render() {
    const {} = this.state;
    return (
      <div></div>
    );
  }
}