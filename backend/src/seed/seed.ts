import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Lot } from "../models/Lot";
import { Warehouse } from "../models/Warehouse";
import { Distributor } from "../models/Distributor";
import { Retailer } from "../models/Retailer";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/foodflow";

const farmersData = [
  { customId: "FRM-001", name: "Ravi Kumar", email: "ravi@farmers.com", password: "password123", role: "farmer", location: "Kolar", linkedPartnerIds: ["WH-001"] },
  { customId: "FRM-002", name: "Suresh Gowda", email: "suresh@farmers.com", password: "password123", role: "farmer", location: "Tumkur", linkedPartnerIds: ["WH-001"] },
  { customId: "FRM-003", name: "Manjunath Reddy", email: "manjunath@farmers.com", password: "password123", role: "farmer", location: "Hassan", linkedPartnerIds: ["WH-002"] },
  { customId: "FRM-004", name: "Prakash Naik", email: "prakash@farmers.com", password: "password123", role: "farmer", location: "Ramanagara", linkedPartnerIds: ["WH-001"] },
  { customId: "FRM-005", name: "Venkatesh Rao", email: "venkatesh@farmers.com", password: "password123", role: "farmer", location: "Chikballapur", linkedPartnerIds: ["WH-001"] },
];

const warehousesData = [
  { customId: "WH-001", name: "Bangalore North WH", location: "Hebbal", area: "Yelahanka", city: "Bangalore", lat: 13.0358, lng: 77.5970, capacity: 50, linkedFarmerIds: ["FRM-001", "FRM-002", "FRM-004", "FRM-005"], linkedDistributorIds: ["DSB-001", "DSB-002"] },
  { customId: "WH-002", name: "Mysore Central WH", location: "Nazarbad", area: "Mysore", city: "Mysore", lat: 12.3052, lng: 76.6552, capacity: 35, linkedFarmerIds: ["FRM-003"], linkedDistributorIds: ["DSB-001"] },
  { customId: "WH-003", name: "Hubli Depot", location: "Gokul Road", area: "Hubli", city: "Hubli", lat: 15.3647, lng: 75.1240, capacity: 28, linkedFarmerIds: [], linkedDistributorIds: ["DSB-003"] },
  { customId: "WH-004", name: "Mangalore Hub", location: "Kadri", area: "Mangalore", city: "Mangalore", lat: 12.8654, lng: 74.8426, capacity: 22, linkedFarmerIds: [], linkedDistributorIds: ["DSB-003"] },
];

const distributorsData = [
  { customId: "DSB-001", name: "Rajesh Kumar", companyName: "FreshRoute Logistics", location: "Yeshwanthpur", area: "Bangalore", city: "Bangalore", lat: 13.0213, lng: 77.5550, linkedWarehouseIds: ["WH-001", "WH-002"], linkedRetailerIds: ["RET-001", "RET-002", "RET-005"], fillRate: 94, contactPerson: "Rajesh Kumar", contactPhone: "+91 9876511111" },
  { customId: "DSB-002", name: "Mahesh Patel", companyName: "AgroMove Pvt Ltd", location: "Electronic City", area: "Bangalore", city: "Bangalore", lat: 12.8399, lng: 77.6770, linkedWarehouseIds: ["WH-001"], linkedRetailerIds: ["RET-003", "RET-004"], fillRate: 89, contactPerson: "Mahesh Patel", contactPhone: "+91 9876522222" },
  { customId: "DSB-003", name: "Kiran Gowda", companyName: "Karnataka Cold Chain", location: "Peenya", area: "Bangalore", city: "Bangalore", lat: 13.0283, lng: 77.5180, linkedWarehouseIds: ["WH-001", "WH-003"], linkedRetailerIds: ["RET-006", "RET-007", "RET-008"], fillRate: 91, contactPerson: "Kiran Gowda", contactPhone: "+91 9876533333" },
];

const retailersData = [
  { customId: "RET-001", storeName: "FreshMart Koramangala", ownerName: "Priya Sharma", location: "Koramangala", area: "Bangalore", city: "Bangalore", lat: 12.9352, lng: 77.6245, linkedDistributorId: "DSB-001", salesVelocity: 120, contactPhone: "+91 9876611111" },
  { customId: "RET-002", storeName: "GreenBasket Indiranagar", ownerName: "Madhav Nair", location: "Indiranagar", area: "Bangalore", city: "Bangalore", lat: 12.9784, lng: 77.6408, linkedDistributorId: "DSB-001", salesVelocity: 95, contactPhone: "+91 9876622222" },
  { customId: "RET-003", storeName: "DailyFresh Whitefield", ownerName: "Anita Rao", location: "Whitefield", area: "Bangalore", city: "Bangalore", lat: 12.9698, lng: 77.7499, linkedDistributorId: "DSB-001", salesVelocity: 80, contactPhone: "+91 9876633333" },
  { customId: "RET-004", storeName: "NatureFoods JP Nagar", ownerName: "Vijay Kumar", location: "JP Nagar", area: "Bangalore", city: "Bangalore", lat: 12.9254, lng: 77.5855, linkedDistributorId: "DSB-002", salesVelocity: 110, contactPhone: "+91 9876644444" },
  { customId: "RET-005", storeName: "OrganicHub Jayanagar", ownerName: "Lakshmi Devi", location: "Jayanagar", area: "Bangalore", city: "Bangalore", lat: 12.9150, lng: 77.5835, linkedDistributorId: "DSB-002", salesVelocity: 75, contactPhone: "+91 9876655555" },
  { customId: "RET-006", storeName: "FreshStop HSR Layout", ownerName: "Suresh Reddy", location: "HSR Layout", area: "Bangalore", city: "Bangalore", lat: 12.9121, lng: 77.6446, linkedDistributorId: "DSB-003", salesVelocity: 90, contactPhone: "+91 9876666666" },
  { customId: "RET-007", storeName: "QuickMart Marathahalli", ownerName: "Geeta Iyer", location: "Marathahalli", area: "Bangalore", city: "Bangalore", lat: 12.9595, lng: 77.7014, linkedDistributorId: "DSB-003", salesVelocity: 85, contactPhone: "+91 9876677777" },
  { customId: "RET-008", storeName: "GoodHarvest Banashankari", ownerName: "Rajendra Prasad", location: "Banashankari", area: "Bangalore", city: "Bangalore", lat: 12.9252, lng: 77.5457, linkedDistributorId: "DSB-003", salesVelocity: 100, contactPhone: "+91 9876688888" },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Lot.deleteMany({});
    await Warehouse.deleteMany({});
    await Distributor.deleteMany({});
    await Retailer.deleteMany({});

    // Create docs without links first to get their ObjectIds
    const createdUsers = await User.create(farmersData.map(f => ({ ...f, linkedPartners: [] })));
    const createdWarehouses = await Warehouse.create(warehousesData.map(w => ({ ...w, linkedFarmers: [], linkedDistributors: [], status: "active" })));
    const createdDistributors = await Distributor.create(distributorsData.map(d => ({ ...d, linkedWarehouses: [], linkedRetailers: [], status: "active", activeShipments: Math.floor(Math.random() * 10) })));

    const idMap: Record<string, mongoose.Types.ObjectId> = {};
    createdUsers.forEach(u => idMap[u.customId] = u._id as mongoose.Types.ObjectId);
    createdWarehouses.forEach(w => idMap[w.customId] = w._id as mongoose.Types.ObjectId);
    createdDistributors.forEach(d => idMap[d.customId] = d._id as mongoose.Types.ObjectId);

    // Create retailers with correct dist id
    const createdRetailers = await Retailer.create(retailersData.map(r => ({
      ...r,
      linkedDistributor: idMap[r.linkedDistributorId],
      status: "active"
    })));
    createdRetailers.forEach(r => idMap[r.customId] = r._id as mongoose.Types.ObjectId);

    // Update users with correct links
    for (const f of farmersData) {
      if (f.linkedPartnerIds.length > 0) {
        await User.updateOne({ customId: f.customId }, { $set: { linkedPartners: f.linkedPartnerIds.map(id => idMap[id]) } });
      }
    }

    // Update warehouses
    for (const w of warehousesData) {
      await Warehouse.updateOne({ customId: w.customId }, {
        $set: {
          linkedFarmers: w.linkedFarmerIds.map(id => idMap[id]),
          linkedDistributors: w.linkedDistributorIds.map(id => idMap[id])
        }
      });
    }

    // Update distributors
    for (const d of distributorsData) {
      await Distributor.updateOne({ customId: d.customId }, {
        $set: {
          linkedWarehouses: d.linkedWarehouseIds.map(id => idMap[id]),
          linkedRetailers: d.linkedRetailerIds.map(id => idMap[id])
        }
      });
    }

    const lotData = [
      { product: "Tomato", category: "Vegetables", qty: 3.2, unit: "tons", farmerId: "FRM-001", warehouseId: "WH-001", distributorId: "DSB-001", retailerId: "RET-001", daysAgo: 2 },
      { product: "Onion", category: "Vegetables", qty: 2.5, unit: "tons", farmerId: "FRM-001", warehouseId: "WH-001", distributorId: "DSB-001", retailerId: "RET-002", daysAgo: 3 },
      { product: "Capsicum", category: "Vegetables", qty: 1.5, unit: "tons", farmerId: "FRM-002", warehouseId: "WH-001", distributorId: "DSB-002", retailerId: "RET-003", daysAgo: 4 },
      { product: "Coriander", category: "Vegetables", qty: 0.3, unit: "tons", farmerId: "FRM-002", warehouseId: "WH-001", distributorId: "DSB-001", retailerId: "RET-001", daysAgo: 2 },
      { product: "Mango", category: "Fruits", qty: 5.0, unit: "tons", farmerId: "FRM-003", warehouseId: "WH-002", distributorId: "DSB-001", retailerId: "RET-005", daysAgo: 5 },
      { product: "Banana", category: "Fruits", qty: 3.0, unit: "tons", farmerId: "FRM-003", warehouseId: "WH-002", distributorId: "DSB-003", retailerId: "RET-006", daysAgo: 3 },
      { product: "Potato", category: "Vegetables", qty: 4.0, unit: "tons", farmerId: "FRM-004", warehouseId: "WH-001", distributorId: "DSB-001", retailerId: "RET-002", daysAgo: 5 },
      { product: "Carrot", category: "Vegetables", qty: 1.2, unit: "tons", farmerId: "FRM-004", warehouseId: "WH-001", distributorId: "DSB-003", retailerId: "RET-007", daysAgo: 4 },
    ];

    const lots = lotData.map((ld, i) => {
      const harvestDate = new Date();
      harvestDate.setDate(harvestDate.getDate() - ld.daysAgo);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + (7 - ld.daysAgo));
      return {
        lotId: `LOT-2024-00${i + 1}`,
        productName: ld.product,
        category: ld.category,
        qty: ld.qty,
        unit: ld.unit,
        farmerId: idMap[ld.farmerId],
        warehouseId: idMap[ld.warehouseId],
        distributorId: idMap[ld.distributorId],
        retailerId: idMap[ld.retailerId],
        harvestDate,
        expiryDate,
        freshnessAge: ld.daysAgo,
        status: ld.daysAgo > 4 ? "in-warehouse" : "harvested",
        freshnessStatus: ld.daysAgo > 4 ? "at-risk" : "fresh",
        coldChainHealth: 95 + Math.random() * 5,
        price: ld.qty * (ld.product === "Tomato" ? 2400 : ld.product === "Mango" ? 4000 : 1500),
        pricePerUnit: ld.product === "Tomato" ? 2400 : ld.product === "Mango" ? 4000 : 1500
      };
    });

    await Lot.create(lots);

    console.log("✅ Seed data created!");
    console.log(`Users: ${await User.countDocuments()}`);
    console.log(`Lots: ${await Lot.countDocuments()}`);
    console.log(`Warehouses: ${await Warehouse.countDocuments()}`);
    console.log(`Distributors: ${await Distributor.countDocuments()}`);
    console.log(`Retailers: ${await Retailer.countDocuments()}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();