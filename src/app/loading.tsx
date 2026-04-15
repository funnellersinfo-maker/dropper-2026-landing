export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Animated logo */}
      <div className="relative mb-8 w-20 h-20">
        {/* Outer glow pulse */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" style={{ animationDuration: '2s' }} />
        {/* Middle ring */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-blue-400" />
        </div>
        {/* Inner core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/40">
            <span className="text-xl font-black text-white">D</span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h1 className="text-2xl font-black text-white tracking-tighter mb-2">DROPPER</h1>
        <p className="text-sm text-gray-500 tracking-widest uppercase">Cargando ecosistema...</p>
      </div>

      {/* Loading bar */}
      <div className="mt-8 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-[loadingBar_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
