import React, { useState } from 'react';
import { 
  CalendarPlus, QrCode, CheckCircle2, Clock, HeartPulse, 
  AlertTriangle, Check, ShieldAlert, Sparkles, Mic, Volume2, 
  MapPin, Utensils, Play, Square, Activity, FileText, Camera, Calendar, ShoppingBag, X, ChevronRight, User, AlertCircle
} from 'lucide-react';

export default function BuyerView({ state, setState, showToast, formatVND }) {
  const activeBooking = state.bookings[0];
  const [includeMeal, setIncludeMeal] = useState(activeBooking.includesMeal);
  const [mealType, setMealType] = useState(activeBooking.mealType || 'Tiểu đường');
  const [serviceType, setServiceType] = useState(activeBooking.type || 'HOURLY_4H');
  const [bookingDate, setBookingDate] = useState('20/09/2026');
  const [timeSlot, setTimeSlot] = useState('Ca chiều (13:00 - 17:00)');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showMedicalVaultModal, setShowMedicalVaultModal] = useState(false);

  // Helper to convert "DD/MM/YYYY" -> "YYYY-MM-DD" for HTML5 Date Input
  const dateToIso = (dStr) => {
    if (!dStr || !dStr.includes('/')) return '2026-09-20';
    const [d, m, y] = dStr.split('/');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  };

  // Helper to convert "YYYY-MM-DD" -> "DD/MM/YYYY" for State
  const isoToDate = (isoStr) => {
    if (!isoStr || !isoStr.includes('-')) return isoStr;
    const [y, m, d] = isoStr.split('-');
    return `${d}/${m}/${y}`;
  };

  const calculateTotal = () => {
    let base = serviceType === 'HOURLY_4H' ? 220000 : 2500000;
    if (includeMeal) base += 150000;
    return base;
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    const total = calculateTotal();

    const dateLabel = bookingDate === '19/09/2026' 
      ? 'Hôm nay (19/09/2026)' 
      : bookingDate === '20/09/2026' 
        ? 'Ngày mai (20/09/2026)' 
        : `Ngày ${bookingDate}`;

    const newBookingObj = {
      id: `ELDER-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerName: 'Anh Trần Minh Tuấn (Con trai)',
      seniorName: 'Cụ Nguyễn Văn An',
      seniorAge: 76,
      address: 'Căn 1204, Chung cư Vinhomes Central Park, Bình Thạnh',
      type: serviceType,
      typeName: `${serviceType === 'HOURLY_4H' ? 'Ca Lẻ 4 Tiếng' : 'Thuê Bao'} (${timeSlot.split(' ')[0]})`,
      scheduledDate: bookingDate,
      scheduledDateLabel: dateLabel,
      includesMeal: includeMeal,
      mealType: includeMeal ? mealType : 'Không kèm suất ăn',
      totalAmount: total,
      platformFee: total * 0.2,
      caregiverPayout: total * 0.8,
      status: 'ESCROW_HOLDING',
      createdAt: `${bookingDate} 08:30`,
      assignedCaregiver: null,
      vibeMatch: 'Ca đặt mới theo lịch',
      conditions: 'Tiểu đường tuýp 2, cao huyết áp. Cần nhắc uống thuốc cữ trưa.',
      specialNotes: 'Nguyên liệu nấu ăn đã có sẵn trong tủ lạnh.',
      checkinTime: null,
      checkoutTime: null,
      careLog: null
    };

    // Update bookings list
    const updatedBookings = [newBookingObj, ...state.bookings];

    // Increment count in scheduleDates strip if present
    const updatedScheduleDates = state.scheduleDates.map(sd => {
      if (sd.dateStr === bookingDate) {
        return { ...sd, count: sd.count + 1 };
      }
      return sd;
    });

    setState({ 
      ...state, 
      bookings: updatedBookings,
      scheduleDates: updatedScheduleDates
    });

    showToast(`Đã tạo ca chăm sóc cho ngày ${bookingDate} (${timeSlot})! Vui lòng quét VietQR nộp cọc.`, 'success');
  };

  const handleSimulateVietQRPayment = () => {
    const newBookings = [...state.bookings];
    newBookings[0].status = 'ESCROW_HOLDING';
    setState({ ...state, bookings: newBookings });
    showToast('Mô phỏng VietQR thành công! Cọc đã được phong tỏa an toàn tại Smart Escrow.', 'success');
  };

  const handleApproveReleaseEarly = () => {
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
    showToast(`Xác nhận nghiệm thu thành công! Đã giải ngân ${formatVND(payout)} cho Hộ lý.`, 'success');
  };

  const handleTriggerDispute = () => {
    const newBookings = [...state.bookings];
    newBookings[0].status = 'DISPUTED';
    setState({ ...state, bookings: newBookings });
    showToast('Đã gửi yêu cầu Khiếu nại! Dòng tiền trong Escrow tạm dừng giải ngân.', 'error');
  };

  const toggleAudioPlay = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      showToast('Đang phát lại đoạn thu âm giọng nói Hộ lý (0:28s)...', 'info');
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  return (
    <div class="space-y-8">
      {/* Banner */}
      <div class="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2">
          <span class="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-teal-200">
            Góc nhìn: Khách hàng / Con cái (Buyer)
          </span>
          <h2 class="text-2xl font-bold">Đặt Dịch vụ Chăm sóc Cha Mẹ & Theo dõi Trực tiếp</h2>
          <p class="text-xs text-slate-300">Smart Escrow bảo vệ 100% dòng tiền. Tiền chỉ nhả cho Hộ lý sau khi nghiệm thu.</p>
        </div>
        <div class="bg-white/10 px-4 py-3 rounded-2xl backdrop-blur text-right">
          <div class="text-[10px] text-slate-300 font-medium">Hồ sơ người cao tuổi</div>
          <div class="font-bold text-sm text-teal-200">Cụ Nguyễn Văn An (76 tuổi)</div>
        </div>
      </div>

      {/* TÍNH NĂNG MỚI: MEDICAL VAULT & AI WEEKLY INSIGHTS & CROSS-SELLING BANNER */}
      <div class="grid md:grid-cols-3 gap-6">
        {/* 1. Medical Vault (Compact Card with Clickable Modal) */}
        <div 
          onClick={() => setShowMedicalVaultModal(true)}
          class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-teal-400 hover:shadow-md transition cursor-pointer space-y-3 flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <FileText class="w-4 h-4 text-teal-600" />
                <h3 class="font-bold text-slate-900 text-sm">Y bạ Điện tử (Medical Vault)</h3>
              </div>
              <span class="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">Bắt buộc Hộ lý đọc</span>
            </div>

            <div class="p-3 bg-teal-50/70 rounded-2xl border border-teal-100 space-y-1">
              <div class="text-[11px] text-teal-800 font-semibold">Người cần chăm sóc:</div>
              <div class="font-extrabold text-slate-900 text-sm">Cụ Nguyễn Văn An (76 tuổi)</div>
              <div class="text-[11px] text-slate-600 flex items-center gap-2 pt-1 font-medium">
                <span>🩺 1 Toa thuốc</span>
                <span>•</span>
                <span class="text-amber-700 font-semibold">⚠️ Dị ứng Tôm cua</span>
              </div>
            </div>
          </div>

          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowMedicalVaultModal(true);
            }}
            class="w-full bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs py-2.5 rounded-xl border border-teal-200 transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <FileText class="w-3.5 h-3.5" />
            <span>Click Xem Y Bạ Chi Tiết</span>
            <ChevronRight class="w-4 h-4 text-teal-600" />
          </button>
        </div>

        {/* 2. AI Weekly Insights */}
        <div class="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-3xl border border-purple-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-purple-600" />
              <h3 class="font-bold text-purple-950 text-sm">Báo cáo Sức khỏe AI (Insights)</h3>
            </div>
            <span class="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-bold">Cảnh báo sớm</span>
          </div>
          <p class="text-xs text-purple-900 leading-relaxed">
            💡 <strong>AI Khuyên:</strong> Huyết áp cữ trưa có xu hướng nhích nhẹ khi thời tiết oi nực. Khuyến nghị duy trì cho cụ uống đủ 1.5L nước ấm và ăn nhạt.
          </p>
        </div>

        {/* 3. Cross-selling Medical Affiliate Banner */}
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <ShoppingBag class="w-4 h-4 text-amber-600" />
              <h3 class="font-bold text-amber-950 text-sm">Vật tư Y tế Gợi ý (Affiliate)</h3>
            </div>
            <span class="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">Ưu đãi 15%</span>
          </div>
          <div class="text-xs text-amber-900 space-y-1.5">
            <p><strong>Máy đo đường huyết Omron AI:</strong> Giảm 15% khi đặt qua ElderCare.</p>
            <button 
              onClick={() => showToast('Đã mở liên kết mua sắm Máy đo đường huyết Omron với mã giảm giá ElderCare!', 'success')}
              class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] py-2 rounded-xl transition shadow-sm"
            >
              Xem Sản Phẩm Ưu Đãi
            </button>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FORM & VIETQR */}
        <div class="lg:col-span-5 space-y-6">
          {/* Booking Form */}
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                <CalendarPlus class="w-5 h-5 text-teal-600" />
                <span>Đặt ca Chăm sóc Mới</span>
              </h3>
              <span class="text-xs text-slate-500 font-medium">Ca 4 tiếng</span>
            </div>

            <form onSubmit={handleCreateBooking} class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Loại hình dịch vụ</label>
                <select 
                  value={serviceType} 
                  onChange={(e) => setServiceType(e.target.value)}
                  class="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="HOURLY_4H">Gói Ca Lẻ 4 Tiếng (220.000 VNĐ)</option>
                  <option value="MONTHLY_SUB">Gói Thuê Bao Tháng 12 Buổi (2.500.000 VNĐ)</option>
                </select>
              </div>

              {/* NGÀY THỰC HIỆN CA TRỰC */}
              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span class="flex items-center gap-1.5">
                    <Calendar class="w-4 h-4 text-teal-600" />
                    <span>Ngày thực hiện ca trực</span>
                  </span>
                  <span class="text-[11px] text-teal-600 font-bold">Lịch linh hoạt</span>
                </label>
                
                {/* Nút chọn nhanh ngày */}
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    type="button"
                    onClick={() => setBookingDate('19/09/2026')}
                    class={`py-2 px-1.5 rounded-xl text-xs font-bold transition border text-center ${
                      bookingDate === '19/09/2026' 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Hôm nay (19/09)
                  </button>

                  <button 
                    type="button"
                    onClick={() => setBookingDate('20/09/2026')}
                    class={`py-2 px-1.5 rounded-xl text-xs font-bold transition border text-center ${
                      bookingDate === '20/09/2026' 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Ngày mai (20/09)
                  </button>

                  <button 
                    type="button"
                    onClick={() => setBookingDate('21/09/2026')}
                    class={`py-2 px-1.5 rounded-xl text-xs font-bold transition border text-center ${
                      bookingDate === '21/09/2026' 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Thứ Hai (21/09)
                  </button>
                </div>

                <div class="space-y-1">
                  <div class="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Hoặc bấm để mở Lịch chọn ngày tùy chỉnh:</span>
                    <span class="text-teal-600 font-extrabold font-mono">{bookingDate}</span>
                  </div>
                  <div class="relative flex items-center">
                    <input 
                      type="date"
                      value={dateToIso(bookingDate)}
                      onChange={(e) => {
                        if (e.target.value) {
                          setBookingDate(isoToDate(e.target.value));
                        }
                      }}
                      min="2026-09-19"
                      max="2026-12-31"
                      class="w-full text-xs font-extrabold bg-teal-50/70 border border-teal-300 rounded-xl p-2.5 pl-9 text-teal-900 focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer hover:bg-teal-100/70 transition shadow-sm"
                    />
                    <Calendar class="w-4 h-4 text-teal-600 absolute left-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* KHUNG GIỜ CHĂM SÓC TRONG NGÀY */}
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock class="w-4 h-4 text-teal-600" />
                  <span>Khung giờ chăm sóc trong ngày</span>
                </label>
                <select 
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  class="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="Ca sáng (08:00 - 12:00)">Ca sáng (08:00 - 12:00)</option>
                  <option value="Ca chiều (13:00 - 17:00)">Ca chiều (13:00 - 17:00)</option>
                  <option value="Ca tối (17:00 - 21:00)">Ca tối (17:00 - 21:00)</option>
                </select>
              </div>

              {/* Add-on Meal */}
              <div class="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeMeal}
                    onChange={(e) => setIncludeMeal(e.target.checked)}
                    class="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" 
                  />
                  <span class="text-xs font-bold text-amber-900">Bữa ăn Dinh dưỡng Bệnh lý (+150.000 VNĐ)</span>
                </label>
                
                {includeMeal && (
                  <select 
                    value={mealType} 
                    onChange={(e) => setMealType(e.target.value)}
                    class="w-full text-xs font-medium bg-white border border-amber-300 rounded-xl p-2.5 text-amber-900 focus:outline-none"
                  >
                    <option value="Tiểu đường">Thực đơn Tiểu đường (Ít tinh bột)</option>
                    <option value="Huyết áp cao">Thực đơn Huyết áp cao (Ăn nhạt, giảm muối)</option>
                    <option value="Khó nuốt">Thực đơn Thức ăn mềm ninh nhừ</option>
                  </select>
                )}
              </div>

              {/* Price Summary */}
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div class="text-[11px] text-slate-500 font-medium">Tổng cọc Smart Escrow</div>
                  <div class="text-xl font-extrabold text-teal-700">{formatVND(calculateTotal())}</div>
                </div>
                <button type="submit" class="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-teal-600/30 transition transform hover:-translate-y-0.5">
                  Đặt ca & Nộp cọc
                </button>
              </div>
            </form>
          </div>

          {/* VietQR Mock Modal */}
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                <QrCode class="w-4 h-4 text-teal-600" />
                <span>Mô phỏng Thanh toán VietQR</span>
              </h4>
              <span class="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Smart Escrow</span>
            </div>

            <div class="bg-slate-50 p-4 rounded-2xl text-center space-y-3 border border-slate-200">
              <div class="inline-block p-3 bg-white rounded-2xl shadow-inner border border-slate-200">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=ELDERCARE_ESCROW_${activeBooking.id}`} 
                  alt="VietQR Mock" 
                  class="w-36 h-36 mx-auto"
                />
              </div>
              <div class="text-xs space-y-1">
                <p class="font-bold text-slate-800">Số tiền: <span class="text-teal-600 font-extrabold">{formatVND(activeBooking.totalAmount)}</span></p>
                <p class="text-[11px] text-slate-500">Cú pháp: <code class="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">{activeBooking.id}</code></p>
              </div>
              
              <button 
                onClick={handleSimulateVietQRPayment} 
                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 class="w-4 h-4" />
                <span>Mô phỏng Đã Quét Mã VietQR</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE CARE LOG TIMELINE */}
        <div class="lg:col-span-7 space-y-6">
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 class="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Clock class="w-5 h-5 text-teal-600" />
                  <span>Giám sát Thời gian thực (Live Daily Care Log)</span>
                </h3>
                <p class="text-xs text-slate-500">Theo dõi tiến trình làm việc của Hộ lý thông qua dòng thời gian cập nhật liên tục</p>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
                {activeBooking.status}
              </span>
            </div>

            {/* Timeline Progress */}
            <div class="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
              <div class={`p-2 rounded-xl ${activeBooking.status === 'ESCROW_HOLDING' ? 'bg-teal-100 text-teal-800 border border-teal-300' : 'bg-slate-100 text-slate-400'}`}>
                1. Đã Ký quỹ
              </div>
              <div class={`p-2 rounded-xl ${activeBooking.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-slate-100 text-slate-400'}`}>
                2. Đang Chăm sóc
              </div>
              <div class={`p-2 rounded-xl ${activeBooking.status === 'PENDING_APPROVAL' ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                3. Đã Check-out (12h)
              </div>
              <div class={`p-2 rounded-xl ${activeBooking.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : activeBooking.status === 'DISPUTED' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-slate-100 text-slate-400'}`}>
                4. Hoàn tất / Dispute
              </div>
            </div>

            {/* FEATURE SPOTLIGHT: AI VOICE CARE LOG HIGHLIGHT CARD */}
            <div class="bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900 text-white p-5 rounded-3xl shadow-lg border border-purple-800/50 space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-400/40">
                    <Sparkles class="w-4 h-4 text-purple-300 animate-pulse" />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Cập nhật Nhật ký Rảnh tay (AI Voice Care Log)</span>
                    </h4>
                    <p class="text-[11px] text-purple-200">Tự động bóc tách giọng nói Hộ lý thành văn bản làm bằng chứng chăm sóc</p>
                  </div>
                </div>
                <span class="text-[10px] bg-purple-500/30 text-purple-200 border border-purple-400/30 px-2.5 py-1 rounded-full font-bold">
                  🎙️ AI Speech-to-Text
                </span>
              </div>

              {/* Audio Transcript Player Card */}
              <div class="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <button 
                      onClick={toggleAudioPlay}
                      class={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition transform active:scale-95 ${
                        isPlayingAudio 
                          ? 'bg-rose-500 text-white animate-pulse' 
                          : 'bg-purple-500 hover:bg-purple-600 text-white'
                      }`}
                    >
                      {isPlayingAudio ? <Square class="w-4 h-4 fill-white" /> : <Play class="w-4 h-4 fill-white ml-0.5" />}
                    </button>

                    <div>
                      <div class="text-xs font-bold text-purple-100 flex items-center gap-1.5">
                        <Mic class="w-3.5 h-3.5 text-purple-300" />
                        <span>File Thu Âm Trực Tiếp</span>
                        <span class="text-[10px] text-purple-300 font-mono">(0:28s)</span>
                      </div>
                      <div class="flex items-center gap-1 mt-1">
                        <div class="w-1.5 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                        <div class="w-1.5 h-5 bg-purple-300 rounded-full animate-bounce delay-75"></div>
                        <div class="w-1.5 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></div>
                        <div class="w-1.5 h-4 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                        <div class="w-1.5 h-6 bg-purple-300 rounded-full animate-bounce"></div>
                        <div class="w-1.5 h-3 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                        <span class="text-[10px] text-purple-200 ml-2 font-mono">14:05 PM - Đã xác thực giọng nói Hộ lý</span>
                      </div>
                    </div>
                  </div>

                  <span class="text-[10px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
                    ✓ Bằng chứng có mặt
                  </span>
                </div>

                <div class="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                  <div class="text-[10px] uppercase tracking-wider text-purple-300 font-bold flex items-center gap-1">
                    <Volume2 class="w-3 h-3 text-purple-400" />
                    Văn bản AI Bóc Tách Tự Động:
                  </div>
                  <p class="text-xs text-slate-100 italic leading-relaxed">
                    "{activeBooking.careLog?.voiceNoteText || 'Cụ đã uống 1 viên Amlodipine hạ áp lúc 14:00, ăn hết nửa bát cháo yến mạch bồ câu ninh nhừ. Cụ khen cháu nấu vừa vị và tinh thần cụ rất vui vẻ.'}"
                  </p>
                </div>
              </div>
            </div>

            {/* LIVE DAILY CARE LOG TIMELINE FEED */}
            {activeBooking.careLog ? (
              <div class="space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span class="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Activity class="w-4 h-4 text-teal-600" />
                    <span>Dòng Thời Gian Chăm Sóc Trực Tiếp (Timeline)</span>
                  </span>
                  <span class="text-[11px] text-slate-500 font-medium">Đồng bộ tự động từ máy Hộ lý</span>
                </div>

                {/* Vertical Timeline Component */}
                <div class="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {/* Event 1: GPS Checkin */}
                  <div class="relative group">
                    <div class="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow ring-4 ring-white">
                      📍
                    </div>
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 transition hover:shadow-sm">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-900">GPS Geofencing Check-in tại Nhà</span>
                        <span class="text-[11px] text-slate-400 font-mono">13:02 PM</span>
                      </div>
                      <p class="text-xs text-slate-600">
                        Đã xác thực tọa độ GPS tại căn hộ (cách 25m). Ảnh check-in thực tế trước cửa căn hộ đã được ghi nhận.
                      </p>
                      <div class="inline-flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold border border-emerald-300">
                        <CheckCircle2 class="w-3 h-3 text-emerald-600" />
                        <span>Đã có mặt đúng giờ</span>
                      </div>
                    </div>
                  </div>

                  {/* Event 2: AI Voice Care Log */}
                  <div class="relative group">
                    <div class="absolute -left-6 top-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow ring-4 ring-white">
                      🎙️
                    </div>
                    <div class="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 space-y-2 transition hover:shadow-sm">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                          <Mic class="w-3.5 h-3.5 text-purple-600" />
                          <span>AI Voice Care Log: Nhắc Cữ Thuốc & Báo Cáo</span>
                        </span>
                        <span class="text-[11px] text-purple-600 font-mono">14:05 PM</span>
                      </div>
                      <p class="text-xs text-purple-900 italic bg-white p-2.5 rounded-xl border border-purple-100">
                        "{activeBooking.careLog.voiceNoteText}"
                      </p>
                      <div class="flex items-center justify-between text-[11px]">
                        <span class="text-purple-700 font-semibold">Đã nhắc cữ thuốc hạ áp 14:00</span>
                        <span class="text-purple-600 font-mono font-bold bg-purple-100 px-2 py-0.5 rounded">0:28s audio</span>
                      </div>
                    </div>
                  </div>

                  {/* Event 3: Vitals Update */}
                  <div class="relative group">
                    <div class="absolute -left-6 top-0 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold shadow ring-4 ring-white">
                      📊
                    </div>
                    <div class="bg-rose-50/50 p-4 rounded-2xl border border-rose-200 space-y-3 transition hover:shadow-sm">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <HeartPulse class="w-4 h-4 text-rose-500" />
                          <span>Cập nhật Chỉ số Sinh hiệu Thực tế</span>
                        </span>
                        <span class="text-[11px] text-slate-400 font-mono">14:30 PM</span>
                      </div>

                      <div class="grid grid-cols-3 gap-2">
                        <div class="bg-white p-2.5 rounded-xl border border-rose-100 text-center">
                          <div class="text-[10px] text-slate-500">Huyết áp</div>
                          <div class="text-sm font-extrabold text-slate-900">{activeBooking.careLog.bloodPressure}</div>
                        </div>
                        <div class="bg-white p-2.5 rounded-xl border border-rose-100 text-center">
                          <div class="text-[10px] text-slate-500">Nhịp tim</div>
                          <div class="text-sm font-extrabold text-rose-600">{activeBooking.careLog.heartRate} bpm</div>
                        </div>
                        <div class="bg-white p-2.5 rounded-xl border border-rose-100 text-center">
                          <div class="text-[10px] text-slate-500">Đường huyết</div>
                          <div class="text-sm font-extrabold text-teal-600">{activeBooking.careLog.bloodSugar}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event 4: Meal & Care Activity */}
                  <div class="relative group">
                    <div class="absolute -left-6 top-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shadow ring-4 ring-white">
                      🍲
                    </div>
                    <div class="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 space-y-3 transition hover:shadow-sm">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                          <Utensils class="w-4 h-4 text-amber-600" />
                          <span>Hình ảnh Bữa ăn Dinh dưỡng & Vận động</span>
                        </span>
                        <span class="text-[11px] text-amber-700 font-mono">15:15 PM</span>
                      </div>

                      <div class="grid sm:grid-cols-12 gap-3 items-center">
                        <div class="sm:col-span-5">
                          <img 
                            src={activeBooking.careLog.mealPhoto} 
                            alt="Bữa ăn thực tế" 
                            class="w-full h-24 object-cover rounded-xl border border-amber-200 shadow-sm"
                          />
                        </div>
                        <div class="sm:col-span-7 bg-white p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                          <div class="font-bold text-amber-900">Thực đơn: {activeBooking.mealType}</div>
                          <p class="text-slate-600 italic">"{activeBooking.careLog.notes}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p class="text-xs text-slate-500 font-medium">Đang chờ Hộ lý nhận ca và bấm Check-in để truyền dữ liệu sinh hiệu...</p>
              </div>
            )}

            {/* Actions */}
            <div class="pt-4 border-t border-slate-100 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
              <div class="text-xs text-slate-500 max-w-xs">
                <span class="font-bold text-slate-700">Grace Period 12h:</span> Tự động giải ngân nếu không khiếu nại.
              </div>
              <div class="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full xl:w-auto justify-end">
                <button 
                  onClick={handleTriggerDispute} 
                  class="flex-1 sm:flex-none bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs px-3.5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <AlertTriangle class="w-4 h-4 shrink-0" />
                  <span>Khiếu nại Ca trực</span>
                </button>
                <button 
                  onClick={handleApproveReleaseEarly} 
                  class="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Check class="w-4 h-4 shrink-0" />
                  <span>Hài lòng & Giải ngân</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEDICAL VAULT POPUP MODAL */}
      {showMedicalVaultModal && (
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div class="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-5 relative overflow-hidden">
            {/* Modal Header */}
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold shrink-0">
                  <FileText class="w-5 h-5" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="font-extrabold text-slate-900 text-base">Y bạ Điện tử (Medical Vault)</h3>
                    <span class="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                      Bắt buộc Hộ lý đọc
                    </span>
                  </div>
                  <p class="text-xs text-slate-500">Hồ sơ sức khỏe & dặn dò y tế cho người chăm sóc</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMedicalVaultModal(false)}
                class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            {/* Senior Patient Profile Details */}
            <div class="space-y-3.5 text-xs text-slate-700 max-h-[65vh] overflow-y-auto pr-1">
              <div class="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 flex items-center justify-between">
                <div>
                  <div class="text-[11px] text-teal-800 font-semibold uppercase tracking-wider">Thông tin Người cần chăm sóc</div>
                  <div class="text-base font-extrabold text-slate-900 mt-0.5">Cụ Nguyễn Văn An</div>
                  <div class="text-xs text-slate-600 mt-0.5">76 tuổi • Giới tính: Nam • Phòng 1204 Vinhomes Central Park</div>
                </div>
                <div class="w-11 h-11 rounded-2xl bg-teal-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
                  76t
                </div>
              </div>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div class="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <span>📋</span> Tình trạng Sức khỏe & Bệnh nền
                </div>
                <p class="text-slate-600 pl-5 leading-relaxed">Cao huyết áp nhẹ, Tiểu đường Tuýp 2, khớp chân hơi yếu khi di chuyển xa.</p>
              </div>

              <div class="p-3 bg-blue-50/80 rounded-xl border border-blue-200 space-y-1">
                <div class="font-bold text-blue-950 flex items-center gap-1.5 text-xs">
                  <span>🩺</span> Toa thuốc Chỉ định
                </div>
                <p class="text-blue-900 font-medium pl-5">• <strong>Amlodipine 5mg:</strong> 1 viên lúc 14:00 (Uống sau bữa trưa nhẹ)</p>
                <p class="text-blue-900 font-medium pl-5">• <strong>Metformin 500mg:</strong> 1 viên sau ăn sáng</p>
              </div>

              <div class="p-3 bg-amber-50/90 rounded-xl border border-amber-200 space-y-1">
                <div class="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                  <span>⚠️</span> Dị ứng Đặc biệt (Cần tuyệt đối tránh)
                </div>
                <p class="text-amber-900 font-semibold pl-5">• Dị ứng hải sản vỏ cứng (Tôm, cua - gây dị ứng ngứa & sưng nhẹ)</p>
              </div>

              <div class="p-3 bg-rose-50/70 rounded-xl border border-rose-200 space-y-1">
                <div class="font-bold text-rose-950 flex items-center gap-1.5 text-xs">
                  <span>❤️</span> Sở thích & Tâm lý
                </div>
                <p class="text-rose-900 pl-5">• Thích nghe nhạc tiền chiến, trò chuyện nhẹ nhàng bằng giọng Nam.</p>
                <p class="text-rose-900 pl-5">• Thích đánh cờ tướng cữ chiều sau khi dùng bữa.</p>
              </div>

              <div class="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5">
                <div class="font-extrabold text-emerald-950 flex items-center gap-1.5 text-xs">
                  <span>💡</span> Dặn dò Lưu ý cho Hộ lý (Bắt buộc tuân thủ)
                </div>
                <ul class="list-disc list-inside text-emerald-900 space-y-1 pl-1 leading-relaxed">
                  <li>Đo huyết áp và ghi nhận sinh hiệu trước khi nhắc cụ uống thuốc lúc 14:00.</li>
                  <li>Khuyến nghị nhắc cụ uống đủ 1.5L nước ấm trong suốt ca trực.</li>
                  <li>Dìu cụ cẩn thận khi di chuyển quanh hành lang hoặc vào nhà vệ sinh.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div class="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button 
                type="button"
                onClick={() => setShowMedicalVaultModal(false)}
                class="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition"
              >
                Đã Đọc & Đóng Hồ Sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
