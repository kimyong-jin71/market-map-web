// components/ShopAddModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopAddModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    status: "공실",
    x: 40,
    y: 40,
    w: 8,
    h: 5
  });

  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const handleSubmit = () => {
    if (!form.id) return alert("점포 번호는 필수입니다");
    onSubmit(form);
  };

  return (
    <AnimatePresence>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <motion.div initial={{scale:0.95}} animate={{scale:1}} exit={{scale:0.95}} className="bg-white rounded-xl p-6 w-[min(420px,95vw)] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-bold">점포 추가</div>
            <button onClick={onClose}><X/></button>
          </div>

          <div className="space-y-2">
            <Field label="점포 번호"><input value={form.id} onChange={e=>handleChange("id", e.target.value)} className="w-full border rounded-xl px-3 py-2"/></Field>
            <Field label="상호명"><input value={form.name} onChange={e=>handleChange("name", e.target.value)} className="w-full border rounded-xl px-3 py-2"/></Field>
            <Field label="업종"><input value={form.category} onChange={e=>handleChange("category", e.target.value)} className="w-full border rounded-xl px-3 py-2"/></Field>
            <Field label="상태">
              <select value={form.status} onChange={e=>handleChange("status", e.target.value)} className="w-full border rounded-xl px-3 py-2">
                <option>공실</option>
                <option>입점</option>
                <option>예약</option>
                <option>보수중</option>
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="X%"><input type="number" value={form.x} onChange={e=>handleChange("x", Number(e.target.value))} className="w-full border rounded-xl px-2 py-1"/></Field>
              <Field label="Y%"><input type="number" value={form.y} onChange={e=>handleChange("y", Number(e.target.value))} className="w-full border rounded-xl px-2 py-1"/></Field>
              <Field label="W%"><input type="number" value={form.w} onChange={e=>handleChange("w", Number(e.target.value))} className="w-full border rounded-xl px-2 py-1"/></Field>
              <Field label="H%"><input type="number" value={form.h} onChange={e=>handleChange("h", Number(e.target.value))} className="w-full border rounded-xl px-2 py-1"/></Field>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl border bg-white hover:bg-neutral-50">취소</button>
            <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-neutral-900 text-white">추가</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-xs text-neutral-500 mb-1">{label}</div>
      {children}
    </label>
  );
}
