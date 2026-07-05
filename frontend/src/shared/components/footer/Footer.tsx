export const Footer = () => {
  return (
    <footer className="border-t border-border bg-white box-border block py-10 ">
      {/* gap-4 px-6 py-10 text-center md:flex-row md:items-center md:justify-between md:text-left */}
      <div className="w-full px-5">
        {/* 푸터 상단영역 */}
        <div className="flex justify-between gap-2 max-[768px]:flex-col  text-primary-light-foreground">
          <div className=" items-center">
            <h2 className="text-lg font-semibold">SoSo</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              소소하게 비워내는 일상의 틈
            </p>
          </div>
          <div className="flex gap-4 text-sm text-right max-[768px]:text-left">
            <p>
              <a href="#">이용약관</a>
            </p>
            <p>
              <a href="#">개인정보처리방침</a>
            </p>
            <p>
              <a href="#">문의하기</a>
            </p>
          </div>
        </div>

        <div className=" border-t border-[#f5f5f5] flex justify-between items-center max-[768px]:flex-col-reverse ">
          <p className=" text-xs text-text-muted">
            &copy; {new Date().getFullYear()} SoSo. ALL rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
