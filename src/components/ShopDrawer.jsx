// components/ShopDrawer.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";

export default function ShopDrawer({ shop, onClose, onChange, onRemove }) {
  if (!shop) return null;
  return (
    <AnimatePresence>
      {shop && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={onClose}/>
          <motion.div initial={{x:400, opacity:0}} animate={{x:0, opacity:1}} exit={{x:400, opacity:0}} transition={{type:'spring', stiffness:180, damping:20}} className="absolute right-0 top-0 h-full w-[min(420px,95vw)] bg-white shadow-2xl p-4 overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold">점포 상세 — {shop.id}</div>
              <button className="p-2 rounded-full hover:bg-neutral-100" onClick={onClose}><X/></button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Field label="점포 번호"><input value={shop.id} disabled className="w-full border rounded-xl px-3 py-2 bg-neutral-50"/></Field>
              <Field label="상태">
                <select value={shop.status} onChange={e=>onChange({status:e.target.value})} className="w-full border rounded-xl px-3 py-2">
                  <option>입점</option>
                  <option>공실</option>
                  <option>예약</option>
                  <option>보수중</option>
                </select>
              </Field>
              <Field label="상호명"><input value={shop.name||""} onChange={e=>onChange({name:e.target.value})} className="w-full border rounded-xl px-3 py-2"/></Field>
              <Field label="업종"><input value={shop.category||""} onChange={e=>onChange({category:e.target.value})} className="w-full border rounded-xl px-3 py-2"/></Field>
              <Field label="연락처"><input value={shop.contact||""} onChange={e=>onChange({contact:e.target.value})} className="w-full border rounded-xl px-3 py-2"/></Field>
              <Field label="점주"><input value={shop.owner||""} onChange={e=>onChange({owner:e.target.value})} className="w-full border rounded-xl px-3 py-2"/></Field>
            </div>

            <Field label="메모">
              <textarea value={shop.memo||""} onChange={e=>onChange({memo:e.target.value})} className="w-full border rounded-xl px-3 py-2 min-h-[80px]"/>
            </Field>

            <div className="grid grid-cols-4 gap-2 mt-2">
              <Field label="X%"><input type="number" value={shop.x} onChange={e=>onChange({x: Number(e.target.value)})} className="w-full border rounded-xl px-2 py-1"/></Field>
              <Field label="Y%"><input type="number" value={shop.y} onChange={e=>onChange({y: Number(e.target.value)})} className="w-full border rounded-xl px-2 py-1"/></Field>
              <Field label="W%"><input type="number" value={shop.w} onChange={e=>onChange({w: Number(e.target.value)})} className="w-full border rounded-xl px-2 py-1"/></Field>
              <Field label="H%"><input type="number" value={shop.h} onChange={e=>onChange({h: Number(e.target.value)})} className="w-full border rounded-xl px-2 py-1"/></Field>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button onClick={onRemove} className="px-3 py-2 rounded-xl border bg-white hover:bg-neutral-50 text-rose-600 flex items-center gap-1"><Trash2 size={16}/> 삭제</button>
              <button onClick={onClose} className="px-4 py-2 rounded-xl bg-neutral-900 text-white">닫기</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }){
  return (
    <label className="block">
      <div className="text-xs text-neutral-500 mb-1">{label}</div>
      {children}
    </label>
  );
}
