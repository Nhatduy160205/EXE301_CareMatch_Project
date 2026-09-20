import React from 'react';
import { Home, UserCheck, Stethoscope, ShieldCheck, HeartPulse } from 'lucide-react';
import logoIcon from '../assets/logo-icon.png';

export default function Navbar({ currentView, setView, activeRole, setRole }) {
  return (
    <header class="sticky top-0 z-40 bg-slate-900 text-white shadow-xl border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand logo & return button */}
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 rounded-2xl bg-slate-950 border-2 border-teal-500 overflow-hidden shadow-md shadow-teal-500/20 shrink-0 flex items-center justify-center p-1">
            <img 
              src={logoIcon} 
              alt="CareMatch Logo" 
              class="w-full h-full object-contain"
            />
          </div>
          <div>
            <div class="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
              <span>Care<span class="text-teal-400">Match</span></span>
              <span class="text-[10px] bg-teal-500/20 text-teal-300 font-semibold px-2.5 py-0.5 rounded-full border border-teal-500/30">
                EXE1 React MVP
              </span>
            </div>
            <p class="text-[11px] text-slate-400">Nền tảng Hộ lý & Bữa ăn Dinh dưỡng</p>
          </div>

          {currentView === 'APP' && (
            <button 
              onClick={() => setView('INTRO')} 
              class="ml-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Home class="w-3.5 h-3.5 text-teal-400" />
              <span class="hidden md:inline">Về trang Intro</span>
            </button>
          )}
        </div>

        {/* 3 ROLE SELECTOR TABS */}
        {currentView === 'APP' ? (
          <div class="flex items-center bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700/80 overflow-x-auto">
            <button 
              onClick={() => setRole('BUYER')} 
              class={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeRole === 'BUYER' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck class="w-4 h-4" />
              <span>1. Con cái (Buyer)</span>
            </button>

            <button 
              onClick={() => setRole('CAREGIVER')} 
              class={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeRole === 'CAREGIVER' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope class="w-4 h-4" />
              <span>2. Hộ lý (Caregiver)</span>
            </button>

            <button 
              onClick={() => setRole('ADMIN')} 
              class={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeRole === 'ADMIN' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck class="w-4 h-4" />
              <span>3. Admin sàn</span>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setView('APP')} 
            class="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Trải nghiệm Web-App MVP</span>
          </button>
        )}
      </div>
    </header>
  );
}
