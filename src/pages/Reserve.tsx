import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data ---
const RESTAURANTS = [
  { id: 1, name: "L'Amour Fine Dining", category: "French", location: "서울 강남구 청담동", rating: 4.9, image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Sushi Omakase Seoul", category: "Japanese", location: "서울 강남구 신사동", rating: 4.8, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Mingles", category: "Korean Contemporary", location: "서울 강남구 논현동", rating: 4.9, image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Jungsik", category: "Korean Contemporary", location: "서울 강남구 청담동", rating: 4.8, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Mosu", category: "Korean Innovative", location: "서울 용산구 한남동", rating: 4.9, image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Kojima", category: "Japanese", location: "서울 강남구 청담동", rating: 4.7, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "Alla Prima", category: "Italian Contemporary", location: "서울 강남구 논현동", rating: 4.8, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "Kwonsooksoo", category: "Korean", location: "서울 강남구 신사동", rating: 4.9, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop" },
  { id: 9, name: "La Yeon", category: "Korean", location: "서울 중구 장충동", rating: 4.9, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop" },
  { id: 10, name: "Pierre Gagnaire", category: "French", location: "서울 중구 소공동", rating: 4.8, image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop" },
  { id: 11, name: "Soigné", category: "Innovative", location: "서울 서초구 반포동", rating: 4.8, image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop" },
  { id: 12, name: "Exquis", category: "French Contemporary", location: "서울 강남구 청담동", rating: 4.7, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop" },
];

const ITEMS_PER_PAGE = 6;

export default function Reserve() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 검색어에 따른 필터링
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(
      (res) =>
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const currentRestaurants = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRestaurants.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRestaurants, currentPage]);

  // 검색어 변경 시 첫 페이지로 이동
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-widest uppercase">Reserve</h1>
          <p className="text-text-secondary font-light tracking-wide max-w-3xl mx-auto whitespace-nowrap">
            원하는 분위기와 맛을 찾아보세요. 특별한 순간을 위한 완벽한 공간이 준비되어 있습니다.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-20 relative"
        >
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="식당 이름, 지역, 또는 요리 종류를 검색해보세요"
              className="w-full bg-white/5 border-b-2 border-white/20 text-white px-4 py-4 pl-12 focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300 font-light placeholder:text-white/40"
            />
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-accent transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Grid */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {currentRestaurants.length > 0 ? (
              <motion.div 
                key={`grid-${currentPage}-${searchTerm}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {currentRestaurants.map((res, index) => (
                  <motion.div
                    key={res.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] mb-6">
                      <img 
                        src={res.image} 
                        alt={res.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute top-4 right-4 bg-bg/80 backdrop-blur-sm px-3 py-1 flex items-center gap-1">
                        <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white text-xs font-light tracking-wider">{res.rating}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-accent text-[11px] tracking-[0.2em] uppercase mb-2">{res.category}</p>
                      <h3 className="text-2xl text-white font-serif mb-2 group-hover:text-accent transition-colors">{res.name}</h3>
                      <p className="text-text-secondary text-sm font-light mb-6">{res.location}</p>
                      
                      <div className="w-full h-px bg-line group-hover:bg-accent/50 transition-colors relative">
                        <div className="absolute left-0 top-0 h-full w-0 bg-accent group-hover:w-full transition-all duration-500" />
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-text-muted uppercase tracking-widest">View Details</span>
                        <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full py-20"
              >
                <p className="text-text-secondary text-lg font-light mb-4">검색 결과가 없습니다.</p>
                <p className="text-text-muted text-sm">다른 검색어를 입력해보세요.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-20">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-white disabled:opacity-30 disabled:hover:text-text-secondary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center text-sm transition-colors relative ${
                  currentPage === i + 1 ? "text-accent" : "text-text-secondary hover:text-white"
                }`}
              >
                {currentPage === i + 1 && (
                  <motion.div
                    layoutId="paginationIndicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-px bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-white disabled:opacity-30 disabled:hover:text-text-secondary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}