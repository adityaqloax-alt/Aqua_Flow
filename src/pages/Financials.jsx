import React from "react";
import { Download, Calendar } from "lucide-react";

// --- Financial Components ---

// 1. Updated Import Path (as requested)
import FinancialKPIGrid from "../components/financials/company/FinancialKPIGrid";

// 2. Other Components (Check if these also need 'company/' in their path?)
import RevenueBreakdown from "@/components/financials/company/RevenueBreakdown";
import CostAnalytics from "@/components/financials/company/CostAnalytics";
import CashFlow from "@/components/financials/company/CashFlow";
import ReceivablesAging from "@/components/financials/company/ReceivablesAging";
import FinancialLoss from "@/components/financials/company/FinancialLoss";
import FinancialForecast from "@/components/financials/company/FinancialForecast";
import GSTAnalytics from "@/components/financials/company/GSTAnalytics";
import ProfitabilityByRoute from "@/components/financials/company/ProfitabilityByRoute";


const Financials = () => {
  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Financial Performance
          </h1>
          <p className="text-slate-500 mt-1">
            Real-time financial health, cash flow, and profitability insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors shadow-sm">
             <Calendar size={18} />
             <span>Dec 2025</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20">
             <Download size={18} />
             <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* --- SECTION 1: Executive KPIs --- */}
      <section>
         <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Executive Overview</h2>
         <FinancialKPIGrid />
      </section>

      {/* --- SECTION 2: Income Statement Analysis --- */}
      <section>
         <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Revenue & Cost Structure</h2>
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
           <div className="h-full">
             <RevenueBreakdown />
           </div>
           <div className="h-full">
             <CostAnalytics />
           </div>
         </div>
      </section>

      {/* --- SECTION 3: Cash Flow & Liquidity --- */}
      <section>
         <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Cash Flow & Liquidity</h2>
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
           <CashFlow />
           <ReceivablesAging />
         </div>
      </section>

      {/* --- SECTION 4: Risk Management --- */}
      <section>
         <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Operational Risk & Loss</h2>
         <FinancialLoss />
      </section>

      {/* --- SECTION 5: Compliance & Segment Performance --- */}
      <section>
         <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Tax & Segment Profitability</h2>
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
           <GSTAnalytics />
           <ProfitabilityByRoute />
         </div>
      </section>

      {/* --- SECTION 6: Future Outlook --- */}
      <section>
         <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Financial Projections</h2>
         <FinancialForecast />
      </section>

    </div>
  );
};

export default Financials;
