// components/StatsBar.jsx
import React from "react";

// dense=true 로 주면 높이를 대폭 낮춘 컴팩트 모드가 됩니다.
export default function StatsBar({ stats, dense = false }) {
  const cardPad = dense ? "h-8 px-4" : "p-3";          // 🔹 카드 높이/패딩
  const labelCls = dense ? "text-xs" : "text-sm";       // 🔹 라벨 글자 크기
  const valueCls = dense ? "text-lg" : "text-2xl";      // 🔹 숫자 글자 크기

  return (
    <div className="max-w-7xl mx-auto px-3 mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {Object.entries(stats).map(([k, v]) => (
        <div
          key={k}
          className={`rounded-2xl shadow-sm border bg-white flex items-center justify-between ${cardPad}`}
        >
          <div className={`${labelCls} text-neutral-500`}>{k}</div>
          <div className={`${valueCls} font-bold`}>{v}</div>
        </div>
      ))}
    </div>
  );
}
