// components/Sidebar.jsx
import React from "react";

export default function Sidebar({
  market, filter, setFilter, setSelectedId, selectedId, setMarket,
  isOpen = true, onClose = () => {}
}) {
  const filtered = market.shops.filter(s => {
    const okStatus = filter.status === "전체" || s.status === filter.status;
    const okQ = filter.q.trim() === "" || [s.id, s.name, s.category].join(" ").includes(filter.q.trim());
    return okStatus && okQ;
  });

  const STATUS_COLORS = {
    "입점": "bg-blue-500",
    "공실": "bg-rose-500",
    "예약": "bg-amber-500",
    "보수중": "bg-fuchsia-500",
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-[49] bg-black/30 transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* 왼쪽에서 슬라이드 인/아웃 */}
      <aside
        className={`fixed left-0 top-0 z-[50] h-full w-[min(360px,90vw)]
                    bg-white border-r shadow-xl overflow-y-auto
                    transition-transform duration-300 ease-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 space-y-3">
          {/* 검색/필터 */}
          <div className="rounded-2xl p-4 shadow-sm border bg-white">
            <div className="text-sm font-semibold mb-2">검색/필터</div>
            <input
              value={filter.q}
              onChange={e => setFilter(f => ({ ...f, q: e.target.value }))}
              placeholder="점포번호/상호/업종"
              className="w-full border rounded-xl px-3 py-2 mb-2"
            />
            <select
              value={filter.status}
              onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
              className="w-full border rounded-xl px-3 py-2"
            >
              <option>전체</option>
              <option>입점</option>
              <option>공실</option>
              <option>예약</option>
              <option>보수중</option>
            </select>
          </div>

          {/* 시장 설정 */}
          <div className="rounded-2xl p-4 shadow-sm border bg-white">
            <div className="text-sm font-semibold mb-2">시장 설정</div>
            <label className="text-xs text-neutral-500">시장명</label>
            <input
              value={market.name}
              onChange={e => setMarket(m => ({ ...m, name: e.target.value }))}
              className="w-full border rounded-xl px-3 py-2 mb-2"
            />
            <label className="text-xs text-neutral-500">지도 이미지 URL</label>
            <input
              value={market.mapUrl}
              onChange={e => setMarket(m => ({ ...m, mapUrl: e.target.value }))}
              className="w-full border rounded-xl px-3 py-2"
              placeholder="/MunsanMarketMap.png"
            />
            <p className="text-xs text-neutral-500 mt-2">
              * 다른 전통시장은 이미지와 좌표(JSON)만 바꾸면 적용됩니다.
            </p>
          </div>

          {/* 점포 목록 */}
          <div className="rounded-2xl p-4 shadow-sm border bg-white">
            <div className="text-sm font-semibold mb-2">점포 목록 ({filtered.length})</div>
            <div className="max-h-80 overflow-auto space-y-1">
              {filtered.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedId(s.id); onClose(); }}  // 선택 후 닫힘
                  className={`w-full text-left px-3 py-2 rounded-xl border hover:bg-neutral-50 flex items-center justify-between ${selectedId === s.id ? "border-neutral-400" : ""}`}
                >
                  <div>
                    <div className="text-sm font-semibold">{s.id} · {s.name || "(미정)"}</div>
                    <div className="text-xs text-neutral-500">{s.category || "-"}</div>
                  </div>
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${STATUS_COLORS[s.status]}`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
