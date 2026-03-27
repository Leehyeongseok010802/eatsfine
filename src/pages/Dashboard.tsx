import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "dashboard", label: "대시보드" },
  { id: "settings", label: "가게 설정" },
  { id: "menu", label: "메뉴 관리" },
];

interface TableData {
  id: string;
  name: string;
  status: "empty" | "occupied" | "reserved";
}

interface GridCell {
  id: string;
  row: number;
  col: number;
  table: TableData | null;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="font-serif text-4xl text-white mb-4 tracking-widest uppercase">Store Dashboard</h1>
            <p className="text-text-secondary font-light tracking-wide">매장 현황과 설정을 한눈에 관리하세요.</p>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-bg-elevated border border-line rounded-lg">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 text-sm tracking-wider rounded-md transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "bg-accent text-bg font-bold" 
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="min-h-[600px] bg-bg-elevated/50 border border-line rounded-xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === "dashboard" && <DashboardTab />}
              {activeTab === "settings" && <SettingsTab />}
              {activeTab === "menu" && <MenuTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DashboardTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridConfig, setGridConfig] = useState({ rows: 5, cols: 5, tables: 10 });
  const [cells, setCells] = useState<GridCell[]>([]);
  
  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    const newCells: GridCell[] = [];
    let tableCount = 1;
    
    for (let r = 0; r < gridConfig.rows; r++) {
      for (let c = 0; c < gridConfig.cols; c++) {
        const hasTable = tableCount <= gridConfig.tables;
        newCells.push({
          id: `cell-${r}-${c}`,
          row: r,
          col: c,
          table: hasTable ? {
            id: `table-${tableCount}`,
            name: `T${tableCount}`,
            status: "empty"
          } : null
        });
        if (hasTable) tableCount++;
      }
    }
    setCells(newCells);
    setIsModalOpen(false);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, table: TableData, sourceCellId: string) => {
    e.dataTransfer.setData("tableId", table.id);
    e.dataTransfer.setData("sourceCellId", sourceCellId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetCellId: string) => {
    e.preventDefault();
    const tableId = e.dataTransfer.getData("tableId");
    const sourceCellId = e.dataTransfer.getData("sourceCellId");

    if (sourceCellId === targetCellId) return;

    setCells(prevCells => {
      const newCells = [...prevCells];
      const sourceIndex = newCells.findIndex(c => c.id === sourceCellId);
      const targetIndex = newCells.findIndex(c => c.id === targetCellId);

      const sourceTable = newCells[sourceIndex].table;
      const targetTable = newCells[targetIndex].table;

      // Swap tables
      newCells[sourceIndex] = { ...newCells[sourceIndex], table: targetTable };
      newCells[targetIndex] = { ...newCells[targetIndex], table: sourceTable };

      return newCells;
    });
  };

  if (cells.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-32">
        <div className="w-20 h-20 mb-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
          <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <h2 className="text-2xl text-white font-serif tracking-widest uppercase mb-4">No Tables Found</h2>
        <p className="text-text-secondary font-light mb-8 text-center max-w-md">
          아직 생성된 테이블이 없습니다.<br/>매장 도면에 맞게 테이블 그리드를 생성해주세요.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-bg px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm"
        >
          테이블 생성하기
        </button>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-bg-elevated border border-line p-8 rounded-xl w-full max-w-md shadow-2xl"
              >
                <h3 className="text-xl text-white font-serif tracking-widest uppercase mb-6 border-b border-line pb-4">Create Tables</h3>
                <form onSubmit={handleCreateTable} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">가로 줄 수 (Cols)</label>
                      <input 
                        type="number" 
                        min="1" max="20"
                        value={gridConfig.cols}
                        onChange={(e) => setGridConfig({...gridConfig, cols: parseInt(e.target.value)})}
                        className="w-full bg-bg border border-line text-white px-4 py-3 focus:border-accent outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">세로 줄 수 (Rows)</label>
                      <input 
                        type="number" 
                        min="1" max="20"
                        value={gridConfig.rows}
                        onChange={(e) => setGridConfig({...gridConfig, rows: parseInt(e.target.value)})}
                        className="w-full bg-bg border border-line text-white px-4 py-3 focus:border-accent outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">테이블 개수</label>
                    <input 
                      type="number" 
                      min="1" max={gridConfig.rows * gridConfig.cols}
                      value={gridConfig.tables}
                      onChange={(e) => setGridConfig({...gridConfig, tables: parseInt(e.target.value)})}
                      className="w-full bg-bg border border-line text-white px-4 py-3 focus:border-accent outline-none transition-colors"
                    />
                    <p className="text-[10px] text-text-muted mt-2">최대 {gridConfig.rows * gridConfig.cols}개까지 생성 가능합니다.</p>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 border border-line text-text-secondary px-4 py-3 text-xs uppercase tracking-widest hover:text-white transition-colors"
                    >
                      취소
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-accent text-bg px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                    >
                      생성
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-line"></div>
            <span className="text-xs text-text-secondary">빈 좌석</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-xs text-text-secondary">이용중</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <span className="text-xs text-text-secondary">예약됨</span>
          </div>
        </div>
        <button 
          onClick={() => setCells([])}
          className="text-xs text-text-muted hover:text-red-400 underline transition-colors"
        >
          그리드 초기화
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-bg border border-line p-8 rounded-lg">
        <div 
          className="grid gap-4 mx-auto"
          style={{ 
            gridTemplateColumns: `repeat(${gridConfig.cols}, minmax(80px, 1fr))`,
            width: 'fit-content'
          }}
        >
          {cells.map((cell) => (
            <div
              key={cell.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, cell.id)}
              className={`aspect-square min-w-[80px] rounded-lg border-2 border-dashed transition-colors flex items-center justify-center ${
                cell.table ? 'border-transparent' : 'border-line/30 hover:border-accent/30'
              }`}
            >
              {cell.table && (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, cell.table!, cell.id)}
                  className="w-full h-full bg-bg-elevated border border-line rounded-lg shadow-sm flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:border-accent/50 transition-colors group relative"
                >
                  <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                    cell.table.status === 'empty' ? 'bg-line' :
                    cell.table.status === 'occupied' ? 'bg-accent' : 'bg-white'
                  }`} />
                  <span className="text-lg font-serif text-white group-hover:text-accent transition-colors">
                    {cell.table.name}
                  </span>
                  <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">
                    Table
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-text-muted mt-6">
        테이블을 드래그 앤 드롭하여 원하는 위치로 이동할 수 있습니다.
      </p>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl text-white font-serif tracking-widest uppercase border-b border-line pb-4 mb-8">Store Settings</h2>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="block text-xs uppercase tracking-widest text-text-secondary">가게 이름</label>
          <input type="text" defaultValue="L'Amour Fine Dining" className="w-full bg-bg border border-line text-white px-4 py-3 focus:border-accent outline-none" />
        </div>
        
        <div className="space-y-4">
          <label className="block text-xs uppercase tracking-widest text-text-secondary">운영 시간</label>
          <div className="flex gap-4 items-center">
            <input type="time" defaultValue="11:30" className="bg-bg border border-line text-white px-4 py-3 focus:border-accent outline-none flex-1" />
            <span className="text-text-secondary">~</span>
            <input type="time" defaultValue="22:00" className="bg-bg border border-line text-white px-4 py-3 focus:border-accent outline-none flex-1" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs uppercase tracking-widest text-text-secondary">휴무일</label>
          <div className="flex gap-2">
            {['월', '화', '수', '목', '금', '토', '일'].map(day => (
              <button key={day} className={`w-10 h-10 rounded-full text-sm flex items-center justify-center border ${day === '월' ? 'bg-accent text-bg border-accent' : 'border-line text-text-secondary hover:border-white'}`}>
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs uppercase tracking-widest text-text-secondary">예약금 설정</label>
          <div className="flex items-center gap-4">
            <input type="number" defaultValue="50000" className="bg-bg border border-line text-white px-4 py-3 focus:border-accent outline-none flex-1" />
            <span className="text-text-secondary">원 / 인당</span>
          </div>
        </div>

        <div className="pt-6">
          <button className="bg-accent text-bg px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
            설정 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuTab() {
  const menus = [
    { id: 1, name: "Signature Tasting Course", price: "250,000", status: "판매중" },
    { id: 2, name: "Seasonal Lunch Course", price: "120,000", status: "판매중" },
    { id: 3, name: "Wine Pairing (5 Glasses)", price: "150,000", status: "판매중" },
    { id: 4, name: "Special Truffle Add-on", price: "50,000", status: "품절" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center border-b border-line pb-4 mb-8">
        <h2 className="text-xl text-white font-serif tracking-widest uppercase">Menu Management</h2>
        <button className="border border-accent text-accent px-4 py-2 text-xs uppercase tracking-widest hover:bg-accent hover:text-bg transition-colors">
          + 메뉴 추가
        </button>
      </div>

      <div className="space-y-4">
        {menus.map(menu => (
          <div key={menu.id} className="flex items-center justify-between p-6 bg-bg border border-line hover:border-accent/50 transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-bg-elevated border border-line flex items-center justify-center">
                <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg text-white font-light mb-1">{menu.name}</h3>
                <p className="text-accent text-sm">₩ {menu.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs px-3 py-1 ${menu.status === '판매중' ? 'bg-accent/20 text-accent' : 'bg-red-500/20 text-red-500'}`}>
                {menu.status}
              </span>
              <button className="text-text-muted hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
