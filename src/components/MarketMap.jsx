// components/MarketMap.jsx
import React, { useRef, useEffect, useState } from "react";

const STATUS_COLORS = {
  "입점": "bg-blue-500",
  "공실": "bg-rose-500",
  "예약": "bg-amber-500",
  "보수중": "bg-fuchsia-500",
};

export default function MarketMap({ market, editMode, onMove, onSelect, filter }) {
  const wrapRef = useRef(null);
  const [drag, setDrag] = useState(null);
  const [ratio, setRatio] = useState(16/9);

  const toPct = (clientX, clientY) => {
    const el = wrapRef.current;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const onMouseDown = (e, shop, type) => {
    if (!editMode) return;
    e.stopPropagation();
    const start = { x: shop.x, y: shop.y, w: shop.w, h: shop.h };
    const pt = toPct(e.clientX, e.clientY);
    setDrag({ id: shop.id, type, start, startPt: pt });
  };

  const onMouseMove = (e) => {
    if (!drag) return;
    e.preventDefault();
    const pt = toPct(e.clientX, e.clientY);
    const dx = pt.x - drag.startPt.x;
    const dy = pt.y - drag.startPt.y;
    const s = drag.start;
    if (drag.type === 'move') {
      onMove(drag.id, { x: clamp01(snap(s.x + dx)), y: clamp01(snap(s.y + dy)) });
    } else if (drag.type === 'resize') {
      onMove(drag.id, { w: clamp01(snap(s.w + dx)), h: clamp01(snap(s.h + dy)) });
    }
  };

  const onMouseUp = () => setDrag(null);

  useEffect(() => {
    if (!editMode) return;
    const up = () => setDrag(null);
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, [editMode]);

  const matchesFilter = (s) => {
    const okStatus = filter.status === "전체" || s.status === filter.status;
    const okQ = filter.q.trim() === "" || [s.id, s.name, s.category].join(" ").includes(filter.q.trim());
    return okStatus && okQ;
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className="relative w-full"
      style={{ aspectRatio: ratio }}
    >
      {market.mapUrl && (
        <img
          src={market.mapUrl}
          alt="market"
          className="absolute inset-0 w-full h-full object-contain select-none"
          draggable={false}
          onLoad={(e)=>{
            const {naturalWidth:w, naturalHeight:h} = e.currentTarget;
            if (w && h) setRatio(w / h);          // 🔹 로드 후 비율 계산
          }}
        />
      )}
      {market.shops.map(s => (
        <div
          key={s.id}
          className={`absolute rounded-xl shadow cursor-pointer border ${STATUS_COLORS[s.status]} bg-opacity-80 hover:bg-opacity-90 ${matchesFilter(s) ? "" : "opacity-30 pointer-events-none"}`}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, height: `${s.h}%` }}
          onClick={(e) => { e.stopPropagation(); onSelect(s.id); }}
          onMouseDown={(e) => onMouseDown(e, s, 'move')}
        >
          <div className="text-[10px] sm:text-xs font-semibold text-white p-1.5 leading-tight drop-shadow">
            <div>{s.id}</div>
            <div className="truncate">{s.name || '(미정)'}</div>
          </div>
          {editMode && (
            <div
              onMouseDown={(e) => onMouseDown(e, s, 'resize')}
              className="absolute right-0 bottom-0 w-3 h-3 rounded-br-xl bg-white/80 border border-white cursor-se-resize"
              title="드래그로 크기 조절"
            />
          )}
        </div>
      ))}
    </div>
  );
}

const SNAP = 0.5; // 퍼센트 그리드 스텝
function snap(v) { return Math.round(v / SNAP) * SNAP; }
function clamp01(v) { return Math.max(0, Math.min(100, v)); }

