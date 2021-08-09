const mongoose = require('mongoose')

const staticSchema = new mongoose.Schema({
    
    Agent_string: {
        type: String,
        required: true
      },
      Language: {
        type: String,
        required: true
      },
      CookiesEn: {
        type: Boolean,
        required: true
      },
      JSEn: {
        type: String,
        required: true
      },
      ImagesEn: {
        type: Boolean,
        required: true
      },
      CSSEn: {
        type: Boolean,
        required: true
      },
      ScreenW: {
        type: Number,
        required: true
      },
      ScreenH: {
        type: Number,
        required: true
      },
      WindowW: {
        type: Number,
        required: true
      },
      WindowH: {
        type: Number,
        required: true
      },
              
    Connection_Type: {
      type: String,
      required: true
    }
  })

  module.exports = mongoose.model('static', staticSchema)