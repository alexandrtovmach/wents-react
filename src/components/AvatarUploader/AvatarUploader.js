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
    this.onCancel = this.onCancel.bind(this)
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
  
  
  onCancel() {
    const { onCancel } = this.props;
    onCancel && onCancel();
  }
  
  onSave() {
    const { preview } = this.state;
    this.setState({
      loading: true
    })
    if (preview) {
      uploadImage("avatar", "custom", preview.replace("data:image/png;base64,", ""), "png")
        .then(url => {
          const { onChange } = this.props;
          onChange && onChange(url);
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
          color="red"
          className="margin-1"
          onClick={this.onCancel}
        >
          Cancel
        </Button>
        <Button
          primary
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