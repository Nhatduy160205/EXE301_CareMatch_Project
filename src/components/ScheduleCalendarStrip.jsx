import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

export default function ScheduleCalendarStrip({ scheduleDates, selectedDateStr, onSelectDate }) {
  return (
    <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
      <div class="flex items-center justify-between px-1">
        <div class="flex items-center gap-2">
          <Calendar class="w-4 h-4 text-teal-600" />
          <span class="text-xs font-bold text-slate-800">Lịch Chọn Ca Trực Theo Ngày (Schedule Timeline)</span>
        </div>
        <span class="text-[11px] text-slate-400 font-medium">Bấm vào ngày để lọc danh sách ca</span>
      </div>

      {/* Horizontal Scrollable Date Strip */}
      <div class="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {scheduleDates.map(item => {
          const isSelected = item.dateStr === selectedDateStr;
          return (
            <button
              key={item.dateStr}
              onClick={() => onSelectDate(item.dateStr)}
              class={`flex-1 min-w-[115px] p-3 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-1.5 ${
                isSelected 
                  ? 'bg-gradient-to-br from-teal-600 to-teal-700 text-white border-teal-600 shadow-lg shadow-teal-600/20 ring-2 ring-teal-500/30 transform -translate-y-0.5' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div class="flex items-center justify-between">
                <span class={`text-[10px] font-bold uppercase ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                  {item.dayName}
                </span>
                <span class={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : item.count > 0 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-200 text-slate-500'
                }`}>
                  {item.count} ca
                </span>
              </div>

              <div class={`text-sm font-extrabold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {item.shortDate}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
