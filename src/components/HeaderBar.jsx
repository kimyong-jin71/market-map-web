// components/HeaderBar.jsx
import React from "react";
import { Save, Upload, Edit3, Eye, Plus, MonitorPlay, PanelLeft } from "lucide-react";

// dense=true 로 주면 헤더 높이를 줄인 컴팩트 모드가 됩니다.
export default function HeaderBar({
  market,
  editMode,
  setEditMode,
  onAddClick,
  importJSON,
  exportJSON,
  setShowBoard,
  onToggleSidebar,
  dense = false,
}) {
  const barPad = dense ? "px-3 py-1" : "px-3 py-2";         // 헤더 전체 패딩
  const titleCls = dense ? "text-lg font-bold" : "text-xl font-bold"; // 타이틀 크기
  const btnPad = dense ? "px-2.5 py-1 text-[13px]" : "px-3 py-1.5";    // 버튼 패딩/텍스트
  const iconSize = dense ? 14 : 16;                                      // 아이콘 크기

  const Btn = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`${btnPad} rounded-2xl shadow-sm border bg-white hover:bg-neutral-50 flex items-center gap-1 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
      <div className={`max-w-7xl mx-auto ${barPad} flex items-center gap-3`}>
        <Btn onClick={onToggleSidebar} className="rounded-xl" aria-label="사이드바 토글">
          <PanelLeft size={iconSize} />
        </Btn>

        <div className={titleCls}>{market.name} — 점포 관리</div>

        <div className="ml-auto flex items-center gap-2">
          <Btn onClick={() => setShowBoard(v => !v)}>
            <MonitorPlay size={iconSize} /> 전광판
          </Btn>
          <Btn onClick={onAddClick}>
            <Plus size={iconSize} /> 점포 추가
          </Btn>
          <label className={`${btnPad} rounded-2xl shadow-sm border bg-white hover:bg-neutral-50 flex items-center gap-2 cursor-pointer`}>
            <Upload size={iconSize} /> 불러오기
            <input type="file" accept="application/json" className="hidden" onChange={e => e.target.files && importJSON(e.target.files[0])} />
          </label>
          <Btn onClick={exportJSON}>
            <Save size={iconSize} /> 내보내기
          </Btn>
          <button
            onClick={() => setEditMode(v => !v)}
            className={`${btnPad} rounded-2xl shadow-sm border flex items-center gap-1 ${editMode ? "bg-emerald-50 border-emerald-300" : "bg-white hover:bg-neutral-50"}`}
          >
            {editMode ? <Eye size={iconSize} /> : <Edit3 size={iconSize} />} {editMode ? "보기 모드" : "편집 모드"}
          </button>
        </div>
      </div>
    </header>
  );
}
