import React from 'react';
import { UtensilsCrossed, CheckCircle2 } from 'lucide-react';

export default function CookView({ showToast }) {
  return (
    <div class="space-y-8">
      {/* Banner */}
      <div class="bg-gradient-to-r from-amber-700 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2">
          <span class="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-amber-200">
            Góc nhìn: Đầu bếp Dinh dưỡng (Nutrition Cook)
          </span>
          <h2 class="text-2xl font-bold">Chế biến Bữa ăn Dinh dưỡng Bệnh lý</h2>
          <p class="text-xs text-slate-300">Chuẩn hóa thực đơn giảm muối, ít tinh bột, món mềm phù hợp bệnh nền người già.</p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        {/* Menu 1 */}
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-xl transition">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <span class="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-extrabold rounded-full">Tiểu đường</span>
            <span class="text-xs text-slate-400 font-medium">Ít tinh bột</span>
          </div>
          <h3 class="font-bold text-slate-900 text-base">Thực đơn Kiểm soát Đường huyết</h3>
          <ul class="text-xs text-slate-600 space-y-2">
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Cơm gạo lứt (1/2 bát)</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Ức gà áp chảo sốt nấm</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Canh rau ngót thịt nạc (không bột ngọt)</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Tráng miệng: 2 miếng thanh long</li>
          </ul>
          <button 
            onClick={() => showToast('Đã xác nhận nấu xong Thực đơn Tiểu đường', 'success')} 
            class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
          >
            Bắt đầu chế biến
          </button>
        </div>

        {/* Menu 2 */}
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-xl transition">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <span class="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-extrabold rounded-full">Huyết áp cao</span>
            <span class="text-xs text-slate-400 font-medium">Ăn nhạt/giảm muối</span>
          </div>
          <h3 class="font-bold text-slate-900 text-base">Thực đơn Bảo vệ Tim mạch</h3>
          <ul class="text-xs text-slate-600 space-y-2">
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Cá hồi hấp gừng xì dầu nhẹ</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Canh bí đỏ thịt bằm (giảm 50% muối)</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Rau củ luộc chấm muối vừng</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Tráng miệng: Táo tây nướng quế</li>
          </ul>
          <button 
            onClick={() => showToast('Đã xác nhận nấu xong Thực đơn Huyết áp', 'success')} 
            class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
          >
            Bắt đầu chế biến
          </button>
        </div>

        {/* Menu 3 */}
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-xl transition">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-extrabold rounded-full">Khó nuốt</span>
            <span class="text-xs text-slate-400 font-medium">Ninh nhừ xay mịn</span>
          </div>
          <h3 class="font-bold text-slate-900 text-base">Thực đơn Thức ăn Mềm Dễ Nuốt</h3>
          <ul class="text-xs text-slate-600 space-y-2">
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Cháo yến mạch bồ câu ninh nhừ</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Súp bí đỏ hạt sen xay mịn</li>
            <li class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-amber-500" /> Sinh tố bơ chuối sữa hạt</li>
          </ul>
          <button 
            onClick={() => showToast('Đã xác nhận nấu xong Thực đơn Khó nuốt', 'success')} 
            class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
          >
            Bắt đầu chế biến
          </button>
        </div>
      </div>
    </div>
  );
}
