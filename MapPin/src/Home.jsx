import { useRef } from "react";
import LightRays from "./ReactBits/LightRays";

export default function Home({ setStart }) {
  const howItWorksRef = useRef(null);

  return (
    <div className="relative w-full text-white overflow-hidden bg-black font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#20ffff"
          raysSpeed={1.5}
          lightSpread={9}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#00ff62] via-[#40f29f] to-[#00b887] text-transparent bg-clip-text drop-shadow-lg tracking-tight">
          WELCOME TO MAPIN V1
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          MemoryMap lets you record memories tied to real locations. From your
          first solo trip to your favorite coffee spot drop a pin, write your
          thoughts, and revisit them anytime. <br />
          <span className="text-green-300/80">
            Your map becomes a living diary of your adventures.
          </span>
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setStart(true)}
            className="relative px-10 py-3 text-lg font-semibold rounded-xl bg-black border border-green-200 text-green-200 hover:text-white transition duration-300 overflow-hidden group shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00ffa6] to-[#00b894] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            <span className="relative z-10">Open MAPIN</span>
            <span className="absolute -inset-1 rounded-xl border-2 border-cyan-400 animate-pulse blur-sm"></span>
          </button>

          <button
            onClick={() =>
              howItWorksRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative px-10 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#14c69f] to-[#118547] hover:from-[#0ba181]  hover:to-[#0b6b38] transition-colors duration-300"
          >
            How It Works
          </button>
        </div>
      </div>
      <div
        ref={howItWorksRef}
        className="relative z-20 bg-black/90 backdrop-blur-sm text-gray-300 py-27 px-6 border-t border-white/10 scroll-smooth"
      >
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00e5ff] to-[#00a0b8] bg-clip-text text-transparent">
          How It Works
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="group relative bg-gradient-to-b from-white/5 to-white/0 border rounded-3xl p-8 text-center border-[#316a12] transition duration-300 hover:border-[#4fff7f]/40 hover:shadow-[0_0_30px_rgba(79,255,127,0.3)]">
            <div className="text-5xl mb-4 text-[#4fff7f]">📍</div>
            <h3 className="text-xl font-semibold text-white mb-3">Drop Pins</h3>
            <p className="text-gray-400 leading-relaxed">
               Tap the map to mark a place . You can move or delete pins anytime.
            </p>
           
          </div>

          <div className="group relative bg-gradient-to-b from-white/5 to-white/0 border rounded-3xl p-8 text-center border-[#8a4a5d] transition duration-300 hover:border-[#ff6fa3]/40 hover:shadow-[0_0_30px_rgba(255,111,163,0.3)]">
            <div className="text-5xl mb-4 text-[#ff6fa3]">📝</div>
            <h3 className="text-xl font-semibold text-white mb-3">Record Memories</h3>
            <p className="text-gray-400 leading-relaxed">
             Write a short note, story, or memory for the pin.
            </p>
          </div>

          <div className="group relative bg-gradient-to-b from-white/5 to-white/0 border rounded-3xl p-8 text-center border-[#403f8f] transition duration-300 hover:border-[#6c6fff]/40 hover:shadow-[0_0_30px_rgba(108,111,255,0.3)]">
            <div className="text-5xl mb-4 text-[#6c6fff]">🗺️</div>
            <h3 className="text-xl font-semibold text-white mb-3">Revisit Anytime</h3>
            <p className="text-gray-400 leading-relaxed">
               Open your map anytime to see your pins and memories again.
            </p>
          </div>
        </div>

        <p className="text-center mt-16 text-sm text-gray-500 italic">
          Crafted for explorers, dreamers, and storytellers 🌍
        </p>
      </div>
    </div>
  );
}
