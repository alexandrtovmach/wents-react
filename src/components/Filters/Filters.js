import React from 'react';
import { Segment, Form, Input, Header } from "semantic-ui-react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import { dateToInputFormat } from '../../services/utils';
import { appartmentsTypes, rentTypes, benefits } from '../../services/constants';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default class FilterForm extends React.Component {
  constructor() {
    super();

    this.state = {
      minPrice: 0,
      maxPrice: 300,
      unlimitedDate: false,
      startDate: Date.now(),
      endDate: Date.now() + 1000*60*60*24*120,
      apartmentsType: "any",
      rentType: "any",
      benefitList: []
    }

    this.priceChanged = this.priceChanged.bind(this);
    this.toggleUnlimitedDate = this.toggleUnlimitedDate.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.optionSelected = this.optionSelected.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
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
    const { langPack } = this.props;
    return (
      <Segment
        padded
        basic={this.props.basic}
      >
        <Form widths="equal" >
          <Form.Group>
            <Header>{langPack["price"]}</Header>
          </Form.Group>
          <Form.Group>
            <Form.Checkbox
              label={langPack["without_end_date"]}
              toggle
              checked={unlimitedDate}
              width={1}
              onChange={this.toggleUnlimitedDate}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field width={1}>
              <Input
                label={langPack["start_date"]}
                placeholder={langPack["from"]}
                type="date"
                value={dateToInputFormat(startDate)}
                max={dateToInputFormat(endDate)}
                onChange={(event, data) => this.dateChanged(event, data.value, "startDate")}
              />
            </Form.Field>
            <Form.Field width={1}>
              <Input
                label={langPack["end_date"]}
                placeholder={langPack["to"]}
                type="date"
                disabled={unlimitedDate}
                value={dateToInputFormat(endDate)}
                min={dateToInputFormat(startDate)}
                onChange={(event, data) => this.dateChanged(event, data.value, "endDate")}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Header>{langPack["budget"]}</Header>
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
                label={langPack["minimum_price"]}
                placeholder={langPack["min"]}
                type="number"
                value={minPrice}
                onChange={(event, data) => this.priceChanged([data.value, maxPrice])}
              />
            </Form.Field>
            <Form.Field width={1}>
              <Input
                label={langPack["maximum_price"]}
                placeholder={langPack["max"]}
                type="number"
                width={3}
                value={maxPrice}
                onChange={(event, data) => this.priceChanged([minPrice, data.value])}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Header>{langPack["additional"]}</Header>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label={langPack["appartments_type"]}
              options={appartmentsTypes[langPack["_locale"] || "ru"]}
              value={apartmentsType}
              width={4}
              onChange={(event, data) => this.optionSelected(data.value, "apartmentsType")}
            />
            <Form.Select
              label={langPack["rent_type"]}
              options={rentTypes[langPack["_locale"] || "ru"]}
              value={rentType}
              width={4}
              onChange={(event, data) => this.optionSelected(data.value, "rentType")}
            />
            <Form.Select
              label={langPack["options"]}
              options={benefits[langPack["_locale"] || "ru"]}
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