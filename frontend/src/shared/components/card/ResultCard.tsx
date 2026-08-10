import Card from "./Card";

export const ResultCard = () => {
  return (
    <Card variant="brutal-accent">
      <div className="inline-block rounded-full bg-success-light px-3 py-2 text-xs font-black text-text">
        추천도 100%
      </div>
      <h3 className="mt-6 text-2xl font-black text-text">7월 15일 (수)</h3>
      <p className="mt-1 font-bold text-accent">오후 07:00 ~ 09:00</p>
      <div className="mt-4 rounded-xl bg-surface-muted border-2 border-dashed border-primary p-5 font-bold text-text">
        5 / 5 참여 가능!
      </div>
    </Card>
  );
};
