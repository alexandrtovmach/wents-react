import React from 'react';
import { Form, Button, Icon, Segment } from 'semantic-ui-react';

export default class ChatControls extends React.Component {

  constructor() {
    super();

    this.state = {
      messageText: "",
      messageAttachments: []
    }
  }

  render () {
    return (
      <Form>
        <Form.Field as={Segment} basic>
          <Form.TextArea
            autoHeight
            placeholder='Try adding multiple lines'
            style={{ maxHeight: 200 }}
            maxLength={1000}
          />
        </Form.Field>
        <Form.Field as={Segment} basic floated="right">
          <Icon link name='file' size="large" />
          <Icon link name='smile outline' size="large" />
          <Button
            positive
            content="Send"
          />
        </Form.Field>
      </Form>
    )
  }
}