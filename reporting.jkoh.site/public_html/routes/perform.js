const express = require('express')
const router = express.Router()
const Perf = require('../models/perform')

router.get('/', async (req, res) => {
    try {
        const perf = await Perf.find()
        res.json(perf)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
});


router.get('/:id', getPerf, async (req, res) => {
    res.json(res.perf)
});


router.post('/', async (req, res) => {

    const perfs = new Perf({
        TimeObject: req.body.TimeObject,
        StartTime: req.body.StartTime,
        EndTime: req.body.EndTime,
        LoadTime: req.body.LoadTime
    })
    try{
        const newPerfs = await perfs.save()
        res.status(201).json(newPerfs)

    } catch(err){
        res.status(400).json({message:err.message})
    }
});


router.put('/:id', getPerf, async(req, res) => {
    if(req.body.TimeObject != null) {res.perf.TimeObject = req.body.TimeObject}
    if(req.body.StartTime != null) {res.perf.StartTime = req.body.StartTime}
    if(req.body.EndTime != null) {res.perf.EndTime = req.body.EndTime}
    if(req.body.LoadTime != null) {res.perf.LoadTime = req.body.LoadTime}
    try {
      const updatedPerf = await res.perf.save()
      res.json(updatedPerf)
    } catch (err){
      res.status(400).json({ message: err.message })
    } 

});


router.delete('/:id', getPerf, async(req, res) => {
    try{
        await res.perf.remove()
        res.json({message: 'Deleted Performance'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

async function getPerf(req, res, next) {
    try {
      perf = await Perf.findById(req.params.id)
      if (perf == null) {
        return res.status(404).json({ message: 'Cant find Performance'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.perf = perf
    next()
  }

module.exports = router