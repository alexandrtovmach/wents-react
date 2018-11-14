import React from 'react';
import { Segment, Form, Header, } from "semantic-ui-react";

import { Map, AddressInput, ImageInput } from '../';
import { dateToInputFormat } from '../../services/utils';
import { appartmentsTypes, rentTypes, benefits } from '../../services/constants';


export default class FilterForm extends React.Component {
  constructor() {
    super();

    this.state = {
      minPrice: 0,
      maxPrice: 300,
      unlimitedDate: false,
      startDate: Date.now(),
      endDate: Date.now() + 1000*60*60*24,
      apartmentsType: "apartment",
      rentType: "short",
      benefitList: ["wifi", "furniture"]
    }

    this.priceChanged = this.priceChanged.bind(this);
    this.toggleUnlimitedDate = this.toggleUnlimitedDate.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.optionSelected = this.optionSelected.bind(this);


    this.setLocation = this.setLocation.bind(this);
  }

  componentDidUpdate() {
    this.props.onChange && this.props.onChange(this.state);
  }

  priceChanged([min, max]) {
    max = max <= 2000? max || 1: 2000;
    min = min < max? min || 0: max - 1;
    this.setState({
      minPrice: min,
      maxPrice: max
    });
  }

  toggleUnlimitedDate() {
    this.setState({
      unlimitedDate: !this.state.unlimitedDate
    });
  }

  dateChanged(event, value, name) {
    if (!event.target.validationMessage) {
      this.setState({
        [name]: new Date(value).valueOf()
      });
    }
  }

  optionSelected(value, name) {
    this.setState({
      [name]: value
    });
  }

  setLocation(location) {
    this.setState({ location });
  }

  render() {
    const {
      location,
      // ---
      minPrice,
      maxPrice,
      unlimitedDate,
      startDate,
      endDate,
      apartmentsType,
      rentType,
      benefitList
    } = this.state;
    return (
      <Segment padded>
        <Form widths="equal" >
          <Form.Group>
            <Header>Main</Header>
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={1}
              label="Title"
              onChange={(event, data) => this.dateChanged(event, data.value, "startDate")}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              width={1}
              label="Description"
              autoHeight
              placeholder='Tell more about your post...'
              onChange={(event, data) => this.dateChanged(event, data.value, "startDate")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field width={1}>
              <label>Address</label>
              <AddressInput
                setLocation={this.setLocation}
                placeholder="Address"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Map
                setLocation={this.setLocation}
                location={location}
                placeholder="Type in an address to see a map"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label="Apartments type"
              options={appartmentsTypes}
              value={apartmentsType}
              width={4}
              onChange={(event, data) => this.optionSelected(data.value, "apartmentsType")}
            />
            <Form.Select
              label="Rent type"
              options={rentTypes}
              value={rentType}
              width={4}
              onChange={(event, data) => this.optionSelected(data.value, "rentType")}
            />
          </Form.Group>
          <Form.Group>
            <Header>Date</Header>
          </Form.Group>
          <Form.Group>
            <Form.Checkbox
              label="Without end date"
              toggle
              checked={unlimitedDate}
              width={1}
              onChange={this.toggleUnlimitedDate}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={1}
              label="Start date"
              placeholder='From'
              type="date"
              value={dateToInputFormat(startDate)}
              max={dateToInputFormat(endDate)}
              onChange={(event, data) => this.dateChanged(event, data.value, "startDate")}
            />
            <Form.Input
              width={1}
              label="End date"
              placeholder='To'
              type="date"
              disabled={unlimitedDate}
              value={dateToInputFormat(endDate)}
              min={dateToInputFormat(startDate)}
              onChange={(event, data) => this.dateChanged(event, data.value, "endDate")}
            />
          </Form.Group>
          <Form.Group>
            <Header>Budget</Header>
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={1}
              label="Price"
              placeholder='Min'
              type="number"
              value={minPrice}
              onChange={(event, data) => this.priceChanged([data.value, maxPrice])}
            />
          </Form.Group>
          <Form.Group>
            <Header>Photos</Header>
          </Form.Group>
          <Form.Group>
            <Form.Field
              width={1}
            >
              <ImageInput />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Header>Additional</Header>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label="Benefits"
              options={benefits}
              multiple
              value={benefitList}
              width={8}
              onChange={(event, data) => this.optionSelected(data.value, "benefitList")}
            />
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}