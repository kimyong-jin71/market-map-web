// src/App.jsx
import React, { useState, useMemo } from "react";
import useLocalState from "./hooks/useLocalState";
import HeaderBar from "./components/HeaderBar";
import StatsBar from "./components/StatsBar";
import Sidebar from "./components/Sidebar";
import MarketMap from "./components/MarketMap";
import ShopDrawer from "./components/ShopDrawer";
import BoardOverlay from "./components/BoardOverlay";
import ShopAddModal from "./components/ShopAddModal";
import SAMPLE_MARKET from "./sampleData"; // 없으면 src/sampleData.js 파일을 만들어 주세요.

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [market, setMarket] = useLocalState("market-data", SAMPLE_MARKET);
  const [editMode, setEditMode] = useLocalState("market-edit", false);
  const [filter, setFilter] = useState({ q: "", status: "전체" });
  const [selectedId, setSelectedId] = useState(null);
  const [showBoard, setShowBoard] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const selected = useMemo(() => market.shops.find(s => s.id === selectedId) || null, [market, selectedId]);
  const stats = useMemo(() => {
    const base = { 입점: 0, 공실: 0, 예약: 0, 보수중: 0 };
    for (const s of market.shops) base[s.status] = (base[s.status] || 0) + 1;
    return base;
  }, [market.shops]);

  const updateShop = (id, patch) => {
    setMarket(m => ({
      ...m,
      shops: m.shops.map(s => s.id === id ? { ...s, ...patch } : s),
    }));
  };

  const addShop = (shopData) => {
    setMarket(m => ({ ...m, shops: [...m.shops, shopData] }));
  };

  const removeShop = (id) => {
    if (!confirm(`점포 ${id} 를 삭제할까요?`)) return;
    setMarket(m => ({ ...m, shops: m.shops.filter(s => s.id !== id) }));
    setSelectedId(null);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(market, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${market.name.replaceAll(" ", "_")}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const importJSON = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed?.shops) throw new Error("유효하지 않은 형식");
        setMarket(parsed);
      } catch (e) {
        alert("불러오기 실패: " + e.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <HeaderBar
        market={market}
        editMode={editMode}
        setEditMode={setEditMode}
        onAddClick={() => setShowAddModal(true)}
        importJSON={importJSON}
        exportJSON={exportJSON}
        setShowBoard={setShowBoard}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        dense   // ← 헤더 슬림 모드
      />
      <StatsBar stats={stats} dense />
      <main className="max-w-7xl mx-auto px-3 py-3">
        <section className="w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-sm border bg-white">
            <MarketMap
              market={market}
              editMode={editMode}
              onMove={(id, patch) => updateShop(id, patch)}
              onSelect={(id) => setSelectedId(id)}
              filter={filter}
            />
          </div>
        </section>
      </main>

      {/* 오프캔버스 Sidebar는 화면 고정(fixed)로 따로 렌더 */}
      <Sidebar
        market={market}
        filter={filter}
        setFilter={setFilter}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        setMarket={setMarket}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ShopDrawer
        shop={selected}
        onClose={() => setSelectedId(null)}
        onChange={(patch) => selected && updateShop(selected.id, patch)}
        onRemove={() => selected && removeShop(selected.id)}
      />

      <BoardOverlay
        market={market}
        stats={stats}
        showBoard={showBoard}
        setShowBoard={setShowBoard}
      />

      {showAddModal && (
        <ShopAddModal
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => { addShop(data); setShowAddModal(false); }}
        />
      )}

      <footer className="max-w-7xl mx-auto px-3 pb-8 text-xs text-neutral-500">
        © 시장 점포 관리 프로토타입
      </footer>
    </div>
  );
}
