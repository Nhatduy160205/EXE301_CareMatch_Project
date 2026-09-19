import React, { useState } from 'react';
import { 
  ListCheck, Star, MapPin, Utensils, Handshake, 
  Camera, CloudUpload, Flag, Clock, Calendar, Mic, MicOff, Volume2, Sparkles,
  User, AlertCircle, FileText, ArrowLeft, CheckCircle2, ChevronRight, X, Siren, PhoneCall,
  ShieldCheck, GraduationCap, IdCard, Award, Upload, HelpCircle, Check
} from 'lucide-react';
import ScheduleCalendarStrip from './ScheduleCalendarStrip';

export default function CaregiverView({ state, setState, showToast, formatVND }) {
  const activeShift = state.bookings.find(b => b.status === 'IN_PROGRESS' || b.status === 'PENDING_APPROVAL');

  const [selectedDateStr, setSelectedDateStr] = useState('19/09/2026');

  const filteredBookings = state.bookings.filter(b => b.scheduledDate === selectedDateStr);

  const [sosActive, setSosActive] = useState(false);

  // eKYC Modal State
  const [showEkycModal, setShowEkycModal] = useState(false);
  const [ekycStep, setEkycStep] = useState(1);
  const [ekycForm, setEkycForm] = useState({
    name: 'Nguyễn Thùy Linh',
    phone: '0912 345 678',
    school: 'Đại học Y Dược TP.HCM',
    major: 'Điều dưỡng (Năm 3)',
    cccdFront: true,
    cccdBack: true,
    studentCard: true,
    q1: 'A',
    q2: 'A',
    q3: 'A'
  });

  const handleTriggerSOSAlert = () => {
    setSosActive(true);
    showToast('[SOS BÁO ĐỘNG KHẨN CẤP] Đã gọi cấp cứu 115 & phát báo động khẩn cấp tới điện thoại người nhà kèm định vị GPS!', 'error');
  };

  const handleSubmitEkycApplication = (e) => {
    e.preventDefault();
    const newApplicant = {
      id: `CG-${Math.floor(100 + Math.random() * 900)}`,
      name: ekycForm.name,
      school: `${ekycForm.school} (${ekycForm.major})`,
      phone: ekycForm.phone,
      sopScore: '15/15',
      status: 'PENDING'
    };

    setState({
      ...state,
      pendingCaregivers: [newApplicant, ...state.pendingCaregivers]
    });

    setEkycStep(4);
    showToast('Đã nộp hồ sơ eKYC & Bài test SOP thành công! Đang chờ Ban Quản trị duyệt.', 'success');
  };

  const [selectedJobId, setSelectedJobId] = useState(
    filteredBookings.length > 0 ? filteredBookings[0].id : (state.bookings[0] ? state.bookings[0].id : null)
  );

  const selectedJob = state.bookings.find(b => b.id === selectedJobId) || filteredBookings[0] || state.bookings[0];

  const [confirmModalJob, setConfirmModalJob] = useState(null);

  const [bp, setBp] = useState(activeShift?.careLog?.bloodPressure || '125/82 mmHg');
  const [hr, setHr] = useState(activeShift?.careLog?.heartRate || 74);
  const [bs, setBs] = useState(activeShift?.careLog?.bloodSugar || '6.4 mmol/L');
  const [notes, setNotes] = useState(activeShift?.careLog?.notes || 'Cụ tỉnh táo, vui vẻ. Đã dìu cụ đi dạo 20 phút quanh hành lang chung cư.');
  const [voiceTranscript, setVoiceTranscript] = useState(activeShift?.careLog?.voiceNoteText || '');
  const [isRecording, setIsRecording] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);

  const [caregiverMode, setCaregiverMode] = useState(activeShift ? 'ACTIVE_SHIFT' : 'JOB_FEED');

  const handleSelectDate = (dateStr) => {
    setSelectedDateStr(dateStr);
    const shiftsForDate = state.bookings.filter(b => b.scheduledDate === dateStr);
    if (shiftsForDate.length > 0) {
      setSelectedJobId(shiftsForDate[0].id);
    }
  };

  const handleCaregiverAcceptJob = (jobId) => {
    const updatedBookings = state.bookings.map(b => {
      if (b.id === jobId) {
        return {
          ...b,
          status: 'IN_PROGRESS',
          assignedCaregiver: 'Nguyễn Thùy Linh (SV Điều dưỡng Y Dược)'
        };
      }
      return b;
    });

    setState({ ...state, bookings: updatedBookings });
    setCaregiverMode('ACTIVE_SHIFT');
    showToast('Đã nhận ca trực thành công! Chuyển sang Trang Tác nghiệp Chi tiết.', 'success');
  };

  const handleCaregiverCheckIn = () => {
    showToast('Check-in GPS thành công! Tọa độ hợp lệ cách 25m. Trạng thái: ĐANG CHĂM SÓC.', 'success');
  };

  // AI Voice Recording Simulation Trigger
  const handleToggleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setAiProcessing(true);
      
      setTimeout(() => {
        setAiProcessing(false);
        const sampleText = 'Cụ đã uống 1 viên Amlodipine hạ áp lúc 14:00, ăn hết nửa bát cháo yến mạch bồ câu ninh nhừ. Cụ khen cháu nấu vừa vị và tinh thần cụ rất vui vẻ.';
        setVoiceTranscript(sampleText);
        setNotes(prev => prev ? `${prev}\n[AI Voice Log 14:05]: ${sampleText}` : sampleText);
        showToast('AI bóc tách giọng nói thành công! Đã tự động điền vào nhật ký báo cáo.', 'success');
      }, 1500);
    } else {
      setIsRecording(true);
      showToast('Đang thu âm giọng nói Hộ lý... Bấm lại Micro để dừng & cho AI bóc tách.', 'warning');
    }
  };

  const handleSubmitCareLogForm = (e) => {
    e.preventDefault();
    const updatedBookings = state.bookings.map(b => {
      if (b.id === (activeShift ? activeShift.id : selectedJob.id)) {
        const existingTimeline = b.careLog?.timelineEvents || [];
        
        const newVoiceEvent = voiceTranscript ? {
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          title: 'AI Voice Care Log (Nhật ký Giọng nói)',
          desc: 'AI tự động bóc tách giọng nói Hộ lý thành văn bản và làm bằng chứng chăm sóc.',
          type: 'VOICE',
          audioDuration: '0:28',
          voiceTranscript: voiceTranscript,
          icon: 'Mic'
        } : null;

        const updatedTimeline = newVoiceEvent 
          ? [newVoiceEvent, ...existingTimeline] 
          : existingTimeline;

        return {
          ...b,
          careLog: {
            ...b.careLog,
            bloodPressure: bp,
            heartRate: parseInt(hr),
            bloodSugar: bs,
            medicationGiven: true,
            mealPhoto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
            voiceNoteText: voiceTranscript,
            notes: notes,
            timelineEvents: updatedTimeline
          }
        };
      }
      return b;
    });
    setState({ ...state, bookings: updatedBookings });
    showToast('Đã đồng bộ Nhật ký Daily Care Log (gồm AI Voice Log) về App người nhà!', 'success');
  };

  const handleCaregiverCheckout = () => {
    const targetId = activeShift ? activeShift.id : selectedJob.id;
    const updatedBookings = state.bookings.map(b => {
      if (b.id === targetId) {
        return { ...b, status: 'PENDING_APPROVAL' };
      }
      return b;
    });
    setState({ ...state, bookings: updatedBookings });
    showToast('Check-out thành công! Kích hoạt đếm ngược 12 Giờ Ân hạn giải ngân.', 'warning');
  };

  const currentWorkShift = activeShift || selectedJob;

  return (
    <div class="space-y-6">
      {/* Top Banner */}
      <div class="bg-gradient-to-r from-emerald-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2">
          <span class="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-emerald-200">
            Góc nhìn: Hộ lý / Sinh viên Y Dược (Caregiver)
          </span>
          <h2 class="text-2xl font-bold">
            {caregiverMode === 'JOB_FEED' ? 'Bảng Tin Nhận Ca Theo Lịch Trực' : 'Trang Tác Nghiệp Ca Trực Chi Tiết'}
          </h2>
          <p class="text-xs text-slate-300">
            {caregiverMode === 'JOB_FEED' 
              ? 'Chọn ngày trên thanh lịch timeline để xem và chọn ca trực phù hợp trước khi bấm Nhận ca.'
              : 'Xác thực GPS Geofencing 150m, thu âm AI Voice Care Log rảnh tay & gửi nhật ký.'}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            onClick={() => {
              setShowEkycModal(true);
              setEkycStep(1);
            }}
            class="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            <ShieldCheck class="w-4 h-4" />
            <span>Đăng ký eKYC & Test SOP</span>
          </button>

          {caregiverMode === 'ACTIVE_SHIFT' && (
            <button 
              onClick={() => setCaregiverMode('JOB_FEED')}
              class="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl backdrop-blur transition flex items-center gap-1.5"
            >
              <ArrowLeft class="w-4 h-4" />
              <span>Xem Bảng Tin Ca Trực</span>
            </button>
          )}

          <div class="bg-white/10 px-4 py-3 rounded-2xl backdrop-blur text-right">
            <div class="text-[10px] text-slate-300 font-medium">Ví Thù Lao Hộ Lý</div>
            <div class="font-extrabold text-lg text-emerald-300">{formatVND(state.caregiverWallet)}</div>
          </div>
        </div>
      </div>

      {/* MODE 1: JOB FEED */}
      {caregiverMode === 'JOB_FEED' ? (
        <div class="space-y-6">
          <ScheduleCalendarStrip 
            scheduleDates={state.scheduleDates}
            selectedDateStr={selectedDateStr}
            onSelectDate={handleSelectDate}
          />

          <div class="grid lg:grid-cols-12 gap-8">
            {/* LEFT: JOB LIST FEED */}
            <div class="lg:col-span-5 space-y-4">
              <div class="flex items-center justify-between px-1">
                <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                  <ListCheck class="w-5 h-5 text-emerald-600" />
                  <span>Ca Trực Ngày {selectedDateStr}</span>
                </h3>
                <span class="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  {filteredBookings.length} Ca khả dụng
                </span>
              </div>

              {filteredBookings.length > 0 ? (
                <div class="space-y-3">
                  {filteredBookings.map(job => {
                    const isSelected = job.id === selectedJob?.id;

                    return (
                      <div 
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        class={`p-4 rounded-2xl border transition cursor-pointer space-y-2.5 ${
                          isSelected 
                            ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/20' 
                            : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'
                        }`}
                      >
                        <div class="flex items-center justify-between">
                          <span class="text-xs font-extrabold text-slate-900">{job.seniorName} ({job.seniorAge}t)</span>
                          <span class="text-xs font-extrabold text-emerald-600">{formatVND(job.caregiverPayout)} / ca</span>
                        </div>

                        {job.vibeMatch && (
                          <div class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-amber-200">
                            <Star class="w-3 h-3 text-amber-600 fill-amber-500" />
                            <span>{job.vibeMatch}</span>
                          </div>
                        )}

                        <div class="text-xs text-slate-600 space-y-1">
                          <p class="truncate"><MapPin class="w-3.5 h-3.5 text-slate-400 inline mr-1" /> {job.address}</p>
                          <p><Utensils class="w-3.5 h-3.5 text-slate-400 inline mr-1" /> {job.mealType}</p>
                        </div>

                        <div class="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-medium">
                          <span class="text-slate-500 font-semibold">{job.typeName}</span>
                          <span class="text-emerald-700 font-bold flex items-center gap-1">
                            <span>Xem chi tiết</span>
                            <ChevronRight class="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 space-y-2">
                  <Calendar class="w-8 h-8 text-slate-300 mx-auto" />
                  <p class="text-xs text-slate-500 font-medium">Chưa có ca trực nào được đăng ký vào ngày {selectedDateStr}.</p>
                </div>
              )}
            </div>

            {/* RIGHT: JOB DETAILS PREVIEW */}
            <div class="lg:col-span-7 space-y-6">
              {selectedJob ? (
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Mã đơn: {selectedJob.id}
                        </span>
                        <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          Lịch: {selectedJob.scheduledDateLabel || selectedJob.scheduledDate}
                        </span>
                      </div>
                      <h3 class="font-bold text-slate-900 text-xl mt-2">
                        Chi tiết Ca trực: {selectedJob.seniorName}
                      </h3>
                    </div>
                    <div class="text-right">
                      <div class="text-[11px] text-slate-400 font-medium">Thù lao Hộ lý nhận</div>
                      <div class="text-xl font-extrabold text-emerald-600">{formatVND(selectedJob.caregiverPayout)}</div>
                    </div>
                  </div>

                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <div class="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                        <User class="w-4 h-4 text-emerald-600" />
                        <span>Thông tin Người cần chăm sóc</span>
                      </div>
                      <div class="text-sm font-bold text-slate-900">{selectedJob.seniorName} ({selectedJob.seniorAge} tuổi)</div>
                      <p class="text-xs text-slate-600"><MapPin class="w-3.5 h-3.5 inline mr-1 text-slate-400" /> {selectedJob.address}</p>
                      <p class="text-xs text-slate-600">👤 Người đặt: {selectedJob.buyerName}</p>
                    </div>

                    <div class="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2">
                      <div class="text-xs font-bold text-amber-900 uppercase flex items-center gap-1.5">
                        <AlertCircle class="w-4 h-4 text-amber-600" />
                        <span>Tình trạng Bệnh nền & Yêu cầu</span>
                      </div>
                      <p class="text-xs font-semibold text-slate-800">{selectedJob.conditions}</p>
                      <p class="text-xs text-amber-900">🍲 Menu: <strong>{selectedJob.mealType}</strong></p>
                    </div>
                  </div>

                  <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <FileText class="w-4 h-4 text-emerald-600" />
                      <span>Ghi chú Điều kiện Ca trực từ Gia đình</span>
                    </div>
                    <p class="text-xs text-slate-600 italic leading-relaxed">
                      "{selectedJob.specialNotes}"
                    </p>
                  </div>

                  <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div class="text-xs text-slate-500">
                      <span class="font-bold text-slate-700">Lịch ca:</span> {selectedJob.typeName} ngày {selectedJob.scheduledDate}.
                    </div>
                    
                    {selectedJob.status === 'ESCROW_HOLDING' || selectedJob.status === 'PENDING_PAYMENT' ? (
                      <button 
                        onClick={() => setConfirmModalJob(selectedJob)} 
                        class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-7 py-3 rounded-2xl shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                      >
                        <Handshake class="w-5 h-5" />
                        <span>NHẬN CA TRỰC NÀY NGAY</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => setCaregiverMode('ACTIVE_SHIFT')}
                        class="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow transition flex items-center gap-2"
                      >
                        <span>Vào Trang Tác Nghiệp Ca Này</span>
                        <ChevronRight class="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div class="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400">
                  Vui lòng chọn một ca trực bên danh sách trái để xem thông tin chi tiết.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: ACTIVE SHIFT WORKSTATION (KÈM AI VOICE CARE LOG FEATURE) */
        <div class="space-y-6">
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                  Ca Trực Đang Tác Nghiệp
                </span>
                <span class="text-xs text-slate-400 font-mono">Mã ca: {currentWorkShift.id}</span>
                <span class="text-xs text-slate-500 font-semibold">Lịch: {currentWorkShift.scheduledDateLabel || currentWorkShift.scheduledDate}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900">{currentWorkShift.seniorName} ({currentWorkShift.seniorAge} tuổi)</h3>
              <p class="text-xs text-slate-600"><MapPin class="w-3.5 h-3.5 inline mr-1 text-slate-400" /> {currentWorkShift.address}</p>
            </div>

            <div class="flex flex-wrap items-center gap-3 text-right">
              {/* SOS ALERT BUTTON */}
              <button 
                onClick={handleTriggerSOSAlert}
                class="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-4 py-3 rounded-2xl shadow-lg shadow-rose-600/30 transition transform hover:scale-105 flex items-center gap-2 animate-pulse"
              >
                <Siren class="w-4 h-4 animate-spin" />
                <span>BÁO ĐỘNG KHẨN CẤP (SOS 115)</span>
              </button>

              <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div class="text-[10px] text-slate-400 font-medium">Thù lao ca trực</div>
                <div class="text-lg font-extrabold text-emerald-600">{formatVND(currentWorkShift.caregiverPayout)}</div>
              </div>
              <button 
                onClick={() => setCaregiverMode('JOB_FEED')}
                class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl transition"
              >
                Xem Lịch Ca Khác
              </button>
            </div>
          </div>

          {/* SOS ACTIVE BANNER */}
          {sosActive && (
            <div class="bg-rose-950 text-white p-4 rounded-2xl border border-rose-600 flex items-center justify-between gap-4 animate-bounce">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shrink-0">
                  <PhoneCall class="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div class="font-extrabold text-sm text-rose-200 uppercase">🚨 ĐÃ PHÁT TÍN HIỆU SOS KHẨN CẤP!</div>
                  <div class="text-xs text-rose-100">Đã gửi tọa độ GPS nhà cụ Nguyễn Văn An tới Cấp cứu 115 và phát chuông báo động tới máy anh Trần Minh Tuấn.</div>
                </div>
              </div>
              <button 
                onClick={() => setSosActive(false)}
                class="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 whitespace-nowrap"
              >
                Tắt Cảnh Báo
              </button>
            </div>
          )}

          <div class="grid lg:grid-cols-12 gap-8">
            {/* LEFT: GPS CHECK-IN */}
            <div class="lg:col-span-5 space-y-6">
              <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Camera class="w-5 h-5 text-emerald-600" />
                    <span>Xác thực GPS Geofencing 150m</span>
                  </h3>
                  <span class="text-xs font-bold text-slate-400">Haversine</span>
                </div>

                <div class="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
                  <div class="text-xs font-bold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 class="w-4 h-4 text-emerald-600" />
                    <span>Định vị GPS: <strong class="text-emerald-700">Cách nhà 25m (Hợp lệ)</strong></span>
                  </div>
                  <p class="text-[11px] text-emerald-800 leading-relaxed">
                    Ca trực yêu cầu bấm Check-in khi đến nơi kèm 01 ảnh chụp thực tế trước cửa căn hộ.
                  </p>
                  
                  <button 
                    onClick={handleCaregiverCheckIn}
                    class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Camera class="w-4 h-4" />
                    <span>Bấm Check-in Đến Nhà Kèm Ảnh</span>
                  </button>
                </div>

                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div class="font-bold text-slate-800">Yêu cầu & Ghi chú từ người nhà:</div>
                  <p class="text-slate-600">🩺 {currentWorkShift.conditions}</p>
                  <p class="text-slate-600">🍲 {currentWorkShift.mealType}</p>
                  <p class="text-slate-600 italic">"{currentWorkShift.specialNotes}"</p>
                </div>
              </div>
            </div>

            {/* RIGHT: SUBMIT CARE LOG FORM & AI VOICE LOG */}
            <div class="lg:col-span-7 space-y-6">
              <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                    <CloudUpload class="w-5 h-5 text-teal-600" />
                    <span>Báo cáo Nhật ký Chăm sóc (Daily Care Log)</span>
                  </h3>
                  <span class="text-xs text-slate-400">Đồng bộ trực tiếp về App Con cái</span>
                </div>

                {/* AI VOICE CARE LOG FEATURE BOX */}
                <div class="bg-gradient-to-br from-purple-50 to-indigo-50/70 p-4 rounded-2xl border border-purple-200 space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Sparkles class="w-4 h-4 text-purple-600" />
                      <span class="text-xs font-extrabold text-purple-900">AI Voice Care Log (Cập nhật Rảnh tay bằng Giọng nói)</span>
                    </div>
                    <span class="text-[10px] bg-purple-200/80 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                      Tự động bóc tách AI
                    </span>
                  </div>

                  <p class="text-[11px] text-purple-800">
                    Bấm giữ Micro đọc báo cáo (Ví dụ: "Cụ đã uống 1 viên Amlodipine hạ áp lúc 14h, ăn hết nửa bát cháo bồ câu..."). AI tự bóc tách điền vào nhật ký!
                  </p>

                  <div class="flex items-center gap-3 pt-1">
                    <button 
                      type="button"
                      onClick={handleToggleVoiceRecord}
                      class={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
                        isRecording 
                          ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/30' 
                          : aiProcessing
                            ? 'bg-amber-500 text-slate-950 animate-pulse'
                            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <MicOff class="w-4 h-4 animate-bounce" />
                          <span>Đang thu âm... Bấm để kết thúc</span>
                        </>
                      ) : aiProcessing ? (
                        <>
                          <Sparkles class="w-4 h-4 animate-spin" />
                          <span>AI đang bóc tách giọng nói...</span>
                        </>
                      ) : (
                        <>
                          <Mic class="w-4 h-4" />
                          <span>Mô Phỏng Thu Âm Giọng Nói AI</span>
                        </>
                      )}
                    </button>

                    {voiceTranscript && (
                      <span class="text-[11px] text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                        <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600" />
                        Đã bóc tách văn bản (0:28s)
                      </span>
                    )}
                  </div>

                  {voiceTranscript && (
                    <div class="bg-white p-3 rounded-xl border border-purple-200 text-xs text-purple-950 font-mono space-y-1">
                      <div class="text-[10px] font-bold text-purple-600 uppercase flex items-center gap-1">
                        <Volume2 class="w-3.5 h-3.5 text-purple-500" />
                        Văn bản AI Bóc tách:
                      </div>
                      <p class="italic">"{voiceTranscript}"</p>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmitCareLogForm} class="space-y-4">
                  <div class="grid grid-cols-3 gap-3">
                    <div>
                      <label class="block text-[11px] font-bold text-slate-700 mb-1">Huyết áp (mmHg)</label>
                      <input 
                        type="text" 
                        value={bp} 
                        onChange={(e) => setBp(e.target.value)}
                        class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>
                    <div>
                      <label class="block text-[11px] font-bold text-slate-700 mb-1">Nhịp tim (bpm)</label>
                      <input 
                        type="number" 
                        value={hr} 
                        onChange={(e) => setHr(e.target.value)}
                        class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>
                    <div>
                      <label class="block text-[11px] font-bold text-slate-700 mb-1">Đường huyết</label>
                      <input 
                        type="text" 
                        value={bs} 
                        onChange={(e) => setBs(e.target.value)}
                        class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label class="flex items-center gap-2 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <input type="checkbox" defaultChecked class="w-4 h-4 text-emerald-600 rounded" />
                      <span class="text-xs font-bold text-slate-800">Xác nhận đã nhắc cụ uống thuốc cữ trưa theo đúng đơn chỉ định</span>
                    </label>
                  </div>

                  <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">Ghi chú nhật ký tổng hợp & Bữa ăn đã nấu</label>
                    <textarea 
                      rows="3" 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button 
                      type="submit" 
                      class="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow transition flex items-center justify-center gap-1.5"
                    >
                      <CloudUpload class="w-4 h-4" />
                      <span>Gửi Báo cáo về App Con cái</span>
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={handleCaregiverCheckout} 
                      class="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow transition flex items-center justify-center gap-1.5"
                    >
                      <Flag class="w-4 h-4 text-emerald-400" />
                      <span>Check-out Hoàn tất Ca Trực</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL BEFORE ACCEPTING SHIFT */}
      {confirmModalJob && (
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-scale-up">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5 text-emerald-800 font-bold text-base">
                <div class="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Handshake class="w-5 h-5" />
                </div>
                <span>Xác Nhận Nhận Ca Trực này?</span>
              </div>
              <button 
                onClick={() => setConfirmModalJob(null)}
                class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <div class="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-extrabold text-slate-900">{confirmModalJob.seniorName} ({confirmModalJob.seniorAge}t)</span>
                <span class="text-xs font-extrabold text-emerald-600">{formatVND(confirmModalJob.caregiverPayout)} / ca</span>
              </div>

              <div class="text-xs text-slate-700 space-y-1.5">
                <p><MapPin class="w-3.5 h-3.5 text-slate-400 inline mr-1" /> <strong>Địa chỉ:</strong> {confirmModalJob.address}</p>
                <p><Clock class="w-3.5 h-3.5 text-slate-400 inline mr-1" /> <strong>Khung giờ:</strong> {confirmModalJob.typeName} ({confirmModalJob.scheduledDate})</p>
                <p><Utensils class="w-3.5 h-3.5 text-slate-400 inline mr-1" /> <strong>Thực đơn:</strong> {confirmModalJob.mealType}</p>
              </div>
            </div>

            <div class="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <div class="font-bold flex items-center gap-1.5">
                <AlertCircle class="w-4 h-4 text-amber-600 shrink-0" />
                <span>Lưu ý & Cam kết Quy trình:</span>
              </div>
              <p class="text-[11px] leading-relaxed">
                Sau khi xác nhận, bạn cần di chuyển đến địa điểm ca trực và thực hiện Check-in GPS trong bán kính 150m. Tự ý hủy ca sau khi nhận có thể ảnh hưởng điểm uy tín SOP.
              </p>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setConfirmModalJob(null)}
                class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition"
              >
                Hủy bỏ (Bấm nhầm)
              </button>
              <button 
                onClick={() => {
                  handleCaregiverAcceptJob(confirmModalJob.id);
                  setConfirmModalJob(null);
                }}
                class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 class="w-4 h-4" />
                <span>Xác nhận Nhận ca ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* CAREGIVER EKYC & SOP TEST REGISTRATION MODAL */}
      {showEkycModal && (
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto animate-scale-up">
            {/* Modal Header */}
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldCheck class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="font-extrabold text-slate-900 text-lg">Đăng ký Nguồn cung & Thẩm định eKYC</h3>
                  <p class="text-xs text-slate-500">Quy trình chuẩn hóa 4 bước dành cho Sinh viên Y Dược</p>
                </div>
              </div>
              <button 
                onClick={() => setShowEkycModal(false)}
                class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            {/* Step Wizard Progress */}
            <div class="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
              <div class={`p-2 rounded-xl transition ${ekycStep === 1 ? 'bg-emerald-600 text-white shadow-md' : ekycStep > 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                1. Thông tin cá nhân
              </div>
              <div class={`p-2 rounded-xl transition ${ekycStep === 2 ? 'bg-emerald-600 text-white shadow-md' : ekycStep > 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                2. Upload CCCD & Thẻ SV
              </div>
              <div class={`p-2 rounded-xl transition ${ekycStep === 3 ? 'bg-emerald-600 text-white shadow-md' : ekycStep > 3 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                3. Test Quy chuẩn SOP
              </div>
              <div class={`p-2 rounded-xl transition ${ekycStep === 4 ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                4. Chờ Admin Duyệt
              </div>
            </div>

            {/* STEP 1: PERSONAL & SCHOOL INFO */}
            {ekycStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setEkycStep(2); }} class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Họ và tên sinh viên</label>
                    <input 
                      type="text" 
                      value={ekycForm.name} 
                      onChange={(e) => setEkycForm({ ...ekycForm, name: e.target.value })}
                      class="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" 
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Số điện thoại chính chủ</label>
                    <input 
                      type="text" 
                      value={ekycForm.phone} 
                      onChange={(e) => setEkycForm({ ...ekycForm, phone: e.target.value })}
                      class="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" 
                      required
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Trường Đại học / Cao đẳng Y Dược</label>
                    <select 
                      value={ekycForm.school}
                      onChange={(e) => setEkycForm({ ...ekycForm, school: e.target.value })}
                      class="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Đại học Y Dược TP.HCM">Đại học Y Dược TP.HCM</option>
                      <option value="Đại học Y Khoa Phạm Ngọc Thạch">Đại học Y Khoa Phạm Ngọc Thạch</option>
                      <option value="Đại học Quốc Tế Hồng Bàng (Khoa Y)">Đại học Quốc Tế Hồng Bàng (Khoa Y)</option>
                      <option value="Cao đẳng Y Tế Bình Dương">Cao đẳng Y Tế Bình Dương</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Chuyên ngành & Năm học</label>
                    <input 
                      type="text" 
                      value={ekycForm.major} 
                      onChange={(e) => setEkycForm({ ...ekycForm, major: e.target.value })}
                      class="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" 
                      required
                    />
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    type="submit" 
                    class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-1.5"
                  >
                    <span>Tiếp tục: Upload Giấy Tờ</span>
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: UPLOAD CCCD & STUDENT CARD */}
            {ekycStep === 2 && (
              <div class="space-y-5">
                <div class="text-xs font-semibold text-slate-600">
                  Vui lòng chọn ảnh minh họa Căn cước công dân gắn chip và Thẻ sinh viên Y Dược để thuật toán AI đối soát eKYC:
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-emerald-300 text-center space-y-2">
                    <IdCard class="w-8 h-8 text-emerald-600 mx-auto" />
                    <div class="font-bold text-xs text-slate-800">Ảnh CCCD Gắn Chip (2 Mặt)</div>
                    <span class="inline-block text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      ✓ Đã xác thực NFC chip
                    </span>
                  </div>

                  <div class="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-teal-300 text-center space-y-2">
                    <GraduationCap class="w-8 h-8 text-teal-600 mx-auto" />
                    <div class="font-bold text-xs text-slate-800">Thẻ Sinh Viên Y Dược Chính Chủ</div>
                    <span class="inline-block text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                      ✓ Thẻ SV Y Dược (Năm 3)
                    </span>
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setEkycStep(1)}
                    class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition"
                  >
                    Quay lại
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEkycStep(3)}
                    class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-1.5"
                  >
                    <span>Xác nhận & Làm Test SOP</span>
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SOP ETHIC & SAFETY QUIZ */}
            {ekycStep === 3 && (
              <form onSubmit={handleSubmitEkycApplication} class="space-y-5">
                <div class="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
                  ⚡ <strong>Bài Trắc Nghiệm Đạo Đức Nghề Nghiệp & Quy Trình SOP:</strong> Cần đạt điểm tối đa 15/15 để được cấp chứng nhận hành nghề trên nền tảng.
                </div>

                <div class="space-y-4">
                  <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div class="font-bold text-slate-900">Câu 1: Khi phát hiện cụ bị hạ đường huyết (run tay, vã mồ hôi), bạn nên làm gì đầu tiên?</div>
                    <label class="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
                      <input type="radio" name="q1" defaultChecked class="text-emerald-600" />
                      <span>Cho cụ uống 1 ly nước đường/sữa ấm & kiểm tra chỉ số đường huyết ngay</span>
                    </label>
                  </div>

                  <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div class="font-bold text-slate-900">Câu 2: Việc nhắc cụ uống thuốc phải tuân thủ theo nguyên tắc nào?</div>
                    <label class="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
                      <input type="radio" name="q2" defaultChecked class="text-emerald-600" />
                      <span>Tuyệt đối theo đúng đơn chỉ định của Bác sĩ được ghi trong Y Bạ Điện Tử</span>
                    </label>
                  </div>

                  <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div class="font-bold text-slate-900">Câu 3: Yêu cầu bắt buộc khi thực hiện Check-in ca trực tại nhà người già?</div>
                    <label class="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
                      <input type="radio" name="q3" defaultChecked class="text-emerald-600" />
                      <span>Có mặt đúng giờ trong bán kính Geofencing 150m quanh nhà kèm 1 ảnh check-in thực tế</span>
                    </label>
                  </div>
                </div>

                <div class="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>Kết quả chấm điểm tự động SOP:</span>
                  <span class="text-sm text-emerald-700 bg-emerald-200/80 px-3 py-1 rounded-full">15/15 ĐIỂM (ĐẠT CHUẨN)</span>
                </div>

                <div class="pt-4 border-t border-slate-100 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setEkycStep(2)}
                    class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition"
                  >
                    Quay lại
                  </button>
                  <button 
                    type="submit" 
                    class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-7 py-3 rounded-xl shadow-xl shadow-emerald-600/30 transition flex items-center gap-2"
                  >
                    <CheckCircle2 class="w-4 h-4" />
                    <span>Nộp Hồ Sơ eKYC Chờ Duyệt</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: SUBMITTED & WAITING ADMIN APPROVAL */}
            {ekycStep === 4 && (
              <div class="text-center py-6 space-y-4">
                <div class="w-16 h-16 rounded-full bg-purple-100 text-purple-600 mx-auto flex items-center justify-center">
                  <Sparkles class="w-8 h-8 animate-pulse" />
                </div>
                <h4 class="text-lg font-bold text-slate-900">Đã Nộp Hồ Sơ eKYC Thành Công!</h4>
                <p class="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Hồ sơ sinh viên <strong>{ekycForm.name}</strong> ({ekycForm.school}) kèm điểm bài test SOP <strong>15/15</strong> đã được gửi tới Ban Quản trị Sàn.
                </p>
                
                <div class="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 font-semibold max-w-md mx-auto">
                  👉 <strong>Trải nghiệm tiếp:</strong> Bạn có thể bấm sang tab <code class="bg-purple-200 px-1.5 py-0.5 rounded font-bold">3. Admin sàn</code> ở trên thanh điều hướng chính để bấm duyệt hồ sơ eKYC này ngay!
                </div>

                <button 
                  onClick={() => setShowEkycModal(false)}
                  class="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
                >
                  Đóng Hộp Thoại
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
