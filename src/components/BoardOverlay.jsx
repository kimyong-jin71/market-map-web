// components/BoardOverlay.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function BoardOverlay({ market, stats, showBoard, setShowBoard }) {
  return (
    <AnimatePresence>
      {showBoard && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="bg-white rounded-3xl p-6 shadow-2xl w-[min(900px,95vw)]">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">{market.name} — 입주 현황 전광판</div>
              <button className="p-2 rounded-full hover:bg-neutral-100" onClick={()=>setShowBoard(false)}><X/></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {Object.entries(stats).map(([k,v]) => (
                <div key={k} className="rounded-2xl p-6 text-center border shadow-sm">
                  <div className="text-neutral-500 mb-1">{k}</div>
                  <div className="text-4xl font-extrabold">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-neutral-500">* 실시간 상태 변경 시 자동 반영됩니다.</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
