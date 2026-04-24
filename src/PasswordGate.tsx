import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function PasswordGate() {
  const { unlock } = useAuth();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = unlock(value);
    if (!ok) {
      setError(true);
      setShake(true);
      setValue("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen w-full bg-my-bg flex flex-col">
      {/* 顶部导航栏，和主页保持一致 */}
      <header className="h-[64px] w-full flex border-b-2 border-black flex-shrink-0">
        <div className="flex items-center pl-[48px] max-md:pl-[24px]">
          <span className="text-sm tracking-widest uppercase font-sans text-black">
            Weilin Sun
          </span>
        </div>
      </header>

      {/* 中央密码输入区 */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[400px]">
          <p className="font-futura-light text-[13px] tracking-widest uppercase text-grey-2 mb-[40px]">
            This section is password protected.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-0">
            <div
              className={`border-2 border-black flex items-center transition-all duration-150 ${
                shake ? "translate-x-[6px]" : ""
              } ${error ? "border-red-500" : "border-black"}`}
              style={shake ? { animation: "shake 0.4s ease" } : {}}
            >
              <input
                ref={inputRef}
                type="password"
                value={value}
                onChange={(e) => { setValue(e.target.value); setError(false); }}
                placeholder="Password"
                className="flex-1 bg-transparent outline-none font-futura-light text-[14px] tracking-widest px-[20px] py-[16px] text-black placeholder:text-grey-3"
              />
              <button
                type="submit"
                className="px-[20px] py-[16px] border-l-2 border-black font-futura-heavy text-[13px] tracking-widest uppercase text-black hover:bg-black hover:text-white transition-colors duration-150"
              >
                Enter
              </button>
            </div>

            {error && (
              <p className="font-futura-light text-[12px] tracking-widest text-red-500 mt-[12px]">
                Incorrect password. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
