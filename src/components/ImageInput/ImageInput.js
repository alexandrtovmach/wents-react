import React from "react";
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';

import "./ImageInput.scss";

export default (props) => {
  const uppy = Uppy({
    autoProceed: false
  })

  uppy.on('file-added', (file) => {
    props.onAddedFile && props.onAddedFile(file);
  })

  uppy.on('file-removed', (file) => {
    props.onDroppedFile && props.onDroppedFile(file);
  })

  return (
    <Dashboard
      height={400}
      hideUploadButton={true}
      uppy={uppy}
    />
  )
}