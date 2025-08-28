 const express = require('express');
 const router= express.Router();
 const CarBrand= require('../models/CarBrand');

 router.get('/', async(req, res)=>{
 try{
  const carBrand= await CarBrand.find().sort({name:1})
  res.json(carBrand);
 }catch(error){
 res.status(500).json(({message:'Error fetching in Car Brand'}))
 }
 }
 )
 module.exports= router;
