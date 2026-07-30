import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Cpu, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Zap, 
  Maximize2,
  Sliders
} from 'lucide-react';

export const PlaygroundSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cpp' | 'energy' | 'vision' | 'dsa'>('cpp');

  // C++ Code Simulator state
  const [cppCode, setCppCode] = useState<string>(
`#include <iostream>
#include <vector>
#include <algorithm>

// Kiran's Quick C++ Priority Task Dispatcher
struct Task {
    int id;
    std::string name;
    int priority;
};

int main() {
    std::vector<Task> tasks = {
        {101, "Process Campus Energy Telemetry", 3},
        {102, "Train OpenCV Brand Detector", 1},
        {103, "Optimize Delay Log Index", 2}
    };

    std::sort(tasks.begin(), tasks.end(), [](const Task& a, const Task& b) {
        return a.priority < b.priority; // Sort by highest priority
    });

    std::cout << "--- KIRAN'S C++ TASK DISPATCHER ---" << std::endl;
    for (const auto& t : tasks) {
        std::cout << "[P" << t.priority << "] Executing: " << t.name << " (ID: " << t.id << ")" << std::endl;
    }
    return 0;
}`
  );
  const [cppOutput, setCppOutput] = useState<string | null>(null);
  const [isCppRunning, setIsCppRunning] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Energy Calculator state
  const [buildingCount, setBuildingCount] = useState(12);
  const [peakHours, setPeakHours] = useState(8);
  const [solarOffset, setSolarOffset] = useState(30);

  // Vision Simulator state
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [selectedBrand, setSelectedBrand] = useState('NIST Logo');

  const handleRunCpp = () => {
    setIsCppRunning(true);
    setCppOutput(null);

    setTimeout(() => {
      setCppOutput(
`[Compilation Success] g++ -std=c++17 -O3 -o task_runner main.cpp
--- KIRAN'S C++ TASK DISPATCHER ---
[P1] Executing: Train OpenCV Brand Detector (ID: 102)
[P2] Executing: Optimize Delay Log Index (ID: 103)
[P3] Executing: Process Campus Energy Telemetry (ID: 101)

[Process finished with exit code 0]
[Execution Time: 0.042ms | Memory: 1.8MB]`
      );
      setIsCppRunning(false);
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cppCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Energy metrics calculation
  const totalKw = buildingCount * 45 * (1 + peakHours * 0.08) * (1 - solarOffset * 0.005);
  const carbonSavedKg = (totalKw * 0.82 * (solarOffset / 100)).toFixed(1);
  const estimatedBillSavings = (totalKw * 0.14 * 30).toFixed(0);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive Developer Playground</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Live Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Playground</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-600 leading-relaxed">
          Test live code simulation models, interactive algorithms, and system logic engines directly in your browser.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 glass-panel p-2 rounded-2xl border border-slate-800 light-theme:border-slate-200">
        {[
          { id: 'cpp', label: 'C++ Code Runner', icon: Terminal },
          { id: 'energy', label: 'Campus Energy Simulator', icon: Zap },
          { id: 'vision', label: 'OpenCV Logo Detection', icon: Activity },
          { id: 'dsa', label: 'DSA Complexity Matrix', icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 light-theme:text-slate-600 light-theme:hover:text-black'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: C++ Code Runner */}
      {activeTab === 'cpp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-5 border border-slate-800 light-theme:border-slate-200 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 light-theme:border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400 font-bold">main.cpp</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleRunCpp}
                  disabled={isCppRunning}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isCppRunning ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isCppRunning ? 'Running...' : 'Compile & Run'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={cppCode}
              onChange={(e) => setCppCode(e.target.value)}
              className="w-full h-80 font-mono text-xs bg-slate-950/80 light-theme:bg-slate-900 text-emerald-400 p-4 rounded-2xl border border-slate-800 focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Console Output */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-5 border border-slate-800 light-theme:border-slate-200 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 light-theme:border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span>Console Terminal</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono border border-emerald-500/20">
                C++17 Engine
              </span>
            </div>

            <div className="flex-1 min-h-[300px] bg-slate-950 rounded-2xl p-4 font-mono text-xs text-slate-200 space-y-2 overflow-y-auto border border-slate-900">
              {cppOutput ? (
                <pre className="whitespace-pre-wrap text-emerald-400 font-mono">{cppOutput}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2 py-12">
                  <Play className="w-8 h-8 text-slate-600 animate-pulse" />
                  <p>Click "Compile & Run" to execute C++ task dispatcher code.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Campus Energy Simulator */}
      {activeTab === 'energy' && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 light-theme:border-slate-200 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Control 1 */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Monitored Buildings</span>
                <span className="text-blue-400 font-mono">{buildingCount} Labs</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={buildingCount}
                onChange={(e) => setBuildingCount(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            {/* Control 2 */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Peak Load Hours</span>
                <span className="text-indigo-400 font-mono">{peakHours} hrs/day</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                value={peakHours}
                onChange={(e) => setPeakHours(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Control 3 */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Solar Grid Integration</span>
                <span className="text-cyan-400 font-mono">{solarOffset}% Solar</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={solarOffset}
                onChange={(e) => setSolarOffset(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-950/30 border border-blue-500/20 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-blue-300 font-medium">Estimated Campus Load</span>
              <div className="text-3xl font-extrabold text-blue-400 font-mono">{totalKw.toFixed(1)} kW/h</div>
              <p className="text-[11px] text-slate-400">Calculated across active NIST academic blocks.</p>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/20 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-emerald-300 font-medium">Carbon Offset Impact</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">{carbonSavedKg} kg CO₂</div>
              <p className="text-[11px] text-slate-400">Emissions prevented through solar smart routing.</p>
            </div>

            <div className="bg-purple-950/30 border border-purple-500/20 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-purple-300 font-medium">Monthly Cost Savings</span>
              <div className="text-3xl font-extrabold text-purple-400 font-mono">${estimatedBillSavings}</div>
              <p className="text-[11px] text-slate-400">Based on algorithmic load scheduling.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: OpenCV Vision Simulator */}
      {activeTab === 'vision' && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 light-theme:border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-lg font-bold">OpenCV Brand Recognition Settings</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Target Logo Template</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="NIST Logo">NIST University Emblem</option>
                <option value="Cisco Academy">Cisco Networking Badge</option>
                <option value="RINL Logo">RINL Steel Plant Logo</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Matching Threshold</span>
                <span className="text-cyan-400 font-mono">{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Detector Ready</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Feature extraction: ORB / SIFT Keypoints. Bounding box overlay scales dynamically based on template match score.
              </p>
            </div>
          </div>

          {/* Visual Canvas Display */}
          <div className="md:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-center items-center relative min-h-[280px]">
            <div className="relative border-2 border-dashed border-emerald-500/80 p-8 rounded-2xl bg-slate-900/50 text-center space-y-3">
              <div className="absolute -top-3 left-3 bg-emerald-500 text-slate-950 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded">
                MATCH: {confidenceThreshold + 2}% ({selectedBrand})
              </div>
              <Cpu className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
              <div className="text-xs font-mono font-bold text-slate-200">
                Bounding Box [X:120, Y:84, W:160, H:160]
              </div>
              <p className="text-[11px] text-slate-400">
                Simulated 60 FPS real-time webcam frame processing
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: DSA Complexity Matrix */}
      {activeTab === 'dsa' && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 light-theme:border-slate-200 space-y-6">
          <h3 className="text-lg font-bold">Kiran's DSA Core Data Structures Benchmark</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900/80 text-slate-300 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Data Structure</th>
                  <th className="p-3">Access</th>
                  <th className="p-3">Search</th>
                  <th className="p-3">Insertion</th>
                  <th className="p-3">Deletion</th>
                  <th className="p-3">Kiran's Favorite Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-blue-400">Array / Vector</td>
                  <td className="p-3 text-emerald-400">O(1)</td>
                  <td className="p-3 text-amber-400">O(N)</td>
                  <td className="p-3 text-amber-400">O(N)</td>
                  <td className="p-3 text-amber-400">O(N)</td>
                  <td className="p-3 text-slate-300 font-sans">Memory contiguous batch processing</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-400">Priority Queue (Heap)</td>
                  <td className="p-3 text-emerald-400">O(1) (Top)</td>
                  <td className="p-3 text-amber-400">O(N)</td>
                  <td className="p-3 text-emerald-400">O(log N)</td>
                  <td className="p-3 text-emerald-400">O(log N)</td>
                  <td className="p-3 text-slate-300 font-sans">Smart Food Ordering & Task Scheduler</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-cyan-400">Binary Search Tree (AVL)</td>
                  <td className="p-3 text-emerald-400">O(log N)</td>
                  <td className="p-3 text-emerald-400">O(log N)</td>
                  <td className="p-3 text-emerald-400">O(log N)</td>
                  <td className="p-3 text-emerald-400">O(log N)</td>
                  <td className="p-3 text-slate-300 font-sans">Fast indexing and range queries</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-purple-400">Hash Table (unordered_map)</td>
                  <td className="p-3 text-slate-500">N/A</td>
                  <td className="p-3 text-emerald-400">O(1) avg</td>
                  <td className="p-3 text-emerald-400">O(1) avg</td>
                  <td className="p-3 text-emerald-400">O(1) avg</td>
                  <td className="p-3 text-slate-300 font-sans">Campus Energy telemetry lookup & caching</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
