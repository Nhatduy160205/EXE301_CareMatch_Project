import React, { useState } from 'react';
import Navbar from './components/Navbar';
import IntroView from './components/IntroView';
import BuyerView from './components/BuyerView';
import CaregiverView from './components/CaregiverView';
import AdminView from './components/AdminView';
import { initialMockState } from './data/mockState';

export default function App() {
  const [state, setState] = useState(initialMockState);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const setView = (viewName) => {
    setState(prev => ({ ...prev, currentView: viewName }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setRole = (roleName) => {
    setState(prev => ({ ...prev, activeRole: roleName }));
  };

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Toast Banner */}
      {toast && (
        <div class="fixed top-5 right-5 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
          <div class={`px-4 py-3 rounded-xl shadow-2xl text-white text-sm font-semibold flex items-center gap-3 ${
            toast.type === 'success' ? 'bg-teal-600' : toast.type === 'warning' ? 'bg-amber-600' : 'bg-rose-600'
          }`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Navbar 
        currentView={state.currentView} 
        setView={setView} 
        activeRole={state.activeRole} 
        setRole={setRole} 
      />

      {/* Main View Area */}
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.currentView === 'INTRO' ? (
          <IntroView setView={setView} setRole={setRole} />
        ) : (
          <>
            {state.activeRole === 'BUYER' && (
              <BuyerView state={state} setState={setState} showToast={showToast} formatVND={formatVND} />
            )}
            {state.activeRole === 'CAREGIVER' && (
              <CaregiverView state={state} setState={setState} showToast={showToast} formatVND={formatVND} />
            )}
            {state.activeRole === 'ADMIN' && (
              <AdminView state={state} setState={setState} showToast={showToast} formatVND={formatVND} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer class="bg-slate-950 text-slate-500 text-xs py-8 border-t border-slate-800 mt-12">
        <div class="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p>© 2026 CareMatch Startup Project - Bộ môn Khởi nghiệp EXE1.</p>
          <p>Xây dựng hoàn chỉnh bằng ReactJS + Vite + Tailwind CSS + Lucide Icons.</p>
        </div>
      </footer>
    </div>
  );
}
