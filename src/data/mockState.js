export const initialMockState = {
  currentView: 'INTRO', // 'INTRO' | 'APP'
  activeRole: 'BUYER',  // 'BUYER' | 'CAREGIVER' | 'ADMIN'
  
  // Financial metrics
  escrowWalletBalance: 3200000,
  platformRevenue: 640000,
  caregiverWallet: 548000,

  // Schedule Dates List for Calendar Strip
  scheduleDates: [
    { dateStr: '19/09/2026', dayName: 'Hôm nay', shortDate: 'T7, 19/09', count: 2 },
    { dateStr: '20/09/2026', dayName: 'Ngày mai', shortDate: 'CN, 20/09', count: 1 },
    { dateStr: '21/09/2026', dayName: 'Thứ Hai', shortDate: 'T2, 21/09', count: 2 },
    { dateStr: '22/09/2026', dayName: 'Thứ Ba', shortDate: 'T3, 22/09', count: 1 },
    { dateStr: '23/09/2026', dayName: 'Thứ Tư', shortDate: 'T4, 23/09', count: 1 },
    { dateStr: '24/09/2026', dayName: 'Thứ Năm', shortDate: 'T5, 24/09', count: 0 },
  ],

  // Senior Profiles
  seniorProfiles: [
    {
      id: 'PROF-001',
      name: 'Cụ Nguyễn Văn An',
      age: 76,
      address: 'Căn 1204, Chung cư Vinhomes Central Park, Bình Thạnh, TP.HCM',
      conditions: 'Tiểu đường Tuýp 2, Cao huyết áp nhẹ, hay quên cữ thuốc',
      diet: 'Ăn nhạt, ít tinh bột (thực đơn tiểu đường), món mềm dễ nhai',
      vibe: 'Thích người giọng miền Nam, tính nhẹ nhàng, biết đánh cờ tướng'
    }
  ],

  // Bookings / Job Feed
  bookings: [
    {
      id: 'ELDER-8842',
      buyerName: 'Anh Trần Minh Tuấn (Con trai)',
      seniorName: 'Cụ Nguyễn Văn An',
      seniorAge: 76,
      address: 'Căn 1204, Chung cư Vinhomes Central Park, Bình Thạnh',
      type: 'HOURLY_4H',
      typeName: 'Ca Lẻ 4 Tiếng (13:00 - 17:00)',
      scheduledDate: '19/09/2026',
      scheduledDateLabel: 'Hôm nay (19/09/2026)',
      includesMeal: true,
      mealType: 'Thực đơn Tiểu đường (Ít tinh bột)',
      totalAmount: 370000,
      platformFee: 74000,
      caregiverPayout: 296000,
      status: 'ESCROW_HOLDING',
      createdAt: '19/09/2026 14:30',
      assignedCaregiver: 'Nguyễn Thùy Linh (SV Điều dưỡng Y Dược)',
      vibeMatch: 'Cụ rất hợp với bạn (Thích đánh cờ & nói giọng Nam)',
      conditions: 'Tiểu đường tuýp 2, cao huyết áp. Cần nhắc uống thuốc cữ trưa 14:00.',
      specialNotes: 'Nhà có chó cún nhỏ hiền lành. Nguyên liệu nấu ăn đã có sẵn trong tủ lạnh.',
      checkinTime: '13:02',
      checkoutTime: null,
      careLog: {
        bloodPressure: '125/82 mmHg',
        heartRate: 74,
        bloodSugar: '6.4 mmol/L',
        medicationGiven: true,
        mealPhoto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        voiceNoteText: 'Cụ đã uống 1 viên Amlodipine hạ áp lúc 14:00, ăn hết nửa bát cháo yến mạch bồ câu ninh nhừ. Cụ khen cháu nấu vừa vị và tinh thần cụ rất vui vẻ.',
        voiceDuration: '0:28',
        notes: 'Cụ tỉnh táo, vui vẻ. Đã dìu cụ đi dạo 20 phút quanh hành lang chung cư, cụ uống đủ 1 ly nước ấm.',
        timelineEvents: [
          {
            time: '13:02 PM',
            title: 'GPS Geofencing Check-in',
            desc: 'Đã xác thực tọa độ tại nhà (cách 25m). Đã tải ảnh check-in cửa căn hộ.',
            type: 'GPS',
            icon: 'MapPin'
          },
          {
            time: '14:05 PM',
            title: 'AI Voice Care Log & Nhắc Thuốc',
            desc: 'Cụ đã uống 1 viên Amlodipine hạ áp lúc 14:00. AI bóc tách giọng nói Hộ lý thành văn bản thành công.',
            type: 'VOICE',
            audioDuration: '0:28',
            voiceTranscript: 'Cụ đã uống 1 viên Amlodipine hạ áp lúc 14:00, ăn hết nửa bát cháo yến mạch bồ câu ninh nhừ. Cụ khen cháu nấu vừa vị và tinh thần cụ rất vui vẻ.',
            icon: 'Mic'
          },
          {
            time: '14:30 PM',
            title: 'Cập nhật Sinh hiệu & Bữa ăn',
            desc: 'Huyết áp 125/82 mmHg | Nhịp tim 74 bpm | Đường huyết 6.4 mmol/L.',
            type: 'VITALS',
            icon: 'HeartPulse'
          },
          {
            time: '15:15 PM',
            title: 'Bữa ăn Dinh dưỡng & Vận động',
            desc: 'Đã chuẩn bị xong mâm cơm Tiểu đường. Dìu cụ đi dạo 20 phút quanh hành lang.',
            type: 'MEAL',
            mealPhoto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
            icon: 'Utensils'
          }
        ]
      }
    },
    {
      id: 'ELDER-9320',
      buyerName: 'Anh Phạm Quốc Bảo',
      seniorName: 'Cụ Lê Hoàng Nam',
      seniorAge: 79,
      address: 'Căn 501, Chung cư Sunrise City, Quận 7',
      type: 'HOURLY_4H',
      typeName: 'Ca Lẻ 4 Tiếng (17:00 - 21:00)',
      scheduledDate: '19/09/2026',
      scheduledDateLabel: 'Hôm nay (19/09/2026)',
      includesMeal: false,
      mealType: 'Khái niệm ăn uống thông thường',
      totalAmount: 220000,
      platformFee: 44000,
      caregiverPayout: 176000,
      status: 'ESCROW_HOLDING',
      createdAt: '19/09/2026 16:00',
      assignedCaregiver: null,
      vibeMatch: 'Phù hợp sinh viên Điều dưỡng Nam/Nữ',
      conditions: 'Hay quên cữ thuốc chiều, cần hỗ trợ vệ sinh cá nhân.',
      specialNotes: 'Cụ thích nghe nhạc tiền chiến.',
      checkinTime: null,
      checkoutTime: null,
      careLog: null
    }
  ],

  // Pending Caregivers eKYC
  pendingCaregivers: [
    {
      id: 'CG-902',
      name: 'Lê Minh Hoàng',
      school: 'Đại học Y Dược TP.HCM (Năm 3)',
      phone: '0988 123 456',
      sopScore: '14/15',
      status: 'PENDING'
    }
  ]
};
