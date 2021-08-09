const mongoose = require('mongoose')

const activeSchema = new mongoose.Schema({
    
    CursorPos: [{
          x: Number,
          y: Number
      }],
      ScrollBar: [Number],
      KeyD: [String],
      KeyU: [String],
      TotalIdle:[Number],
      IdleTime: [Date],
      MouseClick: [String],
      DateEn: Date,
      DateLeft: Date,
      //added
      CurrPage: String,
      TimeSpent: Number
  })

  module.exports = mongoose.model('active', activeSchema)