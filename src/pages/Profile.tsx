import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, Phone, MapPin, Camera, 
  Lock, Shield, Bell, Globe, ArrowLeft,
  Save, CheckCircle, Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] pb-20 lg:pb-0">
      {/* Header */}
      <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-gray-100 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ข้อมูลส่วนตัว</h1>
        </div>
        <button 
          onClick={handleSave}
          className="h-11 px-6 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-md shadow-primary/20"
        >
          {isSaved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaved ? 'บันทึกแล้ว' : 'บันทึกข้อมูล'}
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-6 sm:p-10 space-y-8">
        {/* Profile Card */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">สมชาย ใจดี</h2>
            <p className="text-gray-500 font-medium">สมาชิกระดับ Gold • ร่วมงานเมื่อ ม.ค. 2025</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <span className="px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Active</span>
              <span className="px-4 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10">Admin Account</span>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'personal', label: 'ข้อมูลทั่วไป', icon: User },
            { id: 'security', label: 'ความปลอดภัย', icon: Shield },
            { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {activeTab === 'personal' && (
              <>
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">รายละเอียดส่วนตัว</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">ชื่อจริง</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" defaultValue="สมชาย" className="pl-12 w-full h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">นามสกุล</label>
                        <input type="text" defaultValue="ใจดี" className="w-full h-12 px-4 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">อีเมล</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" defaultValue="somchai.jai@email.com" className="pl-12 w-full h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">เบอร์โทรศัพท์</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" defaultValue="081-234-5678" className="pl-12 w-full h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">ภาษา</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <select className="pl-12 w-full h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none appearance-none">
                            <option>ภาษาไทย (Thai)</option>
                            <option>English (US)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">ที่อยู่</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-5 w-4 h-4 text-gray-400" />
                        <textarea 
                          rows={3} 
                          defaultValue="123/45 ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110"
                          className="pl-12 py-4 w-full bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">ความคืบหน้าสมาชิก</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-500 uppercase">แต้มสะสม</span>
                        <span className="text-primary">85,400 / 100,000</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '85.4%' }}></div>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed text-center">คุณต้องการอีก 14,600 แต้มเพื่อเลื่อนระดับเป็น Platinum สมาชิก</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'security' && (
              <div className="md:col-span-3 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-8">การตั้งค่าความปลอดภัย</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-center justify-between py-4 border-b border-gray-50">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">เปลี่ยนรหัสผ่าน</p>
                          <p className="text-sm text-gray-500">แนะนำให้เปลี่ยนรหัสผ่านทุกๆ 3 เดือนเพื่อความปลอดภัย</p>
                        </div>
                      </div>
                      <button className="px-5 py-2 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">แก้ไข</button>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-50">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                          <Shield className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">การยืนยันตัวตน 2 ชั้น (2FA)</p>
                          <p className="text-sm text-gray-500">เพิ่มความปลอดภัยอีกขั้นด้วยการยืนยันตัวตนผ่าน SMS หรือ App</p>
                        </div>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">อุปกรณ์ที่เชื่อมต่อ</p>
                          <p className="text-sm text-gray-500">จัดการอุปกรณ์ที่คุณล็อกอินค้างไว้ในขณะนี้</p>
                        </div>
                      </div>
                      <button className="px-5 py-2 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">ตรวจสอบ</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="md:col-span-3">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center py-20 border-dashed">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">เร็วๆ นี้</h3>
                  <p className="text-gray-500 mt-2">ฟีเจอร์การปรับแต่งการแจ้งเตือนกำลังอยู่ระหว่างการพัฒนา</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
