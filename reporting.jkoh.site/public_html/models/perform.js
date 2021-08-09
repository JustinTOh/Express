const mongoose = require('mongoose')

const perfSchema = new mongoose.Schema({
  
  TimeObject: {
    type: Object,
    required: true
  },
  StartTime: {
    type: Number,
    required: true
  },
  EndTime: {
    type: Number,
    required: true
  },
  LoadTime: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('perf', perfSchema)