import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Calendar, DollarSign, Package,
  TrendingUp, Filter, Search, Download, Plus, Edit2,
  Star, Clock, CreditCard, Truck, Navigation, Target,
  CheckCircle, AlertCircle, User, Building2, Map, X, Save
} from 'lucide-react';

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    route: 'RT-101',
    avgOrder: '',
    frequency: 'Weekly',
    creditLimit: '',
    tier: 'Bronze',
    segment: 'Corporate',
    status: 'Active'
  });

  // === 50 REAL CUSTOMERS DATABASE (Sangola + 100km Radius) ===
  const [customers, setCustomers] = useState([
    // ROUTE 1: PANDHARPUR CORRIDOR (34-36 km)
    {
      id: "CUST-001", customerNumber: "C2025-001",
      name: "Hotel Vitthal Residency", businessName: "Pandharpur Hotels Pvt Ltd",
      type: "Business", status: "Active",
      contactPerson: "Shri Ganesh Patil", phone: "+91 9876543210", altPhone: "+91 9876543211",
      email: "manager@vitthalresidency.com", whatsapp: "+91 9876543210",
      address: "Opposite Vitthal Temple, Main Road", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Near Temple Main Entrance", coordinates: { lat: 17.6792, lng: 75.3333 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 34,
      sequenceInRoute: 1, deliveryTimeWindow: "08:00 AM - 10:00 AM",
      accessInstructions: "Delivery at back entrance, temple parking area", parkingNotes: "Hotel staff parking",
      avgOrder: 80, minOrder: 60, maxOrder: 120, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 156,
      creditLimit: 120000, currentDebt: 35000, creditUsed: 29, paymentTerms: "Net 15",
      totalRevenue: 936000, avgOrderValue: 24000, outstandingAmount: 35000,
      tier: "Platinum", priority: "High", segment: "Hospitality",
      jarDeposit: 8000, emptyJarsWithCustomer: 75, contractEndDate: "2027-03-31", discount: 12,
      satisfactionScore: 4.8, complaints: 0, praises: 22, referrals: 4
    },
    {
      id: "CUST-002", customerNumber: "C2025-002",
      name: "Pandharpur City Hospital", businessName: "Pandharpur Healthcare Centre",
      type: "Business", status: "Active",
      contactPerson: "Dr. Suresh Jadhav", phone: "+91 9876543212", altPhone: "+91 9876543213",
      email: "admin@pandharphospital.com", whatsapp: "+91 9876543212",
      address: "Station Road, Near Bus Stand", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Opposite ST Bus Stand", coordinates: { lat: 17.6750, lng: 75.3300 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 34,
      sequenceInRoute: 2, deliveryTimeWindow: "09:00 AM - 11:00 AM",
      accessInstructions: "Main reception, ask for admin office", parkingNotes: "Visitor parking available",
      avgOrder: 100, minOrder: 80, maxOrder: 150, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 189,
      creditLimit: 150000, currentDebt: 45000, creditUsed: 30, paymentTerms: "Net 30",
      totalRevenue: 1134000, avgOrderValue: 30000, outstandingAmount: 45000,
      tier: "Platinum", priority: "High", segment: "Healthcare",
      jarDeposit: 10000, emptyJarsWithCustomer: 95, contractEndDate: "2027-06-30", discount: 15,
      satisfactionScore: 4.9, complaints: 0, praises: 28, referrals: 3
    },
    {
      id: "CUST-003", customerNumber: "C2025-003",
      name: "Pandurang Complex", businessName: "Pandurang Business Center",
      type: "Business", status: "Active",
      contactPerson: "Shri Ramesh Bhosale", phone: "+91 9876543214", altPhone: "+91 9876543215",
      email: "admin@pandurangcomplex.com", whatsapp: "+91 9876543214",
      address: "Market Yard Road", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Near Market Yard", coordinates: { lat: 17.6800, lng: 75.3350 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 34.5,
      sequenceInRoute: 3, deliveryTimeWindow: "10:30 AM - 12:00 PM",
      accessInstructions: "Security gate, mention admin office", parkingNotes: "Basement parking",
      avgOrder: 60, minOrder: 40, maxOrder: 90, frequency: "Bi-weekly",
      lastOrderDate: "2025-12-28", daysSinceLastOrder: 9, nextExpectedOrder: "2026-01-11", totalOrders: 98,
      creditLimit: 80000, currentDebt: 22000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 588000, avgOrderValue: 18000, outstandingAmount: 22000,
      tier: "Gold", priority: "High", segment: "Corporate",
      jarDeposit: 6000, emptyJarsWithCustomer: 55, contractEndDate: "2026-12-31", discount: 10,
      satisfactionScore: 4.5, complaints: 1, praises: 15, referrals: 2
    },
    {
      id: "CUST-004", customerNumber: "C2025-004",
      name: "Hotel Rajdhani", businessName: "Rajdhani Hospitality",
      type: "Business", status: "Active",
      contactPerson: "Mr. Ashok Patil", phone: "+91 9876543216", altPhone: "+91 9876543217",
      email: "info@hotelrajdhani.com", whatsapp: "+91 9876543216",
      address: "Solapur Road", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Near Petrol Pump", coordinates: { lat: 17.6850, lng: 75.3280 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 35,
      sequenceInRoute: 4, deliveryTimeWindow: "08:30 AM - 10:00 AM",
      accessInstructions: "Back entrance near kitchen", parkingNotes: "Service lane parking",
      avgOrder: 50, minOrder: 30, maxOrder: 75, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 142,
      creditLimit: 70000, currentDebt: 18000, creditUsed: 26, paymentTerms: "Net 15",
      totalRevenue: 426000, avgOrderValue: 15000, outstandingAmount: 18000,
      tier: "Gold", priority: "Medium", segment: "Hospitality",
      jarDeposit: 5000, emptyJarsWithCustomer: 45, contractEndDate: "2026-09-30", discount: 8,
      satisfactionScore: 4.3, complaints: 2, praises: 12, referrals: 1
    },
    {
      id: "CUST-005", customerNumber: "C2025-005",
      name: "Shri Vitthal College", businessName: "Vitthal Education Society",
      type: "Business", status: "Active",
      contactPerson: "Prof. Sadashiv Kulkarni", phone: "+91 9876543218", altPhone: "+91 9876543219",
      email: "admin@vitthalcollege.edu.in", whatsapp: "+91 9876543218",
      address: "College Road", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Near Sports Complex", coordinates: { lat: 17.6820, lng: 75.3400 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 35.2,
      sequenceInRoute: 5, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Main gate, ask for admin block", parkingNotes: "Visitor parking inside campus",
      avgOrder: 70, minOrder: 50, maxOrder: 100, frequency: "Weekly",
      lastOrderDate: "2026-01-01", daysSinceLastOrder: 5, nextExpectedOrder: "2026-01-08", totalOrders: 112,
      creditLimit: 90000, currentDebt: 25000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 672000, avgOrderValue: 21000, outstandingAmount: 25000,
      tier: "Gold", priority: "High", segment: "Corporate",
      jarDeposit: 7000, emptyJarsWithCustomer: 65, contractEndDate: "2027-01-31", discount: 10,
      satisfactionScore: 4.6, complaints: 0, praises: 18, referrals: 3
    },
    {
      id: "CUST-006", customerNumber: "C2025-006",
      name: "Hotel Sai Palace", businessName: "Sai Hospitality Group",
      type: "Business", status: "Active",
      contactPerson: "Mr. Dattatray Pawar", phone: "+91 9876543220", altPhone: "+91 9876543221",
      email: "manager@saipalace.com", whatsapp: "+91 9876543220",
      address: "Temple Ghat Road", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Near Chandrabhaga River", coordinates: { lat: 17.6780, lng: 75.3310 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 34.8,
      sequenceInRoute: 6, deliveryTimeWindow: "09:00 AM - 11:00 AM",
      accessInstructions: "Side entrance, reception area", parkingNotes: "Hotel parking available",
      avgOrder: 45, minOrder: 30, maxOrder: 65, frequency: "Bi-weekly",
      lastOrderDate: "2025-12-30", daysSinceLastOrder: 7, nextExpectedOrder: "2026-01-13", totalOrders: 87,
      creditLimit: 60000, currentDebt: 15000, creditUsed: 25, paymentTerms: "COD",
      totalRevenue: 391500, avgOrderValue: 13500, outstandingAmount: 15000,
      tier: "Silver", priority: "Medium", segment: "Hospitality",
      jarDeposit: 4500, emptyJarsWithCustomer: 40, contractEndDate: "2026-08-31", discount: 5,
      satisfactionScore: 4.2, complaints: 1, praises: 10, referrals: 1
    },
    {
      id: "CUST-007", customerNumber: "C2025-007",
      name: "Pandharpur Gym & Fitness", businessName: "Fit Life Wellness Center",
      type: "Business", status: "Active",
      contactPerson: "Mr. Sanjay Deshmukh", phone: "+91 9876543222", altPhone: "+91 9876543223",
      email: "info@fitlifepandharpur.com", whatsapp: "+91 9876543222",
      address: "Budhwar Peth", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Above Bank of Maharashtra", coordinates: { lat: 17.6770, lng: 75.3320 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 34.3,
      sequenceInRoute: 7, deliveryTimeWindow: "03:00 PM - 05:00 PM",
      accessInstructions: "First floor, ask for manager", parkingNotes: "Street parking",
      avgOrder: 40, minOrder: 25, maxOrder: 60, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 124,
      creditLimit: 50000, currentDebt: 12000, creditUsed: 24, paymentTerms: "Net 15",
      totalRevenue: 372000, avgOrderValue: 12000, outstandingAmount: 12000,
      tier: "Silver", priority: "Medium", segment: "Fitness",
      jarDeposit: 4000, emptyJarsWithCustomer: 35, contractEndDate: "2026-11-30", discount: 6,
      satisfactionScore: 4.4, complaints: 0, praises: 14, referrals: 2
    },
    {
      id: "CUST-008", customerNumber: "C2025-008",
      name: "Shree Restaurant", businessName: "Shree Foods & Catering",
      type: "Business", status: "Active",
      contactPerson: "Mr. Vinod Jadhav", phone: "+91 9876543224", altPhone: "+91 9876543225",
      email: "shreerestaurant@gmail.com", whatsapp: "+91 9876543224",
      address: "Market Area", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Near Main Market", coordinates: { lat: 17.6790, lng: 75.3340 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 34.7,
      sequenceInRoute: 8, deliveryTimeWindow: "10:00 AM - 12:00 PM",
      accessInstructions: "Back door, kitchen entrance", parkingNotes: "Service area",
      avgOrder: 35, minOrder: 20, maxOrder: 50, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 156,
      creditLimit: 45000, currentDebt: 10000, creditUsed: 22, paymentTerms: "COD",
      totalRevenue: 327600, avgOrderValue: 10500, outstandingAmount: 10000,
      tier: "Silver", priority: "Medium", segment: "Hospitality",
      jarDeposit: 3500, emptyJarsWithCustomer: 30, contractEndDate: "2026-10-31", discount: 4,
      satisfactionScore: 4.1, complaints: 2, praises: 8, referrals: 0
    },

    // ROUTE 2: MANGALVEDHE CORRIDOR (53-55 km)
    {
      id: "CUST-009", customerNumber: "C2025-009",
      name: "Mangalvedhe Hospital", businessName: "Mangalvedhe Medical Centre",
      type: "Business", status: "Active",
      contactPerson: "Dr. Prakash Shinde", phone: "+91 9876543226", altPhone: "+91 9876543227",
      email: "admin@mangalvedhehospital.com", whatsapp: "+91 9876543226",
      address: "Station Road", city: "Mangalvedhe", state: "Maharashtra", pincode: "413305",
      landmark: "Near Railway Station", coordinates: { lat: 17.5167, lng: 75.4500 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 53,
      sequenceInRoute: 9, deliveryTimeWindow: "10:30 AM - 12:00 PM",
      accessInstructions: "Main entrance, reception", parkingNotes: "Hospital parking",
      avgOrder: 65, minOrder: 45, maxOrder: 95, frequency: "Weekly",
      lastOrderDate: "2026-01-01", daysSinceLastOrder: 5, nextExpectedOrder: "2026-01-08", totalOrders: 134,
      creditLimit: 100000, currentDebt: 30000, creditUsed: 30, paymentTerms: "Net 30",
      totalRevenue: 804000, avgOrderValue: 19500, outstandingAmount: 30000,
      tier: "Platinum", priority: "High", segment: "Healthcare",
      jarDeposit: 6500, emptyJarsWithCustomer: 60, contractEndDate: "2027-02-28", discount: 12,
      satisfactionScore: 4.7, complaints: 0, praises: 20, referrals: 3
    },
    {
      id: "CUST-010", customerNumber: "C2025-010",
      name: "Shivaji College Mangalvedhe", businessName: "Shivaji Education Foundation",
      type: "Business", status: "Active",
      contactPerson: "Prof. Raghunath Kale", phone: "+91 9876543228", altPhone: "+91 9876543229",
      email: "admin@shivajicollege.edu.in", whatsapp: "+91 9876543228",
      address: "College Road", city: "Mangalvedhe", state: "Maharashtra", pincode: "413305",
      landmark: "Near Government Hospital", coordinates: { lat: 17.5200, lng: 75.4480 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 53.5,
      sequenceInRoute: 10, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Main gate, admin block", parkingNotes: "Campus parking",
      avgOrder: 55, minOrder: 40, maxOrder: 80, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 98,
      creditLimit: 75000, currentDebt: 20000, creditUsed: 27, paymentTerms: "Net 30",
      totalRevenue: 539000, avgOrderValue: 16500, outstandingAmount: 20000,
      tier: "Gold", priority: "High", segment: "Corporate",
      jarDeposit: 5500, emptyJarsWithCustomer: 50, contractEndDate: "2027-01-31", discount: 8,
      satisfactionScore: 4.5, complaints: 1, praises: 16, referrals: 2
    },

    // ROUTE 3: SOLAPUR CITY (79-95 km)
    {
      id: "CUST-011", customerNumber: "C2025-011",
      name: "Solapur Railway Station Canteen", businessName: "Indian Railways Catering",
      type: "Business", status: "Active",
      contactPerson: "Mr. Anil Bhosale", phone: "+91 9876543230", altPhone: "+91 9876543231",
      email: "canteen@solapurrailway.in", whatsapp: "+91 9876543230",
      address: "Platform No. 1, Railway Station", city: "Solapur", state: "Maharashtra", pincode: "413001",
      landmark: "Main Railway Station", coordinates: { lat: 17.6599, lng: 75.9064 },
      route: "RT-103", routeName: "East Route (Solapur Express)", distanceFromWarehouse: 79,
      sequenceInRoute: 2, deliveryTimeWindow: "10:00 AM - 12:00 PM",
      accessInstructions: "Platform access, show delivery receipt", parkingNotes: "Station parking",
      avgOrder: 150, minOrder: 120, maxOrder: 200, frequency: "Daily",
      lastOrderDate: "2026-01-05", daysSinceLastOrder: 1, nextExpectedOrder: "2026-01-07", totalOrders: 245,
      creditLimit: 200000, currentDebt: 55000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 2205000, avgOrderValue: 45000, outstandingAmount: 55000,
      tier: "Platinum", priority: "High", segment: "Hospitality",
      jarDeposit: 15000, emptyJarsWithCustomer: 140, contractEndDate: "2027-12-31", discount: 18,
      satisfactionScore: 4.9, complaints: 0, praises: 32, referrals: 5
    },
    {
      id: "CUST-012", customerNumber: "C2025-012",
      name: "Hotel Tripursundari", businessName: "Tripursundari Hotels Pvt Ltd",
      type: "Business", status: "Active",
      contactPerson: "Mr. Shrikant Kulkarni", phone: "+91 9876543232", altPhone: "+91 9876543233",
      email: "manager@hoteltripursundari.com", whatsapp: "+91 9876543232",
      address: "Siddheshwar Road", city: "Solapur", state: "Maharashtra", pincode: "413001",
      landmark: "Near Siddheshwar Temple", coordinates: { lat: 17.6620, lng: 75.9080 },
      route: "RT-103", routeName: "East Route (Solapur Express)", distanceFromWarehouse: 79.5,
      sequenceInRoute: 4, deliveryTimeWindow: "10:30 AM - 12:30 PM",
      accessInstructions: "Service entrance, back side", parkingNotes: "Hotel service area",
      avgOrder: 95, minOrder: 75, maxOrder: 130, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 176,
      creditLimit: 150000, currentDebt: 42000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 1672000, avgOrderValue: 28500, outstandingAmount: 42000,
      tier: "Platinum", priority: "High", segment: "Hospitality",
      jarDeposit: 9500, emptyJarsWithCustomer: 90, contractEndDate: "2027-05-31", discount: 14,
      satisfactionScore: 4.8, complaints: 0, praises: 24, referrals: 4
    },
    {
      id: "CUST-013", customerNumber: "C2025-013",
      name: "Solapur Textile Mills", businessName: "STM Workers Canteen",
      type: "Business", status: "Active",
      contactPerson: "Mr. Raghunath Shinde", phone: "+91 9876543234", altPhone: "+91 9876543235",
      email: "canteen@stm.com", whatsapp: "+91 9876543234",
      address: "Mill Area, South Solapur", city: "Solapur", state: "Maharashtra", pincode: "413004",
      landmark: "Near Textile Mill Gate 2", coordinates: { lat: 17.6550, lng: 75.9100 },
      route: "RT-103", routeName: "East Route (Solapur Express)", distanceFromWarehouse: 80,
      sequenceInRoute: 3, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Security check required, canteen area", parkingNotes: "Factory parking",
      avgOrder: 120, minOrder: 100, maxOrder: 160, frequency: "Daily",
      lastOrderDate: "2026-01-05", daysSinceLastOrder: 1, nextExpectedOrder: "2026-01-07", totalOrders: 298,
      creditLimit: 180000, currentDebt: 50000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 2149200, avgOrderValue: 36000, outstandingAmount: 50000,
      tier: "Platinum", priority: "High", segment: "Corporate",
      jarDeposit: 12000, emptyJarsWithCustomer: 115, contractEndDate: "2027-09-30", discount: 16,
      satisfactionScore: 4.7, complaints: 1, praises: 28, referrals: 3
    },
    {
      id: "CUST-014", customerNumber: "C2025-014",
      name: "Solapur City Hospital", businessName: "Solapur Healthcare Pvt Ltd",
      type: "Business", status: "Active",
      contactPerson: "Dr. Meena Desai", phone: "+91 9876543236", altPhone: "+91 9876543237",
      email: "admin@solapurhospital.com", whatsapp: "+91 9876543236",
      address: "Jule Solapur Road", city: "Solapur", state: "Maharashtra", pincode: "413003",
      landmark: "Near Bus Stand", coordinates: { lat: 17.6580, lng: 75.9050 },
      route: "RT-103", routeName: "East Route (Solapur Express)", distanceFromWarehouse: 79.8,
      sequenceInRoute: 5, deliveryTimeWindow: "09:00 AM - 11:00 AM",
      accessInstructions: "Main gate, reception desk", parkingNotes: "Hospital parking",
      avgOrder: 110, minOrder: 90, maxOrder: 150, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 167,
      creditLimit: 170000, currentDebt: 48000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 1837000, avgOrderValue: 33000, outstandingAmount: 48000,
      tier: "Platinum", priority: "High", segment: "Healthcare",
      jarDeposit: 11000, emptyJarsWithCustomer: 105, contractEndDate: "2027-08-31", discount: 15,
      satisfactionScore: 4.8, complaints: 0, praises: 26, referrals: 4
    },
    {
      id: "CUST-015", customerNumber: "C2025-015",
      name: "Mohol Market Complex", businessName: "Mohol Trade Centre",
      type: "Business", status: "Active",
      contactPerson: "Mr. Vitthal Pawar", phone: "+91 9876543238", altPhone: "+91 9876543239",
      email: "moholmarket@gmail.com", whatsapp: "+91 9876543238",
      address: "Main Market Road", city: "Mohol", state: "Maharashtra", pincode: "413213",
      landmark: "Near APMC Yard", coordinates: { lat: 17.8167, lng: 75.6500 },
      route: "RT-103", routeName: "East Route (Solapur Express)", distanceFromWarehouse: 38,
      sequenceInRoute: 1, deliveryTimeWindow: "07:30 AM - 09:00 AM",
      accessInstructions: "Office on first floor", parkingNotes: "Market parking",
      avgOrder: 55, minOrder: 40, maxOrder: 80, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 123,
      creditLimit: 85000, currentDebt: 23000, creditUsed: 27, paymentTerms: "Net 15",
      totalRevenue: 615000, avgOrderValue: 16500, outstandingAmount: 23000,
      tier: "Gold", priority: "Medium", segment: "Corporate",
      jarDeposit: 5500, emptyJarsWithCustomer: 50, contractEndDate: "2026-11-30", discount: 9,
      satisfactionScore: 4.4, complaints: 1, praises: 14, referrals: 2
    },

    // ROUTE 4: SANGLI/MIRAJ (85-95 km)
    {
      id: "CUST-016", customerNumber: "C2025-016",
      name: "Wanless Hospital Miraj", businessName: "Wanless Medical Trust",
      type: "Business", status: "Active",
      contactPerson: "Dr. Ajit Deshmukh", phone: "+91 9876543240", altPhone: "+91 9876543241",
      email: "admin@wanlesshospital.org", whatsapp: "+91 9876543240",
      address: "Station Road", city: "Miraj", state: "Maharashtra", pincode: "416410",
      landmark: "Near Railway Station", coordinates: { lat: 16.8333, lng: 74.6500 },
      route: "RT-104", routeName: "West Route (Sangli-Miraj)", distanceFromWarehouse: 95,
      sequenceInRoute: 2, deliveryTimeWindow: "10:30 AM - 12:30 PM",
      accessInstructions: "Main entrance, admin wing", parkingNotes: "Hospital parking",
      avgOrder: 135, minOrder: 110, maxOrder: 180, frequency: "Weekly",
      lastOrderDate: "2026-01-01", daysSinceLastOrder: 5, nextExpectedOrder: "2026-01-08", totalOrders: 198,
      creditLimit: 210000, currentDebt: 60000, creditUsed: 29, paymentTerms: "Net 30",
      totalRevenue: 2673000, avgOrderValue: 40500, outstandingAmount: 60000,
      tier: "Platinum", priority: "High", segment: "Healthcare",
      jarDeposit: 13500, emptyJarsWithCustomer: 130, contractEndDate: "2027-11-30", discount: 17,
      satisfactionScore: 4.9, complaints: 0, praises: 30, referrals: 5
    },
    {
      id: "CUST-017", customerNumber: "C2025-017",
      name: "Miraj Medical College", businessName: "Government Medical College Miraj",
      type: "Business", status: "Active",
      contactPerson: "Dr. Sandeep Kulkarni", phone: "+91 9876543242", altPhone: "+91 9876543243",
      email: "principal@gmcmiraj.edu.in", whatsapp: "+91 9876543242",
      address: "College Campus, Civil Lines", city: "Miraj", state: "Maharashtra", pincode: "416410",
      landmark: "Near District Court", coordinates: { lat: 16.8300, lng: 74.6550 },
      route: "RT-104", routeName: "West Route (Sangli-Miraj)", distanceFromWarehouse: 95.5,
      sequenceInRoute: 3, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Main gate security, campus admin", parkingNotes: "College parking",
      avgOrder: 90, minOrder: 70, maxOrder: 120, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 156,
      creditLimit: 140000, currentDebt: 38000, creditUsed: 27, paymentTerms: "Net 45",
      totalRevenue: 1404000, avgOrderValue: 27000, outstandingAmount: 38000,
      tier: "Platinum", priority: "High", segment: "Corporate",
      jarDeposit: 9000, emptyJarsWithCustomer: 85, contractEndDate: "2027-07-31", discount: 14,
      satisfactionScore: 4.7, complaints: 0, praises: 22, referrals: 3
    },
    {
      id: "CUST-018", customerNumber: "C2025-018",
      name: "Hotel Arafa Sangli", businessName: "Arafa Hotels Pvt Ltd",
      type: "Business", status: "Active",
      contactPerson: "Mr. Imran Shaikh", phone: "+91 9876543244", altPhone: "+91 9876543245",
      email: "manager@hotelarafa.com", whatsapp: "+91 9876543244",
      address: "Market Yard Road", city: "Sangli", state: "Maharashtra", pincode: "416416",
      landmark: "Near Turmeric Market", coordinates: { lat: 16.8524, lng: 74.5815 },
      route: "RT-104", routeName: "West Route (Sangli-Miraj)", distanceFromWarehouse: 92,
      sequenceInRoute: 4, deliveryTimeWindow: "09:00 AM - 11:00 AM",
      accessInstructions: "Reception, main entrance", parkingNotes: "Hotel parking",
      avgOrder: 75, minOrder: 55, maxOrder: 105, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 143,
      creditLimit: 110000, currentDebt: 31000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 1072500, avgOrderValue: 22500, outstandingAmount: 31000,
      tier: "Gold", priority: "High", segment: "Hospitality",
      jarDeposit: 7500, emptyJarsWithCustomer: 70, contractEndDate: "2027-04-30", discount: 11,
      satisfactionScore: 4.6, complaints: 1, praises: 19, referrals: 2
    },
    {
      id: "CUST-019", customerNumber: "C2025-019",
      name: "Walchand College Sangli", businessName: "Walchand Education Foundation",
      type: "Business", status: "Active",
      contactPerson: "Dr. Rajesh Patil", phone: "+91 9876543246", altPhone: "+91 9876543247",
      email: "principal@walchand.edu.in", whatsapp: "+91 9876543246",
      address: "Vishrambag", city: "Sangli", state: "Maharashtra", pincode: "416415",
      landmark: "Near Ganapati Temple", coordinates: { lat: 16.8580, lng: 74.5800 },
      route: "RT-104", routeName: "West Route (Sangli-Miraj)", distanceFromWarehouse: 91,
      sequenceInRoute: 5, deliveryTimeWindow: "12:00 PM - 02:00 PM",
      accessInstructions: "Main gate, admin office", parkingNotes: "Visitor parking",
      avgOrder: 85, minOrder: 65, maxOrder: 115, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 134,
      creditLimit: 130000, currentDebt: 36000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 1139000, avgOrderValue: 25500, outstandingAmount: 36000,
      tier: "Gold", priority: "High", segment: "Corporate",
      jarDeposit: 8500, emptyJarsWithCustomer: 80, contractEndDate: "2027-02-28", discount: 12,
      satisfactionScore: 4.7, complaints: 0, praises: 21, referrals: 3
    },
    {
      id: "CUST-020", customerNumber: "C2025-020",
      name: "Vita Sugar Factory", businessName: "Vita Co-op Sugar Factory",
      type: "Business", status: "Active",
      contactPerson: "Mr. Balasaheb Desai", phone: "+91 9876543248", altPhone: "+91 9876543249",
      email: "admin@vitasugar.com", whatsapp: "+91 9876543248",
      address: "Factory Road", city: "Vita", state: "Maharashtra", pincode: "415311",
      landmark: "Main Factory Gate", coordinates: { lat: 17.2667, lng: 74.5333 },
      route: "RT-104", routeName: "West Route (Sangli-Miraj)", distanceFromWarehouse: 52,
      sequenceInRoute: 1, deliveryTimeWindow: "08:30 AM - 10:00 AM",
      accessInstructions: "Security gate, canteen area", parkingNotes: "Factory parking",
      avgOrder: 140, minOrder: 120, maxOrder: 180, frequency: "Daily",
      lastOrderDate: "2026-01-05", daysSinceLastOrder: 1, nextExpectedOrder: "2026-01-07", totalOrders: 267,
      creditLimit: 220000, currentDebt: 62000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 3738000, avgOrderValue: 42000, outstandingAmount: 62000,
      tier: "Platinum", priority: "High", segment: "Corporate",
      jarDeposit: 14000, emptyJarsWithCustomer: 135, contractEndDate: "2027-10-31", discount: 18,
      satisfactionScore: 4.8, complaints: 0, praises: 25, referrals: 4
    },

    // ROUTE 5: JATH CORRIDOR (42-70 km)
    {
      id: "CUST-021", customerNumber: "C2025-021",
      name: "Jath Industrial Area", businessName: "MIDC Jath",
      type: "Business", status: "Active",
      contactPerson: "Mr. Sunil Desai", phone: "+91 9876543250", altPhone: "+91 9876543251",
      email: "admin@jathmidc.com", whatsapp: "+91 9876543250",
      address: "MIDC Area", city: "Jath", state: "Maharashtra", pincode: "416404",
      landmark: "Near Main Gate", coordinates: { lat: 17.0500, lng: 75.2167 },
      route: "RT-102", routeName: "South Route (Jath-Tasgaon)", distanceFromWarehouse: 42,
      sequenceInRoute: 1, deliveryTimeWindow: "08:30 AM - 10:30 AM",
      accessInstructions: "Security check, admin block", parkingNotes: "Visitor parking",
      avgOrder: 90, minOrder: 70, maxOrder: 130, frequency: "Weekly",
      lastOrderDate: "2026-01-01", daysSinceLastOrder: 5, nextExpectedOrder: "2026-01-08", totalOrders: 145,
      creditLimit: 140000, currentDebt: 40000, creditUsed: 29, paymentTerms: "Net 30",
      totalRevenue: 1305000, avgOrderValue: 27000, outstandingAmount: 40000,
      tier: "Platinum", priority: "High", segment: "Corporate",
      jarDeposit: 9000, emptyJarsWithCustomer: 85, contractEndDate: "2027-06-30", discount: 15,
      satisfactionScore: 4.8, complaints: 0, praises: 25, referrals: 4
    },
    {
      id: "CUST-022", customerNumber: "C2025-022",
      name: "Hotel Rajwada Jath", businessName: "Rajwada Hospitality",
      type: "Business", status: "Active",
      contactPerson: "Mr. Vishwas Patil", phone: "+91 9876543252", altPhone: "+91 9876543253",
      email: "hotelrajwada@gmail.com", whatsapp: "+91 9876543252",
      address: "Main Road, Near Bus Stand", city: "Jath", state: "Maharashtra", pincode: "416404",
      landmark: "Opposite Bus Stand", coordinates: { lat: 17.0480, lng: 75.2150 },
      route: "RT-102", routeName: "South Route (Jath-Tasgaon)", distanceFromWarehouse: 42.3,
      sequenceInRoute: 2, deliveryTimeWindow: "09:00 AM - 11:00 AM",
      accessInstructions: "Main entrance, reception", parkingNotes: "Hotel parking",
      avgOrder: 55, minOrder: 40, maxOrder: 80, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 132,
      creditLimit: 85000, currentDebt: 24000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 726000, avgOrderValue: 16500, outstandingAmount: 24000,
      tier: "Gold", priority: "High", segment: "Hospitality",
      jarDeposit: 5500, emptyJarsWithCustomer: 50, contractEndDate: "2026-11-30", discount: 10,
      satisfactionScore: 4.5, complaints: 1, praises: 18, referrals: 2
    },
    {
      id: "CUST-023", customerNumber: "C2025-023",
      name: "Jath City Gym", businessName: "Fitness First Jath",
      type: "Business", status: "Active",
      contactPerson: "Mr. Rahul Jadhav", phone: "+91 9876543254", altPhone: "+91 9876543255",
      email: "citygymjath@gmail.com", whatsapp: "+91 9876543254",
      address: "Station Road", city: "Jath", state: "Maharashtra", pincode: "416404",
      landmark: "Above HDFC Bank", coordinates: { lat: 17.0520, lng: 75.2180 },
      route: "RT-102", routeName: "South Route (Jath-Tasgaon)", distanceFromWarehouse: 42.5,
      sequenceInRoute: 3, deliveryTimeWindow: "04:00 PM - 06:00 PM",
      accessInstructions: "Second floor, lift available", parkingNotes: "Street parking",
      avgOrder: 38, minOrder: 25, maxOrder: 55, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 118,
      creditLimit: 50000, currentDebt: 13000, creditUsed: 26, paymentTerms: "COD",
      totalRevenue: 449200, avgOrderValue: 11400, outstandingAmount: 13000,
      tier: "Silver", priority: "Medium", segment: "Fitness",
      jarDeposit: 3800, emptyJarsWithCustomer: 33, contractEndDate: "2026-09-30", discount: 6,
      satisfactionScore: 4.4, complaints: 0, praises: 15, referrals: 2
    },
    {
      id: "CUST-024", customerNumber: "C2025-024",
      name: "Khanapur Market", businessName: "Khanapur Trade Centre",
      type: "Business", status: "Active",
      contactPerson: "Mr. Sharad Kumbhar", phone: "+91 9876543256", altPhone: "+91 9876543257",
      email: "khanapurmarket@gmail.com", whatsapp: "+91 9876543256",
      address: "Market Yard", city: "Khanapur", state: "Maharashtra", pincode: "415709",
      landmark: "Near APMC", coordinates: { lat: 17.2667, lng: 74.7167 },
      route: "RT-102", routeName: "South Route (Jath-Tasgaon)", distanceFromWarehouse: 78,
      sequenceInRoute: 4, deliveryTimeWindow: "11:00 AM - 12:30 PM",
      accessInstructions: "Office building, first floor", parkingNotes: "Market parking",
      avgOrder: 50, minOrder: 35, maxOrder: 75, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 109,
      creditLimit: 75000, currentDebt: 21000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 545000, avgOrderValue: 15000, outstandingAmount: 21000,
      tier: "Gold", priority: "Medium", segment: "Corporate",
      jarDeposit: 5000, emptyJarsWithCustomer: 45, contractEndDate: "2026-12-31", discount: 8,
      satisfactionScore: 4.3, complaints: 1, praises: 13, referrals: 1
    },
    {
      id: "CUST-025", customerNumber: "C2025-025",
      name: "Tasgaon Sugar Factory", businessName: "Tasgaon Co-op Sugar Ltd",
      type: "Business", status: "Active",
      contactPerson: "Mr. Ankush Patil", phone: "+91 9876543258", altPhone: "+91 9876543259",
      email: "admin@tasgaonsugar.com", whatsapp: "+91 9876543258",
      address: "Factory Area", city: "Tasgaon", state: "Maharashtra", pincode: "416312",
      landmark: "Main Factory", coordinates: { lat: 17.0333, lng: 74.6000 },
      route: "RT-102", routeName: "South Route (Jath-Tasgaon)", distanceFromWarehouse: 93,
      sequenceInRoute: 5, deliveryTimeWindow: "01:00 PM - 02:30 PM",
      accessInstructions: "Security gate, canteen", parkingNotes: "Factory parking",
      avgOrder: 125, minOrder: 100, maxOrder: 170, frequency: "Daily",
      lastOrderDate: "2026-01-05", daysSinceLastOrder: 1, nextExpectedOrder: "2026-01-07", totalOrders: 254,
      creditLimit: 190000, currentDebt: 53000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 3175000, avgOrderValue: 37500, outstandingAmount: 53000,
      tier: "Platinum", priority: "High", segment: "Corporate",
      jarDeposit: 12500, emptyJarsWithCustomer: 120, contractEndDate: "2027-09-30", discount: 16,
      satisfactionScore: 4.7, complaints: 1, praises: 24, referrals: 3
    },

    // LOCAL SANGOLA CUSTOMERS (5-25 km)
    {
      id: "CUST-026", customerNumber: "C2025-026",
      name: "Sangola Spinning Mill", businessName: "Sangola Textiles Pvt Ltd",
      type: "Business", status: "Active",
      contactPerson: "Mr. Dhananjay Shinde", phone: "+91 9876543260", altPhone: "+91 9876543261",
      email: "admin@sangolatextiles.com", whatsapp: "+91 9876543260",
      address: "Industrial Area", city: "Sangola", state: "Maharashtra", pincode: "413307",
      landmark: "Main Mill", coordinates: { lat: 17.4333, lng: 75.1833 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 5,
      sequenceInRoute: 1, deliveryTimeWindow: "08:00 AM - 10:00 AM",
      accessInstructions: "Main gate, canteen area", parkingNotes: "Factory parking",
      avgOrder: 110, minOrder: 90, maxOrder: 150, frequency: "Daily",
      lastOrderDate: "2026-01-05", daysSinceLastOrder: 1, nextExpectedOrder: "2026-01-07", totalOrders: 289,
      creditLimit: 165000, currentDebt: 46000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 3179000, avgOrderValue: 33000, outstandingAmount: 46000,
      tier: "Platinum", priority: "High", segment: "Corporate",
      jarDeposit: 11000, emptyJarsWithCustomer: 105, contractEndDate: "2027-08-31", discount: 15,
      satisfactionScore: 4.8, complaints: 0, praises: 27, referrals: 4
    },
    {
      id: "CUST-027", customerNumber: "C2025-027",
      name: "Vidnyan College Sangola", businessName: "Sangola Education Trust",
      type: "Business", status: "Active",
      contactPerson: "Dr. Anand Kulkarni", phone: "+91 9876543262", altPhone: "+91 9876543263",
      email: "principal@vidnyancollege.edu.in", whatsapp: "+91 9876543262",
      address: "College Road", city: "Sangola", state: "Maharashtra", pincode: "413307",
      landmark: "Near Bus Stand", coordinates: { lat: 17.4350, lng: 75.1850 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 2,
      sequenceInRoute: 2, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Main gate, admin office", parkingNotes: "College parking",
      avgOrder: 75, minOrder: 55, maxOrder: 105, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 148,
      creditLimit: 115000, currentDebt: 32000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 1110000, avgOrderValue: 22500, outstandingAmount: 32000,
      tier: "Gold", priority: "High", segment: "Corporate",
      jarDeposit: 7500, emptyJarsWithCustomer: 70, contractEndDate: "2027-03-31", discount: 11,
      satisfactionScore: 4.6, complaints: 1, praises: 19, referrals: 2
    },
    {
      id: "CUST-028", customerNumber: "C2025-028",
      name: "Hotel Annapurna Sangola", businessName: "Annapurna Hotels",
      type: "Business", status: "Active",
      contactPerson: "Mr. Santosh Patil", phone: "+91 9876543264", altPhone: "+91 9876543265",
      email: "hotelannapurna@gmail.com", whatsapp: "+91 9876543264",
      address: "Main Road", city: "Sangola", state: "Maharashtra", pincode: "413307",
      landmark: "Near Market", coordinates: { lat: 17.4320, lng: 75.1820 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 1,
      sequenceInRoute: 3, deliveryTimeWindow: "09:00 AM - 11:00 AM",
      accessInstructions: "Reception entrance", parkingNotes: "Hotel parking",
      avgOrder: 45, minOrder: 30, maxOrder: 65, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 137,
      creditLimit: 65000, currentDebt: 18000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 616500, avgOrderValue: 13500, outstandingAmount: 18000,
      tier: "Silver", priority: "Medium", segment: "Hospitality",
      jarDeposit: 4500, emptyJarsWithCustomer: 40, contractEndDate: "2026-10-31", discount: 7,
      satisfactionScore: 4.4, complaints: 1, praises: 14, referrals: 1
    },
    {
      id: "CUST-029", customerNumber: "C2025-029",
      name: "Sangola Rural Hospital", businessName: "District Hospital Sangola",
      type: "Business", status: "Active",
      contactPerson: "Dr. Pushpa Deshmukh", phone: "+91 9876543266", altPhone: "+91 9876543267",
      email: "admin@sangolahospital.gov.in", whatsapp: "+91 9876543266",
      address: "Hospital Road", city: "Sangola", state: "Maharashtra", pincode: "413307",
      landmark: "Near Tehsil Office", coordinates: { lat: 17.4340, lng: 75.1840 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 3,
      sequenceInRoute: 4, deliveryTimeWindow: "10:00 AM - 12:00 PM",
      accessInstructions: "Main entrance, admin wing", parkingNotes: "Hospital parking",
      avgOrder: 85, minOrder: 65, maxOrder: 115, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 165,
      creditLimit: 125000, currentDebt: 35000, creditUsed: 28, paymentTerms: "Net 45",
      totalRevenue: 1402500, avgOrderValue: 25500, outstandingAmount: 35000,
      tier: "Gold", priority: "High", segment: "Healthcare",
      jarDeposit: 8500, emptyJarsWithCustomer: 80, contractEndDate: "2027-05-31", discount: 12,
      satisfactionScore: 4.7, complaints: 0, praises: 21, referrals: 3
    },
    {
      id: "CUST-030", customerNumber: "C2025-030",
      name: "Pomegranate Market Sangola", businessName: "Sangola APMC",
      type: "Business", status: "Potential",
      contactPerson: "Mr. Kiran Bhosale", phone: "+91 9876543268", altPhone: "+91 9876543269",
      email: "sangolaapmc@gmail.com", whatsapp: "+91 9876543268",
      address: "Market Yard", city: "Sangola", state: "Maharashtra", pincode: "413307",
      landmark: "Main Market", coordinates: { lat: 17.4360, lng: 75.1860 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 4,
      sequenceInRoute: 5, deliveryTimeWindow: "08:00 AM - 10:00 AM",
      accessInstructions: "Office building", parkingNotes: "Market parking",
      avgOrder: 0, minOrder: 40, maxOrder: 70, frequency: "Not yet ordered",
      lastOrderDate: null, daysSinceLastOrder: null, nextExpectedOrder: null, totalOrders: 0,
      creditLimit: 80000, currentDebt: 0, creditUsed: 0, paymentTerms: "COD",
      totalRevenue: 0, avgOrderValue: 0, outstandingAmount: 0,
      tier: "Bronze", priority: "Medium", segment: "Corporate",
      jarDeposit: 0, emptyJarsWithCustomer: 0, contractEndDate: null, discount: 0,
      satisfactionScore: 0, complaints: 0, praises: 0, referrals: 0
    },

    // ADDITIONAL CUSTOMERS (Various Routes)
    {
      id: "CUST-031", customerNumber: "C2025-031",
      name: "Mahud Bus Stand Canteen", businessName: "MSRTC Canteen Mahud",
      type: "Business", status: "Active",
      contactPerson: "Mr. Ganesh Mane", phone: "+91 9876543270", altPhone: "+91 9876543271",
      email: "mahudcanteen@gmail.com", whatsapp: "+91 9876543270",
      address: "Bus Stand", city: "Mahud", state: "Maharashtra", pincode: "413226",
      landmark: "Main Bus Stand", coordinates: { lat: 17.5500, lng: 75.1500 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 18,
      sequenceInRoute: 6, deliveryTimeWindow: "09:00 AM - 11:00 AM",
      accessInstructions: "Canteen area", parkingNotes: "Bus stand parking",
      avgOrder: 35, minOrder: 20, maxOrder: 50, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 112,
      creditLimit: 50000, currentDebt: 14000, creditUsed: 28, paymentTerms: "COD",
      totalRevenue: 392000, avgOrderValue: 10500, outstandingAmount: 14000,
      tier: "Silver", priority: "Medium", segment: "Government",
      jarDeposit: 3500, emptyJarsWithCustomer: 30, contractEndDate: "2026-08-31", discount: 5,
      satisfactionScore: 4.2, complaints: 1, praises: 11, referrals: 1
    },
    {
      id: "CUST-032", customerNumber: "C2025-032",
      name: "Hotel Shivneri Mahud", businessName: "Shivneri Lodging",
      type: "Business", status: "Active",
      contactPerson: "Mrs. Sunita Kale", phone: "+91 9876543272", altPhone: "+91 9876543273",
      email: "shivnerihotel@gmail.com", whatsapp: "+91 9876543272",
      address: "Main Road", city: "Mahud", state: "Maharashtra", pincode: "413226",
      landmark: "Near Bus Stand", coordinates: { lat: 17.5520, lng: 75.1480 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 18,
      sequenceInRoute: 7, deliveryTimeWindow: "10:00 AM - 12:00 PM",
      accessInstructions: "Reception area", parkingNotes: "Street parking",
      avgOrder: 30, minOrder: 20, maxOrder: 45, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 94,
      creditLimit: 45000, currentDebt: 12000, creditUsed: 27, paymentTerms: "COD",
      totalRevenue: 282000, avgOrderValue: 9000, outstandingAmount: 12000,
      tier: "Bronze", priority: "Low", segment: "Hospitality",
      jarDeposit: 3000, emptyJarsWithCustomer: 25, contractEndDate: "2026-07-31", discount: 4,
      satisfactionScore: 4.0, complaints: 2, praises: 8, referrals: 0
    },
    {
      id: "CUST-033", customerNumber: "C2025-033",
      name: "Nazara College", businessName: "Nazara Education Society",
      type: "Business", status: "Active",
      contactPerson: "Prof. Mohan Pawar", phone: "+91 9876543274", altPhone: "+91 9876543275",
      email: "principal@nazaracollege.edu.in", whatsapp: "+91 9876543274",
      address: "College Campus", city: "Nazara", state: "Maharashtra", pincode: "413308",
      landmark: "Near Highway", coordinates: { lat: 17.3800, lng: 75.2000 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 12,
      sequenceInRoute: 8, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Main gate, admin block", parkingNotes: "Campus parking",
      avgOrder: 55, minOrder: 40, maxOrder: 80, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 103,
      creditLimit: 75000, currentDebt: 21000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 566500, avgOrderValue: 16500, outstandingAmount: 21000,
      tier: "Gold", priority: "Medium", segment: "Corporate",
      jarDeposit: 5500, emptyJarsWithCustomer: 50, contractEndDate: "2027-01-31", discount: 8,
      satisfactionScore: 4.5, complaints: 0, praises: 16, referrals: 2
    },
    {
      id: "CUST-034", customerNumber: "C2025-034",
      name: "Javla Wind Project", businessName: "Green Energy Pvt Ltd",
      type: "Business", status: "Active",
      contactPerson: "Eng. Rajesh Shinde", phone: "+91 9876543276", altPhone: "+91 9876543277",
      email: "admin@greenenergyjavla.com", whatsapp: "+91 9876543276",
      address: "Wind Farm Site", city: "Javla", state: "Maharashtra", pincode: "413309",
      landmark: "Wind Turbine Area", coordinates: { lat: 17.4700, lng: 75.2200 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 22,
      sequenceInRoute: 9, deliveryTimeWindow: "02:00 PM - 04:00 PM",
      accessInstructions: "Main office", parkingNotes: "Site parking",
      avgOrder: 60, minOrder: 45, maxOrder: 85, frequency: "Weekly",
      lastOrderDate: "2026-01-01", daysSinceLastOrder: 5, nextExpectedOrder: "2026-01-08", totalOrders: 89,
      creditLimit: 90000, currentDebt: 25000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 534000, avgOrderValue: 18000, outstandingAmount: 25000,
      tier: "Gold", priority: "Medium", segment: "Corporate",
      jarDeposit: 6000, emptyJarsWithCustomer: 55, contractEndDate: "2027-04-30", discount: 9,
      satisfactionScore: 4.4, complaints: 1, praises: 14, referrals: 1
    },
    {
      id: "CUST-035", customerNumber: "C2025-035",
      name: "Sonand High School", businessName: "Z.P. High School Sonand",
      type: "Business", status: "Active",
      contactPerson: "Headmaster Mr. Dilip Kale", phone: "+91 9876543278", altPhone: "+91 9876543279",
      email: "sonandschool@gmail.com", whatsapp: "+91 9876543278",
      address: "School Road", city: "Sonand", state: "Maharashtra", pincode: "413310",
      landmark: "Near Gram Panchayat", coordinates: { lat: 17.4500, lng: 75.2100 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 15,
      sequenceInRoute: 10, deliveryTimeWindow: "12:00 PM - 02:00 PM",
      accessInstructions: "School office", parkingNotes: "School grounds",
      avgOrder: 40, minOrder: 30, maxOrder: 60, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 97,
      creditLimit: 55000, currentDebt: 15000, creditUsed: 27, paymentTerms: "Net 30",
      totalRevenue: 388000, avgOrderValue: 12000, outstandingAmount: 15000,
      tier: "Silver", priority: "Medium", segment: "Government",
      jarDeposit: 4000, emptyJarsWithCustomer: 35, contractEndDate: "2026-12-31", discount: 6,
      satisfactionScore: 4.3, complaints: 1, praises: 12, referrals: 1
    },
    {
      id: "CUST-036", customerNumber: "C2025-036",
      name: "Akkalkot Swami Temple Trust", businessName: "Swami Samarth Devasthan",
      type: "Business", status: "Active",
      contactPerson: "Trust Manager Mr. Vijay Patil", phone: "+91 9876543280", altPhone: "+91 9876543281",
      email: "akkalkottemple@gmail.com", whatsapp: "+91 9876543280",
      address: "Temple Complex", city: "Akkalkot", state: "Maharashtra", pincode: "413216",
      landmark: "Swami Samarth Temple", coordinates: { lat: 17.5333, lng: 76.2000 },
      route: "RT-103", routeName: "East Route (Solapur Express)", distanceFromWarehouse: 98,
      sequenceInRoute: 6, deliveryTimeWindow: "03:00 PM - 05:00 PM",
      accessInstructions: "Trust office", parkingNotes: "Temple parking",
      avgOrder: 95, minOrder: 75, maxOrder: 130, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 142,
      creditLimit: 145000, currentDebt: 40000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 1349000, avgOrderValue: 28500, outstandingAmount: 40000,
      tier: "Platinum", priority: "High", segment: "Religious",
      jarDeposit: 9500, emptyJarsWithCustomer: 90, contractEndDate: "2027-06-30", discount: 14,
      satisfactionScore: 4.8, complaints: 0, praises: 23, referrals: 4
    },
    {
      id: "CUST-037", customerNumber: "C2025-037",
      name: "Hotel Akkalkot Darshan", businessName: "Darshan Hotels",
      type: "Business", status: "Active",
      contactPerson: "Mr. Prakash Bhosale", phone: "+91 9876543282", altPhone: "+91 9876543283",
      email: "hoteldarshan@gmail.com", whatsapp: "+91 9876543282",
      address: "Temple Road", city: "Akkalkot", state: "Maharashtra", pincode: "413216",
      landmark: "Near Temple", coordinates: { lat: 17.5320, lng: 76.2020 },
      route: "RT-103", routeName: "East Route (Solapur Express)", distanceFromWarehouse: 98.3,
      sequenceInRoute: 7, deliveryTimeWindow: "03:30 PM - 05:00 PM",
      accessInstructions: "Main entrance", parkingNotes: "Hotel parking",
      avgOrder: 65, minOrder: 50, maxOrder: 90, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 128,
      creditLimit: 95000, currentDebt: 27000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 832000, avgOrderValue: 19500, outstandingAmount: 27000,
      tier: "Gold", priority: "High", segment: "Hospitality",
      jarDeposit: 6500, emptyJarsWithCustomer: 60, contractEndDate: "2027-03-31", discount: 10,
      satisfactionScore: 4.6, complaints: 1, praises: 18, referrals: 2
    },
    {
      id: "CUST-038", customerNumber: "C2025-038",
      name: "Karmala Market Yard", businessName: "APMC Karmala",
      type: "Business", status: "Active",
      contactPerson: "Secretary Mr. Ashok Desai", phone: "+91 9876543284", altPhone: "+91 9876543285",
      email: "karmalaapmc@gmail.com", whatsapp: "+91 9876543284",
      address: "Market Yard", city: "Karmala", state: "Maharashtra", pincode: "413203",
      landmark: "Main Market", coordinates: { lat: 18.4000, lng: 75.1833 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 28,
      sequenceInRoute: 11, deliveryTimeWindow: "08:00 AM - 10:00 AM",
      accessInstructions: "Office building", parkingNotes: "Market parking",
      avgOrder: 50, minOrder: 35, maxOrder: 75, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 115,
      creditLimit: 75000, currentDebt: 21000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 575000, avgOrderValue: 15000, outstandingAmount: 21000,
      tier: "Gold", priority: "Medium", segment: "Corporate",
      jarDeposit: 5000, emptyJarsWithCustomer: 45, contractEndDate: "2026-11-30", discount: 8,
      satisfactionScore: 4.4, complaints: 1, praises: 15, referrals: 1
    },
    {
      id: "CUST-039", customerNumber: "C2025-039",
      name: "Madha Hospital", businessName: "Rural Hospital Madha",
      type: "Business", status: "Active",
      contactPerson: "Dr. Sangita Jadhav", phone: "+91 9876543286", altPhone: "+91 9876543287",
      email: "madhahospital@gov.in", whatsapp: "+91 9876543286",
      address: "Hospital Road", city: "Madha", state: "Maharashtra", pincode: "413209",
      landmark: "Near Tehsil", coordinates: { lat: 18.0667, lng: 75.1333 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 48,
      sequenceInRoute: 12, deliveryTimeWindow: "10:00 AM - 12:00 PM",
      accessInstructions: "Main entrance", parkingNotes: "Hospital parking",
      avgOrder: 70, minOrder: 55, maxOrder: 95, frequency: "Weekly",
      lastOrderDate: "2026-01-01", daysSinceLastOrder: 5, nextExpectedOrder: "2026-01-08", totalOrders: 124,
      creditLimit: 105000, currentDebt: 29000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 868000, avgOrderValue: 21000, outstandingAmount: 29000,
      tier: "Gold", priority: "High", segment: "Healthcare",
      jarDeposit: 7000, emptyJarsWithCustomer: 65, contractEndDate: "2027-02-28", discount: 11,
      satisfactionScore: 4.7, complaints: 0, praises: 20, referrals: 3
    },
    {
      id: "CUST-040", customerNumber: "C2025-040",
      name: "Madha Education Campus", businessName: "Madha College Trust",
      type: "Business", status: "Active",
      contactPerson: "Principal Dr. Ramesh Kulkarni", phone: "+91 9876543288", altPhone: "+91 9876543289",
      email: "principal@madhacollege.edu.in", whatsapp: "+91 9876543288",
      address: "College Road", city: "Madha", state: "Maharashtra", pincode: "413209",
      landmark: "Near Highway", coordinates: { lat: 18.0700, lng: 75.1300 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 48.5,
      sequenceInRoute: 13, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Main gate, admin office", parkingNotes: "Campus parking",
      avgOrder: 80, minOrder: 60, maxOrder: 110, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 136,
      creditLimit: 120000, currentDebt: 33000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 1088000, avgOrderValue: 24000, outstandingAmount: 33000,
      tier: "Gold", priority: "High", segment: "Corporate",
      jarDeposit: 8000, emptyJarsWithCustomer: 75, contractEndDate: "2027-05-31", discount: 12,
      satisfactionScore: 4.6, complaints: 1, praises: 19, referrals: 2
    },

    // ADDITIONAL CUSTOMERS TO REACH 50
    {
      id: "CUST-041", customerNumber: "C2025-041",
      name: "Barshi Market Complex", businessName: "Barshi APMC",
      type: "Business", status: "Active",
      contactPerson: "Mr. Suresh Mane", phone: "+91 9876543290", altPhone: "+91 9876543291",
      email: "barshimarket@gmail.com", whatsapp: "+91 9876543290",
      address: "Market Yard", city: "Barshi", state: "Maharashtra", pincode: "413401",
      landmark: "Main Market", coordinates: { lat: 18.2333, lng: 75.6833 },
      route: "RT-105", routeName: "Local Circuit (Sangola Surrounding)", distanceFromWarehouse: 65,
      sequenceInRoute: 14, deliveryTimeWindow: "12:00 PM - 02:00 PM",
      accessInstructions: "Office area", parkingNotes: "Market parking",
      avgOrder: 45, minOrder: 30, maxOrder: 65, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 107,
      creditLimit: 65000, currentDebt: 18000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 481500, avgOrderValue: 13500, outstandingAmount: 18000,
      tier: "Silver", priority: "Medium", segment: "Corporate",
      jarDeposit: 4500, emptyJarsWithCustomer: 40, contractEndDate: "2026-10-31", discount: 7,
      satisfactionScore: 4.3, complaints: 1, praises: 13, referrals: 1
    },
    {
      id: "CUST-042", customerNumber: "C2025-042",
      name: "Kurundvad Palace Hotel", businessName: "Heritage Hotels",
      type: "Business", status: "Potential",
      contactPerson: "Manager Mr. Rajendra Patil", phone: "+91 9876543292", altPhone: "+91 9876543293",
      email: "kurundvadpalace@gmail.com", whatsapp: "+91 9876543292",
      address: "Palace Road", city: "Kurundvad", state: "Maharashtra", pincode: "416106",
      landmark: "Old Palace", coordinates: { lat: 16.6833, lng: 74.5833 },
      route: "RT-104", routeName: "West Route (Sangli-Miraj)", distanceFromWarehouse: 88,
      sequenceInRoute: 6, deliveryTimeWindow: "02:00 PM - 04:00 PM",
      accessInstructions: "Main entrance", parkingNotes: "Heritage property parking",
      avgOrder: 0, minOrder: 50, maxOrder: 85, frequency: "Not yet ordered",
      lastOrderDate: null, daysSinceLastOrder: null, nextExpectedOrder: null, totalOrders: 0,
      creditLimit: 100000, currentDebt: 0, creditUsed: 0, paymentTerms: "Net 30",
      totalRevenue: 0, avgOrderValue: 0, outstandingAmount: 0,
      tier: "Bronze", priority: "Medium", segment: "Hospitality",
      jarDeposit: 0, emptyJarsWithCustomer: 0, contractEndDate: null, discount: 0,
      satisfactionScore: 0, complaints: 0, praises: 0, referrals: 0
    },
    {
      id: "CUST-043", customerNumber: "C2025-043",
      name: "Akluj Sugar Factory", businessName: "Akluj Co-op Sugar",
      type: "Business", status: "Active",
      contactPerson: "Mr. Deepak Shinde", phone: "+91 9876543294", altPhone: "+91 9876543295",
      email: "admin@aklujsugar.com", whatsapp: "+91 9876543294",
      address: "Factory Area", city: "Akluj", state: "Maharashtra", pincode: "413101",
      landmark: "Main Factory", coordinates: { lat: 17.8833, lng: 75.0167 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 42,
      sequenceInRoute: 11, deliveryTimeWindow: "02:00 PM - 04:00 PM",
      accessInstructions: "Security gate, canteen", parkingNotes: "Factory parking",
      avgOrder: 130, minOrder: 110, maxOrder: 175, frequency: "Daily",
      lastOrderDate: "2026-01-05", daysSinceLastOrder: 1, nextExpectedOrder: "2026-01-07", totalOrders: 267,
      creditLimit: 200000, currentDebt: 56000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 3471000, avgOrderValue: 39000, outstandingAmount: 56000,
      tier: "Platinum", priority: "High", segment: "Corporate",
      jarDeposit: 13000, emptyJarsWithCustomer: 125, contractEndDate: "2027-10-31", discount: 17,
      satisfactionScore: 4.8, complaints: 0, praises: 26, referrals: 4
    },
    {
      id: "CUST-044", customerNumber: "C2025-044",
      name: "Tuljapur Temple Canteen", businessName: "Tuljabhavani Temple Trust",
      type: "Business", status: "Active",
      contactPerson: "Manager Mr. Bhaskar Pawar", phone: "+91 9876543296", altPhone: "+91 9876543297",
      email: "tuljacanteen@gmail.com", whatsapp: "+91 9876543296",
      address: "Temple Complex", city: "Tuljapur", state: "Maharashtra", pincode: "413601",
      landmark: "Tuljabhavani Temple", coordinates: { lat: 18.0080, lng: 76.0689 },
      route: "RT-103", routeName: "East Route (Solapur Express)", distanceFromWarehouse: 85,
      sequenceInRoute: 8, deliveryTimeWindow: "08:00 AM - 10:00 AM",
      accessInstructions: "Temple canteen", parkingNotes: "Temple parking",
      avgOrder: 105, minOrder: 85, maxOrder: 140, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 178,
      creditLimit: 160000, currentDebt: 45000, creditUsed: 28, paymentTerms: "Net 15",
      totalRevenue: 1869000, avgOrderValue: 31500, outstandingAmount: 45000,
      tier: "Platinum", priority: "High", segment: "Religious",
      jarDeposit: 10500, emptyJarsWithCustomer: 100, contractEndDate: "2027-07-31", discount: 15,
      satisfactionScore: 4.7, complaints: 0, praises: 24, referrals: 3
    },
    {
      id: "CUST-045", customerNumber: "C2025-045",
      name: "Kavathe Mahankal Hospital", businessName: "Rural Hospital Kavathe",
      type: "Business", status: "Active",
      contactPerson: "Dr. Swati Kulkarni", phone: "+91 9876543298", altPhone: "+91 9876543299",
      email: "kavathehospital@gmail.com", whatsapp: "+91 9876543298",
      address: "Hospital Road", city: "Kavathe Mahankal", state: "Maharashtra", pincode: "416405",
      landmark: "Near Gram Panchayat", coordinates: { lat: 16.9833, lng: 75.1667 },
      route: "RT-102", routeName: "South Route (Jath-Tasgaon)", distanceFromWarehouse: 40,
      sequenceInRoute: 6, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Main entrance", parkingNotes: "Hospital parking",
      avgOrder: 55, minOrder: 40, maxOrder: 80, frequency: "Weekly",
      lastOrderDate: "2026-01-01", daysSinceLastOrder: 5, nextExpectedOrder: "2026-01-08", totalOrders: 118,
      creditLimit: 85000, currentDebt: 24000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 649000, avgOrderValue: 16500, outstandingAmount: 24000,
      tier: "Gold", priority: "Medium", segment: "Healthcare",
      jarDeposit: 5500, emptyJarsWithCustomer: 50, contractEndDate: "2027-01-31", discount: 9,
      satisfactionScore: 4.5, complaints: 1, praises: 17, referrals: 2
    },
    {
      id: "CUST-046", customerNumber: "C2025-046",
      name: "Atpadi Market Yard", businessName: "APMC Atpadi",
      type: "Business", status: "Active",
      contactPerson: "Secretary Mr. Vishnu Desai", phone: "+91 9876543300", altPhone: "+91 9876543301",
      email: "atpadimarket@gmail.com", whatsapp: "+91 9876543300",
      address: "Market Road", city: "Atpadi", state: "Maharashtra", pincode: "415301",
      landmark: "Main Market", coordinates: { lat: 17.4167, lng: 75.0833 },
      route: "RT-102", routeName: "South Route (Jath-Tasgaon)", distanceFromWarehouse: 58,
      sequenceInRoute: 7, deliveryTimeWindow: "01:00 PM - 02:30 PM",
      accessInstructions: "Office building", parkingNotes: "Market parking",
      avgOrder: 48, minOrder: 35, maxOrder: 70, frequency: "Weekly",
      lastOrderDate: "2026-01-03", daysSinceLastOrder: 3, nextExpectedOrder: "2026-01-10", totalOrders: 101,
      creditLimit: 70000, currentDebt: 20000, creditUsed: 29, paymentTerms: "Net 15",
      totalRevenue: 484800, avgOrderValue: 14400, outstandingAmount: 20000,
      tier: "Silver", priority: "Medium", segment: "Corporate",
      jarDeposit: 4800, emptyJarsWithCustomer: 43, contractEndDate: "2026-09-30", discount: 7,
      satisfactionScore: 4.2, complaints: 2, praises: 12, referrals: 1
    },
    {
      id: "CUST-047", customerNumber: "C2025-047",
      name: "Walwa College", businessName: "Walwa Education Trust",
      type: "Business", status: "Active",
      contactPerson: "Principal Dr. Ashok Patil", phone: "+91 9876543302", altPhone: "+91 9876543303",
      email: "principal@walwacollege.edu.in", whatsapp: "+91 9876543302",
      address: "College Road", city: "Walwa", state: "Maharashtra", pincode: "415303",
      landmark: "Near Highway", coordinates: { lat: 17.0167, lng: 74.6000 },
      route: "RT-102", routeName: "South Route (Jath-Tasgaon)", distanceFromWarehouse: 85,
      sequenceInRoute: 8, deliveryTimeWindow: "12:00 PM - 02:00 PM",
      accessInstructions: "Main gate, admin office", parkingNotes: "College parking",
      avgOrder: 65, minOrder: 50, maxOrder: 90, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 127,
      creditLimit: 95000, currentDebt: 27000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 825500, avgOrderValue: 19500, outstandingAmount: 27000,
      tier: "Gold", priority: "High", segment: "Corporate",
      jarDeposit: 6500, emptyJarsWithCustomer: 60, contractEndDate: "2027-03-31", discount: 10,
      satisfactionScore: 4.6, complaints: 0, praises: 18, referrals: 2
    },
    {
      id: "CUST-048", customerNumber: "C2025-048",
      name: "Malshiras Town Hospital", businessName: "Rural Hospital Malshiras",
      type: "Business", status: "Active",
      contactPerson: "Dr. Nitin Jadhav", phone: "+91 9876543304", altPhone: "+91 9876543305",
      email: "malshirashospital@gov.in", whatsapp: "+91 9876543304",
      address: "Hospital Road", city: "Malshiras", state: "Maharashtra", pincode: "413310",
      landmark: "Near Police Station", coordinates: { lat: 17.4850, lng: 75.5800 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 68,
      sequenceInRoute: 14, deliveryTimeWindow: "01:00 PM - 03:00 PM",
      accessInstructions: "Main entrance", parkingNotes: "Hospital parking",
      avgOrder: 60, minOrder: 45, maxOrder: 85, frequency: "Weekly",
      lastOrderDate: "2026-01-02", daysSinceLastOrder: 4, nextExpectedOrder: "2026-01-09", totalOrders: 114,
      creditLimit: 90000, currentDebt: 25000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 684000, avgOrderValue: 18000, outstandingAmount: 25000,
      tier: "Gold", priority: "Medium", segment: "Healthcare",
      jarDeposit: 6000, emptyJarsWithCustomer: 55, contractEndDate: "2027-02-28", discount: 9,
      satisfactionScore: 4.5, complaints: 1, praises: 16, referrals: 2
    },
    {
      id: "CUST-049", customerNumber: "C2025-049",
      name: "Kale Hotel Pandharpur", businessName: "Kale Hospitality",
      type: "Business", status: "Active",
      contactPerson: "Mr. Ramdas Kale", phone: "+91 9876543306", altPhone: "+91 9876543307",
      email: "kalehotel@gmail.com", whatsapp: "+91 9876543306",
      address: "Near Temple", city: "Pandharpur", state: "Maharashtra", pincode: "413304",
      landmark: "Temple Area", coordinates: { lat: 17.6810, lng: 75.3315 },
      route: "RT-101", routeName: "North Route (Pandharpur-Mangalvedhe)", distanceFromWarehouse: 34.2,
      sequenceInRoute: 9, deliveryTimeWindow: "11:00 AM - 01:00 PM",
      accessInstructions: "Main entrance", parkingNotes: "Hotel parking",
      avgOrder: 42, minOrder: 30, maxOrder: 60, frequency: "Weekly",
      lastOrderDate: "2026-01-04", daysSinceLastOrder: 2, nextExpectedOrder: "2026-01-11", totalOrders: 121,
      creditLimit: 60000, currentDebt: 17000, creditUsed: 28, paymentTerms: "COD",
      totalRevenue: 508200, avgOrderValue: 12600, outstandingAmount: 17000,
      tier: "Silver", priority: "Medium", segment: "Hospitality",
      jarDeposit: 4200, emptyJarsWithCustomer: 38, contractEndDate: "2026-08-31", discount: 6,
      satisfactionScore: 4.3, complaints: 1, praises: 13, referrals: 1
    },
    {
      id: "CUST-050", customerNumber: "C2025-050",
      name: "Kupwad MIDC Office", businessName: "MIDC Kupwad Sangli",
      type: "Business", status: "Active",
      contactPerson: "Officer Mr. Avinash Desai", phone: "+91 9876543308", altPhone: "+91 9876543309",
      email: "kupwadmidc@gov.in", whatsapp: "+91 9876543308",
      address: "MIDC Area", city: "Kupwad", state: "Maharashtra", pincode: "416436",
      landmark: "Industrial Area", coordinates: { lat: 16.8050, lng: 74.5850 },
      route: "RT-104", routeName: "West Route (Sangli-Miraj)", distanceFromWarehouse: 89,
      sequenceInRoute: 7, deliveryTimeWindow: "02:00 PM - 04:00 PM",
      accessInstructions: "Admin office", parkingNotes: "MIDC parking",
      avgOrder: 75, minOrder: 60, maxOrder: 105, frequency: "Weekly",
      lastOrderDate: "2026-01-01", daysSinceLastOrder: 5, nextExpectedOrder: "2026-01-08", totalOrders: 138,
      creditLimit: 110000, currentDebt: 31000, creditUsed: 28, paymentTerms: "Net 30",
      totalRevenue: 1035000, avgOrderValue: 22500, outstandingAmount: 31000,
      tier: "Gold", priority: "Medium", segment: "Corporate",
      jarDeposit: 7500, emptyJarsWithCustomer: 70, contractEndDate: "2027-04-30", discount: 11,
      satisfactionScore: 4.6, complaints: 0, praises: 19, referrals: 2
    }
  ]);

  // === FILTER & SORT LOGIC ===
  const getFilteredCustomers = () => {
    let filtered = customers;

    if (filterType !== 'all') {
      filtered = filtered.filter(c => c.status.toLowerCase() === filterType);
    }

    if (filterTier !== 'all') {
      filtered = filtered.filter(c => c.tier.toLowerCase() === filterTier);
    }

    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.customerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'revenue') return b.totalRevenue - a.totalRevenue;
      if (sortBy === 'frequency') {
        const aDays = a.daysSinceLastOrder ?? 999;
        const bDays = b.daysSinceLastOrder ?? 999;
        return aDays - bDays;
      }
      if (sortBy === 'distance') return a.distanceFromWarehouse - b.distanceFromWarehouse;
      return 0;
    });

    return filtered;
  };

  const filteredCustomers = getFilteredCustomers();

  // === STATISTICS ===
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    potential: customers.filter(c => c.status === 'Potential').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalRevenue, 0),
    avgOrderValue: customers.reduce((sum, c) => sum + c.avgOrderValue, 0) / customers.length
  };

  // === ACTIONS ===
  const toggleSelection = (id) => {
    setSelectedCustomers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    
    const newId = `CUST-${String(customers.length + 1).padStart(3, '0')}`;
    const newCustNumber = `C2025-${String(customers.length + 1).padStart(3, '0')}`;
    
    const customerToAdd = {
      id: newId,
      customerNumber: newCustNumber,
      name: newCustomer.name,
      businessName: newCustomer.businessName,
      type: "Business",
      status: newCustomer.status,
      
      contactPerson: newCustomer.contactPerson,
      phone: newCustomer.phone,
      altPhone: null,
      email: newCustomer.email,
      whatsapp: newCustomer.phone,
      
      address: newCustomer.address,
      city: newCustomer.city,
      state: newCustomer.state,
      pincode: newCustomer.pincode,
      landmark: "",
      coordinates: { lat: 0, lng: 0 },
      
      route: newCustomer.route,
      routeName: "",
      distanceFromWarehouse: 0,
      sequenceInRoute: null,
      deliveryTimeWindow: "Flexible",
      accessInstructions: "",
      parkingNotes: "",
      
      avgOrder: parseInt(newCustomer.avgOrder) || 0,
      minOrder: 0,
      maxOrder: 0,
      frequency: newCustomer.frequency,
      lastOrderDate: null,
      daysSinceLastOrder: null,
      nextExpectedOrder: null,
      totalOrders: 0,
      
      creditLimit: parseInt(newCustomer.creditLimit) || 0,
      currentDebt: 0,
      creditUsed: 0,
      paymentTerms: "Net 30",
      totalRevenue: 0,
      avgOrderValue: 0,
      outstandingAmount: 0,
      
      tier: newCustomer.tier,
      priority: "Medium",
      segment: newCustomer.segment,
      
      jarDeposit: 0,
      emptyJarsWithCustomer: 0,
      contractEndDate: null,
      discount: 0,
      
      satisfactionScore: 0,
      complaints: 0,
      praises: 0,
      referrals: 0
    };

    setCustomers([...customers, customerToAdd]);
    setShowAddModal(false);
    
    // Reset form
    setNewCustomer({
      name: '',
      businessName: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: 'Maharashtra',
      pincode: '',
      route: 'RT-101',
      avgOrder: '',
      frequency: 'Weekly',
      creditLimit: '',
      tier: 'Bronze',
      segment: 'Corporate',
      status: 'Active'
    });

    alert(`✅ Customer "${customerToAdd.name}" added successfully!`);
  };

  const handleExportToRoute = () => {
    alert(`📍 Exporting ${selectedCustomers.length} customers to Route Planner...\n\nThis will help optimize delivery sequences.`);
  };

  const handleCreateRoute = () => {
    const selected = customers.filter(c => selectedCustomers.includes(c.id));
    const routeInfo = selected.map(c => `${c.name} (${c.city})`).join(', ');
    alert(`🚚 Creating optimized route for:\n\n${routeInfo}\n\nTotal customers: ${selected.length}\nTotal expected jars: ${selected.reduce((sum, c) => sum + c.avgOrder, 0)}`);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      
      {/* === HEADER === */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-2">
              <User className="text-indigo-600" size={32} />
              Customer Database
            </h1>
            <p className="text-slate-500 text-sm">
              Complete customer information for route planning & optimization (Sangola + 100km)
            </p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm"
            >
              <Plus size={18} /> Add Customer
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 font-bold text-slate-600">
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
            <p className="text-xs text-indigo-700 font-bold uppercase mb-1">Total Customers</p>
            <p className="text-3xl font-bold text-indigo-900">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
            <p className="text-xs text-emerald-700 font-bold uppercase mb-1">Active</p>
            <p className="text-3xl font-bold text-emerald-900">{stats.active}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
            <p className="text-xs text-amber-700 font-bold uppercase mb-1">Potential</p>
            <p className="text-3xl font-bold text-amber-900">{stats.potential}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <p className="text-xs text-purple-700 font-bold uppercase mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-900">₹{(stats.totalRevenue/10000000).toFixed(2)}Cr</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-700 font-bold uppercase mb-1">Avg Order</p>
            <p className="text-2xl font-bold text-blue-900">₹{(stats.avgOrderValue/1000).toFixed(1)}k</p>
          </div>
        </div>
      </div>

      {/* === FILTERS & SEARCH === */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="text-xs font-bold text-slate-600 uppercase mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, city, contact..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase mb-2 block">Status</label>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="potential">Potential</option>
            </select>
          </div>

          {/* Tier Filter */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase mb-2 block">Tier</label>
            <select 
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="all">All Tiers</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase mb-2 block">Sort By</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="name">Name (A-Z)</option>
              <option value="revenue">Revenue (High-Low)</option>
              <option value="frequency">Recent Orders</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </div>
      </div>

            {/* === BULK ACTIONS === */}
      {selectedCustomers.length > 0 && (
        <div className="bg-indigo-900 text-white rounded-xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-emerald-400" />
            <span className="font-bold">{selectedCustomers.length} customers selected</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleExportToRoute}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-sm transition-colors border border-white/10"
            >
              Export to Route
            </button>
            <button 
              onClick={handleCreateRoute}
              className="px-4 py-2 bg-white text-indigo-900 hover:bg-indigo-50 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <Navigation size={16} /> Create Optimized Route
            </button>
          </div>
        </div>
      )}

      {/* === CUSTOMER TABLE === */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-left w-12">
                  <input 
                    type="checkbox"
                    checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCustomers(filteredCustomers.map(c => c.id));
                      } else {
                        setSelectedCustomers([]);
                      }
                    }}
                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Location & Route</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order Pattern</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Financial</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <input 
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => toggleSelection(customer.id)}
                      className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </td>
                  
                  {/* Customer Info */}
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-sm ${
                        customer.tier === 'Platinum' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                        customer.tier === 'Gold' ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                        customer.tier === 'Silver' ? 'bg-gradient-to-br from-slate-400 to-slate-500' :
                        'bg-gradient-to-br from-orange-400 to-red-500'
                      }`}>
                        {customer.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{customer.name}</h4>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{customer.customerNumber}</p>
                        <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                          <User size={10} /> {customer.contactPerson}
                        </p>
                        <a href={`tel:${customer.phone}`} className="text-xs text-indigo-600 hover:underline flex items-center gap-1 mt-0.5">
                          <Phone size={10} /> {customer.phone}
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Location & Route */}
                  <td className="p-4">
                    <div className="text-xs space-y-1.5">
                      <p className="font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin size={12} className="text-red-500" />
                        {customer.city}
                      </p>
                      <p className="text-slate-500 truncate max-w-[180px]" title={customer.address}>{customer.address}</p>
                      {customer.route && (
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 font-bold flex items-center gap-1">
                            <Truck size={10} /> {customer.route}
                          </span>
                          <span className="text-slate-500 font-medium">{customer.distanceFromWarehouse} km</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Order Pattern */}
                  <td className="p-4">
                    <div className="text-xs space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Package size={12} className="text-emerald-600" />
                        <span className="font-bold text-slate-800">{customer.avgOrder} jars avg</span>
                      </div>
                      <p className="text-slate-600 flex items-center gap-1">
                        <Clock size={10} /> {customer.frequency}
                      </p>
                      {customer.daysSinceLastOrder !== null && (
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${
                          customer.daysSinceLastOrder <= 7 ? 'bg-emerald-50 text-emerald-700' :
                          customer.daysSinceLastOrder <= 14 ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'
                        } font-bold`}>
                          {customer.daysSinceLastOrder} days ago
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Financial */}
                  <td className="p-4">
                    <div className="text-xs space-y-1.5">
                      <div className="flex items-center gap-2">
                        <DollarSign size={12} className="text-purple-600" />
                        <span className="font-bold text-slate-800">₹{(customer.totalRevenue/1000).toFixed(0)}k total</span>
                      </div>
                      
                      {customer.currentDebt > 0 && (
                        <div className="w-32">
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px] text-slate-500">Credit Used</span>
                            <span className={`text-[10px] font-bold ${customer.creditUsed > 80 ? 'text-rose-600' : 'text-slate-700'}`}>
                              {customer.creditUsed}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div 
                              className={`h-full rounded-full ${
                                customer.creditUsed > 80 ? 'bg-rose-500' : 
                                customer.creditUsed > 50 ? 'bg-amber-500' : 
                                'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(customer.creditUsed, 100)}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">Limit: ₹{(customer.creditLimit/1000).toFixed(0)}k</p>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
                        customer.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        customer.status === 'Potential' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-slate-50 text-slate-600 border-slate-100'
                      }`}>
                        {customer.status === 'Active' && <CheckCircle size={10} />}
                        {customer.status}
                      </span>
                      {customer.status === 'Active' && (
                        <div className="flex items-center gap-1 ml-1">
                          <Star size={10} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-slate-700">{customer.satisfactionScore}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-200 hover:border-indigo-200">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-slate-200 hover:border-emerald-200">
                        <Map size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <Search size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700">No customers found</h3>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* === ADD CUSTOMER MODAL === */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Plus className="text-indigo-600" /> Add New Customer
                </h2>
                <p className="text-sm text-slate-500">Enter customer details for route planning</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddCustomer} className="p-6 space-y-6">
              
              {/* Section 1: Basic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Business/Customer Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="e.g. Hotel Sangola Grand"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Contact Person</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="e.g. Mr. Rajesh Patil"
                      value={newCustomer.contactPerson}
                      onChange={(e) => setNewCustomer({...newCustomer, contactPerson: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="+91 98765 43210"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email (Optional)</label>
                    <input 
                      type="email"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="contact@business.com"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Section 2: Location */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={14} /> Location Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Address</label>
                    <input 
                      required
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="Street, Area, Landmark"
                      value={newCustomer.address}
                      onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">City</label>
                    <input 
                      required
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="e.g. Pandharpur"
                      value={newCustomer.city}
                      onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Route Assignment</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
                      value={newCustomer.route}
                      onChange={(e) => setNewCustomer({...newCustomer, route: e.target.value})}
                    >
                      <option value="RT-101">RT-101 (Pandharpur-Mangalvedhe)</option>
                      <option value="RT-102">RT-102 (Jath-Tasgaon)</option>
                      <option value="RT-103">RT-103 (Solapur Express)</option>
                      <option value="RT-104">RT-104 (Sangli-Miraj)</option>
                      <option value="RT-105">RT-105 (Local Circuit)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Section 3: Business Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp size={14} /> Business Potential
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Avg Jars/Order</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="e.g. 50"
                      value={newCustomer.avgOrder}
                      onChange={(e) => setNewCustomer({...newCustomer, avgOrder: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Frequency</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
                      value={newCustomer.frequency}
                      onChange={(e) => setNewCustomer({...newCustomer, frequency: e.target.value})}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Credit Limit (₹)</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="e.g. 50000"
                      value={newCustomer.creditLimit}
                      onChange={(e) => setNewCustomer({...newCustomer, creditLimit: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Segment</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
                      value={newCustomer.segment}
                      onChange={(e) => setNewCustomer({...newCustomer, segment: e.target.value})}
                    >
                      <option value="Corporate">Corporate</option>
                      <option value="Hospitality">Hospitality (Hotel/Restaurant)</option>
                      <option value="Healthcare">Healthcare (Hospital/Clinic)</option>
                      <option value="Education">Education (School/College)</option>
                      <option value="Retail">Retail/Shop</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tier</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
                      value={newCustomer.tier}
                      onChange={(e) => setNewCustomer({...newCustomer, tier: e.target.value})}
                    >
                      <option value="Platinum">Platinum</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                    <select 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
                      value={newCustomer.status}
                      onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Potential">Potential</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100">
                <button 
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save New Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerList;

