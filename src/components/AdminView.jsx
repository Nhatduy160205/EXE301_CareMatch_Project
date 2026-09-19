import React, { useState } from 'react';
import { 
  ShieldCheck, FastForward, UserCheck, Scale, ShoppingBag, 
  Share2, DollarSign, TrendingUp, CheckCircle2, Eye, MapPin, Mic, HeartPulse, Sparkles
} from 'lucide-react';

export default function AdminView({ state, setState, showToast, formatVND }) {
  const activeBooking = state.bookings[0];
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [affiliateActive, setAffiliateActive] = useState(true);

  const handleFastForward12Hours = () => {
    if (activeBooking.status === 'PENDING_APPROVAL') {
      const newBookings = [...state.bookings];
      newBookings[0].status = 'COMPLETED';
      const payout = newBookings[0].caregiverPayout;
      const fee = newBookings[0].platformFee;

      setState({
        ...state,
        bookings: newBookings,
        caregiverWallet: state.caregiverWallet + payout,
        platformRevenue: state.platformRevenue + fee
      });
      showToast(`[Auto-Release Worker] Đã tua 12h! Giải ngân ${formatVND(payout)} (80%) cho Hộ lý & ${formatVND(fee)} (20%) cho sàn.`, 'success');
    } else {
      showToast('Nút Tua 12h áp dụng cho các ca ở trạng thái Chờ nghiệm thu (PENDING_APPROVAL).', 'warning');
    }
  };

  const handleApproveCaregiver = (id) => {
    const updated = state.pendingCaregivers.filter(c => c.id !== id);
    setState({ ...state, pendingCaregivers: updated });
    showToast('Đã phê duyệt eKYC Sinh viên Y Dược sang VERIFIED_ACTIVE!', 'success');
  };

  const handleResolveDispute = (decision) => {
    const newBookings = [...state.bookings];
    newBookings[0].status = 'COMPLETED';
    
    if (decision === 'REFUND') {
      setState({ ...state, bookings: newBookings });
      showToast('Admin phán quyết: Hoàn trả 100% tiền cọc về ví Khách hàng.', 'warning');
    } else {
      const payout = newBookings[0].caregiverPayout;
      setState({ 
        ...state, 
        bookings: newBookings,
        caregiverWallet: state.caregiverWallet + payout
      });
      showToast(`Admin phán quyết: Bác khiếu nại & Giải ngân ${formatVND(payout)} cho Hộ lý.`, 'success');
    }
  };

  const toggleAffiliateCampaign = () => {
    setAffiliateActive(!affiliateActive);
    showToast(affiliateActive ? 'Đã tạm dừng chiến dịch Affiliate Bán chéo vật tư y tế.' : 'Đã kích hoạt chiến dịch Affiliate Bán chéo vật tư y tế!', 'info');
  };

  return (
    <div class="space-y-8">
      {/* Banner */}
      <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-800/40">
        <div class="space-y-2">
          <span class="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-purple-200">
            Góc nhìn: Quản trị viên Sàn (Admin & Operations)
          </span>
          <h2 class="text-2xl font-bold">Thống kê Vận hành, Quản trị Escrow & Cross-Selling</h2>
          <p class="text-xs text-slate-300">Giám sát dòng tiền ký quỹ Smart Escrow, thẩm định eKYC, xử lý Dispute & doanh thu Affiliate.</p>
        </div>
        <div>
          <button 
            onClick={handleFastForward12Hours}
            class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-2xl shadow-xl transition flex items-center gap-2 animate-bounce"
          >
            <FastForward class="w-4 h-4 fill-slate-950" />
            <span>Mô Phỏng: Tua 12 Giờ (Auto-Release Worker)</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-medium">Tổng Quỹ Escrow Phong tỏa</div>
          <div class="text-xl font-extrabold text-teal-700 mt-1">{formatVND(state.escrowWalletBalance)}</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-medium">Doanh thu thuần Sàn (20%)</div>
          <div class="text-xl font-extrabold text-purple-700 mt-1">{formatVND(state.platformRevenue)}</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-medium">Doanh thu Bán chéo Affiliate</div>
          <div class="text-xl font-extrabold text-amber-600 mt-1">1.850.000 VNĐ</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-medium">Tỷ lệ Hài lòng Khách hàng</div>
          <div class="text-xl font-extrabold text-emerald-600 mt-1">98.5%</div>
        </div>
      </div>

      <div class="grid lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: eKYC APPROVAL & CROSS-SELLING */}
        <div class="lg:col-span-6 space-y-6">
          {/* 1. eKYC Approval */}
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                <UserCheck class="w-5 h-5 text-purple-600" />
                <span>Thẩm định Nguồn cung eKYC (Sinh viên Y Dược)</span>
              </h3>
              <span class="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">
                {state.pendingCaregivers.length} Hồ sơ chờ
              </span>
            </div>

            <div class="space-y-3">
              {state.pendingCaregivers.map(cg => (
                <div key={cg.id} class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                  <div class="space-y-1">
                    <div class="font-bold text-xs text-slate-900 flex items-center gap-2">
                      <span>{cg.name}</span>
                      <span class="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">Test SOP: {cg.sopScore}</span>
                    </div>
                    <div class="text-[11px] text-slate-500">{cg.school}</div>
                  </div>
                  <button 
                    onClick={() => handleApproveCaregiver(cg.id)} 
                    class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm"
                  >
                    Phê duyệt eKYC
                  </button>
                </div>
              ))}
              {state.pendingCaregivers.length === 0 && (
                <div class="text-center py-6 text-xs text-slate-400 font-medium">Tất cả hồ sơ sinh viên đã được đối soát và phê duyệt.</div>
              )}
            </div>
          </div>

          {/* 2. Cross-selling & Affiliate Management */}
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2">
                <ShoppingBag class="w-5 h-5 text-amber-600" />
                <div>
                  <h3 class="font-bold text-slate-900 text-base">Quản lý Bán chéo & Affiliate (Cross-selling)</h3>
                  <p class="text-[11px] text-slate-500">Tích hợp bán vật tư y tế gia tăng dòng tiền thụ động cho sàn</p>
                </div>
              </div>
              <button 
                onClick={toggleAffiliateCampaign}
                class={`px-3 py-1 rounded-full text-xs font-bold transition border ${
                  affiliateActive 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-slate-100 text-slate-500 border-slate-300'
                }`}
              >
                {affiliateActive ? 'Đang bật' : 'Tạm dừng'}
              </button>
            </div>

            <div class="space-y-3">
              <div class="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                <div class="space-y-0.5">
                  <div class="font-bold text-amber-950">Máy đo đường huyết Omron AI</div>
                  <div class="text-[11px] text-amber-800">Hoa hồng tiếp thị: <strong class="text-amber-900">12% / đơn</strong> (~85.000 VNĐ)</div>
                </div>
                <span class="text-[10px] bg-amber-200 text-amber-900 px-2.5 py-1 rounded-full font-bold">Lượt xem: 342</span>
              </div>

              <div class="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 flex items-center justify-between text-xs">
                <div class="space-y-0.5">
                  <div class="font-bold text-purple-950">Sữa Dinh dưỡng Ensure Gold Bệnh lý</div>
                  <div class="text-[11px] text-purple-800">Hoa hồng tiếp thị: <strong class="text-purple-900">15% / đơn</strong> (~62.000 VNĐ)</div>
                </div>
                <span class="text-[10px] bg-purple-200 text-purple-900 px-2.5 py-1 rounded-full font-bold">Lượt xem: 518</span>
              </div>

              <div class="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 flex items-center justify-between text-xs">
                <div class="space-y-0.5">
                  <div class="font-bold text-blue-950">Tã bỉm người lớn chống loét SunMate</div>
                  <div class="text-[11px] text-blue-800">Hoa hồng tiếp thị: <strong class="text-blue-900">10% / đơn</strong> (~25.000 VNĐ)</div>
                </div>
                <span class="text-[10px] bg-blue-200 text-blue-900 px-2.5 py-1 rounded-full font-bold">Lượt xem: 289</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DISPUTE CENTER & EVIDENCE AUDIT */}
        <div class="lg:col-span-6 space-y-6">
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                <Scale class="w-5 h-5 text-rose-600" />
                <span>Trung tâm Xử lý Tranh chấp (Dispute Center)</span>
              </h3>
              <span class="text-xs bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-bold">
                {activeBooking.status === 'DISPUTED' ? '1 Ca cần xử lý' : '0 Ca khiếu nại'}
              </span>
            </div>

            {activeBooking.status === 'DISPUTED' ? (
              <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-rose-900">Ca: {activeBooking.id} - {activeBooking.buyerName}</span>
                  <span class="text-xs font-extrabold text-rose-700">{formatVND(activeBooking.totalAmount)}</span>
                </div>
                
                <div class="bg-white p-3 rounded-xl border border-rose-200 text-xs text-rose-950 space-y-1">
                  <div class="font-bold">Lý do khiếu nại từ người nhà:</div>
                  <p class="italic text-slate-600">"Khách báo Hộ lý đến trễ 20 phút và chưa chụp đủ ảnh mâm cơm thực tế."</p>
                </div>

                <div class="bg-purple-50 p-3 rounded-xl border border-purple-200 space-y-2">
                  <div class="text-xs font-bold text-purple-900 flex items-center justify-between">
                    <span class="flex items-center gap-1">
                      <Sparkles class="w-3.5 h-3.5 text-purple-600" />
                      Bằng chứng AI & GPS đã đối soát:
                    </span>
                    <button 
                      onClick={() => setShowEvidenceModal(!showEvidenceModal)}
                      class="text-[11px] text-purple-700 font-extrabold underline flex items-center gap-1"
                    >
                      <Eye class="w-3.5 h-3.5" />
                      <span>{showEvidenceModal ? 'Ẩn bằng chứng' : 'Soi bằng chứng GPS & Voice'}</span>
                    </button>
                  </div>

                  {showEvidenceModal && (
                    <div class="bg-white p-3 rounded-xl border border-purple-200 text-xs space-y-2 animate-fade-in">
                      <p class="text-slate-700"><MapPin class="w-3.5 h-3.5 text-emerald-600 inline mr-1" /> <strong>GPS Geofencing:</strong> Check-in 13:02 PM tại tọa độ cách nhà 25m (Hợp lệ).</p>
                      <p class="text-slate-700"><Mic class="w-3.5 h-3.5 text-purple-600 inline mr-1" /> <strong>AI Voice Care Log:</strong> Đã bóc tách thu âm 0:28s báo cáo cữ thuốc hạ áp 14:00.</p>
                      <p class="text-slate-700"><HeartPulse class="w-3.5 h-3.5 text-rose-500 inline mr-1" /> <strong>Sinh hiệu:</strong> Huyết áp 125/82 mmHg | Nhịp tim 74 bpm.</p>
                    </div>
                  )}
                </div>

                <div class="pt-2 flex items-center gap-3">
                  <button 
                    onClick={() => handleResolveDispute('REFUND')} 
                    class="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow"
                  >
                    Hoàn 100% cho Khách
                  </button>
                  <button 
                    onClick={() => handleResolveDispute('PAYOUT')} 
                    class="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition shadow"
                  >
                    Bác khiếu nại & Nhả tiền
                  </button>
                </div>
              </div>
            ) : (
              <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-medium">
                Hiện tại không có ca trực nào bị khiếu nại phong tỏa dòng tiền trong Escrow.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
