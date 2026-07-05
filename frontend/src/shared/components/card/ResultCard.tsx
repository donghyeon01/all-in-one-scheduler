import React from "react";

export const ResultCard = () => {
  return (
    <div className="rounded-3xl border-3 border-text bg-white p-6 shadow-[6px_6px_0px_0px_#edf4ff] hover:translate-y-[-4px] transition-all duration-200">
      <div className="inline-block rounded-full bg-success-light px-3 py-2 text-xs font-black text-text ">
        추천도 100%
      </div>
      <h3 className="mt-6 text-2xl font-black text-text">7월 15일 (수)</h3>
      <p className="mt-1 font-bold text-accent-purple">오후 07:00 ~ 09:00</p>
      <div className="mt-4 rounded-xl bg-primary-bg border-2 border-dashed border-primary p-5 font-bold text-text">
        5 / 5 참여 가능!
      </div>
    </div>
  );
};
