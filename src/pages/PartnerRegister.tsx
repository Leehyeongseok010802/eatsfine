import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PartnerRegisterProps {
  onNavigate: (page: string) => void;
}

export default function PartnerRegister({ onNavigate }: PartnerRegisterProps) {
  const [step, setStep] = useState(1);
  const [menus, setMenus] = useState([1]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const addMenu = () => setMenus([...menus, menus.length + 1]);
  const removeMenu = (id: number) => setMenus(menus.filter(m => m !== id));

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 px-8 md:px-12">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-3xl text-white mb-4 tracking-widest uppercase">Partner Application</h1>
          <p className="text-text-secondary font-light tracking-wide">Eatsfine 파트너가 되어 특별한 다이닝 경험을 공유하세요.</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-bold transition-colors duration-300 ${
                step >= i ? "border-accent bg-accent text-bg" : "border-line text-text-muted"
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`w-16 h-px transition-colors duration-300 ${step > i ? "bg-accent" : "bg-line"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-bg-elevated/50 border border-line p-8 md:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl text-white font-serif tracking-widest uppercase mb-2">Business Verification</h2>
                  <p className="text-sm text-text-secondary font-light">사업자등록번호를 입력하고 인증을 진행해주세요.</p>
                </div>

                <div className="space-y-8">
                  <InputField label="대표자명" placeholder="대표자명을 입력해주세요" required />
                  <InputField label="사업자등록번호" placeholder="10자리 숫자를 입력해주세요" required />
                  <InputField label="개업일자" placeholder="8자리 숫자를 입력해주세요 (예: 20240101)" required />
                  
                  <div className="pt-4">
                    <button className="w-full border border-accent text-accent py-4 text-xs font-bold tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors">
                      인증하기
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-xl text-white font-serif tracking-widest uppercase mb-2">Store Information</h2>
                  <p className="text-sm text-text-secondary font-light">고객에게 보여질 가게 정보를 입력해주세요.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="가게 이름" placeholder="예: 더 플레이스 강남점" required />
                  <SelectField label="음식 종류" options={["한식", "양식", "일식", "중식", "파인다이닝", "오마카세"]} required />
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <InputField label="주소" placeholder="주소 검색" required readOnly />
                    </div>
                    <button className="border border-line text-white px-6 py-3 text-xs tracking-widest uppercase hover:border-white transition-colors h-[42px]">
                      주소 검색
                    </button>
                  </div>
                  <InputField placeholder="상세주소 (선택)" />
                </div>

                <InputField label="전화번호" placeholder="02-1234-5678" required />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="영업 시작 시간" type="time" required />
                  <InputField label="영업 종료 시간" type="time" required />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-4">정기 휴무일 (선택)</label>
                  <div className="flex gap-3 flex-wrap">
                    {["월", "화", "수", "목", "금", "토", "일"].map(day => (
                      <button key={day} className="w-10 h-10 rounded-full border border-line text-text-secondary text-sm hover:border-accent hover:text-accent transition-colors focus:bg-accent focus:text-bg focus:border-accent">
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SelectField label="예약금 비율" options={["10%", "20%", "30%", "50%", "100%"]} required />
                  <InputField label="예약 시간 간격 (분)" type="number" placeholder="30" required />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-4">식당 대표 이미지 *</label>
                  <div className="border-2 border-dashed border-line/50 hover:border-accent/50 transition-colors rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer bg-bg/50 group">
                    <svg className="w-8 h-8 text-text-muted mb-4 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-sm text-white mb-2">이미지 업로드</p>
                    <p className="text-xs text-text-muted">최대 용량: 1MB<br/>형식: JPG, PNG</p>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-4">가게 소개 *</label>
                  <textarea 
                    className="w-full bg-transparent border border-line p-4 text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none h-32 text-sm font-light"
                    placeholder="가게에 대한 간단한 소개를 작성해주세요."
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl text-white font-serif tracking-widest uppercase mb-2">Menu Registration</h2>
                  <p className="text-sm text-text-secondary font-light">대표 메뉴를 등록해주세요. 나중에 추가하거나 수정할 수 있습니다.</p>
                </div>

                {menus.map((menuId, index) => (
                  <div key={menuId} className="border border-line/50 p-6 relative group bg-bg">
                    {index > 0 && (
                      <button 
                        onClick={() => removeMenu(menuId)}
                        className="absolute top-6 right-6 text-text-muted hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                    <h3 className="text-accent text-xs tracking-widest uppercase mb-6">Menu {index + 1}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8">
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-3">메뉴 이미지</label>
                        <div className="border-2 border-dashed border-line/50 hover:border-accent/50 transition-colors rounded-lg h-32 flex flex-col items-center justify-center text-center cursor-pointer bg-bg/50 group/upload">
                          <svg className="w-6 h-6 text-text-muted mb-2 group-hover/upload:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <p className="text-[10px] text-text-muted">업로드</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="메뉴명" placeholder="예: 스테이크" required />
                          <InputField label="가격" placeholder="30000" type="number" required />
                        </div>
                        <SelectField label="카테고리" options={["메인 메뉴", "에피타이저", "디저트", "음료", "주류"]} required />
                        <div>
                          <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-3">메뉴 설명</label>
                          <textarea 
                            className="w-full bg-transparent border-b border-line pb-2 text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none h-10 text-sm font-light"
                            placeholder="메뉴에 대한 간단한 설명"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={addMenu}
                  className="w-full border border-dashed border-line text-text-secondary py-4 text-xs tracking-widest uppercase hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  메뉴 추가
                </button>

                <div className="bg-accent/10 border border-accent/20 p-4 rounded text-center mt-4">
                  <p className="text-xs text-accent font-light">💡 메뉴 등록은 선택사항입니다. 관리자 페이지에서 언제든지 추가하거나 수정할 수 있습니다.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between items-center pt-8 border-t border-line/50">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="border border-line text-text-secondary px-8 py-3 text-xs font-bold tracking-widest uppercase hover:text-white hover:border-white transition-colors"
              >
                이전
              </button>
            ) : <div />}

            {step < 3 ? (
              <button 
                onClick={nextStep}
                className="bg-white text-bg px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-accent hover:text-bg transition-colors"
              >
                다음
              </button>
            ) : (
              <button 
                onClick={() => {
                  alert("입점 신청이 완료되었습니다.");
                  onNavigate("mypage");
                }}
                className="bg-accent text-bg px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
              >
                등록 완료
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Form Components ---

function InputField({ label, required, ...props }: any) {
  return (
    <div>
      {label && (
        <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-3">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      <input 
        className="w-full bg-transparent border-b border-line pb-3 text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors text-sm font-light"
        {...props}
      />
    </div>
  );
}

function SelectField({ label, options, required, ...props }: any) {
  return (
    <div>
      {label && (
        <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-3">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      <div className="relative">
        <select 
          className="w-full bg-transparent border-b border-line pb-3 text-white focus:outline-none focus:border-accent transition-colors text-sm font-light appearance-none cursor-pointer"
          {...props}
        >
          {options.map((opt: string) => (
            <option key={opt} value={opt} className="bg-bg text-white">{opt}</option>
          ))}
        </select>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary pb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}