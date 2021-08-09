const express = require('express')
const router = express.Router()
const Static = require('../models/static')


router.get('/', async (req, res) => {
    try {
        const statics = await Static.find()
        res.json(statics)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
});


router.get('/:id', getStatic, async (req, res) => {
    res.json(res.static)
});


router.post('/', async (req, res) => {
    const statics = new Static({
        Agent_string: req.body.Agent_string,
        Language: req.body.Language,
        CookiesEn: req.body.CookiesEn,
        JSEn: req.body.JSEn,
        ImagesEn: req.body.ImagesEn,
        CSSEn: req.body.CSSEn,
        ScreenW: req.body.ScreenW,
        ScreenH: req.body.ScreenH,
        WindowW: req.body.WindowW,
        WindowH: req.body.WindowH,
        Connection_Type: req.body.Connection_Type
    })
    try{
        const newStatics = await statics.save()
        res.status(201).json(newStatics)

    } catch(err){
        res.status(400).json({message:err.message})
    }
});


router.put('/:id',getStatic, async(req, res) => {
    if(req.body.Agent_string != null) {res.static.Agent_string = req.body.Agent_string}
    if(req.body.Language != null) {res.static.Language = req.body.Language}
    if(req.body.CookiesEn != null) {res.static.CookiesEn = req.body.CookiesEn}
    if(req.body.JSEn != null) {res.static.JSEn = req.body.JSEn}
    if(req.body.ImagesEn != null) {res.static.ImagesEn = req.body.ImagesEn}
    if(req.body.CSSEn != null) {res.static.CSSEn = req.body.CSSEn }
    if(req.body.ScreenW != null) {res.static.ScreenW = req.body.ScreenW }
    if(req.body.ScreenH != null) {res.static.ScreenH = req.body.ScreenH}
    if(req.body.WindowW != null) {res.static.WindowW = req.body.WindowW}
    if(req.body.WindowH != null) {res.static.WindowH = req.body.WindowH}
    if(req.body.Connection_Type != null) {res.static.Connection_Type = req.body.Connection_Type}
    try {
      const updatedStatic = await res.static.save()
      res.json(updatedStatic)
    } catch(err) {
      res.status(400).json({ message: err.message })
    } 
});


router.delete('/:id', getStatic, async(req, res) => {
    try{
        await res.static.remove()
        res.json({message: 'Deleted static '})
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

async function getStatic(req, res, next) {
    try {
      static = await Static.findById(req.params.id)
      if (static == null) {
        return res.status(404).json({ message: 'Cant find static'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.static = static
    next()
  }


module.exports = router