import React from 'react';
import Avatar from 'react-avatar-edit';
import {
  Segment,
  Image,
  Button
} from 'semantic-ui-react';

import { uploadImage } from '../../services/storage';
import './AvatarUploader.scss';

export default class AvatarUploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      preview: null
    }
    this.onCrop = this.onCrop.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  
  onClose() {
    this.setState({
      preview: null
    })
  }
  
  onCrop(preview) {
    this.setState({
      preview
    })
  }
  
  onSave() {
    const { preview } = this.state;
    if (preview) {
      uploadImage("avatar", "custom", preview.replace("data:image/png;base64,", ""), "png")
        .then(snap => {
          console.log(snap);
        })
    }
  }
  
  render () {
    const { preview, loading } = this.state;
    const { src } = this.props;
    return (
      <Segment
        basic
        textAlign="center"
        className="avatar-container"
      >
        <Avatar
          height={200}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={src}
        />
        {
          preview &&
          <Image
            centered
            src={preview}
            size="small"
            className="margin-v-1"
            alt="Preview"
          />
        }
        <Button
          disabled={!preview}
          loading={loading}
          className="margin-1"
          onClick={this.onSave}
        >
          Save
        </Button>
      </Segment>
    )
  }
}