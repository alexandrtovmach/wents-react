import React from 'react';
import { Segment, Form, Input, Header, Label } from "semantic-ui-react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import { dateToInputFormat } from '../../services/utils';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const appartmentsTypes = [
  {
    text: "House",
    value: "house"
  },
  {
    text: "Apartment",
    value: "apartment"
  },
  {
    text: "Room",
    value: "room"
  },
];

const rentTypes = [
  {
    text: "Short-term",
    value: "short"
  },
  {
    text: "Long-term",
    value: "long"
  }
];

const benefits = [
  {
    text: "Pool",
    value: "pool",
    icon: "life ring"
  },
  {
    text: "Wi-Fi",
    value: "wifi",
    icon: "wifi"
  },
  {
    text: "Garage",
    value: "garage",
    icon: "warehouse"
  },
  {
    text: "Credit Card",
    value: "credit_card",
    icon: "credit card outline"
  },
  {
    text: "Washing machine",
    value: "washing_machine",
    icon: "sync"
  },
  {
    text: "Fridge",
    value: "fridge",
    icon: "snowflake"
  },
  {
    text: "Air condition",
    value: "air_condition",
    icon: "snowflake outline"
  },
  {
    text: "Grill",
    value: "grill",
    icon: "gripfire"
  },
  {
    text: "Oven",
    value: "oven",
    icon: "food"
  },
  {
    text: "Bar",
    value: "bar",
    icon: "glass martini"
  },
  {
    text: "Parking zone",
    value: "parking_zone",
    icon: "car"
  },
  {
    text: "Gym",
    value: "gym",
    icon: "volleyball ball"
  },
  {
    text: "Furniture",
    value: "furniture",
    icon: "accusoft"
  },
  {
    text: "Bath",
    value: "bath",
    icon: "bath"
  },
  {
    text: "Pet",
    value: "pet",
    icon: "paw"
  },
  {
    text: "24/7",
    value: "full_service",
    icon: "clock"
  },
];

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

  render() {
    const {
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
            <Form.Field width={1}>
              <Input
                label="Start date"
                placeholder='From'
                type="date"
                value={dateToInputFormat(startDate)}
                max={dateToInputFormat(endDate)}
                onChange={(event, data) => this.dateChanged(event, data.value, "startDate")}
              />
            </Form.Field>
            <Form.Field width={1}>
              <Input
                label="End date"
                placeholder='To'
                type="date"
                disabled={unlimitedDate}
                value={dateToInputFormat(endDate)}
                min={dateToInputFormat(startDate)}
                onChange={(event, data) => this.dateChanged(event, data.value, "endDate")}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Header>Budget</Header>
          </Form.Group>
          <Form.Group>
            <Form.Field width={1}>
              <Range
                min={0}
                max={2000}
                value={[minPrice, maxPrice]}
                onChange={this.priceChanged}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={1}>
              <Input
                label="Minimum price"
                placeholder='Min'
                type="number"
                value={minPrice}
                onChange={(event, data) => this.priceChanged([data.value, maxPrice])}
              />
            </Form.Field>
            <Form.Field width={1}>
              <Input
                label="Maximum price"
                placeholder='Max'
                type="number"
                width={3}
                value={maxPrice}
                onChange={(event, data) => this.priceChanged([minPrice, data.value])}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Header>Additional</Header>
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
            <Form.Select
              label="Options"
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