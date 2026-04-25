import { motion } from 'motion/react';
import { UserPlus, User, Mail, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Image & Message (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-dark">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYcwhaKJDC3D0jyKmHe8hSBfruxqNXzP_lEkNZ-rzzCf-A_cMnhg_0AuK7-b261_HWGxyDOvJfmp9uj8huSsdE-929yzRGoQDYJJ8GeWwlGrKWJ8QwWeFUvIiFGyNSqUKzVfoNn5OhEs5_o-24oBDI1g0Fty6uQ_jobrPscURAw_nM0qzOrvf0iiDGZif6XSnCqTLVbrJhOuB_3sIJqJetm3lZZuyFyIplas3WkqwKJ5aLTBGounV_fl8Ic3fV8cucWQHs4j8SSAc" 
          alt="Office Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="relative z-10 p-16 flex flex-col justify-end text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="w-12 h-12 mb-6 text-primary-light" />
            <h1 className="text-4xl font-bold mb-4 tracking-tight">ระบบสมาชิกที่ปลอดภัยและน่าเชื่อถือ</h1>
            <p className="text-xl text-primary-light/80 leading-relaxed max-w-md">
              สัมผัสประสบการณ์การจัดการข้อมูลและการใช้งานของคุณได้อย่างมีประสิทธิภาพ พร้อมระบบรักษาความปลอดภัยระดับสูง
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <UserPlus className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h2>
            <p className="text-gray-500">กรุณากรอกข้อมูลด้านล่างเพื่อสร้างบัญชีผู้ใช้ใหม่ในระบบ</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="fullname">ชื่อ-นามสกุล</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input 
                  id="fullname"
                  type="text" 
                  placeholder="ระบุชื่อและนามสกุลของคุณ" 
                  className="pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">อีเมล</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input 
                  id="email"
                  type="email" 
                  placeholder="your@email.com" 
                  className="pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">รหัสผ่าน</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input 
                  id="password"
                  type="password" 
                  placeholder="กำหนดรหัสผ่าน 8 ตัวอักษรขึ้นไป" 
                  className="pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="confirm">ยืนยันรหัสผ่าน</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input 
                  id="confirm"
                  type="password" 
                  placeholder="กรอกรหัสผ่านอีกครั้ง" 
                  className="pl-12"
                />
              </div>
            </div>

            <button type="button" className="btn-primary mt-4 flex items-center justify-center gap-2">
              สมัครสมาชิก <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            มีบัญชีอยู่แล้ว? 
            <Link to="/login" className="ml-2 text-primary font-semibold hover:underline">
              เข้าสู่ระบบ
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
