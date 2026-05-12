export type Role = "farmer" | "warehouse" | "distributor" | "retailer" | "admin";

export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  city: string;
  status: "active" | "inactive";
  linkedWarehouseId: string;
  crops: string[];
  totalAcres: number;
  joinedDate: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  city: string;
  status: "active" | "inactive";
  capacity: number;
  currentUtilization: number;
  linkedFarmerIds: string[];
  linkedDistributorIds: string[];
  coldStorageCapacity: number;
  temperatureControlled: boolean;
  hubType: "primary" | "secondary" | "cross-dock";
}

export interface Distributor {
  id: string;
  name: string;
  companyName: string;
  location: string;
  city: string;
  status: "active" | "inactive";
  linkedWarehouseIds: string[];
  linkedRetailerIds: string[];
  fleetSize: number;
  routes: string[];
  onTimeDeliveryRate: number;
}

export interface Retailer {
  id: string;
  name: string;
  storeName: string;
  location: string;
  city: string;
  status: "active" | "inactive";
  linkedDistributorId: string;
  productCategories: string[];
  storeSize: "small" | "medium" | "large";
  dailyFootfall: number;
}

export interface Batch {
  id: string;
  farmerId: string;
  crop: string;
  quantity: number;
  unit: "tons" | "kg";
  harvestDate: string;
  expiryDate: string;
  status: "harvested" | "in-transit" | "warehoused" | "delivered" | "spoiled";
  warehouseId: string | null;
  pricePerUnit: number;
  qualityGrade: "A" | "B" | "C";
}

export interface Shipment {
  id: string;
  warehouseId: string;
  distributorId: string;
  retailerId: string;
  batchIds: string[];
  status: "scheduled" | "in-transit" | "delivered" | "delayed";
  dispatchDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate: string | null;
  fillRate: number;
  route: string;
}

export interface AnalyticsRecord {
  id: string;
  role: Role;
  period: string;
  wasteRate?: number;
  priceReceived?: number;
  marketPrice?: number;
  earnings?: number;
  harvestPerformance?: number;
  wasteCost?: number;
  inventoryTurnover?: number;
  agingBreakdown?: Record<string, number>;
  spoilageTimeline?: Record<string, number>;
  fillRate?: number;
  deliveryPerformance?: number;
  routeEfficiency?: number;
  supplierReliability?: number;
  salesVelocity?: Record<string, number>;
  markdownImpact?: number;
  demandStockGap?: Record<string, number>;
  customerReturnRate?: number;
  platformWasteCost?: number;
  regionalDemand?: Record<string, number>;
  forecastAccuracy?: number;
}

export interface AccountActivity {
  id: string;
  role: Role;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

// SEED DATA

export const farmers: Farmer[] = [
  { id: "FRM-001", name: "Shivu Gowda", farmName: "Green Valley Farms", location: "Devanahalli", city: "Bangalore", status: "active", linkedWarehouseId: "WH-001", crops: ["Tomato", "Onion", "Potato", "Carrot"], totalAcres: 25, joinedDate: "2024-03-15" },
  { id: "FRM-002", name: "Mahendra Reddy", farmName: "Reddy Agro Farms", location: "Tumkur Road", city: "Bangalore", status: "active", linkedWarehouseId: "WH-001", crops: ["Tomato", "Capsicum", "Beans"], totalAcres: 18, joinedDate: "2024-01-20" },
  { id: "FRM-003", name: "Kumaraswamy", farmName: "Hassan Orchard Farms", location: "Hassan", city: "Hassan", status: "active", linkedWarehouseId: "WH-002", crops: ["Mango", "Banana", "Papaya"], totalAcres: 40, joinedDate: "2023-11-10" },
  { id: "FRM-004", name: "Nagaraj", farmName: "Mysore Valley Growers", location: "Mysore Road", city: "Mysore", status: "active", linkedWarehouseId: "WH-003", crops: ["Onion", "Potato", "Garlic", "Chilli"], totalAcres: 30, joinedDate: "2024-02-05" },
  { id: "FRM-005", name: "Gurudev", farmName: "Kolar Green Fields", location: "Kolar Gold Fields", city: "Kolar", status: "active", linkedWarehouseId: "WH-001", crops: ["Tomato", "Beans", "Cauliflower"], totalAcres: 15, joinedDate: "2024-04-01" },
  { id: "FRM-006", name: "Chikkappa", farmName: "Chikballapur Fresh Farms", location: "Chikballapur", city: "Chikballapur", status: "inactive", linkedWarehouseId: "WH-001", crops: ["Tomato", "Potato"], totalAcres: 12, joinedDate: "2023-08-15" },
];

export const warehouses: Warehouse[] = [
  { id: "WH-001", name: "Bangalore North Hub", location: "Yelahanka", city: "Bangalore", status: "active", capacity: 5000, currentUtilization: 72, linkedFarmerIds: ["FRM-001", "FRM-002", "FRM-005", "FRM-006"], linkedDistributorIds: ["DSB-001", "DSB-002"], coldStorageCapacity: 2000, temperatureControlled: true, hubType: "primary" },
  { id: "WH-002", name: "Hassan Cold Storage", location: "Hassan", city: "Hassan", status: "active", capacity: 3000, currentUtilization: 58, linkedFarmerIds: ["FRM-003"], linkedDistributorIds: ["DSB-001", "DSB-003"], coldStorageCapacity: 1500, temperatureControlled: true, hubType: "secondary" },
  { id: "WH-003", name: "Mysore Distribution Center", location: "Mysore", city: "Mysore", status: "active", capacity: 2500, currentUtilization: 45, linkedFarmerIds: ["FRM-004"], linkedDistributorIds: ["DSB-003"], coldStorageCapacity: 800, temperatureControlled: true, hubType: "secondary" },
  { id: "WH-004", name: "Mumbai Cold Hub", location: "Andheri East", city: "Mumbai", status: "active", capacity: 8000, currentUtilization: 85, linkedFarmerIds: [], linkedDistributorIds: ["DSB-002", "DSB-004"], coldStorageCapacity: 4000, temperatureControlled: true, hubType: "primary" },
  { id: "WH-005", name: "Hyderabad East Facility", location: "Gachibowli", city: "Hyderabad", status: "active", capacity: 4500, currentUtilization: 62, linkedFarmerIds: [], linkedDistributorIds: ["DSB-005"], coldStorageCapacity: 1800, temperatureControlled: true, hubType: "primary" },
  { id: "WH-006", name: "Chennai Cross Dock", location: "Perungalathur", city: "Chennai", status: "active", capacity: 2000, currentUtilization: 38, linkedFarmerIds: [], linkedDistributorIds: ["DSB-003", "DSB-004"], coldStorageCapacity: 500, temperatureControlled: true, hubType: "cross-dock" },
];

export const distributors: Distributor[] = [
  { id: "DSB-001", name: "Rajesh Kumar", companyName: "FreshRoute Logistics", location: "Bangalore", city: "Bangalore", status: "active", linkedWarehouseIds: ["WH-001", "WH-002"], linkedRetailerIds: ["RET-001", "RET-002", "RET-005"], fleetSize: 25, routes: ["Route BLR-1", "Route BLR-2", "Route HAS-1"], onTimeDeliveryRate: 94.5 },
  { id: "DSB-002", name: "Suresh Babu", companyName: "SwiftCold Transport", location: "Bangalore", city: "Bangalore", status: "active", linkedWarehouseIds: ["WH-001", "WH-004"], linkedRetailerIds: ["RET-003", "RET-004"], fleetSize: 18, routes: ["Route MUM-1", "Route BLR-3"], onTimeDeliveryRate: 89.2 },
  { id: "DSB-003", name: "Prakash Gowda", companyName: "SouthConnect Distributors", location: "Mysore", city: "Mysore", status: "active", linkedWarehouseIds: ["WH-002", "WH-003", "WH-006"], linkedRetailerIds: ["RET-005", "RET-006", "RET-007"], fleetSize: 32, routes: ["Route MYS-1", "Route CHN-1", "Route HAS-2"], onTimeDeliveryRate: 91.8 },
  { id: "DSB-004", name: "Vijay Malhotra", companyName: "Metro Fresh Carriers", location: "Mumbai", city: "Mumbai", status: "active", linkedWarehouseIds: ["WH-004", "WH-006"], linkedRetailerIds: ["RET-003", "RET-008", "RET-009"], fleetSize: 40, routes: ["Route MUM-2", "Route CHN-2"], onTimeDeliveryRate: 87.5 },
  { id: "DSB-005", name: "Anil Kumar", companyName: "Deccan Express", location: "Hyderabad", city: "Hyderabad", status: "active", linkedWarehouseIds: ["WH-005"], linkedRetailerIds: ["RET-010", "RET-011"], fleetSize: 15, routes: ["Route HYD-1"], onTimeDeliveryRate: 93.0 },
];

export const retailers: Retailer[] = [
  { id: "RET-001", name: "Ravi Sharma", storeName: "FreshMart Indiranagar", location: "Indiranagar", city: "Bangalore", status: "active", linkedDistributorId: "DSB-001", productCategories: ["Vegetables", "Fruits", "Dairy"], storeSize: "large", dailyFootfall: 1200 },
  { id: "RET-002", name: "Priya Devi", storeName: "DailyNeeds Whitefield", location: "Whitefield", city: "Bangalore", status: "active", linkedDistributorId: "DSB-001", productCategories: ["Vegetables", "Fruits", "Grains", "Dairy"], storeSize: "medium", dailyFootfall: 650 },
  { id: "RET-003", name: "Akash Shah", storeName: "QuickShop Andheri", location: "Andheri", city: "Mumbai", status: "active", linkedDistributorId: "DSB-002", productCategories: ["Vegetables", "Fruits", "Dairy", "Frozen"], storeSize: "large", dailyFootfall: 1500 },
  { id: "RET-004", name: "Meera Nair", storeName: "FreshCorner Malad", location: "Malad", city: "Mumbai", status: "active", linkedDistributorId: "DSB-002", productCategories: ["Vegetables", "Fruits"], storeSize: "small", dailyFootfall: 400 },
  { id: "RET-005", name: "Madhukar", storeName: "Kamat Stores", location: "Hassan", city: "Hassan", status: "active", linkedDistributorId: "DSB-001", productCategories: ["Vegetables", "Fruits", "Grains"], storeSize: "medium", dailyFootfall: 500 },
  { id: "RET-006", name: "Lakshmi", storeName: "Mysore Fresh Depot", location: "Mysore", city: "Mysore", status: "active", linkedDistributorId: "DSB-003", productCategories: ["Vegetables", "Fruits", "Dairy"], storeSize: "medium", dailyFootfall: 600 },
  { id: "RET-007", name: "Saravana Kumar", storeName: "Chennai Fresh Mart", location: "T Nagar", city: "Chennai", status: "active", linkedDistributorId: "DSB-003", productCategories: ["Vegetables", "Fruits", "Dairy", "Beverages"], storeSize: "large", dailyFootfall: 1800 },
  { id: "RET-008", name: "Deepak Patil", storeName: "Mumbai Grocers", location: "Bandra", city: "Mumbai", status: "active", linkedDistributorId: "DSB-004", productCategories: ["Vegetables", "Fruits", "Grains"], storeSize: "medium", dailyFootfall: 800 },
  { id: "RET-009", name: "Anjali Reddy", storeName: "Subbu Supermart", location: "Powai", city: "Mumbai", status: "active", linkedDistributorId: "DSB-004", productCategories: ["Vegetables", "Fruits", "Dairy", "Packaged"], storeSize: "small", dailyFootfall: 350 },
  { id: "RET-010", name: "Srinivas Rao", storeName: "Gachibowli Mart", location: "Gachibowli", city: "Hyderabad", status: "active", linkedDistributorId: "DSB-005", productCategories: ["Vegetables", "Fruits", "Dairy"], storeSize: "medium", dailyFootfall: 550 },
  { id: "RET-011", name: "Kavita Singh", storeName: "Madhapur Daily Needs", location: "Madhapur", city: "Hyderabad", status: "active", linkedDistributorId: "DSB-005", productCategories: ["Vegetables", "Fruits", "Grains", "Dairy"], storeSize: "large", dailyFootfall: 900 },
];

export const batches: Batch[] = [
  { id: "BATCH-001", farmerId: "FRM-001", crop: "Tomato", quantity: 3.2, unit: "tons", harvestDate: "2026-05-10", expiryDate: "2026-05-14", status: "warehoused", warehouseId: "WH-001", pricePerUnit: 2400, qualityGrade: "A" },
  { id: "BATCH-002", farmerId: "FRM-001", crop: "Onion", quantity: 2.5, unit: "tons", harvestDate: "2026-05-08", expiryDate: "2026-05-20", status: "warehoused", warehouseId: "WH-001", pricePerUnit: 1800, qualityGrade: "A" },
  { id: "BATCH-003", farmerId: "FRM-001", crop: "Potato", quantity: 4.0, unit: "tons", harvestDate: "2026-05-05", expiryDate: "2026-05-25", status: "delivered", warehouseId: "WH-001", pricePerUnit: 1200, qualityGrade: "A" },
  { id: "BATCH-004", farmerId: "FRM-002", crop: "Tomato", quantity: 2.8, unit: "tons", harvestDate: "2026-05-11", expiryDate: "2026-05-13", status: "harvested", warehouseId: null, pricePerUnit: 2600, qualityGrade: "A" },
  { id: "BATCH-005", farmerId: "FRM-002", crop: "Capsicum", quantity: 1.5, unit: "tons", harvestDate: "2026-05-09", expiryDate: "2026-05-15", status: "in-transit", warehouseId: "WH-001", pricePerUnit: 3200, qualityGrade: "A" },
  { id: "BATCH-006", farmerId: "FRM-003", crop: "Mango", quantity: 5.0, unit: "tons", harvestDate: "2026-05-01", expiryDate: "2026-05-10", status: "spoiled", warehouseId: "WH-002", pricePerUnit: 4500, qualityGrade: "B" },
  { id: "BATCH-007", farmerId: "FRM-003", crop: "Banana", quantity: 3.0, unit: "tons", harvestDate: "2026-05-07", expiryDate: "2026-05-12", status: "warehoused", warehouseId: "WH-002", pricePerUnit: 800, qualityGrade: "A" },
  { id: "BATCH-008", farmerId: "FRM-004", crop: "Onion", quantity: 6.0, unit: "tons", harvestDate: "2026-05-06", expiryDate: "2026-05-25", status: "warehoused", warehouseId: "WH-003", pricePerUnit: 1600, qualityGrade: "A" },
  { id: "BATCH-009", farmerId: "FRM-004", crop: "Potato", quantity: 4.5, unit: "tons", harvestDate: "2026-05-04", expiryDate: "2026-05-20", status: "delivered", warehouseId: "WH-003", pricePerUnit: 1100, qualityGrade: "A" },
  { id: "BATCH-010", farmerId: "FRM-005", crop: "Tomato", quantity: 2.0, unit: "tons", harvestDate: "2026-05-12", expiryDate: "2026-05-14", status: "harvested", warehouseId: null, pricePerUnit: 2800, qualityGrade: "A" },
];

export const shipments: Shipment[] = [
  { id: "SHP-001", warehouseId: "WH-001", distributorId: "DSB-001", retailerId: "RET-001", batchIds: ["BATCH-001", "BATCH-002"], status: "in-transit", dispatchDate: "2026-05-12", expectedDeliveryDate: "2026-05-13", actualDeliveryDate: null, fillRate: 100, route: "Route BLR-1" },
  { id: "SHP-002", warehouseId: "WH-001", distributorId: "DSB-001", retailerId: "RET-002", batchIds: ["BATCH-005"], status: "scheduled", dispatchDate: "2026-05-13", expectedDeliveryDate: "2026-05-14", actualDeliveryDate: null, fillRate: 95, route: "Route BLR-2" },
  { id: "SHP-003", warehouseId: "WH-002", distributorId: "DSB-001", retailerId: "RET-005", batchIds: ["BATCH-007"], status: "delivered", dispatchDate: "2026-05-10", expectedDeliveryDate: "2026-05-11", actualDeliveryDate: "2026-05-11", fillRate: 100, route: "Route HAS-1" },
  { id: "SHP-004", warehouseId: "WH-003", distributorId: "DSB-003", retailerId: "RET-006", batchIds: ["BATCH-008", "BATCH-009"], status: "delivered", dispatchDate: "2026-05-08", expectedDeliveryDate: "2026-05-09", actualDeliveryDate: "2026-05-09", fillRate: 100, route: "Route MYS-1" },
  { id: "SHP-005", warehouseId: "WH-004", distributorId: "DSB-002", retailerId: "RET-003", batchIds: [], status: "delayed", dispatchDate: "2026-05-11", expectedDeliveryDate: "2026-05-12", actualDeliveryDate: null, fillRate: 80, route: "Route MUM-1" },
];

// ANALYTICS SEED DATA

export const farmerAnalytics: Record<string, AnalyticsRecord[]> = {
  farmer: [
    { id: "FA-001", role: "farmer", period: "2026-05", wasteRate: 2.1, priceReceived: 2400, marketPrice: 2600, earnings: 76800, harvestPerformance: 94.5 },
    { id: "FA-002", role: "farmer", period: "2026-04", wasteRate: 3.5, priceReceived: 2200, marketPrice: 2400, earnings: 66000, harvestPerformance: 89.2 },
    { id: "FA-003", role: "farmer", period: "2026-03", wasteRate: 2.8, priceReceived: 2350, marketPrice: 2500, earnings: 70500, harvestPerformance: 91.8 },
  ],
};

export const warehouseAnalytics: Record<string, AnalyticsRecord[]> = {
  warehouse: [
    { id: "WA-001", role: "warehouse", period: "2026-05", wasteCost: 45200, inventoryTurnover: 4.2, agingBreakdown: { "0-3days": 35, "4-7days": 40, "8-14days": 18, "15+days": 7 }, spoilageTimeline: { "Day 1-2": 1.2, "Day 3-5": 3.5, "Day 6-7": 8.2 } },
    { id: "WA-002", role: "warehouse", period: "2026-04", wasteCost: 52100, inventoryTurnover: 3.8, agingBreakdown: { "0-3days": 30, "4-7days": 42, "8-14days": 20, "15+days": 8 }, spoilageTimeline: { "Day 1-2": 1.5, "Day 3-5": 4.2, "Day 6-7": 9.5 } },
  ],
};

export const distributorAnalytics: Record<string, AnalyticsRecord[]> = {
  distributor: [
    { id: "DA-001", role: "distributor", period: "2026-05", fillRate: 94.5, deliveryPerformance: 92.0, routeEfficiency: 88.5, supplierReliability: 96.2 },
    { id: "DA-002", role: "distributor", period: "2026-04", fillRate: 91.2, deliveryPerformance: 88.5, routeEfficiency: 85.0, supplierReliability: 94.8 },
  ],
};

export const retailerAnalytics: Record<string, AnalyticsRecord[]> = {
  retailer: [
    { id: "RA-001", role: "retailer", period: "2026-05", salesVelocity: { "Tomato": 120, "Onion": 85, "Potato": 95, "Mango": 45 }, markdownImpact: 12.5, demandStockGap: { "Tomato": -15, "Onion": 5, "Potato": 0, "Mango": -25 }, customerReturnRate: 2.1 },
    { id: "RA-002", role: "retailer", period: "2026-04", salesVelocity: { "Tomato": 110, "Onion": 80, "Potato": 90, "Mango": 50 }, markdownImpact: 10.2, demandStockGap: { "Tomato": -10, "Onion": 8, "Potato": -5, "Mango": -20 }, customerReturnRate: 2.4 },
  ],
};

export const adminAnalytics: Record<string, AnalyticsRecord[]> = {
  admin: [
    { id: "AA-001", role: "admin", period: "2026-05", platformWasteCost: 234500, regionalDemand: { "Bangalore": 82, "Mumbai": 74, "Hyderabad": 68, "Chennai": 64, "Mysore": 45 }, forecastAccuracy: 91.4 },
    { id: "AA-002", role: "admin", period: "2026-04", platformWasteCost: 198200, regionalDemand: { "Bangalore": 78, "Mumbai": 72, "Hyderabad": 65, "Chennai": 62, "Mysore": 42 }, forecastAccuracy: 89.5 },
  ],
};

export const accountActivities: AccountActivity[] = [
  { id: "ACT-001", role: "farmer", userId: "FRM-001", action: "harvest_created", details: "Created harvest plan for Tomato - 3.2 tons", timestamp: "2026-05-12T09:15:00Z" },
  { id: "ACT-002", role: "farmer", userId: "FRM-001", action: "batch_submitted", details: "Submitted batch BATCH-001 to Bangalore North Hub", timestamp: "2026-05-11T14:30:00Z" },
  { id: "ACT-003", role: "warehouse", userId: "WH-001", action: "inventory_received", details: "Received 3 batches from Green Valley Farms", timestamp: "2026-05-12T08:45:00Z" },
  { id: "ACT-004", role: "warehouse", userId: "WH-001", action: "quality_check", details: "Completed quality check for BATCH-001 - Grade A", timestamp: "2026-05-12T10:20:00Z" },
  { id: "ACT-005", role: "distributor", userId: "DSB-001", action: "shipment_dispatched", details: "Dispatched SHP-001 to FreshMart Indiranagar", timestamp: "2026-05-12T06:00:00Z" },
  { id: "ACT-006", role: "distributor", userId: "DSB-001", action: "delivery_completed", details: "Delivered shipment SHP-003 to Kamat Stores", timestamp: "2026-05-11T11:30:00Z" },
  { id: "ACT-007", role: "retailer", userId: "RET-001", action: "order_placed", details: "Placed order for 50 units of mixed vegetables", timestamp: "2026-05-12T07:00:00Z" },
  { id: "ACT-008", role: "retailer", userId: "RET-001", action: "stock_updated", details: "Updated inventory - added 120 units tomato", timestamp: "2026-05-12T08:15:00Z" },
  { id: "ACT-009", role: "admin", userId: "ADMIN", action: "system_health", details: "Platform health check - All systems operational", timestamp: "2026-05-12T10:00:00Z" },
  { id: "ACT-010", role: "admin", userId: "ADMIN", action: "report_generated", details: "Generated monthly performance report", timestamp: "2026-05-12T09:30:00Z" },
];

// UTILITY FUNCTIONS

export function getSupplyChainNetwork(role: Role, userId?: string) {
  switch (role) {
    case "farmer": {
      const farmer = farmers.find(f => f.id === userId);
      if (!farmer) return { farmer: null, warehouse: null, downstream: null };
      const warehouse = warehouses.find(w => w.id === farmer.linkedWarehouseId);
      const shipmentsFromWh = shipments.filter(s => s.warehouseId === farmer.linkedWarehouseId);
      const retailerList = shipmentsFromWh.map(s => retailers.find(r => r.id === s.retailerId)).filter(Boolean);
      return { farmer, warehouse, downstream: { shipments: shipmentsFromWh, retailers: retailerList } };
    }
    case "warehouse": {
      const warehouse = warehouses.find(w => w.id === userId);
      if (!warehouse) return { warehouse: null, farmers: [], distributors: [], retailers: [] };
      const linkedFarmers = farmers.filter(f => warehouse.linkedFarmerIds.includes(f.id));
      const linkedDistributors = distributors.filter(d => warehouse.linkedDistributorIds.includes(d.id));
      const warehouseShipments = shipments.filter(s => s.warehouseId === warehouse.id);
      const linkedRetailerList = warehouseShipments.map(s => retailers.find(r => r.id === s.retailerId)).filter(Boolean);
      return { warehouse, farmers: linkedFarmers, distributors: linkedDistributors, retailers: linkedRetailerList };
    }
    case "distributor": {
      const distributor = distributors.find(d => d.id === userId);
      if (!distributor) return { distributor: null, warehouses: [], retailers: [] };
      const linkedWarehouses = warehouses.filter(w => distributor.linkedWarehouseIds.includes(w.id));
      const linkedRetailers = retailers.filter(r => distributor.linkedRetailerIds.includes(r.id));
      const distributorShipments = shipments.filter(s => s.distributorId === distributor.id);
      return { distributor, warehouses: linkedWarehouses, retailers: linkedRetailers, shipments: distributorShipments };
    }
    case "retailer": {
      const retailer = retailers.find(r => r.id === userId);
      if (!retailer) return { retailer: null, distributor: null, products: [] };
      const distributor = distributors.find(d => d.id === retailer.linkedDistributorId);
      const retailerShipments = shipments.filter(s => s.retailerId === retailer.id);
      const batchDetails = retailerShipments.flatMap(s => s.batchIds.map(b => batches.find(batch => batch.id === b))).filter(Boolean);
      return { retailer, distributor, products: batchDetails, shipments: retailerShipments };
    }
    case "admin": {
      return { 
        farmers, 
        warehouses, 
        distributors, 
        retailers, 
        batches, 
        shipments,
        totalNodes: farmers.length + warehouses.length + distributors.length + retailers.length,
        activeConnections: shipments.length
      };
    }
  }
}

export function getAnalyticsByRole(role: Role, period?: string) {
  const roleAnalytics = {
    farmer: farmerAnalytics.farmer,
    warehouse: warehouseAnalytics.warehouse,
    distributor: distributorAnalytics.distributor,
    retailer: retailerAnalytics.retailer,
    admin: adminAnalytics.admin,
  };
  
  const analytics = roleAnalytics[role] || [];
  if (period) {
    return analytics.filter(a => a.period === period);
  }
  return analytics;
}

export function getAccountByRole(role: Role, userId: string) {
  const activities = accountActivities.filter(a => a.role === role && a.userId === userId);
  
  switch (role) {
    case "farmer": {
      const farmer = farmers.find(f => f.id === userId);
      const warehouse = farmer ? warehouses.find(w => w.id === farmer.linkedWarehouseId) : null;
      const farmerBatches = batches.filter(b => b.farmerId === userId);
      const totalEarnings = farmerBatches.reduce((sum, b) => sum + (b.quantity * b.pricePerUnit), 0);
      return { profile: farmer, linkedPartner: warehouse, batchHistory: farmerBatches, totalEarnings, activities };
    }
    case "warehouse": {
      const warehouse = warehouses.find(w => w.id === userId);
      const linkedFarmers = farmers.filter(f => f.linkedWarehouseId === userId);
      const linkedDistributors = distributors.filter(d => d.linkedWarehouseIds?.includes(userId));
      const warehouseBatches = batches.filter(b => b.warehouseId === userId);
      const utilization = warehouse ? Math.round((warehouse.currentUtilization / warehouse.capacity) * 100) : 0;
      return { profile: warehouse, linkedFarmers, linkedDistributors, inventory: warehouseBatches, utilization, activities };
    }
    case "distributor": {
      const distributor = distributors.find(d => d.id === userId);
      if (!distributor) return { profile: null, linkedWarehouses: [], linkedRetailers: [], routeHistory: [], fillRate: 0, activities };
      const linkedWarehouses = warehouses.filter(w => distributor.linkedWarehouseIds.includes(w.id));
      const linkedRetailers = retailers.filter(r => distributor.linkedRetailerIds.includes(r.id));
      const distributorShipments = shipments.filter(s => s.distributorId === userId);
      const onTimeDeliveries = distributorShipments.filter(s => s.status === "delivered").length;
      const totalDeliveries = distributorShipments.length;
      return { profile: distributor, linkedWarehouses, linkedRetailers, routeHistory: distributorShipments, fillRate: totalDeliveries > 0 ? Math.round((onTimeDeliveries / totalDeliveries) * 100) : 0, activities };
    }
    case "retailer": {
      const retailer = retailers.find(r => r.id === userId);
      const distributor = retailer ? distributors.find(d => d.id === retailer.linkedDistributorId) : null;
      const retailerShipments = shipments.filter(s => s.retailerId === userId);
      return { profile: retailer, distributor, orderHistory: retailerShipments, activities };
    }
    case "admin": {
      return { 
        allFarmers: farmers, 
        allWarehouses: warehouses, 
        allDistributors: distributors, 
        allRetailers: retailers,
        platformStats: {
          totalUsers: farmers.length + warehouses.length + distributors.length + retailers.length,
          activeShipments: shipments.filter(s => s.status !== "delivered").length,
          totalBatches: batches.length,
          platformWasteCost: 234500,
        },
        activities 
      };
    }
  }
}