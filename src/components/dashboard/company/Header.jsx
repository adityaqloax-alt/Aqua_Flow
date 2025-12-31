import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  RefreshCw, 
  ChevronDown, 
  Command, 
  LogOut,
  User,
  Settings,
  HelpCircle,
  CheckCircle2,
  X,
  Globe,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [userStatus, setUserStatus] = useState('Online'); // Online, Away, Busy
  
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const getStatusColor = () => {
    switch(userStatus) {
      case 'Online': return 'bg-emerald-500';
      case 'Away': return 'bg-amber-500';
      case 'Busy': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <header className="sticky top-0 z-50 px-6 py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        
        {/* Left Section: Context Breadcrumbs */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
             <div className="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 rounded text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
               <Globe size={10}/> US-East-1
             </div>
             <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
               <ShieldCheck size={10}/> Prod
             </div>
          </div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
            Control Center
            <span className="text-slate-300 font-light">/</span>
            <span className="text-slate-500 font-medium text-sm">Overview</span>
          </h2>
        </div>

        {/* Right Section: Search, Actions, Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Animated Global Search */}
          <div className="relative group">
            <div 
              className={`
                hidden md:flex items-center bg-slate-100/50 border border-slate-200 
                rounded-xl px-3 py-2 transition-all duration-300 ease-in-out
                ${isSearchFocused ? 'w-96 bg-white ring-2 ring-indigo-500/20 border-indigo-500 shadow-lg' : 'w-64 hover:bg-slate-100 hover:border-slate-300'}
              `}
            >
              <Search 
                size={16} 
                className={`transition-colors duration-300 ${isSearchFocused ? 'text-indigo-500' : 'text-slate-400'}`} 
              />
              <input 
                type="text" 
                placeholder="Search orders, SKU, users..." 
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-transparent border-none outline-none text-sm ml-3 placeholder:text-slate-400 text-slate-700 h-8"
              />
              <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 shadow-sm">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>
            
            {/* Search Dropdown (Simulation) */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 w-96 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                 <div className="p-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Recent</p>
                    <button className="w-full text-left px-2 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded flex items-center gap-2">
                       <Clock size={14} className="text-slate-400"/> Order #SO-9921
                    </button>
                    <button className="w-full text-left px-2 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded flex items-center gap-2">
                       <Clock size={14} className="text-slate-400"/> Batch B-102
                    </button>
                 </div>
                 <div className="border-t border-slate-100 p-2 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Quick Jump</p>
                    <div className="flex gap-2">
                       <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-indigo-600 cursor-pointer hover:border-indigo-200">Production</span>
                       <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-indigo-600 cursor-pointer hover:border-indigo-200">Inventory</span>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
            
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative group p-2 rounded-xl transition-all duration-200 ${isNotifOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
              >
                <Bell size={20} className={isNotifOpen ? '' : 'group-hover:rotate-12 transition-transform duration-300'} />
                <span className="absolute top-2 right-2.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border-2 border-white"></span>
                </span>
              </button>

              {/* Notification Dropdown */}
              {isNotifOpen && (
                 <div className="absolute top-full right-0 w-80 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                       <h4 className="font-bold text-slate-700 text-sm">Notifications</h4>
                       <span className="text-xs text-indigo-600 font-bold cursor-pointer hover:underline">Mark all read</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                       {[1,2,3].map((_, i) => (
                         <div key={i} className="p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3">
                            <div className="mt-1 h-2 w-2 rounded-full bg-rose-500 flex-shrink-0"></div>
                            <div>
                               <p className="text-xs font-bold text-slate-800">Critical Alert: Server Load</p>
                               <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">CPU usage exceeded 90% on US-East-1 instances.</p>
                               <p className="text-[10px] text-slate-400 mt-1">2 mins ago</p>
                            </div>
                         </div>
                       ))}
                    </div>
                    <button className="w-full py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                       View All Activity
                    </button>
                 </div>
              )}
            </div>

            {/* Sync Button */}
            <div className="hidden sm:flex flex-col items-end">
               <button 
                 onClick={handleSync}
                 className="group flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-indigo-600 active:scale-95 transition-all duration-200 shadow-md shadow-slate-200 hover:shadow-indigo-200"
               >
                 <RefreshCw size={14} className={isSyncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
                 <span>{isSyncing ? 'Syncing...' : 'Sync Data'}</span>
               </button>
               <span className="text-[9px] text-slate-400 font-medium mt-0.5">Last synced: 2m ago</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-2 group outline-none"
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Profile" 
                    className={`w-9 h-9 rounded-full border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-105 ${isProfileOpen ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
                  />
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${getStatusColor()}`}></span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Tom Cook</p>
                  <p className="text-xs text-slate-500">Admin</p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 hidden lg:block ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Menu */}
              {isProfileOpen && (
                 <div className="absolute top-full right-0 w-56 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    
                    {/* Status Toggle */}
                    <div className="p-2 border-b border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Set Status</p>
                       <div className="flex gap-1">
                          {['Online', 'Away', 'Busy'].map(status => (
                            <button 
                              key={status}
                              onClick={() => setUserStatus(status)}
                              className={`flex-1 py-1.5 text-[10px] font-bold rounded hover:bg-slate-50 transition-colors ${userStatus === status ? 'bg-slate-100 text-slate-800' : 'text-slate-500'}`}
                            >
                              {status}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="p-2">
                       <button className="w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded flex items-center gap-2">
                          <User size={16} className="text-slate-400"/> Profile
                       </button>
                       <button className="w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded flex items-center gap-2">
                          <Settings size={16} className="text-slate-400"/> Settings
                       </button>
                       <button className="w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded flex items-center gap-2">
                          <HelpCircle size={16} className="text-slate-400"/> Help Center
                       </button>
                    </div>

                    <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                       <button className="w-full text-left px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded flex items-center gap-2 transition-colors">
                          <LogOut size={16}/> Sign Out
                       </button>
                    </div>
                 </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
