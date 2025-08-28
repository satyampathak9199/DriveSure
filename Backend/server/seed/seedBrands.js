require("dotenv").config({path:'../.env'});  
const connectDB = require('../config/db');
const CarBrand = require('../models/CarBrand');

const carBrands = [
  {
    name: "Maruti Suzuki",
    models: [
      { name: "Alto", type: "Hatchback" },
      { name: "Swift", type: "Hatchback" },
      { name: "Baleno", type: "Hatchback" },
      { name: "Wagon R", type: "Hatchback" },
      { name: "Dzire", type: "Sedan" },
      { name: "Ertiga", type: "MPV" },
      { name: "Celerio", type: "Hatchback" }
    ]
  },
  {
    name: "Hyundai",
    models: [
      { name: "i10", type: "Hatchback" },
      { name: "i20", type: "Hatchback" },
      { name: "Verna", type: "Sedan" },
      { name: "Creta", type: "SUV" },
      { name: "Venue", type: "SUV" }
    ]
  },
  {
    name: "Honda",
    models: [
      { name: "City", type: "Sedan" },
      { name: "Amaze", type: "Sedan" },
      { name: "Jazz", type: "Hatchback" },
      { name: "WR-V", type: "SUV" }
    ]
  },
  {
    name: "Toyota",
    models: [
      { name: "Innova Crysta", type: "MPV" },
      { name: "Fortuner", type: "SUV" },
      { name: "Glanza", type: "Hatchback" },
      { name: "Camry", type: "Sedan" }
    ]
  }
];

(async ()=>{
  try{
    await connectDB();
    await CarBrand.deleteMany(); // delete everything which is coming from frontend
    await CarBrand.insertMany(carBrands);
    console.log(" Car Brands seed successfully");
   process.exit(0)
  }
  catch(error){
 console.log(" Error seed car brands:", error);
 process.exit(1);
  }
})();