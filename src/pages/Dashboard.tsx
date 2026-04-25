import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Activity, Star, Bell, Search, 
  ChevronRight, LogOut, LayoutDashboard, 
  UserCircle, Settings, UserPlus, FileText,
  Clock, CreditCard, ShieldAlert, ArrowUpRight,
  MoreVertical, Filter, Download, Edit, Trash2, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}


const chartData = [
  { name: 'ม.ค.', members: 4000, active: 2400 },
  { name: 'ก.พ.', members: 3000, active: 1398 },
  { name: 'มี.ค.', members: 5000, active: 4800 },
  { name: 'เม.ย.', members: 6780, active: 3908 },
  { name: 'พ.ค.', members: 8900, active: 4800 },
  { name: 'มิ.ย.', members: 10458, active: 8800 },
  { name: 'ก.ค.', members: 12458, active: 10200 },
];

const stats = [
  { label: 'สมาชิกทั้งหมด', value: '12,458', icon: Users, color: 'bg-primary', lightColor: 'bg-primary/10', textColor: 'text-primary' },
  { label: 'กิจกรรมวันนี้', value: '342', icon: Activity, color: 'bg-orange-500', lightColor: 'bg-orange-50', textColor: 'text-orange-500' },
  { label: 'คะแนนสะสม', value: '85,400', icon: Star, color: 'bg-amber-600', lightColor: 'bg-amber-50', textColor: 'text-amber-600' }
];

const activities = [
  { id: 1, title: 'ต่ออายุสมาชิกระดับ Gold', subtitle: 'โดย คุณสมชาย ใจดี', time: '5 นาทีที่แล้ว', icon: CreditCard, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { id: 2, title: 'แลกของรางวัล: บัตรกำนัล 500 บาท', subtitle: 'ใช้ไป 5,000 คะแนน', time: '12 นาทีที่แล้ว', icon: Star, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { id: 3, title: 'สมัครสมาชิกใหม่', subtitle: 'ระดับ Silver - คุณวิภาดา แสนสุข', time: '1 ชั่วโมงที่แล้ว', icon: UserPlus, iconBg: 'bg-green-50', iconColor: 'text-green-600' },
  { id: 4, title: 'อัปเดตข้อมูลส่วนตัว', subtitle: 'แก้ไขที่อยู่จัดส่งเอกสาร', time: '2 ชั่วโมงที่แล้ว', icon: FileText, iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
  { id: 5, title: 'เปิดตั๋วแจ้งปัญหา #1042', subtitle: 'ปัญหาการเข้าสู่ระบบ', time: 'เมื่อวาน 15:45 น.', icon: ShieldAlert, iconBg: 'bg-rose-50', iconColor: 'text-rose-600' }
];

const initialMembers: Member[] = [
  { id: 'MB-1001', name: 'กิตติภูมิ พัฒนศิลป์', email: 'kittipoom@email.com', role: 'Admin', status: 'Active', joined: '12 ก.ค. 2025' },
  { id: 'MB-1002', name: 'วิภาดา แสนสุข', email: 'wipada.s@email.com', role: 'Silver', status: 'Active', joined: '15 ก.ค. 2025' },
  { id: 'MB-1003', name: 'สมชาย ใจดี', email: 'somchai.jai@email.com', role: 'Gold', status: 'Expired', joined: '01 ม.ค. 2025' },
  { id: 'MB-1004', name: 'นภัสสร อรุณรัตน์', email: 'napassorn@email.com', role: 'Standard', status: 'Active', joined: '22 ก.ค. 2025' },
  { id: 'MB-1005', name: 'เอกราช สุวรรณภูมิ', email: 'ekkaraj@email.com', role: 'Platinum', status: 'Active', joined: '04 ส.ค. 2025' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState<Partial<Member>>({ 
    name: '', email: '', role: 'Standard', status: 'Active' 
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;
    
    const nextIdNum = Math.max(...members.map(m => parseInt(m.id.split('-')[1]))) + 1;
    const today = new Date();
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const joinedStr = `${today.getDate().toString().padStart(2, '0')} ${months[today.getMonth()]} ${today.getFullYear()}`;
    
    const memberObj: Member = {
      id: `MB-${nextIdNum}`,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role || 'Standard',
      status: newMember.status || 'Active',
      joined: joinedStr
    };
    
    setMembers([memberObj, ...members]);
    setShowAddModal(false);
    setNewMember({ name: '', email: '', role: 'Standard', status: 'Active' });
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm("คุณต้องการลบสมาชิกนี้ใช่หรือไม่?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#faf8ff]">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-gray-100 shadow-[2px_0_12px_rgba(0,0,0,0.02)] z-40 relative">
        <div className="p-8 border-b border-gray-50 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl font-black text-primary tracking-tight leading-none">MEMBERHUB</div>
            <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400 mt-1">SaaS Management</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-primary/5 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            ภาพรวมระบบ
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeTab === 'members' ? 'bg-primary/5 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Users className="w-5 h-5" />
            จัดการสมาชิก
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeTab === 'settings' ? 'bg-primary/5 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Settings className="w-5 h-5" />
            การตั้งค่า
          </button>
          <div className="pt-8 px-4">
            <div className="h-[1px] bg-gray-100 w-full mb-8"></div>
          </div>
          <Link to="/login" className="w-full flex items-center gap-3 px-4 py-3.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-semibold">
            <LogOut className="w-5 h-5" />
            ออกจากระบบ
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-gray-100 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="ค้นหาสมาชิก หรือกิจกรรม..." 
                className="w-full h-10 pl-11 bg-gray-50 border-none rounded-full text-sm focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 p-1 pl-3 bg-gray-50 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
              <span className="text-sm font-semibold text-gray-700 hidden sm:inline">สมชาย ใจดี</span>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto"
              >
                {/* Greeting */}
                <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                      ระบบสมาชิกภาพรวม 👋
                    </h1>
                    <p className="text-gray-500 mt-2">ยินดีต้อนรับกลับสู่แดชบอร์ด ข้อมูลสถิติและการอัปเดตล่าสุด</p>
                  </div>
                  <button className="h-12 px-6 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-[0_4px_14px_0_rgba(0,61,155,0.25)] w-fit sm:w-auto">
                    <Download className="w-4 h-4 cursor-pointer" />
                    ออกรายงานระบบ
                  </button>
                </section>

                {/* Stats Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-default group"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className={`w-14 h-14 ${stat.lightColor} ${stat.textColor} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                          <stat.icon className="w-7 h-7" />
                        </div>
                        <div className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1 border border-green-100">
                          <ArrowUpRight className="w-3 h-3" /> +12% 
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-400/80 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-4xl font-black text-gray-900 mt-3 tracking-tight">{stat.value}</p>
                    </motion.div>
                  ))}
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Chart */}
                  <section className="xl:col-span-2 bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">อัตราการเติบโต</h2>
                        <p className="text-sm text-gray-500 mt-1">สถิติสมาชิกใหม่และผู้ใช้งานจริง (ม.ค. - ก.ค.)</p>
                      </div>
                      <select className="bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 py-2.5 px-4 cursor-pointer outline-none">
                        <option>ปี 2025</option>
                        <option>ปี 2024</option>
                      </select>
                    </div>
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '12px 16px', fontWeight: 500 }}
                            itemStyle={{ color: '#191b23', fontWeight: 600 }}
                          />
                          <Line type="monotone" dataKey="members" name="สมาชิกทั้งหมด" stroke="#003d9b" strokeWidth={4} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                          <Line type="monotone" dataKey="active" name="ผู้ใช้งานประจำ" stroke="#b2c5ff" strokeWidth={4} dot={{r: 4, strokeWidth: 2}} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </section>

                  {/* Activity Log */}
                  <section className="xl:col-span-1 bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-50/80 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">กิจกรรมล่าสุด</h2>
                      </div>
                      <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                        ดูทั้งหมด
                      </button>
                    </div>
                    
                    <div className="divide-y divide-gray-50/50 flex-1 overflow-y-auto">
                      {activities.map((activity, i) => (
                        <div 
                          key={activity.id}
                          className="px-8 py-5 flex items-start gap-5 hover:bg-gray-50/50 transition-all group cursor-pointer"
                        >
                          <div className={`w-12 h-12 ${activity.iconBg} ${activity.iconColor} rounded-full flex items-center justify-center shrink-0`}>
                            <activity.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0 mt-0.5">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-[15px] truncate">{activity.title}</h3>
                            <p className="text-sm text-gray-500 mt-0.5 truncate">{activity.subtitle}</p>
                            <span className="text-xs font-medium text-gray-400 flex items-center gap-1 mt-2">
                              <Clock className="w-3 h-3" /> {activity.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === 'members' && (
              <motion.div 
                key="members"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto h-full flex flex-col"
              >
                <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">รายชื่อสมาชิก</h1>
                    <p className="text-gray-500 mt-2">จัดการ ดูข้อมูล และสถานะสมาชิกทั้งหมดในระบบ</p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="h-12 px-5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none">
                      <Filter className="w-4 h-4" /> ตัวกรอง
                    </button>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="h-12 px-5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(0,61,155,0.25)] flex-1 sm:flex-none"
                    >
                      <UserPlus className="w-4 h-4" /> เพิ่มสมาชิก
                    </button>
                  </div>
                </section>

                <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden flex-1">
                  <div className="overflow-x-auto h-full">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="py-5 px-8 font-semibold text-gray-500 text-sm">รหัสสมาชิก</th>
                          <th className="py-5 px-8 font-semibold text-gray-500 text-sm">ชื่อ-นามสกุล</th>
                          <th className="py-5 px-8 font-semibold text-gray-500 text-sm">ระดับ</th>
                          <th className="py-5 px-8 font-semibold text-gray-500 text-sm">สถานะ</th>
                          <th className="py-5 px-8 font-semibold text-gray-500 text-sm">วันที่สมัคร</th>
                          <th className="py-5 px-8 font-semibold text-gray-500 text-sm"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        {filteredMembers.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-gray-500">ไม่พบสมาชิกที่ค้นหา</td>
                          </tr>
                        ) : filteredMembers.map((member) => (
                          <tr key={member.id} className="hover:bg-gray-50/30 transition-colors group">
                            <td className="py-4 px-8 font-medium text-gray-900">{member.id}</td>
                            <td className="py-4 px-8">
                              <div className="font-semibold text-gray-900">{member.name}</div>
                              <div className="text-gray-500">{member.email}</div>
                            </td>
                            <td className="py-4 px-8">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold leading-none inline-flex items-center justify-center ${
                                member.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                                member.role === 'Platinum' ? 'bg-slate-800 text-slate-100' :
                                member.role === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {member.role}
                              </span>
                            </td>
                            <td className="py-4 px-8">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold leading-none inline-flex items-center justify-center gap-1.5 ${
                                member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-rose-500'}`}></span>
                                {member.status === 'Active' ? 'ใช้งานปกติ' : 'หมดอายุ'}
                              </span>
                            </td>
                            <td className="py-4 px-8 text-gray-500">{member.joined}</td>
                            <td className="py-4 px-8 text-right">
                              <div className="relative inline-block text-left group/menu">
                                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                  <MoreVertical className="w-5 h-5" />
                                </button>
                                <div className="absolute right-0 top-full mt-1 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-xl border border-gray-100 w-36 py-1.5 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
                                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                    <Edit className="w-4 h-4" /> แก้ไขข้อมูล
                                  </button>
                                  <button onClick={() => handleDeleteMember(member.id)} className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                                    <Trash2 className="w-4 h-4" /> ลบสมาชิก
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 max-w-4xl mx-auto w-full"
              >
                <div className="bg-white p-12 rounded-3xl flex items-center justify-center border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] h-[60vh] text-center border-dashed">
                  <div>
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                      <Settings className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">หน้าการตั้งค่ากำลังพัฒนา</h2>
                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">ขณะนี้ฟีเจอร์การตั้งค่าระบบเตรียมพร้อมสำหรับการใช้งานในเร็วๆ นี้</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">เพิ่มสมาชิกใหม่</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddMember} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                <input 
                  type="text" 
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="ตัวอย่าง: สมหมาย ขายดี"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                <input 
                  type="email" 
                  required
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="sommai@example.com"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ระดับสมาชิก</label>
                  <select 
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                  <select 
                    value={newMember.status}
                    onChange={(e) => setNewMember({...newMember, status: e.target.value})}
                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer"
                  >
                    <option value="Active">ใช้งานปกติ</option>
                    <option value="Expired">หมดอายุ</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 mt-6 border-t border-gray-100 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 h-11 px-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit" 
                  className="flex-1 h-11 px-4 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-sm"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 py-2 pb-safe flex items-center justify-around lg:hidden z-50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`p-3 flex flex-col items-center gap-1 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-gray-400'}`}
        >
          <div className={`${activeTab === 'dashboard' ? 'bg-primary/10 p-1.5 rounded-lg' : ''}`}>
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold">ภาพรวม</span>
        </button>
        <button 
          onClick={() => setActiveTab('members')}
          className={`p-3 flex flex-col items-center gap-1 rounded-xl transition-colors ${activeTab === 'members' ? 'text-primary' : 'text-gray-400'}`}
        >
          <div className={`${activeTab === 'members' ? 'bg-primary/10 p-1.5 rounded-lg' : ''}`}>
            <Users className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold">สมาชิก</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`p-3 flex flex-col items-center gap-1 rounded-xl transition-colors ${activeTab === 'settings' ? 'text-primary' : 'text-gray-400'}`}
        >
          <div className={`${activeTab === 'settings' ? 'bg-primary/10 p-1.5 rounded-lg' : ''}`}>
            <Settings className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold">ตั้งค่า</span>
        </button>
      </nav>
    </div>
  );
}
