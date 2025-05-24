// src/context/SaveContext.js
import React from 'react'

const SaveContext = React.createContext({
  savedVideos: [],
  toggleSaveVideo: () => {},
})

export default SaveContext
