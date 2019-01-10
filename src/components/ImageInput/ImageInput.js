import React from "react";
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';

import "./ImageInput.scss";

export default ({ onAddedFile, onRemovedFile }) => {
  const uppy = Uppy({
    autoProceed: false
  })

  uppy.on('file-added', (file) => {
    onAddedFile && onAddedFile(file);
  })

  uppy.on('file-removed', (file) => {
    onRemovedFile && onRemovedFile(file);
  })

  return (
    <Dashboard
      height={400}
      hideUploadButton={true}
      uppy={uppy}
    />
  )
}