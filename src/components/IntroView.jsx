import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, ArrowRight, Play, BookOpen, QrCode, 
  MapPin, UserCheck, Stethoscope, 
  ShieldCheck, Gavel, Sparkles, CheckCircle2,
  Mic, Zap, ChevronRight, RotateCcw
} from 'lucide-react';
import { LOGO_LAYERS } from '../assets/logoLayers';

export default function IntroView({ setView, setRole }) {
  const [activePreviewRole, setActivePreviewRole] = useState('BUYER');
  const [key, setKey] = useState(0); // For triggering CSS animation replay

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  const handleLaunchRole = (role) => {
    setRole(role);
    setView('APP');
  };

  return (
    <div class="space-y-16 pb-16 font-['Be_Vietnam_Pro',sans-serif]">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION BASED ON CAREMATCH-INTRO.HTML */}
      {/* ------------------------------------------------------------- */}
      <section class="relative overflow-hidden bg-slate-950 text-white rounded-3xl mx-2 sm:mx-4 p-6 sm:p-10 lg:p-14 border border-teal-900/40 shadow-2xl min-h-[580px] flex flex-col items-center justify-center text-center">
        
        {/* Background Ambient Aura */}
        <div class="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
          <span class="absolute w-[50vmax] h-[50vmax] -left-[18vmax] -top-[20vmax] rounded-full bg-teal-400/20 blur-[90px] animate-[drift_28s_ease-in-out_infinite_alternate]"></span>
          <span class="absolute w-[40vmax] h-[40vmax] -right-[16vmax] -bottom-[18vmax] rounded-full bg-blue-500/20 blur-[90px] animate-[drift_34s_ease-in-out_infinite_alternate]"></span>
          <span class="absolute w-[30vmax] h-[30vmax] right-[8vw] -top-[12vmax] rounded-full bg-emerald-400/15 blur-[90px] animate-[drift_40s_ease-in-out_infinite_alternate]"></span>
        </div>

        {/* Stage Area */}
        <div key={key} class="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center animate-fade-in">
          
          {/* Badge */}
          <div class="inline-flex items-center gap-2 bg-teal-950/80 border border-teal-700/60 px-4 py-1.5 rounded-full text-teal-300 text-xs font-bold tracking-wide uppercase shadow-inner mb-6">
            <Sparkles class="w-4 h-4 text-teal-400 animate-pulse" />
            <span>CareMatch — Đề Án Khởi Nghiệp Y Tế EXE301</span>
          </div>

          {/* Animated 5-Layer Code Logo Container */}
          <div class="carematch-logo cm-float mx-auto">
            {/* Glow backdrop */}
            <div class="carematch-glow cm-glow" aria-hidden="true"></div>

            {/* Layer 1: Heart Base */}
            {LOGO_LAYERS.heart && (
              <img 
                id="cm-layer-heart"
                src={LOGO_LAYERS.heart.src} 
                alt="Heart Base"
                class="carematch-ly cm-heart"
              />
            )}

            {/* Layer 2: Hands */}
            {LOGO_LAYERS.hands && (
              <img 
                id="cm-layer-hands"
                src={LOGO_LAYERS.hands.src} 
                alt="Care Hands"
                class="carematch-ly cm-hands"
              />
            )}

            {/* Layer 3: Elder Icon */}
            {LOGO_LAYERS.elder && (
              <img 
                id="cm-layer-elder"
                src={LOGO_LAYERS.elder.src} 
                alt="Elder Icon"
                class="carematch-ly cm-elder"
              />
            )}

            {/* Unified 100% Identical Typography CAREMATCH Text */}
            <div class="carematch-text-container">
              <span class="cm-text-care">CARE</span>
              <span class="cm-text-match">MATCH</span>
            </div>
          </div>

          {/* Subtitle / Tagline (Lora Serif Italic) */}
          <h2 class="font-['Lora',serif] italic font-medium text-xl sm:text-2xl text-slate-200 mt-5 max-w-xl leading-relaxed">
            Chăm sóc người lớn tuổi tại nhà
          </h2>

          {/* Hairline Separator */}
          <div class="w-48 h-[1px] bg-slate-700/80 my-5"></div>

          {/* Pills Feature List */}
          <ul class="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto my-2">
            <li class="bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs sm:text-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <strong class="text-teal-400 font-semibold">Điều dưỡng</strong> chính quy đến tận nhà
            </li>
            <li class="bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs sm:text-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <strong class="text-teal-400 font-semibold">Theo dõi</strong> huyết áp & AI Voice Care Log
            </li>
            <li class="bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs sm:text-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <strong class="text-teal-400 font-semibold">Bảo vệ</strong> 100% tiền cọc ví Escrow 12h
            </li>
          </ul>

          {/* Primary Action Buttons */}
          <div class="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full justify-center">
            <button 
              onClick={() => setView('APP')} 
              class="w-full sm:w-auto bg-gradient-to-r from-teal-400 via-teal-500 to-blue-600 hover:from-teal-500 hover:to-blue-700 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-full shadow-xl shadow-teal-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping"></span>
              <span>TÌM NGƯỜI CHĂM SÓC (KHÁCH HÀNG)</span>
              <ArrowRight class="w-5 h-5 text-slate-950" />
            </button>

            <a 
              href="#business-rules" 
              class="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/90 text-sm font-bold px-6 py-4 rounded-full transition flex items-center justify-center gap-2 shadow-sm"
            >
              <BookOpen class="w-4 h-4 text-teal-400" />
              <span>Xem Quy tắc Nghiệp vụ (BR)</span>
            </a>
          </div>

          {/* Replay Logo Animation Button */}
          <button 
            onClick={handleReplay} 
            class="mt-6 text-xs text-slate-400 hover:text-teal-300 transition flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>Xem lại chuyển động Logo CareMatch</span>
          </button>

          {/* Verified Metrics Badge Bar */}
          <div class="grid grid-cols-3 gap-6 sm:gap-12 pt-8 mt-8 border-t border-slate-800/80 w-full max-w-2xl">
            <div class="space-y-1 text-center">
              <div class="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-1">
                <span>100%</span>
                <ShieldCheck class="w-5 h-5 text-teal-400" />
              </div>
              <div class="text-xs text-slate-400 font-medium">Sinh viên Y Dược eKYC</div>
            </div>

            <div class="space-y-1 text-center">
              <div class="text-2xl sm:text-3xl font-black text-teal-400 flex items-center justify-center gap-1">
                <span>12h</span>
                <Zap class="w-4 h-4 text-amber-400" />
              </div>
              <div class="text-xs text-slate-400 font-medium">Auto-Release ví Escrow</div>
            </div>

            <div class="space-y-1 text-center">
              <div class="text-2xl sm:text-3xl font-black text-amber-400">
                20%
              </div>
              <div class="text-xs text-slate-400 font-medium">Phí dịch vụ Take-rate</div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3 ROLES INTERACTIVE TABBED WORKSPACE PREVIEWER */}
      {/* ------------------------------------------------------------- */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-extrabold text-teal-800 bg-teal-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
            3 Màn Hình Tác Nghiệp Chuyên Biệt
          </span>
          <h2 class="text-3xl sm:text-4xl font-black text-slate-900">Khám Phá Nền Tảng CareMatch</h2>
          <p class="text-sm text-slate-600">Chọn từng vai trò bên dưới để xem trước giao diện và bấm truy cập hệ thống</p>
        </div>

        {/* Role Selector Tabs */}
        <div class="flex justify-center">
          <div class="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 inline-flex gap-2">
            <button 
              onClick={() => setActivePreviewRole('BUYER')}
              class={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activePreviewRole === 'BUYER' 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck class="w-4 h-4" />
              <span>1. Khách hàng (Con cái)</span>
            </button>

            <button 
              onClick={() => setActivePreviewRole('CAREGIVER')}
              class={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activePreviewRole === 'CAREGIVER' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope class="w-4 h-4" />
              <span>2. Hộ lý (Sinh viên Y Dược)</span>
            </button>

            <button 
              onClick={() => setActivePreviewRole('ADMIN')}
              class={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activePreviewRole === 'ADMIN' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck class="w-4 h-4" />
              <span>3. Admin Sàn & Escrow</span>
            </button>
          </div>
        </div>

        {/* Active Role Showcase Card */}
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {activePreviewRole === 'BUYER' && (
            <div class="grid md:grid-cols-12 gap-8 items-center animate-fade-in">
              <div class="md:col-span-7 space-y-4">
                <div class="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold">
                  Góc nhìn Khách hàng (Buyer)
                </div>
                <h3 class="text-2xl font-extrabold text-slate-900">Đặt Ca Dịch Vụ & Theo Dõi Trực Tiếp</h3>
                <ul class="space-y-2.5 text-xs text-slate-700">
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Bộ chọn ngày linh hoạt:</strong> Chọn ca hôm nay, ngày mai hoặc bất kỳ ngày nào từ bộ lịch.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Thanh toán VietQR Escrow:</strong> Ký quỹ 100% tiền cọc an toàn tại sàn.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Giám sát Live Care Log:</strong> Dòng thời gian 4 mốc (GPS, AI Voice Log cữ thuốc, sinh hiệu, bữa ăn).</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Y Bạ Điện Tử & AI Insights:</strong> Lưu trữ toa thuốc, dị ứng và nhận báo cáo sức khỏe AI.</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleLaunchRole('BUYER')}
                  class="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  <span>Truy cập Màn hình Khách hàng</span>
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>

              <div class="md:col-span-5 bg-teal-50/70 p-6 rounded-2xl border border-teal-200 text-center space-y-3">
                <QrCode class="w-12 h-12 text-teal-600 mx-auto" />
                <div class="font-bold text-sm text-teal-950">Mô phỏng Thanh toán VietQR Escrow</div>
                <p class="text-xs text-teal-800">Cọc 100% được giữ an toàn trên sàn. Tiền chỉ nhả cho Hộ lý sau khi bạn hài lòng nghiệm thu.</p>
              </div>
            </div>
          )}

          {activePreviewRole === 'CAREGIVER' && (
            <div class="grid md:grid-cols-12 gap-8 items-center animate-fade-in">
              <div class="md:col-span-7 space-y-4">
                <div class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  Góc nhìn Hộ lý / Sinh viên Y Dược
                </div>
                <h3 class="text-2xl font-extrabold text-slate-900">Bảng Tin Nhận Ca & AI Voice Care Log</h3>
                <ul class="space-y-2.5 text-xs text-slate-700">
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Thanh Lịch Chọn Ca:</strong> Lọc danh sách ca trực theo từng ngày công khai minh bạch.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Pop-up Xác Nhận Chống Bấm Nhầm:</strong> Hộp thoại xác nhận lại chi tiết trước khi chốt nhận ca.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>AI Voice Care Log Rảnh Tay:</strong> Bấm giữ micro đọc báo cáo → AI tự bóc tách văn bản.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>🚨 Nút Báo Động Khẩn Cấp (SOS 115):</strong> Kích hoạt gọi 115 & phát cảnh báo định vị cho gia đình.</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleLaunchRole('CAREGIVER')}
                  class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  <span>Truy cập Màn hình Hộ lý</span>
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>

              <div class="md:col-span-5 bg-purple-50/70 p-6 rounded-2xl border border-purple-200 text-center space-y-3">
                <Mic class="w-12 h-12 text-purple-600 mx-auto animate-pulse" />
                <div class="font-bold text-sm text-purple-950">AI Speech-to-Text Care Log</div>
                <p class="text-xs text-purple-900">Hộ lý vừa chăm sóc cụ vừa đọc báo cáo, AI tự điền vào nhật ký làm bằng chứng thực tế.</p>
              </div>
            </div>
          )}

          {activePreviewRole === 'ADMIN' && (
            <div class="grid md:grid-cols-12 gap-8 items-center animate-fade-in">
              <div class="md:col-span-7 space-y-4">
                <div class="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                  Góc nhìn Quản trị Sàn (Admin)
                </div>
                <h3 class="text-2xl font-extrabold text-slate-900">Quản Trị Escrow, eKYC & Cross-Selling</h3>
                <ul class="space-y-2.5 text-xs text-slate-700">
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-purple-600 shrink-0" />
                    <span><strong>Thẩm định eKYC Nguồn cung:</strong> Duyệt hồ sơ Sinh viên Y Dược kèm điểm test SOP 15/15.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-purple-600 shrink-0" />
                    <span><strong>Trung tâm Xử lý Tranh chấp (Dispute):</strong> Soi bằng chứng GPS, ảnh cửa căn hộ & file AI Voice.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-purple-600 shrink-0" />
                    <span><strong>12h Auto-Release Worker Simulator:</strong> Tua nhanh 12h ân hạn tự động giải ngân.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-purple-600 shrink-0" />
                    <span><strong>Quản lý Bán chéo Affiliate:</strong> Tã bỉm, sữa Ensure, máy đo đường huyết Omron.</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleLaunchRole('ADMIN')}
                  class="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  <span>Truy cập Màn hình Admin</span>
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>

              <div class="md:col-span-5 bg-purple-900 text-white p-6 rounded-2xl border border-purple-700 text-center space-y-3 shadow-lg">
                <ShieldCheck class="w-12 h-12 text-purple-300 mx-auto" />
                <div class="font-bold text-sm text-white">Escrow & Auto-Release Worker</div>
                <p class="text-xs text-purple-200">Đảm bảo dòng tiền 100% minh bạch, tự động giải ngân sau 12h ân hạn.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* BUSINESS RULES SPECIFICATIONS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="business-rules" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 shadow-2xl">
          <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div class="text-xs font-bold text-teal-400 uppercase tracking-wider">Đã Đối Soát 100% Tài Liệu Chuẩn</div>
              <h2 class="text-2xl sm:text-3xl font-black text-white mt-1">Quy tắc Nghiệp vụ Cốt lõi (Business Rules Spec)</h2>
            </div>
            <button 
              onClick={() => setView('APP')} 
              class="bg-teal-500 hover:bg-teal-600 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition shadow-lg self-start md:self-auto"
            >
              Vào Thử nghiệm Web-App MVP
            </button>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <h4 class="font-bold text-teal-400 text-sm flex items-center gap-2">
                <Gavel class="w-4 h-4" />
                <span>BR-ACT-02: Ranh giới Phi Y tế</span>
              </h4>
              <p class="text-xs text-slate-300 leading-relaxed">
                Hộ lý chỉ hỗ trợ sinh hoạt (ADLs), nhắc cữ thuốc và đo sinh hiệu. Nghiêm cấm tiêm truyền, chỉnh liều thuốc hay các thủ thuật y khoa xâm lấn. Nút SOS kích hoạt gọi 115 khi xảy ra sự cố nguy kịch.
              </p>
            </div>

            <div class="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <h4 class="font-bold text-amber-400 text-sm flex items-center gap-2">
                <Zap class="w-4 h-4" />
                <span>BR-ESC-03: Escrow & 12h Auto-Release</span>
              </h4>
              <p class="text-xs text-slate-300 leading-relaxed">
                Khách nộp cọc 100% qua VietQR. Khi Check-out, tiến trình 12h đếm ngược tự kích hoạt. Hết 12h nếu không khiếu nại thì tự giải ngân trích 80% ví Hộ lý và 20% phí sàn.
              </p>
            </div>

            <div class="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <h4 class="font-bold text-emerald-400 text-sm flex items-center gap-2">
                <MapPin class="w-4 h-4" />
                <span>BR-OPS-01: GPS Geofencing 150m</span>
              </h4>
              <p class="text-xs text-slate-300 leading-relaxed">
                Check-in/out chỉ được phép thực hiện khi khoảng cách GPS trong bán kính 150m quanh nhà khách hàng kèm 01 ảnh chụp thực tế trước cửa căn hộ.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
