// require("dotenv").config({path:'../.env'}); 
// const connectDB = require ('../config/db');
// const CarType= require('../models/CarType')

// const carTypes = [
//   { name: "hatchback" },
//   { name: "sedan" },
//   { name: "suv" },
//   { name: "muv" },
//   { name: "coupe" },
//   { name: "convertible" },
//   { name: "pickup" },
//   { name: "van" },
//   { name: "crossover" },
//   { name: "electric" },
//   { name: "luxury" }
// ];


// (async()=>{
//   try{
//     await connectDB();
//     const count = await CarType.countDocuments();
//     if(count===0){
//       await CarType.insertMany(carTypes);
//       console.log("Car Types seeded successfully");
//     } else{
//       console.log("Car Types already exist, skipping seeding");
//     }
//     process.exit(0);
//   }catch (error){
//     console.log(" Error seeding car types", error)
//     process.exit(1);
//   }
// })();



// await CarType.deleteMany();   //  deletes everything
// await CarType.insertMany(carTypes);  // re-inserts defaults
//  This means every time you run it, all frontend-added car types will be wiped out.
