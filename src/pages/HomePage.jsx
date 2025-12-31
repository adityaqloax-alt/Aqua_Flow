import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Droplets, BarChart3, Truck, ShieldCheck, ArrowRight, 
  Activity, ChevronRight, Factory, Phone, MapPin, Download 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginPage from "./LoginPage";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showDealerModal, setShowDealerModal] = useState(false);
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Products data (Bisleri-style)
  const products = [
    { name: "20L Jar", price: "₹25", size: "20L", stock: "500+", icon: "🏪" },
    { name: "1L Bottle", price: "₹20", size: "1L", stock: "2000+", icon: "🥤" },
    { name: "500ml Bottle", price: "₹12", size: "500ml", stock: "1500+", icon: "🍼" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans text-slate-900">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Droplets className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AquaFlow</h1>
              <p className="text-xs text-slate-500">Trusted Water Supply</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-slate-700 hover:text-blue-600 font-medium">Products</a>
            <a href="#quality" className="text-slate-700 hover:text-blue-600 font-medium">Quality</a>
            <a href="#order" className="text-slate-700 hover:text-blue-600 font-medium">Order Now</a>
            <a href="#corporate" className="text-slate-700 hover:text-blue-600 font-medium">Corporate</a>
            <button onClick={() => setIsLoginOpen(true)} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
              Dashboard
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-8">
          <button className="float-right" onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
          <div className="mt-16 space-y-6">
            <a href="#products" className="block py-2 text-xl font-bold text-slate-900">Products</a>
            <a href="#quality" className="block py-2 text-xl font-bold text-slate-900">Quality</a>
            <a href="#order" className="block py-2 text-xl font-bold text-slate-900">Order Now</a>
            <button onClick={() => {setMobileMenuOpen(false); setIsLoginOpen(true);}} className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg">
              Dashboard Login
            </button>
          </div>
        </div>
      )}

      {/* Hero - BISLERI STYLE */}
      <section className="pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Pure Water Delivered
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            BIS/FSSAI Certified • 7-Stage Purification • Same Day Delivery • Subscription Available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="#order" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
              Order Now
            </a>
            <button onClick={() => setShowDealerModal(true)} className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all">
              Become Dealer
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 items-center mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
              <ShieldCheck size={20} className="text-green-600" />
              <span className="font-bold text-green-800">BIS Certified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
              <ShieldCheck size={20} className="text-blue-600" />
              <span className="font-bold text-blue-800">FSSAI Licensed</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-lg">
              <ShieldCheck size={20} className="text-indigo-600" />
              <span className="font-bold text-indigo-800">ISO 22000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog - KINLEY STYLE */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="group bg-slate-50 rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all border hover:border-blue-200">
                <div className="text-5xl mb-6">{product.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{product.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">₹{product.price}</div>
                <p className="text-slate-600 mb-6">{product.size} - {product.stock} Available</p>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality - BISLERI STYLE */}
      <section id="quality" className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">7-Stage Purification Process</h2>
              <div className="space-y-6">
                {[
                  "Pre-Filtration", "Carbon Filtration", "Reverse Osmosis", 
                  "UV Disinfection", "Ozonation", "Mineralization", "Micron Filtration"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <span className="font-semibold">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
                <h4 className="font-bold text-lg mb-2">Latest Quality Report</h4>
                <p className="text-sm text-slate-600 mb-4">TDS: 45 ppm | pH: 7.2 | Tested: Dec 2025</p>
                <a href="#" className="text-blue-600 font-bold hover:underline">Download Report PDF</a>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop" 
                   alt="Purification Plant" 
                   className="w-full h-96 object-cover rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Order Now - AGUA STYLE */}
      <section id="order" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Order Water Online</h2>
          <p className="text-xl text-slate-600 mb-12">Same day delivery • Subscription available • Free installation</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="text-3xl mb-4">🚚</div>
              <h4 className="font-bold text-xl mb-2">Fast Delivery</h4>
              <p className="text-slate-600">Within 2 hours in Narnaund</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="text-3xl mb-4">🔄</div>
              <h4 className="font-bold text-xl mb-2">Subscription</h4>
              <p className="text-slate-600">Weekly/Monthly auto-delivery</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="text-3xl mb-4">✅</div>
              <h4 className="font-bold text-xl mb-2">100% Pure</h4>
              <p className="text-slate-600">BIS Certified Guarantee</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Order?</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 p-4 bg-white/20 rounded-2xl">
                <MapPin size={24} />
                <div>
                  <div className="font-bold">Enter Pincode</div>
                  <input type="text" placeholder="124001" className="bg-white/30 rounded p-2 w-full mt-1 text-black" />
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/20 rounded-2xl">
                <Phone size={24} />
                <div>
                  <div className="font-bold">Call Us</div>
                  <a href="tel:+919999999999" className="text-xl font-bold">+91 99999 99999</a>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto px-12 py-4 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all mx-auto block">
              Start Ordering
            </button>
          </div>
        </div>
      </section>

      {/* Corporate */}
      <section id="corporate" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Corporate & Bulk Supply</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Office • Factory • Events</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1 font-bold text-white flex items-center justify-center">✓</div>
                  <span>Monthly bulk contracts (50-5000 jars)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1 font-bold text-white flex items-center justify-center">✓</div>
                  <span>Custom delivery schedules</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1 font-bold text-white flex items-center justify-center">✓</div>
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              <button className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg">
                Get Corporate Quote
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm font-bold text-slate-600">Happy Offices</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm font-bold text-slate-600">Factories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Trusted by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Sharma", role: "Hotel Owner", quote: "Reliable delivery, great quality water!", stars: 5 },
              { name: "Priya Singh", role: "Office Manager", quote: "Subscription service is perfect for us!", stars: 5 },
              { name: "Vikram Gupta", role: "Factory Head", quote: "Best rates for bulk supply!", stars: 5 }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-2xl hover:shadow-xl transition-all">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <span key={i} className="text-2xl text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dealer Modal */}
      {showDealerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Become Our Dealer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input type="text" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Phone</label>
                <input type="tel" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Location</label>
                <input type="text" placeholder="Narnaund, Haryana" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg">
                Submit Application
              </button>
            </div>
            <button onClick={() => setShowDealerModal(false)} className="mt-6 text-slate-500 hover:text-slate-900">Close</button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh]">
            <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 z-10 text-slate-500 hover:text-slate-900">
              <X size={24} />
            </button>
            <LoginPage />
          </div>
        </div>
      )}

      {/* Footer - Standard */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Droplets className="w-10 h-10 text-blue-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">AquaFlow</h3>
                <p className="text-sm">Narnaund, Haryana</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-white">20L Jar</a></li>
              <li><a href="#products" className="hover:text-white">1L Bottle</a></li>
              <li><a href="#products" className="hover:text-white">500ml Bottle</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#quality" className="hover:text-white">Quality</a></li>
              <li><a href="#corporate" className="hover:text-white">Corporate</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-white">
                <Phone size={16} /> +91 99999 99999
              </a>
              <p>Narnaund, Haryana</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2025 AquaFlow Water Supply. BIS/FSSAI Certified. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
