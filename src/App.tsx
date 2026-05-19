import { useState } from 'react';
import { 
  Bot, 
  Box,
  MessageSquare, 
  FileText, 
  MessageCircle, 
  Share2, 
  LayoutGrid, 
  Search, 
  Plus, 
  PlusCircle,
  Settings, 
  ChevronDown, 
  FileDown, 
  Github, 
  MoreHorizontal,
  Tag,
  Puzzle,
  Command,
  Database,
  LineChart,
  Activity,
  History,
  X,
  ArrowLeft,
  Wand2,
  Play,
  Rocket,
  Code,
  BookOpen,
  Calendar,
  PieChart as PieChartIcon,
  BarChart3,
  Clock,
  Cpu,
  Send,
  Sliders,
  ListChecks,
  Lock,
  FunctionSquare,
  Settings2,
  UploadCloud,
  Download,
  AlertCircle,
  ChevronRight,
  Check,
  CheckCircle2,
  List,
  Save,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Sigma,
  Info,
  Layers,
  Link2,
  Flame,
  Thermometer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as ReChartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from 'recharts';
import { Model } from './types';

const CATEGORIES = [
  { id: 'all', label: '全部', icon: LayoutGrid },
  { id: 'CHAT_ASSISTANT', label: '聊天助手', icon: MessageCircle },
  { id: 'AGENT', label: 'Agent', icon: Bot },
  { id: 'TEXT_GEN', label: '文本生成', icon: FileText },
  { id: 'CHATFLOW', label: 'Chatflow', icon: MessageSquare },
  { id: 'WORKFLOW', label: '工作流', icon: Share2 },
];

const INITIAL_MODELS: Model[] = [
  {
    id: '1',
    name: 'EAM系统助理',
    type: 'AGENT',
    description: '专业的企业资产管理辅助智能体，提供设备维护、备件管理等咨询。',
    icon: 'https://api.dicebear.com/7.x/bottts/svg?seed=eam&backgroundColor=ffdfbf',
    isCreatedByMe: true,
    lastEditedBy: 'Admin',
    lastEditedTime: '2026-05-13 14:20'
  },
  {
    id: '2',
    name: '隐患助手',
    type: 'AGENT',
    description: '专注于生产安全隐患识别与报告的智能助手。',
    icon: 'https://api.dicebear.com/7.x/bottts/svg?seed=danger&backgroundColor=c0aede',
    tags: ['Safety'],
    isCreatedByMe: false,
    lastEditedBy: 'Safety_Officer',
    lastEditedTime: '2026-05-14 09:15'
  },
];

const ASSETS = [
  { id: '1', name: '1# 冷轧机组', tag: '轧制', status: 'connected', model: 'std.steel.rolling.cold-mill-v2' },
  { id: '2', name: '2# 热轧机组', tag: '轧制', status: 'connected', model: 'std.steel.rolling.hot-mill-v1' },
  { id: '3', name: '精整机组', tag: '精整', status: 'idle', model: 'std.steel.finishing.machine-v2' },
  { id: '4', name: '退火炉 A', tag: '热处理', status: 'warning', model: 'std.steel.furnace.annealing-v1' },
];

export default function App() {
  const [models, setModels] = useState<Model[]>(INITIAL_MODELS);
  const [activeAssetId, setActiveAssetId] = useState('1');
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyMine, setOnlyMine] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [detailSection, setDetailSection] = useState('preview');
  const [previewTab, setPreviewTab] = useState('机台计划表');
  const [selectedMachine, setSelectedMachine] = useState('1#冷轧');
  const [scheduleSearchQuery, setScheduleSearchQuery] = useState('');
  const [scheduleStartDateTime, setScheduleStartDateTime] = useState('2026-01-01T08:00');
  const [scheduleEndDateTime, setScheduleEndDateTime] = useState('2026-01-01T18:00');
  const [isConstraintModalOpen, setIsConstraintModalOpen] = useState(false);
  const [isParameterModalOpen, setIsParameterModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [isBulkImport, setIsBulkImport] = useState(false);
  const [constraintType, setConstraintType] = useState('hard');
  const [parameterType, setParameterType] = useState('Float');
  const [selectedParamCategory, setSelectedParamCategory] = useState('decision');
  const [paramSymbol, setParamSymbol] = useState('');
  const [constraintViewMode, setConstraintViewMode] = useState<'card' | 'table'>('card');
  const [ruleViewMode, setRuleViewMode] = useState<'card' | 'table'>('card');
  const [ganttViewMode, setGanttViewMode] = useState<'day' | 'week'>('day');
  const [ganttSelectedDate, setGanttSelectedDate] = useState('2026-01-01');
  const [coilSearchQuery, setCoilSearchQuery] = useState('');
  const [lifecycleViewMode, setLifecycleViewMode] = useState<'gantt' | 'table'>('gantt');
  const [selectedProductId, setSelectedProductId] = useState('p1');
  const [productSearchQuery, setProductSearchQuery] = useState('');

  // Mock Products
  const products = [
    { id: 'p1', name: 'AL8C61 (HF7971)', spec: '4.0-0.404-H24', status: '已下达' },
    { id: 'p2', name: '6061-T6 Aluminum', spec: '2.0-0.5-O', status: '草稿' },
    { id: 'p3', name: '3003-H14 Sheet', spec: '1.2-0.8-H14', status: '审核中' },
  ];

  // Form State
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [selectedIconSeed, setSelectedIconSeed] = useState('agent1');
  const [selectedIconColor, setSelectedIconColor] = useState('ffdfbf');

  const iconOptions = [
    { seed: 'agent1', color: 'ffdfbf' },
    { seed: 'bot2', color: 'c0aede' },
    { seed: 'helper3', color: 'b6e3f4' },
    { seed: 'guide4', color: 'd1f4e0' },
    { seed: 'brain5', color: 'ffd5dc' },
  ];

  const handleCreateModel = () => {
    if (!newName.trim()) return;

    const newModel: Model = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      type: 'AGENT', // Defaulting to AGENT for now
      description: newDesc,
      icon: `https://api.dicebear.com/7.x/bottts/svg?seed=${selectedIconSeed}&backgroundColor=${selectedIconColor}`,
      isCreatedByMe: true,
      lastEditedBy: 'Admin',
      lastEditedTime: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setModels([newModel, ...models]);
    setIsModalOpen(false);
    setNewName('');
    setNewDesc('');
    setSelectedModel(newModel); // Navigate to detail after creation
  };

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTab === 'all' || model.type === activeTab;
    const matchesOwner = !onlyMine || model.isCreatedByMe;
    return matchesSearch && matchesType && matchesOwner;
  });

  if (selectedModel) {
    return (
      <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden">
        {/* Detail Sidebar */}
        <aside className="w-64 border-r border-slate-100 flex flex-col shrink-0 bg-slate-50/30">
          <div className="p-6">
            <button 
              onClick={() => setSelectedModel(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">返回列表</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                <img src={selectedModel.icon} alt={selectedModel.name} className="w-8 h-8" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-slate-800 text-sm truncate">{selectedModel.name}</h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{selectedModel.type}</span>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            <button 
              onClick={() => setDetailSection('preview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                detailSection === 'preview' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100/50'
              }`}
            >
              <MessageSquare size={18} />
              预览调试
            </button>
            <button 
              onClick={() => setDetailSection('definition')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                detailSection === 'definition' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100/50'
              }`}
            >
              <Box size={18} />
              资产建模
            </button>
            <button 
              onClick={() => setDetailSection('process')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                detailSection === 'process' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100/50'
              }`}
            >
              <Layers size={18} />
              产品工艺
            </button>
            <button 
              onClick={() => setDetailSection('constraints')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                detailSection === 'constraints' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100/50'
              }`}
            >
              <Lock size={18} />
              约束配置
            </button>
            <button 
              onClick={() => setDetailSection('objectives')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                detailSection === 'objectives' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100/50'
              }`}
            >
              <FunctionSquare size={18} />
              目标函数
            </button>
            <button 
              onClick={() => setDetailSection('parameters')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors tracking-tight ${
                detailSection === 'parameters' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100/50'
              }`}
            >
              <Settings2 size={18} />
              参数定义
            </button>
          </nav>
        </aside>

        {/* Detail Main Content */}
        <main className="flex-1 flex overflow-hidden">
          {detailSection === 'definition' ? (
            <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden">
               <header className="h-16 px-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                     <h1 className="font-bold text-slate-800 tracking-tight">资产建模与分类</h1>
                     <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded font-bold uppercase tracking-tight">{ASSETS.length} ASSETS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-6 py-1.5 bg-indigo-600 text-white rounded-full text-[11px] font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 tracking-tight">
                      保存全局配置
                    </button>
                  </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                  {/* Left Side: Asset List */}
                  <div className="w-52 bg-white border-r border-slate-200 flex flex-col shrink-0">
                    <div className="p-3 border-b border-slate-50">
                      <div className="relative">
                        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="搜索设备..."
                          value={assetSearchQuery}
                          onChange={(e) => setAssetSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-[11px] font-medium focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
                      {ASSETS
                        .filter(a => a.name.toLowerCase().includes(assetSearchQuery.toLowerCase()))
                        .map(a => (
                          <button
                            key={a.id}
                            onClick={() => setActiveAssetId(a.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all group ${activeAssetId === a.id ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-slate-50'}`}
                          >
                            <div className="flex flex-col">
                              <span className={`text-[11px] font-bold truncate ${activeAssetId === a.id ? 'text-white' : 'text-slate-700'}`}>{a.name}</span>
                              <span className={`text-[9px] font-medium uppercase mt-0.5 ${activeAssetId === a.id ? 'text-indigo-100' : 'text-slate-400'}`}>{a.tag}</span>
                            </div>
                          </button>
                        ))}
                    </div>
                    <div className="p-3 border-t border-slate-100 bg-slate-50/30">
                      <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                        <Plus size={14} className="text-indigo-600" />
                        新增设备
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Asset Details */}
                  <div className="flex-1 overflow-y-auto bg-white/50">
                    <div className="p-8 max-w-5xl mx-auto w-full space-y-6">
                      {activeAssetId ? (
                        <>
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h2 className="text-sm font-bold text-slate-800">{ASSETS.find(a => a.id === activeAssetId)?.name}</h2>
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-mono font-bold rounded uppercase tracking-wider">
                                  {ASSETS.find(a => a.id === activeAssetId)?.status === 'connected' ? '运行中' : '离线'}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                <span className="flex items-center gap-1"><Cpu size={10} /> 模型: {ASSETS.find(a => a.id === activeAssetId)?.model}</span>
                                <span className="flex items-center gap-1"><Tag size={10} /> 分类: {ASSETS.find(a => a.id === activeAssetId)?.tag}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                <History size={12} />
                                变更日志
                              </button>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[11px] font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100">
                                <Save size={12} />
                                保存变更
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-8">
                            {/* Basic Information */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6">
                              <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">基础信息</h3>
                                </div>
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Basic Profile</span>
                              </div>
                              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">设备名称</label>
                                  <input 
                                    type="text" 
                                    key={`name-${activeAssetId}`}
                                    defaultValue={ASSETS.find(a => a.id === activeAssetId)?.name}
                                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 outline-none transition-all"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">设备识别码 / Tag</label>
                                  <input 
                                    type="text" 
                                    key={`tag-${activeAssetId}`}
                                    defaultValue={ASSETS.find(a => a.id === activeAssetId)?.tag}
                                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 outline-none transition-all"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1 flex items-center gap-1">
                                    归属工艺 <span className="text-rose-500">*</span>
                                  </label>
                                  <div className="relative">
                                    <select 
                                      key={`process-${activeAssetId}`}
                                      className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 outline-none transition-all appearance-none cursor-pointer"
                                      required
                                      defaultValue={ASSETS.find(a => a.id === activeAssetId)?.tag.includes('轧') ? 'rolling' : 'finishing'}
                                    >
                                      <option value="" disabled>选择所属工艺环节...</option>
                                      <option value="rolling">轧制工艺 / Rolling</option>
                                      <option value="casting">铸造工艺 / Casting</option>
                                      <option value="finishing">精整工艺 / Finishing</option>
                                      <option value="coating">涂镀工艺 / Coating</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                      <ChevronDown size={14} />
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">安装归属位置</label>
                                  <input 
                                    type="text" 
                                    placeholder="输入设备物理部署位置..."
                                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 outline-none transition-all"
                                  />
                                </div>
                                <div className="col-span-2 space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">设备备注</label>
                                  <textarea 
                                    rows={2}
                                    placeholder="添加设备维护历史或特殊运行说明..."
                                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 outline-none transition-all"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Asset Parameters */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">设备参数库</h3>
                                  <p className="text-[11px] text-slate-400 mt-0.5">请为当前设备设定具体的限值与运行说明</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                                    <Download size={12} />
                                    同步模板
                                  </button>
                                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                                    <Plus size={12} />
                                    新增参数
                                  </button>
                                </div>
                              </div>
                              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <table className="w-full text-left">
                                  <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                      <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight w-1/4">参数</th>
                                      <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight w-1/6">标识符</th>
                                      <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight w-1/6">参考值</th>
                                      <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight text-right w-24">操作</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-50">
                                    {[
                                      { name: '入口厚度下限', id: 'Inlet_Thick_Min', unit: 'mm', value: '2.0' },
                                      { name: '出口厚度上限', id: 'Outlet_Thick_Max', unit: 'mm', value: '4.0' },
                                      { name: '寻优化出口厚度', id: 'Opt_Outlet', unit: 'mm', value: '0.8-2.5' }
                                    ].map((prop) => (
                                      <tr key={prop.id} className="hover:bg-slate-50/20 transition-all group">
                                         <td className="px-6 py-3 text-xs font-bold text-slate-700">{prop.name}</td>
                                         <td className="px-6 py-3">
                                           <code className="text-[10px] font-mono text-indigo-500 bg-indigo-50/30 px-1.5 py-0.5 rounded tracking-tight">{prop.id}</code>
                                         </td>
                                         <td className="px-6 py-3">
                                           <div className="flex items-center gap-1">
                                             <span className="text-xs font-mono font-bold text-slate-800">{prop.value}</span>
                                             <span className="text-[9px] font-bold text-slate-300 uppercase">{prop.unit}</span>
                                           </div>
                                         </td>
                                         <td className="px-6 py-3 text-right">
                                           <button className="p-1 text-slate-300 hover:text-rose-500"><X size={14} /></button>
                                         </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 py-20">
                          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                            <Box size={32} />
                          </div>
                          <p className="text-sm font-medium">请从左侧选择一个资产查看详情</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : detailSection === 'preview' ? (
            <div className="flex-1 flex flex-col bg-slate-50/50 overflow-hidden">
              <header className="h-16 px-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Activity size={18} />
                  </div>
                  <h1 className="font-bold text-slate-800 tracking-tight">预览与生产仿真</h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    仿真运行中
                  </div>
                  <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                    <Play size={14} />
                    重新生成仿真
                  </button>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Top Row: Simulation Display & KPI */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">模拟生产动态展示</h3>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={12} /> 仿真耗时: 12.4s</span>
                        <span className="flex items-center gap-1"><Cpu size={12} /> 算力消耗: 45%</span>
                      </div>
                    </div>
                    <div className="flex-1 min-h-[300px] bg-slate-950 relative overflow-hidden flex items-center justify-center">
                       {/* Mock 3D or schematic animation */}
                       <div className="absolute inset-0 opacity-20 pointer-events-none">
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                       </div>
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 flex flex-col items-center"
                       >
                         <div className="w-64 h-32 border-4 border-indigo-500/30 rounded-xl relative flex items-center justify-center bg-indigo-500/10 backdrop-blur-sm">
                            <Box className="text-indigo-400 animate-bounce" size={48} />
                            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-1 bg-indigo-500/50" />
                            <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-1 bg-indigo-500/50" />
                         </div>
                         <div className="mt-8 flex gap-4">
                           <div className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-400 font-mono text-[10px]">INLET: 245℃</div>
                           <div className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-400 font-mono text-[10px]">SPEED: 120m/min</div>
                           <div className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-400 font-mono text-[10px]">Tension: 5.2kN</div>
                         </div>
                       </motion.div>
                       <div className="absolute bottom-6 left-6 text-white/40 font-mono text-[10px]">STATUS: SIMULATING_OPTIMAL_PATH...</div>
                    </div>
                  </div>

                {/* Bottom Section: Charts Tabs */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                  {/* Tabs Header */}
                  <div className="px-6 border-b border-slate-100 bg-slate-50/30 flex items-center gap-8 h-12 overflow-x-auto no-scrollbar">
                    {['机台计划表', '机台甘特图', '最优产品结构', '铝卷生命周期表'].map((tab) => (
                      <button 
                        key={tab} 
                        onClick={() => setPreviewTab(tab)}
                        className={`text-[11px] font-bold uppercase tracking-tight whitespace-nowrap h-full border-b-2 transition-all ${previewTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 p-8">
                     {previewTab === '机台计划表' ? (
                        <div className="space-y-6">
                          {/* Machine Selector & Filters for Schedule */}
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                              {['1#冷轧', '2#冷轧', '3#冷轧', '1#退火'].map((m) => (
                                <button 
                                  key={m}
                                  onClick={() => setSelectedMachine(m)}
                                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all shrink-0 ${selectedMachine === m ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                >
                                  {m}
                                </button>
                              ))}
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="relative group flex-1 lg:w-48">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={12} />
                                <input 
                                  type="text" 
                                  placeholder="搜索卷号/批号..."
                                  value={scheduleSearchQuery}
                                  onChange={(e) => setScheduleSearchQuery(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-[10px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all placeholder:text-slate-400"
                                />
                              </div>
                              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                                <Calendar size={12} className="text-slate-400" />
                                <div className="flex items-center gap-1">
                                  <input 
                                    type="datetime-local" 
                                    value={scheduleStartDateTime}
                                    onChange={(e) => setScheduleStartDateTime(e.target.value)}
                                    className="bg-transparent text-[10px] font-bold text-slate-600 outline-none cursor-pointer"
                                  />
                                  <span className="text-slate-300 mx-1">—</span>
                                  <input 
                                    type="datetime-local" 
                                    value={scheduleEndDateTime}
                                    onChange={(e) => setScheduleEndDateTime(e.target.value)}
                                    className="bg-transparent text-[10px] font-bold text-slate-600 outline-none cursor-pointer"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl overflow-hidden">
                             <div className="bg-indigo-600/5 px-6 py-3 border-b border-indigo-100 flex items-center justify-between">
                               <h4 className="text-xs font-bold text-indigo-900 tracking-tight flex items-center gap-2">
                                 <Activity size={14} />
                                 {selectedMachine}机台顺序表
                               </h4>
                               <div className="flex items-center gap-4">
                                  <span className="text-[10px] font-mono text-indigo-400 font-bold">2026/01/01</span>
                                  <div className="flex items-center gap-2 px-2 py-1 bg-white border border-indigo-100 rounded text-[9px] font-bold text-indigo-600">
                                     <Download size={10} />
                                     导出 Excel
                                  </div>
                               </div>
                             </div>
                             <div className="overflow-x-auto">
                               <table className="w-full text-left">
                                  <thead>
                                    <tr className="bg-white/50 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                      <th className="py-3 px-4 border-b border-indigo-50">顺序</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">计划日期</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">开始时间</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">结束时间</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">组批号</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">卷号</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">合金</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">状态</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">入口厚度</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">出口厚度</th>
                                      <th className="py-3 px-4 border-b border-indigo-50">计划用时</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-indigo-50/50">
                                    {[
                                      { id: 1, date: '2026/1/1', start: '08:00:00', end: '09:00:00', batch: '26-5-194', coil: '26050422', alloy: 'HF9591', state: 'O', in: '4', out: '4', time: '60' },
                                      { id: 2, date: '2026/1/1', start: '09:00:00', end: '10:00:00', batch: '26-5-194', coil: '26050423', alloy: 'HF9591', state: 'H14', in: '2.3', out: '2.3', time: '60' },
                                      { id: 3, date: '2026/1/1', start: '10:00:00', end: '11:00:00', batch: '26-5-194', coil: '26050424', alloy: 'HF9591', state: 'H24', in: '1.3', out: '1.3', time: '60' },
                                      { id: 4, date: '2026/1/1', start: '11:00:00', end: '12:00:00', batch: '26-5-194', coil: '26050425', alloy: 'HF9591', state: 'H24', in: '1', out: '1', time: '60' },
                                      { id: 5, date: '2026/1/1', start: '12:00:00', end: '13:00:00', batch: '26-5-195', coil: '26050426', alloy: 'HF9591', state: 'H16', in: '4', out: '4', time: '60' },
                                      { id: 6, date: '2026/1/1', start: '13:00:00', end: '14:00:00', batch: '26-5-195', coil: '26050427', alloy: 'HF9591', state: 'H14', in: '2.3', out: '2.3', time: '60' },
                                      { id: 7, date: '2026/1/1', start: '14:00:00', end: '15:00:00', batch: '26-5-195', coil: '26050428', alloy: 'HF9591', state: 'O', in: '1.3', out: '1.3', time: '60' },
                                      { id: 8, date: '2026/1/1', start: '15:00:00', end: '16:00:00', batch: '26-5-195', coil: '26050429', alloy: 'HF9591', state: 'O', in: '1', out: '1', time: '60' },
                                    ].filter(row => {
                                      const matchesSearch = row.coil.includes(scheduleSearchQuery) || row.batch.includes(scheduleSearchQuery);
                                      
                                      // Construct full ISO strings for comparison
                                      const rowDate = row.date.replace(/\//g, '-'); // "2026/1/1" -> "2026-1-1"
                                      const formattedRowDate = rowDate.split('-').map(p => p.length === 1 ? '0' + p : p).join('-');
                                      const rowStartDateTime = `${formattedRowDate}T${row.start.substring(0, 5)}`;
                                      
                                      const isWithinTimeRange = rowStartDateTime >= scheduleStartDateTime && rowStartDateTime <= scheduleEndDateTime;
                                      return matchesSearch && isWithinTimeRange;
                                    }).map((row) => (
                                      <tr key={row.id} className="text-[11px] hover:bg-indigo-50/50 transition-colors bg-white">
                                        <td className="py-3 px-4 font-mono text-slate-400">{row.id}</td>
                                        <td className="py-3 px-4 text-slate-500">{row.date}</td>
                                        <td className="py-3 px-4 font-bold text-slate-700">{row.start}</td>
                                        <td className="py-3 px-4 font-bold text-slate-700">{row.end}</td>
                                        <td className="py-3 px-4 text-slate-500 font-mono">{row.batch}</td>
                                        <td className="py-3 px-4 font-bold text-indigo-600">{row.coil}</td>
                                        <td className="py-3 px-4 text-slate-600">{row.alloy}</td>
                                        <td className="py-3 px-4">
                                          <span className="bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded shadow-sm text-[9px] font-bold text-slate-500">{row.state}</span>
                                        </td>
                                        <td className="py-3 px-4 font-mono text-slate-500">{row.in}</td>
                                        <td className="py-3 px-4 font-mono text-slate-500">{row.out}</td>
                                        <td className="py-3 px-4 font-bold text-indigo-900">{row.time} min</td>
                                      </tr>
                                    ))}
                                  </tbody>
                               </table>
                             </div>
                          </div>
                        </div>
                     ) : previewTab === '机台甘特图' ? (
                        <div className="space-y-6">
                           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <LayoutGrid size={16} className="text-indigo-500" />
                                机台甘特图 (Smart Gantt View)
                              </h4>
                              
                              <div className="flex items-center gap-3">
                                {/* View Mode Toggle */}
                                <div className="flex bg-slate-100 p-1 rounded-lg">
                                  <button 
                                    onClick={() => setGanttViewMode('day')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${ganttViewMode === 'day' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                  >
                                    日视图
                                  </button>
                                  <button 
                                    onClick={() => setGanttViewMode('week')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${ganttViewMode === 'week' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                  >
                                    周视图
                                  </button>
                                </div>

                                {/* Date Picker */}
                                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
                                  <Calendar size={12} className="text-slate-400" />
                                  <input 
                                    type="date" 
                                    value={ganttSelectedDate}
                                    onChange={(e) => setGanttSelectedDate(e.target.value)}
                                    className="bg-transparent text-[10px] font-bold text-slate-600 outline-none cursor-pointer"
                                  />
                                </div>
                              </div>
                           </div>

                           <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto no-scrollbar">
                              <div className="min-w-[800px]">
                                {/* Gantt Header - Time Slots / Days */}
                                <div className="flex border-b border-slate-100 bg-slate-50/50">
                                  <div className="w-32 shrink-0 p-4 border-r border-slate-100 text-[10px] font-bold text-slate-400 uppercase text-center flex items-center justify-center">
                                    机台名称
                                  </div>
                                  <div className="flex-1 flex">
                                    {ganttViewMode === 'day' ? (
                                      ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map(t => (
                                        <div key={t} className="flex-1 min-w-[80px] p-3 text-center border-r border-slate-100/50 last:border-r-0">
                                          <span className="text-[10px] font-mono font-bold text-slate-400">{t}</span>
                                        </div>
                                      ))
                                    ) : (
                                      ['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(d => (
                                        <div key={d} className="flex-1 min-w-[100px] p-3 text-center border-r border-slate-100/50 last:border-r-0">
                                          <span className="text-[10px] font-bold text-slate-400">{d}</span>
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </div>

                                {/* Gantt Rows */}
                                <div className="divide-y divide-slate-100">
                                  {[
                                    { 
                                      name: '1# 冷轧机', 
                                      coils: ganttViewMode === 'day' ? [
                                        { id: '26050422', start: 0, width: '25%', color: 'indigo' }, 
                                        { id: '26050423', start: '30%', width: '15%', color: 'indigo' }, 
                                        { id: '26050428', start: '60%', width: '20%', color: 'indigo' }
                                      ] : [
                                        { id: 'Batch-A', start: '10%', width: '30%', color: 'indigo' },
                                        { id: 'Batch-B', start: '50%', width: '40%', color: 'indigo' }
                                      ]
                                    },
                                    { 
                                      name: '2# 冷轧机', 
                                      coils: ganttViewMode === 'day' ? [
                                        { id: '26050424', start: '10%', width: '15%', color: 'emerald' }, 
                                        { id: '26050427', start: '40%', width: '25%', color: 'emerald' }
                                      ] : [
                                        { id: 'Batch-C', start: '20%', width: '50%', color: 'emerald' }
                                      ]
                                    },
                                    { 
                                      name: '3# 冷轧机', 
                                      coils: ganttViewMode === 'day' ? [
                                        { id: '26050425', start: '5%', width: '20%', color: 'amber' }, 
                                        { id: '26050429', start: '70%', width: '12%', color: 'amber' }
                                      ] : [
                                        { id: 'Batch-D', start: '5%', width: '25%', color: 'amber' },
                                        { id: 'Batch-E', start: '40%', width: '35%', color: 'amber' }
                                      ]
                                    },
                                    { name: '4# 冷轧机', coils: [{ id: '26050426', start: '20%', width: '30%', color: 'rose' }] },
                                    { name: '1# 退火炉', coils: [{ id: '26050422', start: '30%', width: '40%', color: 'violet' }] },
                                  ].map(machine => (
                                    <div key={machine.name} className="flex group hover:bg-slate-50/50 transition-colors">
                                      <div className="w-32 shrink-0 p-4 border-r border-slate-100 text-[11px] font-bold text-slate-600 flex items-center whitespace-nowrap bg-slate-50/30">
                                        {machine.name}
                                      </div>
                                      <div className="flex-1 relative h-16 flex items-center px-4">
                                        {/* Grid Lines */}
                                        <div className="absolute inset-0 flex">
                                          {ganttViewMode === 'day' ? (
                                            [1,2,3,4,5,6,7].map(i => <div key={i} className="flex-1 border-r border-slate-100/30 last:border-r-0" />)
                                          ) : (
                                            [1,2,3,4,5,6].map(i => <div key={i} className="flex-1 border-r border-slate-100/30 last:border-r-0" />)
                                          )}
                                        </div>
                                        {/* Coil Blocks */}
                                        {machine.coils.map((coil, ci) => (
                                          <div 
                                            key={ci} 
                                            className={`absolute h-8 rounded shadow-sm border border-${coil.color}-200 bg-${coil.color}-500/10 flex items-center justify-center group/coil transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer`}
                                            style={{ left: coil.start, width: coil.width }}
                                          >
                                            <div className={`text-[10px] font-bold text-${coil.color}-600 truncate px-2`}>{coil.id}</div>
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white rounded-lg opacity-0 group-hover/coil:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-xl">
                                               <div className="text-[10px] font-bold mb-1">{ganttViewMode === 'day' ? '铝卷详情' : '批次详情'}: {coil.id}</div>
                                               <div className="text-[8px] text-slate-300 font-medium">
                                                 {ganttViewMode === 'day' ? '计划时间: 08:00 - 10:00' : '计划周期: 周一 - 周三'}
                                               </div>
                                               <div className="text-[8px] text-slate-300 font-medium">合金型号: HF9591</div>
                                               <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800" />
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                           </div>

                           {/* Legend */}
                           <div className="flex items-center gap-6 pt-4">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-indigo-500/20 border border-indigo-200" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">1# 冷轧</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-emerald-500/20 border border-emerald-200" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">2# 冷轧</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-amber-500/20 border border-amber-200" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">3# 冷轧</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-violet-500/20 border border-violet-200" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">退火处理</span>
                              </div>
                           </div>
                        </div>
                     ) : previewTab === '最优产品结构' ? (
                        <div className="space-y-10">
                           {/* Dimension 1: Product Type */}
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                 <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                   <PieChartIcon size={16} className="text-indigo-500" />
                                   产品类型统计 (Product Type Distribution)
                                 </h4>
                                 <div className="h-64 bg-slate-50/50 border border-slate-100 rounded-2xl p-6 relative group">
                                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                      <div className="text-center">
                                         <div className="text-2xl font-mono font-bold text-slate-700">200</div>
                                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">总卷数</div>
                                      </div>
                                   </div>
                                   <ResponsiveContainer width="100%" height="100%">
                                     <PieChart>
                                       <Pie
                                         data={[
                                           { name: '翅片 (Fin)', value: 50 },
                                           { name: '管料 (Tube)', value: 60 },
                                           { name: '板材 (Plate)', value: 90 },
                                         ]}
                                         innerRadius={65}
                                         outerRadius={85}
                                         paddingAngle={8}
                                         dataKey="value"
                                       >
                                         {['#6366f1', '#10b981', '#f59e0b'].map((color, index) => (
                                           <Cell key={`cell-${index}`} fill={color} stroke="none" />
                                         ))}
                                       </Pie>
                                       <RechartsTooltip 
                                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                                       />
                                     </PieChart>
                                   </ResponsiveContainer>
                                 </div>
                              </div>
                              <div className="space-y-3 pt-10">
                                 {[
                                   { name: '翅片 (Fin Stock)', value: '50 卷', percent: '25%', color: 'indigo' },
                                   { name: '管料 (Tube Stock)', value: '60 卷', percent: '30%', color: 'emerald' },
                                   { name: '板材 (Plate/Sheet)', value: '90 卷', percent: '45%', color: 'amber' },
                                 ].map((item) => (
                                   <div key={item.name} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
                                     <div className="flex items-center gap-3">
                                       <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                                       <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                                     </div>
                                     <div className="flex items-center gap-4">
                                       <span className="text-[11px] font-mono font-bold text-slate-400">{item.value}</span>
                                       <span className="text-[11px] font-bold text-indigo-600">{item.percent}</span>
                                     </div>
                                   </div>
                                 ))}
                              </div>
                           </div>

                           <div className="h-px bg-slate-100 w-full" />

                           {/* Dimension 2: Status Type */}
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                 <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                   <Activity size={16} className="text-indigo-500" />
                                   状态类型统计 (Status Distribution)
                                 </h4>
                                 <div className="h-64 bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
                                   <ResponsiveContainer width="100%" height="100%">
                                     <BarChart 
                                       data={[
                                         { name: 'O态', value: 50 },
                                         { name: 'H1X', value: 80 },
                                         { name: 'H2X', value: 45 },
                                         { name: 'H3X', value: 25 },
                                       ]}
                                       layout="vertical"
                                       margin={{ left: 20, right: 30, top: 0, bottom: 0 }}
                                     >
                                       <XAxis type="number" hide />
                                       <YAxis 
                                          type="category" 
                                          dataKey="name" 
                                          axisLine={false} 
                                          tickLine={false} 
                                          tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }}
                                       />
                                       <RechartsTooltip 
                                         cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                                       />
                                       <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                         {[
                                           '#ec4899',
                                           '#6366f1',
                                           '#10b981',
                                           '#f59e0b'
                                         ].map((color, index) => (
                                           <Cell key={`cell-${index}`} fill={color} />
                                         ))}
                                       </Bar>
                                     </BarChart>
                                   </ResponsiveContainer>
                                 </div>
                              </div>
                              <div className="space-y-3 pt-10">
                                 {[
                                   { name: 'O态 (Soft Annealed)', value: '50 卷', color: 'pink' },
                                   { name: 'H1X (Strain Hardened)', value: '80 卷', color: 'indigo' },
                                   { name: 'H2X (Part-Annealed)', value: '45 卷', color: 'emerald' },
                                   { name: 'H3X (Stabilized)', value: '25 卷', color: 'amber' },
                                 ].map((item) => (
                                   <div key={item.name} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
                                     <div className="flex items-center gap-3">
                                       <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                                       <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                                     </div>
                                     <span className="text-[11px] font-mono font-bold text-slate-400">{item.value}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 gap-12">
                          <div className="space-y-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <BarChart3 size={16} className="text-indigo-500" />
                                铝卷全生命周期 (Coil Lifecycle)
                              </h4>
                              <div className="flex flex-wrap items-center gap-4">
                                 {/* View Mode Toggle */}
                                 <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                   <button 
                                     onClick={() => setLifecycleViewMode('gantt')}
                                     className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1.5 ${lifecycleViewMode === 'gantt' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                   >
                                     <LayoutGrid size={12} />
                                     甘特图
                                   </button>
                                   <button 
                                     onClick={() => setLifecycleViewMode('table')}
                                     className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1.5 ${lifecycleViewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                   >
                                     <List size={12} />
                                     数据表
                                   </button>
                                 </div>

                                 {/* Search Bar */}
                                 <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                      type="text" 
                                      placeholder="搜索铝卷号..."
                                      value={coilSearchQuery}
                                      onChange={(e) => setCoilSearchQuery(e.target.value)}
                                      className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 w-48 shadow-sm transition-all"
                                    />
                                 </div>

                                 {lifecycleViewMode === 'gantt' && (
                                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                      <span className="w-2 h-2 rounded bg-indigo-500" /> 冷轧
                                      <span className="w-2 h-2 rounded bg-violet-500" /> 退火
                                      <span className="w-2 h-2 rounded bg-emerald-500" /> 清洗/重卷
                                   </div>
                                 )}
                              </div>
                            </div>

                            {lifecycleViewMode === 'gantt' ? (
                              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto no-scrollbar">
                                 <div className="min-w-[800px]">
                                    {/* Time Header */}
                                    <div className="flex border-b border-slate-100 bg-slate-50/50">
                                       <div className="w-32 shrink-0 p-4 border-r border-slate-100 text-[10px] font-bold text-slate-400 uppercase text-center flex items-center justify-center">
                                         铝卷编号
                                       </div>
                                       <div className="flex-1 flex">
                                         {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map(t => (
                                           <div key={t} className="flex-1 p-3 text-center border-r border-slate-100/50 last:border-r-0">
                                             <span className="text-[10px] font-mono font-bold text-slate-400">{t}</span>
                                           </div>
                                         ))}
                                       </div>
                                    </div>

                                    {/* Coil Rows */}
                                    <div className="divide-y divide-slate-100">
                                       {[
                                         { 
                                           id: '26050422', 
                                           steps: [
                                             { name: '1#冷轧', start: '5%', width: '15%', color: 'indigo' },
                                             { name: '1#退火', start: '30%', width: '20%', color: 'violet' },
                                             { name: '3#冷轧', start: '60%', width: '15%', color: 'indigo' }
                                           ],
                                           highlight: true
                                         },
                                         { 
                                           id: '26050423', 
                                           steps: [
                                             { name: '2#冷轧', start: '10%', width: '12%', color: 'indigo' },
                                             { name: '2#退火', start: '35%', width: '18%', color: 'violet' },
                                             { name: '清洗', start: '65%', width: '10%', color: 'emerald' }
                                           ] 
                                         },
                                         { 
                                           id: '26050424', 
                                           steps: [
                                             { name: '1#冷轧', start: '0%', width: '18%', color: 'indigo' },
                                             { name: '2#退火', start: '25%', width: '25%', color: 'violet' }
                                           ] 
                                         },
                                         { 
                                           id: '26050425', 
                                           steps: [
                                             { name: '4#冷轧', start: '15%', width: '20%', color: 'indigo' },
                                             { name: '重卷', start: '50%', width: '15%', color: 'emerald' }
                                           ] 
                                         }
                                       ]
                                       .filter(coil => coil.id.toLowerCase().includes(coilSearchQuery.toLowerCase()))
                                       .map(coil => (
                                         <div key={coil.id} className={`flex group transition-colors ${coil.highlight ? 'bg-indigo-50/30' : 'hover:bg-slate-50/50'}`}>
                                           <div className="w-32 shrink-0 p-4 border-r border-slate-100 flex flex-col justify-center">
                                             <div className="text-[11px] font-bold text-slate-700">{coil.id}</div>
                                             {coil.highlight && <div className="text-[8px] font-bold text-indigo-500 uppercase tracking-tighter mt-1">当前追踪</div>}
                                           </div>
                                           <div className="flex-1 relative h-16 flex items-center px-4">
                                             {/* Grid Lines */}
                                             <div className="absolute inset-0 flex">
                                               {[1,2,3,4,5,6,7].map(i => <div key={i} className="flex-1 border-r border-slate-100/30 last:border-r-0" />)}
                                             </div>
                                             {/* Process Blocks */}
                                             {coil.steps.map((step, si) => (
                                               <div 
                                                 key={si} 
                                                 className={`absolute h-8 rounded shadow-sm border border-${step.color}-200 bg-${step.color}-500/10 flex items-center justify-center group/step transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer`}
                                                 style={{ left: step.start, width: step.width }}
                                               >
                                                 <div className={`text-[9px] font-bold text-${step.color}-600 truncate px-2`}>{step.name}</div>
                                                 {/* Tooltip */}
                                                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white rounded-lg opacity-0 group-hover/step:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-xl">
                                                    <div className="text-[10px] font-bold mb-1">工序: {step.name}</div>
                                                    <div className="text-[8px] text-slate-300 font-medium">铝卷: {coil.id}</div>
                                                    <div className="text-[8px] text-slate-300 font-medium">预计耗时: 120 min</div>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800" />
                                                 </div>
                                               </div>
                                             ))}
                                           </div>
                                         </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                            ) : (
                              <div className="space-y-12">
                                {[
                                  { 
                                    id: '26050422', 
                                    steps: [
                                      { name: '1#冷轧', start: '5%', width: '15%', color: 'indigo' },
                                      { name: '1#退火', start: '30%', width: '20%', color: 'violet' },
                                      { name: '3#冷轧', start: '60%', width: '15%', color: 'indigo' }
                                    ],
                                    highlight: true
                                  },
                                  { 
                                    id: '26050423', 
                                    steps: [
                                      { name: '2#冷轧', start: '10%', width: '12%', color: 'indigo' },
                                      { name: '2#退火', start: '35%', width: '18%', color: 'violet' },
                                      { name: '清洗', start: '65%', width: '10%', color: 'emerald' }
                                    ] 
                                  },
                                  { 
                                    id: '26050424', 
                                    steps: [
                                      { name: '1#冷轧', start: '0%', width: '18%', color: 'indigo' },
                                      { name: '2#退火', start: '25%', width: '25%', color: 'violet' }
                                    ] 
                                  },
                                  { 
                                    id: '26050425', 
                                    steps: [
                                      { name: '4#冷轧', start: '15%', width: '20%', color: 'indigo' },
                                      { name: '重卷', start: '50%', width: '15%', color: 'emerald' }
                                    ] 
                                  }
                                ]
                                .filter(coil => coil.id.toLowerCase().includes(coilSearchQuery.toLowerCase()))
                                .map(coil => (
                                  <div key={coil.id} className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-2 h-8 rounded-full ${coil.highlight ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                                        <div>
                                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">铝卷号 (Roll No.)</div>
                                          <div className="text-sm font-mono font-bold text-slate-800">{coil.id}</div>
                                        </div>
                                      </div>
                                      {coil.highlight && <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full border border-indigo-100">当前追踪中</span>}
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto no-scrollbar">
                                      <table className="w-full text-left border-collapse min-w-[1400px]">
                                        <thead>
                                          <tr className="bg-slate-50/80 border-b border-slate-100">
                                            {['入口厚度', '出口厚度', '入口重量', '入口宽度', '退火厚度', '成品厚度', '上道工序', '下道工序', '道次', '机台', '日期', '计划开始时间', '计划结束时间', '所用工时 (分)'].map(h => (
                                              <th key={h} className="py-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                          {[
                                            { inThk: 4, outThk: 2.3, weight: 7120, width: 1430, annThk: 0.084, finThk: 0.35, prev: '热轧', next: '开坯', pass: '开坯', machine: '1#', date: '2026/1/1', start: '8:00', end: '9:00', time: 60 },
                                            { inThk: 2.3, outThk: 1.3, weight: 7120, width: 1430, annThk: 0.084, finThk: 0.35, prev: '冷轧', next: '冷轧', pass: '冷轧', machine: '1#', date: '2026/1/1', start: '9:00', end: '10:00', time: 60 },
                                            { inThk: 1.3, outThk: 1, weight: 7120, width: 1430, annThk: 0.084, finThk: 0.35, prev: '冷轧', next: '冷轧', pass: '冷轧', machine: '1#', date: '2026/1/1', start: '10:00', end: '11:00', time: 60 },
                                            { inThk: 1, outThk: 1, weight: 7120, width: 1430, annThk: 0.084, finThk: 0.35, prev: '冷轧', next: '退火', pass: '退火', machine: '1#退火', date: '2026/1/1', start: '11:00', end: '15:00', time: 240 },
                                            { inThk: 2.3, outThk: 1.3, weight: 7120, width: 1430, annThk: 0.084, finThk: 0.35, prev: '-', next: '冷却', pass: '-', machine: '-', date: '2026/1/1', start: '15:00', end: '1/2 15:00', time: 1440 },
                                            { inThk: 1, outThk: 0.5, weight: 7120, width: 1430, annThk: 0.084, finThk: 0.35, prev: '退火', next: '冷轧', pass: '冷轧', machine: '2#', date: '2026/1/2', start: '15:00', end: '16:00', time: 60 },
                                            { inThk: 2.3, outThk: 1.3, weight: 7120, width: 1430, annThk: 0.084, finThk: 0.35, prev: '-', next: '冷却', pass: '-', machine: '-', date: '2026/1/2', start: '16:00', end: '1/3 16:00', time: 1440 },
                                          ].map((row, i) => (
                                            <tr key={i} className={`hover:bg-slate-50/50 transition-colors ${row.next === '冷却' ? 'bg-amber-50/30' : ''}`}>
                                              <td className="py-3 px-4 text-[11px] font-mono font-bold text-slate-600">{row.inThk}</td>
                                              <td className="py-3 px-4 text-[11px] font-mono font-bold text-indigo-600">{row.outThk}</td>
                                              <td className="py-3 px-4 text-[11px] font-mono text-slate-500">{row.weight}</td>
                                              <td className="py-3 px-4 text-[11px] font-mono text-slate-500">{row.width}</td>
                                              <td className="py-3 px-4 text-[11px] font-mono text-slate-500">{row.annThk}</td>
                                              <td className="py-3 px-4 text-[11px] font-mono text-slate-500">{row.finThk}</td>
                                              <td className="py-3 px-4 text-[11px] font-bold text-slate-500">{row.prev}</td>
                                              <td className="py-3 px-4 text-[11px] font-bold text-slate-700">{row.next}</td>
                                              <td className="py-3 px-4 text-[11px] font-bold text-slate-500">{row.pass}</td>
                                              <td className="py-3 px-4">
                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-600">{row.machine}</span>
                                              </td>
                                              <td className="py-3 px-4 text-[11px] font-mono text-slate-500">{row.date}</td>
                                              <td className="py-3 px-4 text-[11px] font-mono font-bold text-slate-700">{row.start}</td>
                                              <td className="py-3 px-4 text-[11px] font-mono font-bold text-slate-700">{row.end}</td>
                                              <td className="py-3 px-4 text-[11px] font-mono font-bold text-indigo-600">{row.time}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                     )}
                  </div>
                  </div>
                </div>
              </div>
            ) : detailSection === 'process' ? (
            <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden">
              <header className="h-16 px-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-3">
                  <h1 className="font-bold text-slate-800">产品工艺 (Process Flow)</h1>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-400">
                    <Layers size={10} />
                    {products.length} PRODUCTS
                  </div>
                </div>
                <div className="flex items-center gap-3">
                </div>
              </header>

              <div className="flex-1 flex overflow-hidden">
                {/* Left Side: Product List */}
                <div className="w-52 bg-white border-r border-slate-200 flex flex-col shrink-0">
                  <div className="p-3 border-b border-slate-50">
                    <div className="relative">
                      <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="产品搜索..."
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-[11px] font-medium focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
                    {products
                      .filter(p => p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) || p.id.toLowerCase().includes(productSearchQuery.toLowerCase()))
                      .map(p => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedProductId(p.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all group ${selectedProductId === p.id ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-slate-50'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-[11px] font-bold truncate ${selectedProductId === p.id ? 'text-white' : 'text-slate-700'}`}>{p.name}</span>
                            {selectedProductId !== p.id && <div className={`w-1 h-1 rounded-full ${p.status === '已下达' ? 'bg-emerald-400' : 'bg-slate-300'}`} />}
                          </div>
                        </button>
                      ))}
                  </div>
                  <div className="p-3 border-t border-slate-100 bg-slate-50/30">
                    <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                      <Plus size={14} className="text-indigo-600" />
                      新增产品
                    </button>
                  </div>
                </div>

                {/* Right Side: Process Flow Details */}
                <div className="flex-1 overflow-y-auto bg-white/50">
                  {selectedProductId ? (
                    <div className="p-6 space-y-4 max-w-[1400px]">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-slate-800">{products.find(p => p.id === selectedProductId)?.name}</h2>
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-mono font-bold rounded uppercase tracking-wider">REV2026.01</span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                            <span className="flex items-center gap-1"><BookOpen size={10} /> 规格: {products.find(p => p.id === selectedProductId)?.spec}</span>
                            <span className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${products.find(p => p.id === selectedProductId)?.status === '已下达' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                              状态: {products.find(p => p.id === selectedProductId)?.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                            <History size={12} />
                            历史版本
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-indigo-600 hover:bg-indigo-50 border-indigo-100 transition-colors">
                            <Save size={12} />
                            保存新版本
                          </button>
                          <div className="w-px h-4 bg-slate-200 mx-1" />
                          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                            <UploadCloud size={12} />
                            批量导入
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[11px] font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100">
                            <Plus size={12} />
                            添加工序
                          </button>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                              <tr className="bg-slate-50/80 border-b border-slate-200">
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-10 text-center">序号</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">工作机台</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">入口厚</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">出口厚</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">入口宽</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">出口宽</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">工作指令</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">备注</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">生产地</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">操作</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {[
                                { machine: '铸造机', inThk: '0', outThk: '370', inWid: '0', outWid: '1350', instruction: '370*1350*L, 0', remarks: '实际对应复合成合金 HF7971, 芯材H...', site: '' },
                                { machine: '锯切机', inThk: '370', outThk: '0', inWid: '1350', outWid: '0', instruction: '370*1350*L1, 0', remarks: '', site: '' },
                                { machine: '铣面机', inThk: '370', outThk: '356', inWid: '1350', outWid: '0', instruction: '356±1 * 1350', remarks: '', site: '' },
                                { machine: '复合线', inThk: '0', outThk: '0', inWid: '0', outWid: '0', instruction: 'HF7971 452;复合层1 HF414 48;...', remarks: '复合层1设计:10.6%;复合层2设计:...', site: '' },
                                { machine: '加热炉', inThk: '0', outThk: '0', inWid: '0', outWid: '0', instruction: '', remarks: '', site: '' },
                                { machine: '热轧机', inThk: '452', outThk: '4', inWid: '1350', outWid: '1380', instruction: '4±0.25*1380*C 轧制温度: 340, 0', remarks: '', site: '' },
                                { machine: '冷轧机', inThk: '4', outThk: '2.4', inWid: '1380', outWid: '1380', instruction: '2.4±0.04*1380*C 带套筒卷取', remarks: '', site: '' },
                                { machine: '冷轧机', inThk: '2.4', outThk: '1.4', inWid: '1380', outWid: '1380', instruction: '1.4±0.025*1380*C 带套筒卷取', remarks: '', site: '' },
                                { machine: '冷轧机', inThk: '1.4', outThk: '0.85', inWid: '1380', outWid: '1380', instruction: '0.85±0.02*1380*C 带套筒卷取', remarks: '', site: '' },
                                { machine: '切边重卷机', inThk: '0', outThk: '0', inWid: '1380', outWid: '1315', instruction: 'Thickness*1315±2*Length', remarks: '', site: '' },
                                { machine: '冷轧机', inThk: '0.85', outThk: '0.55', inWid: '1315', outWid: '1315', instruction: '0.55±0.015*1315*C 带套筒卷取', remarks: '', site: '' },
                                { machine: '冷轧机', inThk: '0.55', outThk: '0.404', inWid: '1315', outWid: '1315', instruction: '0.404±0.01*1315*C 带套筒卷取...', remarks: '成品厚度 0.404mm, 取样做软化曲线', site: '' },
                                { machine: '退火炉', inThk: '0', outThk: '0', inWid: '0', outWid: '0', instruction: '氮气保护退火, 退火后 H24态', remarks: '', site: '' },
                              ].map((step, i) => (
                                <tr key={i} className="hover:bg-indigo-50/20 transition-colors group">
                                  <td className="px-3 py-2.5 text-[10px] font-mono font-bold text-slate-400 text-center">{i + 1}</td>
                                  <td className="px-3 py-2.5">
                                    <div className="flex items-center gap-2">
                                      {step.machine.includes('轧') ? <Activity size={12} className="text-indigo-500" /> : <Layers size={12} className="text-slate-400" />}
                                      <span className="text-[11px] font-bold text-slate-700">{step.machine}</span>
                                    </div>
                                  </td>
                                  <td className="px-3 py-2.5 text-[10px] font-mono text-slate-500">{step.inThk}</td>
                                  <td className="px-3 py-2.5 text-[10px] font-mono font-bold text-indigo-600">{step.outThk}</td>
                                  <td className="px-3 py-2.5 text-[10px] font-mono text-slate-500">{step.inWid}</td>
                                  <td className="px-3 py-2.5 text-[10px] font-mono text-slate-500">{step.outWid}</td>
                                  <td className="px-3 py-2.5 max-w-[200px]">
                                    <div className="text-[9px] font-medium text-slate-600 line-clamp-1" title={step.instruction}>{step.instruction}</div>
                                  </td>
                                  <td className="px-3 py-2.5 max-w-[180px]">
                                    <div className="text-[9px] italic text-slate-400 line-clamp-1" title={step.remarks}>{step.remarks}</div>
                                  </td>
                                  <td className="px-3 py-2.5">
                                    <span className="text-[9px] font-bold text-slate-400">{step.site || '-'}</span>
                                  </td>
                                  <td className="px-3 py-2.5 text-right">
                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"><Settings2 size={12} /></button>
                                      <button className="p-1 text-slate-400 hover:text-rose-600 transition-colors"><X size={12} /></button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                        <Layers size={32} />
                      </div>
                      <p className="text-sm font-medium">请从左侧选择一个产品查看详情</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          ) : detailSection === 'constraints' ? (
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              <header className="h-16 px-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <h1 className="font-bold text-slate-800 tracking-tight">硬/软约束配置</h1>
                  <span className="px-2 py-0.5 bg-amber-50 text-[10px] font-bold text-amber-600 rounded uppercase tracking-tight">4 ACTIVE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex bg-slate-100 p-1 rounded-lg mr-2">
                    <button 
                      onClick={() => setConstraintViewMode('card')}
                      className={`p-1 rounded-md transition-all ${constraintViewMode === 'card' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                      title="卡片视图"
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button 
                      onClick={() => setConstraintViewMode('table')}
                      className={`p-1 rounded-md transition-all ${constraintViewMode === 'table' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                      title="表格视图"
                    >
                      <List size={16} />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-100" onClick={() => setIsConstraintModalOpen(true)}>
                    <Plus size={14} />
                    添加约束项
                  </button>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto w-full">
                {constraintViewMode === 'card' ? (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'c1', name: '电机额定功率上限', type: 'Hard', expression: 'Motor_Power <= 4500', severity: 'High', color: 'rose' },
                      { id: 'c2', name: '轧辊热膨胀安全边界', type: 'Soft', expression: 'Roll_Temp < 85', severity: 'Medium', color: 'amber' },
                      { id: 'c3', name: '最小出口张力限制', type: 'Hard', expression: 'Outlet_Tension >= 15', severity: 'High', color: 'rose' },
                      { id: 'c4', name: '层流冷却水压平衡', type: 'Soft', expression: 'Water_Press > 0.4', severity: 'Low', color: 'emerald' },
                    ].map((c, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={c.id} 
                        className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight ${c.type === 'Hard' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
                            {c.type} Constraint
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400">
                              <Settings2 size={14} />
                            </button>
                            <button className="p-1.5 hover:bg-rose-50 rounded-md text-slate-300 hover:text-rose-500">
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-700 text-[13px] mb-1 tracking-tight">{c.name}</h3>
                        <p className="text-[10px] text-slate-400 mb-4 tracking-tight uppercase">ID: {c.id}</p>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 mb-4">
                          <code className="text-xs font-mono text-indigo-600 font-bold">{c.expression}</code>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tight text-slate-300">
                          <div className="flex items-center gap-1">
                            <AlertCircle size={12} />
                            Priority: {c.severity}
                          </div>
                          <div className="text-slate-400">ENABLED</div>
                        </div>
                      </motion.div>
                    ))}
                    <button className="border-2 border-dashed border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all text-slate-300 hover:text-indigo-400 hover:border-indigo-100" onClick={() => setIsConstraintModalOpen(true)}>
                      <PlusCircle size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">快捷添加自定义约束规则</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-tight">约束定义 / ID</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-tight">逻辑表达式</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-tight">类型</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-tight">严重程度</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-tight text-right w-24">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { id: 'c1', name: '电机额定功率上限', type: 'Hard', expression: 'Motor_Power <= 4500', severity: 'High' },
                          { id: 'c2', name: '轧辊热膨胀安全边界', type: 'Soft', expression: 'Roll_Temp < 85', severity: 'Medium' },
                          { id: 'c3', name: '最小出口张力限制', type: 'Hard', expression: 'Outlet_Tension >= 15', severity: 'High' },
                          { id: 'c4', name: '层流冷却水压平衡', type: 'Soft', expression: 'Water_Press > 0.4', severity: 'Low' },
                        ].map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-3.5">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700">{c.name}</span>
                                <span className="text-[9px] font-mono text-slate-400 uppercase">ID: {c.id}</span>
                              </div>
                            </td>
                            <td className="px-6 py-3.5">
                              <code className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50/50 px-2 py-1 rounded">
                                {c.expression}
                              </code>
                            </td>
                            <td className="px-6 py-3.5">
                              <span className={`text-[9px] font-bold uppercase tracking-tight px-1.5 py-0.5 rounded ${c.type === 'Hard' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
                                {c.type}
                              </span>
                            </td>
                            <td className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">{c.severity}</td>
                            <td className="px-6 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 px-2 border border-slate-200 rounded-md text-[10px] font-bold text-slate-400 hover:text-indigo-600 hover:border-indigo-200 uppercase transition-all">编辑</button>
                                <button className="p-1.5 hover:bg-rose-50 rounded-md text-slate-300 hover:text-rose-500"><X size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          ) : detailSection === 'parameters' ? (
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              <header className="h-16 px-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <h1 className="font-bold text-slate-800 tracking-tight">参数定义</h1>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-mono">12 Total</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="搜索参数..." 
                      className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none w-48 transition-all"
                    />
                  </div>
                  <button 
                    onClick={() => setIsParameterModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <Plus size={14} />
                    新增参数
                  </button>
                </div>
              </header>

              <div className="flex-1 overflow-hidden flex">
                  <div className="w-48 border-r border-slate-50 p-4 space-y-1">
                    {[
                      { id: 'all', label: '全部参数', count: 12, icon: <Sliders size={14} /> },
                      { id: 'decision', label: '决策变量', count: 5, icon: <Rocket size={14} /> },
                      { id: 'const', label: '环境常量', count: 4, icon: <Lock size={14} /> },
                      { id: 'intermediate', label: '中间变量', count: 3, icon: <Code size={14} /> },
                    ].map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => setSelectedParamCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${selectedParamCategory === cat.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                      >
                        <div className="flex items-center gap-2">
                          {cat.icon}
                          {cat.label}
                        </div>
                        <span className="text-[10px] opacity-60 font-mono">{cat.count}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 bg-slate-50/20">
                    <div className="space-y-12 max-w-5xl">
                      {(selectedParamCategory === 'all' || selectedParamCategory === 'decision') && (
                        <section>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Rocket size={16} className="text-indigo-500" />
                              <h2 className="text-sm font-bold text-slate-800">决策变量</h2>
                              <span className="text-[10px] text-slate-400 font-medium">系统需要自动寻优的目标变量</span>
                            </div>
                            <button className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                              <Plus size={12} />
                              快速新增
                            </button>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">名称 / 符号</th>
                                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">类型</th>
                                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">取值范围</th>
                                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">操作</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {[
                                  { name: '生产线A开启时长', symbol: 'duration_a', type: 'Float', range: '[0, 24]' },
                                  { name: '原材料采购总量', symbol: 'raw_purchase', type: 'Integer', range: '[100, 5000]' },
                                  { name: '平均轧制速度', symbol: 'Rolling_Speed', type: 'Float', range: '[100, 1200]' },
                                ].map((param, i) => (
                                  <motion.tr 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={param.symbol} 
                                    className="hover:bg-slate-50/50 transition-colors group"
                                  >
                                    <td className="px-6 py-4">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-700">{param.name}</span>
                                        <code className="text-[10px] text-indigo-500 font-mono">{param.symbol}</code>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">{param.type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-slate-500">
                                      <div className="flex items-center gap-2">
                                        <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100/50">{param.range}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-all shadow-sm">
                                          <Settings2 size={14} />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-all shadow-sm">
                                          <X size={14} />
                                        </button>
                                      </div>
                                    </td>
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </section>
                      )}

                      {(selectedParamCategory === 'all' || selectedParamCategory === 'const') && (
                        <section>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Lock size={16} className="text-amber-500" />
                              <h2 className="text-sm font-bold text-slate-800">环境常量</h2>
                              <span className="text-[10px] text-slate-400 font-medium">外部输入的固定参数</span>
                            </div>
                            <button className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                              <Download size={12} />
                              同步ERP数据
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { name: '电力成本单价', symbol: 'power_price', value: '1.2 CNY/kWh', icon: <Activity size={18} /> },
                              { name: '入口厚度下限', symbol: 'Inlet_Thick_Min', value: '2.0 mm', icon: <ArrowDownRight size={18} /> },
                              { name: '入口厚度上限', symbol: 'Inlet_Thick_Max', value: '4.0 mm', icon: <ArrowUpRight size={18} /> },
                              { name: '最大用工人数', symbol: 'max_labor', value: '120 Person', icon: <Bot size={18} /> },
                            ].map((c, i) => (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                key={c.symbol} 
                                className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all group relative overflow-hidden"
                              >
                                <div className="flex items-start justify-between relative z-10">
                                  <div>
                                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{c.name}</h3>
                                    <div className="text-xl font-mono font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{c.value}</div>
                                    <code className="text-[9px] text-slate-300 font-mono mt-1 block">CONST: {c.symbol}</code>
                                  </div>
                                  <div className="p-3 bg-slate-50 rounded-xl text-slate-300 group-hover:text-indigo-500 shadow-sm transition-all group-hover:scale-110">
                                    {c.icon}
                                  </div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-50/50 blur-3xl rounded-full group-hover:bg-indigo-100/50 transition-colors" />
                              </motion.div>
                            ))}
                          </div>
                        </section>
                      )}

                      {(selectedParamCategory === 'all' || selectedParamCategory === 'intermediate') && (
                        <section>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Code size={16} className="text-emerald-500" />
                              <h2 className="text-sm font-bold text-slate-800">中间变量</h2>
                              <span className="text-[10px] text-slate-400 font-medium">基于已知参数计算得出的派生变量</span>
                            </div>
                            <button className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-1">
                              <Plus size={12} />
                              新增派生字段
                            </button>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-50">
                            {[
                              { name: '预计能耗成本', symbol: 'est_power_cost', formula: 'duration_a * power_price * 0.85', deps: ['duration_a', 'power_price'] },
                              { name: '当前压下率', symbol: 'Reduction_Rate', formula: '(Inlet - Outlet) / Inlet', deps: ['Inlet', 'Outlet'] },
                              { name: '加班风险系数', symbol: 'overtime_risk', formula: 'IF(is_overtime, labor_fatigue * 1.5, 1.0)', deps: ['is_overtime'] },
                            ].map((v, i) => (
                              <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                key={v.symbol} 
                                className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
                              >
                                <div className="flex items-center gap-6">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                                    <Sigma size={18} />
                                  </div>
                                  <div className="min-w-[120px]">
                                    <h3 className="text-sm font-bold text-slate-800">{v.name}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                      <code className="text-[10px] text-emerald-600 font-mono">CODE: {v.symbol}</code>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-1 px-8">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tight">Dependencies</p>
                                    <div className="flex items-center gap-1">
                                      {v.deps.map(d => (
                                        <span key={d} className="px-1.5 py-0.5 bg-slate-100 text-slate-400 text-[8px] font-bold rounded uppercase tracking-tighter">{d}</span>
                                      ))}
                                    </div>
                                  </div>
                                  <code className="text-[11px] font-mono bg-slate-100 text-slate-600 px-3 py-2 rounded-xl border border-slate-200/50 block">
                                    {v.formula}
                                  </code>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100"><Settings2 size={16} /></button>
                                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100"><X size={16} /></button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          ) : detailSection === 'objectives' ? (
            <div className="flex-1 flex flex-col bg-[#fdfdfd]">
              <header className="h-16 px-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Sigma size={18} />
                  </div>
                  <div>
                    <h1 className="text-sm font-bold text-slate-800">目标函数配置 (Optimization Objectives)</h1>
                    <p className="text-[10px] text-slate-400 font-medium">多目标帕累托寻优模式已开启</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">
                    <Layers size={14} />
                    多方案对比
                  </button>
                   <button className="flex items-center gap-2 px-6 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                    <Save size={14} />
                    应用并更新模型
                  </button>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Equation & Settings */}
                  <div className="lg:col-span-2 space-y-5">
                    {/* Equation Canvas */}
                    <div className="bg-white border border-slate-100 rounded-[1.5rem] p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded tracking-tight">WORKSPACE</span>
                           <h2 className="text-xs font-bold text-slate-700 uppercase">综合目标函数 (Composite Objective)</h2>
                        </div>
                        <div className="flex bg-slate-50 p-0.5 rounded-lg">
                          <button className="px-3 py-1 text-[10px] font-bold bg-white text-indigo-600 rounded-md shadow-sm">最小化 (MIN)</button>
                          <button className="px-3 py-1 text-[10px] font-bold text-slate-400">最大化 (MAX)</button>
                        </div>
                      </div>

                      <div className="relative py-8 px-4 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col items-center justify-center min-h-[160px]">
                        <div className="absolute top-3 left-3 flex items-center gap-1 text-[9px] font-mono text-slate-300">
                          <Sigma size={10} /> f(x) = {`{Σ w_i · f_i(x)}`}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-3 text-2xl font-light text-slate-800">
                          <span className="font-serif italic text-slate-400">Min</span>
                          <span className="text-indigo-600 text-3xl leading-none">∫</span>
                          <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-50">
                            <span className="text-[10px] font-bold text-indigo-400">0.45</span>
                            <span className="text-xs font-bold text-slate-800">Cost</span>
                          </div>
                          <span className="text-slate-300">+</span>
                          <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-50">
                            <span className="text-[10px] font-bold text-emerald-400">0.35</span>
                            <span className="text-xs font-bold text-slate-800">Time</span>
                          </div>
                          <span className="text-slate-300">-</span>
                          <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-50">
                            <span className="text-[10px] font-bold text-rose-400">0.20</span>
                            <span className="text-xs font-bold text-slate-800">Quality</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="p-3 rounded-xl border border-slate-50 bg-slate-50/30">
                          <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">惩罚系数 (Penalty)</p>
                          <p className="text-base font-mono font-bold text-slate-700 underline decoration-indigo-200 underline-offset-2">λ=1e-5</p>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-50 bg-slate-50/30">
                          <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">归一化 (Norm.)</p>
                          <p className="text-base font-bold text-slate-700">Min-Max</p>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-50 bg-slate-50/30">
                          <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">步长 (Step)</p>
                          <p className="text-base font-mono font-bold text-slate-700">0.05</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-700">权重调节与分项配置</h3>
                        <button 
                          onClick={() => setIsMappingModalOpen(true)}
                          className="text-[9px] font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-700 transition-colors"
                        >
                          <Settings size={10} /> 高级参数映射
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { name: '生产总成本', symbol: 'Cost', weight: 45, color: '#6366f1', desc: '包含电耗、人工及原料折损' },
                          { name: '交班等待时间', symbol: 'Time', weight: 35, color: '#10b981', desc: '优化班组切换时的非生产空隙' },
                          { name: '质量稳定性得分', symbol: 'Quality', weight: 20, color: '#f43f5e', desc: '基于历史合格率的风险规避函数' },
                        ].map((row) => (
                          <div key={row.symbol} className="bg-white border border-slate-100 rounded-xl p-4 transition-all hover:bg-slate-50/50">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: row.color }}>
                                  <Target size={20} />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-xs font-bold text-slate-800">{row.name}</h4>
                                  <div className="flex items-center gap-2">
                                    <code className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">{row.symbol}</code>
                                    <p className="text-[9px] text-slate-400 truncate max-w-[150px]">{row.desc}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-lg font-mono font-bold text-slate-700">{row.weight}%</span>
                                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter mt-0.5">Weight</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex-1 relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-500" style={{ width: `${row.weight}%`, backgroundColor: row.color }} />
                              </div>
                              <div className="flex gap-1.5 shrink-0">
                                <button className="px-2 py-1 bg-slate-50 text-slate-500 rounded-md text-[10px] hover:bg-slate-100 transition-colors">分段项</button>
                                <button className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold hover:bg-indigo-100 transition-colors">配置</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="w-full py-3 border border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 group hover:border-indigo-300 hover:bg-indigo-50/10 transition-all">
                        <Plus size={14} className="text-slate-300 group-hover:text-indigo-400" />
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600">添加新的目标分项</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visualization & Analysis */}
                  <div className="space-y-6">
                    <div className="bg-white border border-slate-100 rounded-[1.5rem] p-6 shadow-sm">
                      <h3 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">寻优偏好分布 (Bias)</h3>
                      <div className="h-[180px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Cost', value: 45 },
                                { name: 'Time', value: 35 },
                                { name: 'Quality', value: 20 },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={70}
                              paddingAngle={6}
                              dataKey="value"
                            >
                              <Cell fill="#6366f1" />
                              <Cell fill="#10b981" />
                              <Cell fill="#f43f5e" />
                            </Pie>
                            <ReChartsTooltip 
                              contentStyle={{ 
                                borderRadius: '8px', 
                                border: 'none', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                fontSize: '10px'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <p className="text-lg font-mono font-bold text-slate-700 leading-none">1.0</p>
                          <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tight">Sum</p>
                        </div>
                      </div>

                      <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100/30">
                           <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                             <span className="text-[10px] font-bold text-indigo-700">主导目标</span>
                           </div>
                           <span className="text-[10px] font-mono font-bold text-indigo-600">Cost Focus</span>
                        </div>
                        <p className="text-[9px] text-slate-400 italic leading-relaxed text-center px-2">
                          当前配置偏向于降低生产成本，寻优计算将优先优化资源利用率。
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-[1.5rem] p-6 text-white relative overflow-hidden">
                       <h3 className="text-[10px] font-bold text-white/50 mb-4 uppercase tracking-wider relative z-10">策略拟合度 (Fitting)</h3>
                       <div className="h-[120px] w-full relative z-10">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { name: '稳定', val: 78 },
                              { name: '效率', val: 92 },
                              { name: '柔性', val: 65 },
                            ]}>
                              <Bar dataKey="val" radius={[3, 3, 0, 0]}>
                                { [78, 92, 65].map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={index === 1 ? '#10b981' : '#ffffff15'} />
                                ))}
                              </Bar>
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#ffffff30', fontSize: 9 }} />
                            </BarChart>
                         </ResponsiveContainer>
                       </div>
                       <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 relative z-10">
                         <div className="flex items-center gap-1.5 mb-1 font-bold text-emerald-400">
                           <Check size={12} />
                           <span className="text-[10px]">配置自洽性优</span>
                         </div>
                         <p className="text-[9px] text-white/30 leading-relaxed">
                           分项函数间无冲突，局部帕累托前沿已锁定。
                         </p>
                       </div>
                       <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-[40px] rounded-full" />
                    </div>
                  </div>


                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm italic">
               该功能正在开发中：{detailSection}
            </div>
          )}
        </main>

        {/* Constraint Modal (Detail View) */}
        <AnimatePresence>
          {isConstraintModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsConstraintModalOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
              >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-800">{isBulkImport ? '批量导入约束' : '添加新约束'}</h2>
                  <button 
                    onClick={() => setIsConstraintModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6">
                  {!isBulkImport ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">约束名称</label>
                          <input 
                            type="text" 
                            placeholder="例如：最大功率限制" 
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">说明 / 描述</label>
                          <input 
                            type="text" 
                            placeholder="简要说明此约束的作用" 
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">约束类型</label>
                          <select 
                            value={constraintType}
                            onChange={(e) => setConstraintType(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="hard">硬约束 (Hard)</option>
                            <option value="soft">软约束 (Soft)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">优先级/权重</label>
                          <input 
                            type="number" 
                            placeholder="0-100" 
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                    <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
                      <label className="block text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Wand2 size={12} />
                        约束条件说明（AI辅助生成表达式）
                      </label>
                      <div className="relative">
                        <textarea 
                          placeholder="描述您的约束逻辑，例如：'各生产线负荷差不大于15%'" 
                          rows={2}
                          className="w-full bg-transparent border-none text-sm text-slate-600 placeholder:text-slate-300 resize-none outline-none pr-12"
                        />
                        <button 
                          className="absolute right-0 bottom-0 p-2 text-indigo-600 hover:bg-indigo-100/50 rounded-lg transition-colors group"
                          title="点击人工智能将描述转换为代码"
                        >
                          <Rocket size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">约束表达式 (可编辑代码)</label>
                      <textarea 
                        placeholder="输入逻辑表达式，例如：Power <= 500" 
                        rows={3}
                        className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-mono text-slate-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                      />
                    </div>

                    {constraintType === 'soft' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl"
                      >
                        <label className="block text-[11px] font-bold text-amber-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <AlertCircle size={12} />
                          每次违反扣分 (Soft Constraint Only)
                        </label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            placeholder="例如：10" 
                            className="bg-transparent border-none text-sm text-slate-600 placeholder:text-slate-300 outline-none font-mono w-24"
                          />
                          <span className="text-xs text-amber-600/60">分</span>
                        </div>
                        <p className="text-[10px] text-amber-600/60 mt-2 italic">
                          设定该约束被违反一次时，从总分中扣除的分值。
                        </p>
                      </motion.div>
                    )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-indigo-400 hover:bg-indigo-50/10 transition-all group cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                          <UploadCloud size={32} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-800">点击或通过拖拽上传文件</p>
                          <p className="text-xs text-slate-400 mt-1">支持 .xlsx, .csv, .json 格式文件</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-600 border border-slate-200">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">配置模板.xlsx</p>
                            <p className="text-xs text-slate-400">下载模板填入数据后上传</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                          <Download size={14} />
                          下载模板
                        </button>
                      </div>

                      <div className="flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-amber-700 leading-relaxed">
                          注意：批量导入将覆盖现有的同名约束条件。请确保表格中的字段名称与系统要求一致。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setIsConstraintModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => setIsConstraintModalOpen(false)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                  >
                    {isBulkImport ? '预览并上传' : '确认添加'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Parameter Modal */}
        <AnimatePresence>
          {isParameterModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsParameterModalOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
              >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-800">定义新参数</h2>
                  <button 
                    onClick={() => setIsParameterModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">参数名称</label>
                      <input 
                        type="text" 
                        placeholder="例如：单次最大产量" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">变量符号</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          placeholder="max_output" 
                          value={paramSymbol}
                          onChange={(e) => setParamSymbol(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-mono text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          {paramSymbol && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              {/^[a-z_][a-z0-9_]*$/.test(paramSymbol) ? (
                                <Check size={14} className="text-emerald-500" />
                              ) : (
                                <X size={14} className="text-rose-500" />
                              )}
                            </motion.div>
                          )}
                          <code className="text-[10px] text-slate-300">x_n</code>
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-400 mt-1.5 ml-1">
                        符号必须以字母或下划线开头，且仅包含小写字母、数字和下划线。
                      </p>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">参数类型</label>
                      <select 
                        value={parameterType}
                        onChange={(e) => setParameterType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="Integer">整数 (Integer)</option>
                        <option value="Float">浮点数 (Float)</option>
                        <option value="Boolean">布尔值 (Boolean)</option>
                        <option value="Categorical">类别 (Categorical)</option>
                        <option value="Enum">枚举 (Enum)</option>
                      </select>
                    </div>
                  </div>

                  {parameterType === 'Enum' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">枚举选项配置</label>
                        <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                          <Plus size={12} />
                          新增选项
                        </button>
                      </div>
                      <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/30">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                              <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">选项显示预览</th>
                              <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">内部映射值</th>
                              <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {[
                              { label: '选项A', value: '0' },
                              { label: '选项B', value: '1' },
                            ].map((opt, i) => (
                              <tr key={i} className="hover:bg-white transition-colors group">
                                <td className="px-4 py-2">
                                  <input type="text" defaultValue={opt.label} className="w-full bg-transparent border-none text-xs text-slate-700 focus:ring-0 p-0 outline-none font-medium" />
                                </td>
                                <td className="px-4 py-2">
                                  <input type="text" defaultValue={opt.value} className="w-full bg-transparent border-none text-xs font-mono text-slate-400 focus:ring-0 p-0 outline-none" />
                                </td>
                                <td className="px-4 py-2 text-right">
                                  <button className="p-1 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                                    <X size={12} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {selectedParamCategory === 'intermediate' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">计算公式 (EXPRESSION)</label>
                      <div className="relative">
                        <textarea 
                          placeholder="例如: duration_a * efficiency_idx" 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-mono text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none min-h-[80px]"
                        />
                        <div className="absolute right-3 bottom-3 text-[10px] text-slate-300">CTRL+Space 自动补全</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['duration_a', 'power_price', 'raw_purchase'].map(v => (
                          <button key={v} className="px-2 py-1 bg-slate-100 text-slate-400 font-mono text-[9px] rounded hover:bg-indigo-50 hover:text-indigo-600 transition-colors">+{v}</button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      {parameterType !== 'Boolean' && parameterType !== 'Enum' && parameterType !== 'Categorical' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">取值下界</label>
                            <input 
                              type="text" 
                              placeholder="0" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">取值上界</label>
                            <input 
                              type="text" 
                              placeholder="∞" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">默认初始值</label>
                      <input 
                        type="text" 
                        placeholder="0.0" 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">隶属类别</label>
                      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                        {[
                          { id: 'decision', label: '变量', icon: <Rocket size={14} /> },
                          { id: 'const', label: '常量', icon: <Lock size={14} /> },
                          { id: 'intermediate', label: '中间', icon: <Code size={14} /> }
                        ].map(cat => (
                          <button 
                            key={cat.id} 
                            onClick={() => setSelectedParamCategory(cat.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-[10px] font-bold transition-all ${selectedParamCategory === cat.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            {cat.icon}
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/50 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                      <FunctionSquare size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-indigo-900 leading-tight">参数关联说明</p>
                      <p className="text-[10px] text-indigo-600/70 mt-0.5 leading-relaxed">
                        定义的变量符号可在全局表达式中使用。系统将自动验证计算图的完整性。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setIsParameterModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => setIsParameterModalOpen(false)}
                    className="px-8 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                  >
                    保存参数
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Mapping Modal */}
        <AnimatePresence>
          {isMappingModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMappingModalOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200"
              >
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                       <Link2 size={20} className="text-indigo-600" />
                       高级参数映射 (Parameter Weight Mapping)
                    </h2>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">建立业务参数与分项权重之间的动态关联逻辑</p>
                  </div>
                  <button 
                    onClick={() => setIsMappingModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-8 space-y-8">
                  {/* Mapping Grid */}
                  <div className="space-y-4">
                    {[
                      { obj: '生产总成本', symbol: 'Cost', color: 'bg-indigo-600', currentParam: 'unit_energy_cost' },
                      { obj: '交班等待时间', symbol: 'Time', color: 'bg-emerald-500', currentParam: 'max_overtime_allowed' },
                      { obj: '质量稳定性得分', symbol: 'Quality', color: 'bg-rose-500', currentParam: 'None' },
                    ].map((row) => (
                      <div key={row.symbol} className="flex items-center gap-6 p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors group">
                        <div className="w-48 shrink-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${row.color}`} />
                            <p className="text-xs font-bold text-slate-700">{row.obj}</p>
                          </div>
                          <code className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{row.symbol} WEIGHT</code>
                        </div>
                        
                        <div className="flex-1 flex items-center gap-4">
                          <div className="flex-1">
                            <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-tight mb-1.5 ml-1">绑定参数 (Parameter Link)</label>
                            <select 
                              defaultValue={row.currentParam === 'None' ? 'none' : row.currentParam}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs text-slate-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer font-medium"
                            >
                              <option value="none">未绑定 (Static Weight)</option>
                              <option value="unit_energy_cost">unit_energy_cost (单位能耗成本)</option>
                              <option value="max_overtime_allowed">max_overtime_allowed (最大加班时长)</option>
                              <option value="safety_stock_coeff">safety_stock_coeff (安全库存系数)</option>
                            </select>
                          </div>
                          
                          <div className="w-32">
                             <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-tight mb-1.5 ml-1">灵敏度 (Slope)</label>
                             <div className="relative">
                               <input type="text" defaultValue="1.25" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-mono text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" />
                               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-300">α</span>
                             </div>
                          </div>
                        </div>

                        <button className={`p-2 rounded-xl transition-all ${row.currentParam !== 'None' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-300 group-hover:text-slate-400'}`}>
                           <Link2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Visual Hint */}
                  <div className="p-6 bg-slate-900 rounded-2xl flex items-center justify-between gap-8 relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-white mb-2">映射逻辑说明</p>
                      <p className="text-[10px] text-white/50 leading-relaxed max-w-sm">
                        当绑定参数发生变化时，分项权重将按照公式 <code className="text-indigo-400">W_i = W_base + α · ΔP</code> 自动调整。这允许模型根据实际业务环境（如能源价格波动）实时调整优化重心。
                      </p>
                    </div>
                    <div className="flex-1 h-24 relative z-10 flex items-end justify-center gap-1">
                      {[30, 45, 60, 40, 70, 85, 50].map((h, i) => (
                        <div key={i} className="w-2 bg-indigo-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[40px] rounded-full" />
                  </div>
                </div>

                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-500">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-bold">检测到 1 个循环引用冲突</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsMappingModalOpen(false)}
                      className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      放弃更改
                    </button>
                    <button 
                      onClick={() => setIsMappingModalOpen(false)}
                      className="px-10 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                    >
                      应用映射关系
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Rule Modal */}
        <AnimatePresence>
          {isRuleModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsRuleModalOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
              >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-800">
                    {isBulkImport ? '批量导入业务规则' : '构建新业务规则'}
                  </h2>
                  <button 
                    onClick={() => setIsRuleModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh]">
                  {isBulkImport ? (
                    <div className="space-y-6">
                      <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300 transition-all group cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm transition-all">
                          <UploadCloud size={32} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-700">点击或将文件拖拽至此导入</p>
                          <p className="text-xs text-slate-400 mt-1">支持 .csv, .xlsx, .json 格式文件</p>
                        </div>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-all">选择本地文件</button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">或者是直接粘贴内容</label>
                          <button className="text-[10px] font-bold text-indigo-600 hover:underline">查看导入模板</button>
                        </div>
                        <textarea 
                          placeholder="每一行代表一条规则，格式：规则名称, 表达式..." 
                          rows={6}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-mono text-slate-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl flex gap-3">
                        <AlertCircle size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-indigo-700 leading-relaxed">
                          批量导入时，系统会自动识别规则名称与逻辑表达式。如果格式不正确，系统在解析后会提示您进行手动修正。
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">规则名称</label>
                        <input 
                          type="text" 
                          placeholder="例如：节假日生产降载规则" 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                      </div>

                      <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
                        <label className="block text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Wand2 size={12} />
                          规则逻辑说明（AI辅助生成表达式）
                        </label>
                        <div className="relative">
                          <textarea 
                            placeholder="用自然语言描述规则逻辑，例如：'当明天是法定节假日时，将所有非核心产线的计划产量下调20%'" 
                            rows={2}
                            className="w-full bg-transparent border-none text-sm text-slate-600 placeholder:text-slate-300 resize-none outline-none pr-12"
                          />
                          <button className="absolute right-0 bottom-0 p-2 text-indigo-600 hover:bg-indigo-100/50 rounded-lg transition-colors group">
                             <Rocket size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">规则表达式 (可编辑代码)</label>
                          <textarea 
                            placeholder="输入规则表达式，例如：IF 电力价格 > 1.2 THEN 降低生产线B负荷 30%" 
                            rows={4}
                            className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-mono text-slate-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-[11px] font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                            <AlertCircle size={12} />
                            冲突处理优先级
                          </label>
                          <span className="text-[10px] font-mono text-amber-600">High Priority (80)</span>
                        </div>
                        <input type="range" className="w-full accent-amber-500" />
                        <p className="text-[10px] text-amber-600/60 mt-2 italic text-center">当多条规则作用于同一变量时，系统将优先执行高权重规则。</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setIsRuleModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => setIsRuleModalOpen(false)}
                    className="px-10 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
                  >
                    <Check size={16} />
                    {isBulkImport ? '确认并导入' : '确认发布规则'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-16 bg-white border-r border-slate-200 flex flex-col shrink-0 items-center">
        <div className="py-6 border-b border-slate-100 w-full flex justify-center">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          </div>
        </div>
        <nav className="flex-1 py-6 space-y-4">
          <a href="#" className="flex items-center justify-center w-10 h-10 bg-slate-100 text-indigo-600 rounded-md transition-all" title="模型">
            <LayoutGrid size={20} />
          </a>
          <a href="#" className="flex items-center justify-center w-10 h-10 text-slate-600 hover:bg-slate-50 rounded-md transition-colors" title="设置">
            <Settings size={20} />
          </a>
        </nav>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-semibold text-slate-800">Platform Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium cursor-pointer hover:bg-slate-300 transition-colors">A</div>
          </div>
        </header>

        {/* Page Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Categories / Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none" size={14} />
                <input 
                  type="text" 
                  placeholder="搜索模型..." 
                  className="bg-slate-100/80 border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-48 lg:w-64 focus:bg-slate-100 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Create Card (Minimalist) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-indigo-400 hover:bg-indigo-50/10 transition-all group cursor-pointer h-[150px]"
            >
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all scale-100 group-hover:scale-110">
                <Plus size={20} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-900 text-sm">创建新模型</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">从空白或模板开始</p>
              </div>
            </motion.div>

            {/* Model Cards Mapping */}
            <AnimatePresence mode="popLayout">
              {filteredModels.map((model, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group flex flex-col overflow-hidden h-[150px]"
                >
                  <div className="p-3.5 flex-1 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors shrink-0">
                          <img 
                            src={model.icon} 
                            alt={model.name} 
                            className="w-6 h-6 object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-xs line-clamp-1">
                            {model.name}
                          </h3>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                            {model.type}
                          </span>
                        </div>
                      </div>
                      <button className="text-slate-300 hover:text-slate-600 transition-colors p-1 hover:bg-slate-50 rounded shrink-0">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug h-8 mb-2">
                      {model.description || '暂无说明'}
                    </p>

                    <div className="mt-auto pt-2.5 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-400 truncate">
                        <span className="flex items-center gap-0.5 whitespace-nowrap">
                          <History size={8} />
                          {model.lastEditedTime.split(' ')[0]}
                        </span>
                        <span className="h-0.5 w-0.5 bg-slate-200 rounded-full shrink-0" />
                        <span className="font-medium text-slate-500 truncate">{model.lastEditedBy}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 text-[8px] font-bold uppercase tracking-tighter shrink-0 pl-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                        Healthy
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Create Model Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-800">创建新模型</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Icon Selection */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">选择图标</label>
                  <div className="flex items-center gap-3">
                    {iconOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedIconSeed(opt.seed);
                          setSelectedIconColor(opt.color);
                        }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all overflow-hidden ${
                          selectedIconSeed === opt.seed 
                          ? 'border-indigo-600 ring-4 ring-indigo-50' 
                          : 'border-transparent bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <img 
                          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${opt.seed}&backgroundColor=${opt.color}`} 
                          alt="icon" 
                          className="w-8 h-8"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">模型名称</label>
                  <input 
                    type="text" 
                    placeholder="例如：智能调度助手" 
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">备注 (选填)</label>
                  <textarea 
                    placeholder="简要描述模型的功能或用途..." 
                    rows={3}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleCreateModel}
                  disabled={!newName.trim()}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  确认创建
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
