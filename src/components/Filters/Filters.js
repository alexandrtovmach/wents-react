import React from 'react';
import { Segment, Form, Input } from "semantic-ui-react";
import { Slider } from 'react-semantic-ui-range'

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

export default () => {
  return (
    <Segment padded>
      <Form>
        <Form.Group>
          <Form.Input label="Minimal price" placeholder='Min' type="number" width={2} />
          <Form.Input label="Maximum price" placeholder='Max' type="number" width={2} />
        </Form.Group>
        <Form.Group>
          <Form.Input label="Start date" placeholder='From' width={2} type="date" />
          <Form.Input label="End date" placeholder='To' width={2} type="date" />
          {/* <Form.Checkbox label="Unlimited" toggle /> */}
        </Form.Group>
        <Form.Group>
          <Form.Select label="Apartments type" options={appartmentsTypes} defaultValue="room" width={4} />
          <Form.Select label="Rent type" options={rentTypes} defaultValue="short" width={4} />
          <Form.Select label="Options" options={benefits} multiple defaultValue={["wifi", "bath"]} width={8} />
        </Form.Group>
      </Form>
    </Segment>
  );
}