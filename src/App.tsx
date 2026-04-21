import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, MousePointerClick } from 'lucide-react';

export default function App() {
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    let warningTimeout: number;

    const showWarning = () => {
      setWarning(true);
      window.clearTimeout(warningTimeout);
      warningTimeout = window.setTimeout(() => setWarning(false), 2000);
    };

    // 阻擋右鍵選單
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showWarning();
    };

    // 阻擋鍵盤快捷鍵
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        showWarning();
      }
      // Ctrl+Shift+I 或 Cmd+Option+I (開啟開發者工具)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        showWarning();
      }
      // Ctrl+Shift+C 或 Cmd+Option+C (檢查元素)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        showWarning();
      }
      // Ctrl+Shift+J 或 Cmd+Option+J (開啟 Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        showWarning();
      }
      // Ctrl+U 或 Cmd+Option+U (檢視原始碼)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        showWarning();
      }
      // Ctrl+S 或 Cmd+S (儲存網頁)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        showWarning();
      }
    };

    // 監聽事件
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // 清除監聽事件 (當元件卸載時)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(warningTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans text-slate-200 p-4 selection:bg-transparent">
      {/* 警告提示 */}
      <div 
        className={`absolute top-10 flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full border border-red-500/20 transition-all duration-300 ease-out shadow-lg ${
          warning ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <ShieldAlert className="w-5 h-5" />
        <span className="font-medium tracking-wide">系統安全機制已啟動：禁止此操作</span>
      </div>

      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>


        <div className="text-8xl font-bold bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent mb-12 tabular-nums tracking-tighter z-10">
          {count}
        </div>

        <button
          onClick={() => setCount(prev => prev + 1)}
          className="group relative z-10 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-medium text-lg transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25"
        >
          <MousePointerClick className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>點擊累加</span>
        </button>
      </div>
    </div>
  );
}
