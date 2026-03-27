import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "@/utils/auth";

const TABS = [
  { id: "info", label: "내 정보" },
  { id: "settings", label: "계정 설정" },
  { id: "subscription", label: "구독 관리" },
  { id: "reservations", label: "예약 현황" },
  { id: "store", label: "내 가게 관리" },
];

interface MyPageProps {
  user?: User | null;
}

export default function MyPage({ user }: MyPageProps) {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 px-8 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-serif text-4xl text-white mb-4 tracking-widest uppercase">My Account</h1>
          <p className="text-text-secondary font-light tracking-wide">환영합니다, {user?.name || "고객"}님. 당신만의 다이닝 경험을 관리하세요.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          {/* Sidebar Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-56 shrink-0 flex flex-col gap-2"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-6 py-4 text-[13px] tracking-[0.1em] transition-all duration-300 relative ${
                  activeTab === tab.id ? "text-accent font-medium" : "text-text-secondary hover:text-white font-light"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-bg-elevated/50 border border-line p-8 md:p-12"
              >
                {activeTab === "info" && <InfoContent user={user} />}
                {activeTab === "settings" && <SettingsContent />}
                {activeTab === "subscription" && <SubscriptionContent />}
                {activeTab === "reservations" && <ReservationsContent />}
                {activeTab === "store" && <StoreContent />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Dummy Content Components ---

function InfoContent({ user }: { user?: User | null }) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl text-white font-serif tracking-widest uppercase border-b border-line pb-4 mb-8">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-2">Name</label>
          <p className="text-white font-light">{user?.name || "홍길동"}</p>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-2">Email</label>
          <p className="text-white font-light">{user?.id || "hong@example.com"}</p>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-2">Phone</label>
          <p className="text-white font-light">010-1234-5678</p>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-2">Member Since</label>
          <p className="text-white font-light">2024. 01. 15</p>
        </div>
      </div>
      <div className="pt-8">
        <button className="border border-accent text-accent px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-bg transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="space-y-12">
      <h2 className="text-xl text-white font-serif tracking-widest uppercase border-b border-line pb-4">Account Settings</h2>
      
      {/* 알림 설정 */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-medium">알림 설정</h3>
            <p className="text-xs text-text-secondary">받고 싶은 알림을 선택하세요</p>
          </div>
        </div>

        <div className="space-y-6 pl-11">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-light mb-1">예약 관련 알림</p>
              <p className="text-xs text-text-secondary">예약 확인, 변경, 취소 알림</p>
            </div>
            <div className="w-10 h-5 bg-accent rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-3 h-3 bg-bg rounded-full" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-light mb-1">프로모션 알림</p>
              <p className="text-xs text-text-secondary">할인, 이벤트 정보</p>
            </div>
            <div className="w-10 h-5 bg-accent rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-3 h-3 bg-bg rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-light mb-1">리뷰 알림</p>
              <p className="text-xs text-text-secondary">내 리뷰에 대한 반응 알림</p>
            </div>
            <div className="w-10 h-5 bg-line rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-3 h-3 bg-text-secondary rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-line/50" />

      {/* 알림 수신 방법 */}
      <div className="space-y-6">
        <h3 className="text-white font-medium pl-11">알림 수신 방법</h3>
        
        <div className="space-y-6 pl-11">
          <div className="flex items-center justify-between">
            <p className="text-white font-light">이메일</p>
            <div className="w-10 h-5 bg-accent rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-3 h-3 bg-bg rounded-full" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-white font-light">SMS</p>
            <div className="w-10 h-5 bg-line rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-3 h-3 bg-text-secondary rounded-full" />
            </div>
          </div>

          <div className="pt-4">
            <button className="bg-accent text-bg px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
              저장하기
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-line/50" />

      {/* 계정 탈퇴 */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-medium">계정 탈퇴</h3>
            <p className="text-xs text-text-secondary">계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다</p>
          </div>
        </div>
        
        <div className="pl-11">
          <button className="border border-red-500/50 text-red-500 px-6 py-2.5 text-xs font-bold hover:bg-red-500 hover:text-white transition-colors">
            계정 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}

function SubscriptionContent() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl text-white font-serif tracking-widest uppercase border-b border-line pb-4 mb-8">Subscription</h2>
      <div className="bg-accent/10 border border-accent p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-block px-2 py-1 bg-accent text-bg text-[10px] uppercase tracking-widest font-bold mb-3">Active</span>
          <h3 className="text-2xl text-accent font-serif mb-2">Eatsfine Prestige</h3>
          <p className="text-sm text-text-secondary font-light">매월 1회 프리미엄 다이닝 예약 우선권 및 웰컴 드링크 제공</p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-white text-xl mb-1">₩49,000 <span className="text-sm text-text-secondary">/ 월</span></p>
          <p className="text-xs text-text-secondary">다음 결제일: 2026. 04. 15</p>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <button className="border border-line text-white px-6 py-3 text-xs uppercase tracking-widest hover:border-white transition-colors">
          결제 수단 관리
        </button>
        <button className="border border-line text-text-secondary px-6 py-3 text-xs uppercase tracking-widest hover:text-white transition-colors">
          구독 해지
        </button>
      </div>
    </div>
  );
}

function ReservationsContent() {
  const [filter, setFilter] = useState("전체");
  
  const reservations = [
    { id: 1, date: "2026. 04. 02 19:00", name: "L'Amour Fine Dining", status: "예정", guests: 2 },
    { id: 2, date: "2026. 03. 15 18:30", name: "Sushi Omakase Seoul", status: "완료", guests: 2 },
    { id: 3, date: "2026. 02. 28 20:00", name: "Mingles", status: "취소", guests: 4 },
  ];

  const filteredReservations = reservations.filter(res => {
    if (filter === "전체") return true;
    return res.status === filter;
  });

  return (
    <div className="space-y-8">
      <h2 className="text-xl text-white font-serif tracking-widest uppercase border-b border-line pb-4 mb-8">Reservations</h2>
      
      {/* Sub Tabs */}
      <div className="flex gap-6 border-b border-line/50 pb-4 mb-6">
        {["전체", "예정", "완료", "취소"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`text-sm tracking-wider transition-colors relative ${
              filter === tab ? "text-accent" : "text-text-secondary hover:text-white"
            }`}
          >
            {tab}
            {filter === tab && (
              <motion.div
                layoutId="reservationTabIndicator"
                className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-accent"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((res) => (
            <div key={res.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-line hover:border-accent/50 transition-colors bg-bg">
              <div>
                <p className="text-accent text-xs tracking-widest mb-2">{res.date}</p>
                <h3 className="text-lg text-white font-light mb-1">{res.name}</h3>
                <p className="text-sm text-text-secondary">Guests: {res.guests}</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-3">
                <span className={`text-xs px-3 py-1 uppercase tracking-wider ${
                  res.status === '예정' ? 'bg-accent/20 text-accent' : 
                  res.status === '완료' ? 'bg-white/10 text-white' : 'bg-line text-text-secondary'
                }`}>
                  {res.status}
                </span>
                {res.status === '예정' && (
                  <button className="text-xs text-text-muted hover:text-white underline transition-colors">예약 취소</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-text-secondary font-light">
            해당하는 예약 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

function StoreContent() {
  const [hasStore, setHasStore] = useState(false); // 데모용 토글 상태

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-line pb-4 mb-8">
        <h2 className="text-xl text-white font-serif tracking-widest uppercase">My Store</h2>
        <button 
          onClick={() => setHasStore(!hasStore)} 
          className="text-xs text-text-muted underline hover:text-white transition-colors"
        >
          {hasStore ? "가게 없는 상태 보기" : "가게 있는 상태 보기"} (Demo)
        </button>
      </div>

      {!hasStore ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto border border-line rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl text-white font-serif tracking-widest uppercase mb-4">Register Your Restaurant</h3>
          <p className="text-text-secondary font-light max-w-md mx-auto mb-8">
            파인다이닝 오너이신가요? Eatsfine 파트너가 되어 더 많은 미식가들에게 당신의 요리를 선보이세요.
          </p>
          <button className="bg-accent text-bg px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
            파트너 입점 신청
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 border border-line bg-bg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-[10px] uppercase tracking-widest font-bold mb-3">운영중</span>
              <h3 className="text-2xl text-white font-serif mb-2">L'Amour Fine Dining</h3>
              <p className="text-sm text-text-secondary font-light">서울 강남구 청담동 123-45</p>
            </div>
            <div className="flex gap-3">
              <button className="border border-line text-white px-6 py-3 text-xs uppercase tracking-widest hover:border-white transition-colors">
                가게 정보 수정
              </button>
              <button className="bg-accent text-bg px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors">
                예약 관리
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 border border-line bg-bg-elevated">
              <p className="text-text-secondary text-xs tracking-widest uppercase mb-2">오늘의 예약</p>
              <p className="text-3xl text-white font-light">12<span className="text-sm text-text-muted ml-1">건</span></p>
            </div>
            <div className="p-6 border border-line bg-bg-elevated">
              <p className="text-text-secondary text-xs tracking-widest uppercase mb-2">이번 달 방문</p>
              <p className="text-3xl text-white font-light">348<span className="text-sm text-text-muted ml-1">명</span></p>
            </div>
            <div className="p-6 border border-line bg-bg-elevated">
              <p className="text-text-secondary text-xs tracking-widest uppercase mb-2">평점</p>
              <p className="text-3xl text-accent font-light">4.9<span className="text-sm text-text-muted ml-1">/ 5.0</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}