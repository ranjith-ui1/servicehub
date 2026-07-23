// Populates the database with sample service listings so the app has
// something to show right after setup. Run with: node seed.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Service from "./models/Service.js";

dotenv.config();

const sampleServices = [
  { provider: "Anand", service: "Electrician", city: "Mangalagiri", price: 500, rating: 4.8, experience: "5 Years", phone: "9876543210", status: "Available" },
  { provider: "Ramesh", service: "Electrician", city: "Vijayawada", price: 450, rating: 4.6, experience: "4 Years", phone: "9876543220", status: "Available" },
  { provider: "Kishore", service: "Plumber", city: "Vijayawada", price: 400, rating: 4.7, experience: "4 Years", phone: "9876543211", status: "Available" },
  { provider: "Mahesh", service: "Painter", city: "Amaravathi", price: 650, rating: 4.6, experience: "6 Years", phone: "9876543212", status: "Busy" },
  { provider: "Sai", service: "Carpenter", city: "Vizag", price: 700, rating: 4.9, experience: "8 Years", phone: "9876543213", status: "Available" },
  { provider: "Vijay", service: "Home Cleaning", city: "Nellore", price: 800, rating: 4.8, experience: "3 Years", phone: "9876543214", status: "Available" },
  { provider: "Dinesh", service: "AC Repair", city: "Guntur", price: 900, rating: 4.9, experience: "7 Years", phone: "9876543215", status: "Available" },
  { provider: "Mastan", service: "Tutor", city: "Machilipatnam", price: 600, rating: 4.5, experience: "5 Years", phone: "9876543216", status: "Busy" },
  { provider: "Rahul", service: "Computer Repair", city: "Kurnool", price: 750, rating: 4.8, experience: "4 Years", phone: "9876543217", status: "Available" },
];

const run = async () => {
  await connectDB();
  await Service.deleteMany({});
  await Service.insertMany(sampleServices);
  console.log(`Seeded ${sampleServices.length} services.`);
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
