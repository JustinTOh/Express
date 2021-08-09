const express = require('express')
const router = express.Router()
const Active = require('../models/active')

router.get('/', async (req, res) => {
    try {
        const active = await Active.find()
        res.json(active)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
});

router.get('/active', async (req, res) => {
  try {
      const active = await Active.find()
      var newActive = []

      for (var n = 0; n < active.length; n++) {
          var nameP = active[n]['CurrPage']
          if (nameP != "https://reporting.jkoh.site/user/admin-dash" && nameP != "https://reporting.jkoh.site/users" && nameP != "https://reporting.jkoh.site/user/admin-report" &&
              nameP != "https://reporting.jkoh.site/user/user-dash" && nameP != "https://reporting.jkoh.site/user/user-report" && nameP != "https://reporting.jkoh.site/" && nameP != "https://reporting.jkoh.site/user/logout") {
              newActive.push(active[n])

          }
      }

      res.json(newActive)
    
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
});


router.get('/:id', getActive, async (req, res) => {
    res.json(res.active)
});


router.post('/', async (req, res) => {

    const actives = new Active({
        CursorPos: req.body.CursorPos,
        ScrollBar: req.body.ScrollBar,
        KeyD: req.body.KeyD,
        KeyU: req.body.KeyU,
        TotalIdle: req.body.TotalIdle,
        IdleTime: req.body.LoadTime,
        MouseClick: req.body.MouseClick,
        DateEn: req.body.DateEn,
        DateLeft: req.body.DateLeft,
        CurrPage: req.body.CurrPage,
        TimeSpent: req.body.TimeSpent
    })
    try{
        const newActives = await actives.save()
        res.status(201).json(newActives)

    } catch(err){
        res.status(400).json({message:err.message})
    }
});


router.put('/:id', getActive, async(req, res) => {
    if(req.body.CursorPos != null) {res.active.CursorPos = req.body.CursorPos}
    if(req.body.ScrollBar != null) {res.active.ScrollBar = req.body.ScrollBar}
    if(req.body.KeyD != null) {res.active.KeyD = req.body.KeyD}
    if(req.body.KeyU != null) {res.active.KeyU = req.body.KeyU}
    if(req.body.TotalIdle != null) {res.active.TotalIdle = req.body.TotalIdle}
    if(req.body.IdleTime != null) {res.active.IdleTime = req.body.IdleTime}
    if(req.body.MouseClick != null) {res.active.MouseClick = req.body.MouseClick}
    if(req.body.DateEn != null) {res.active.DateEn = req.body.DateEn}
    if(req.body.DateLeft != null) {res.active.DateLeft = req.body.DateLeft}
    if(req.body.CurrPage != null) {res.active.CurrPage = req.body.CurrPage}
    if(req.body.TimeSpent != null) {res.active.TimeSpent = req.body.TimeSpent}
    try {
      const updatedActive = await res.active.save()
      res.json(updatedActive)
    } catch (err){
      res.status(400).json({ message: err.message })
    } 

});


router.delete('/:id', getActive, async(req, res) => {
    try{
        await res.active.remove()
        res.json({message: 'Deleted Active'})
    } catch(err){
        res.status(500).json({message: err.message})
    }
});

async function getActive(req, res, next) {
    try {
      active = await Active.findById(req.params.id)
      if (active == null) {
        return res.status(404).json({ message: 'Cant find Active'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.active = active
    next()
  }

module.exports = router