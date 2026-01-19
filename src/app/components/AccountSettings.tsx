import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Lock, Save, Eye, EyeOff } from 'lucide-react';

interface AccountSettingsProps {
  onBack: () => void;
  darkMode: boolean;
  currentUser: {
    name: string;
    email: string;
    phone?: string;
  };
}

export function AccountSettings({ onBack, darkMode, currentUser }: AccountSettingsProps) {
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Theme classes
  const bgPrimary = darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50';
  const bgSecondary = darkMode ? 'bg-[#252525]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#F0F0F0]' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-[#B8B8B8]' : 'text-gray-600';
  const borderColor = darkMode ? 'border-[#3C3C3C]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#2C2C2C]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-gray-300';
  const inputFocus = darkMode ? 'focus:border-[#F7DC6F]' : 'focus:border-[#F7DC6F]';

  const handleSaveEmail = () => {
    alert(`Email would be updated to: ${email}`);
  };

  const handleSavePhone = () => {
    alert(`Phone would be updated to: ${phone}`);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password would be reset successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={`fixed inset-0 ${bgPrimary} z-50 overflow-y-auto`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${bgSecondary} border-b ${borderColor} px-4 md:px-6 py-4`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2 ${darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
          >
            <ArrowLeft className={`size-5 ${textSecondary}`} />
          </button>
          <span className={`font-semibold ${textPrimary}`}>Account Settings</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-8">
        {/* User Info Header */}
        <div className="mb-8">
          <h1 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-2`}>
            {currentUser.name}
          </h1>
          <p className={`text-sm ${textSecondary}`}>
            Manage your account settings and preferences
          </p>
        </div>

        {/* Email Section */}
        <section className={`${bgSecondary} ${borderColor} border rounded-2xl overflow-hidden mb-6`}>
          <div className={`px-6 py-4 border-b ${borderColor}`}>
            <div className="flex items-center gap-2">
              <Mail className={`size-5 ${textSecondary}`} />
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Email Address</h2>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Current Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 ${inputBg} border ${inputBorder} ${inputFocus} rounded-lg ${textPrimary} outline-none transition-colors`}
                />
              </div>
              <button
                onClick={handleSaveEmail}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#F7DC6F] hover:bg-[#F4D03F] text-gray-900 font-medium rounded-lg transition-colors"
              >
                <Save className="size-4" />
                Save Email
              </button>
            </div>
          </div>
        </section>

        {/* Phone Number Section */}
        <section className={`${bgSecondary} ${borderColor} border rounded-2xl overflow-hidden mb-6`}>
          <div className={`px-6 py-4 border-b ${borderColor}`}>
            <div className="flex items-center gap-2">
              <Phone className={`size-5 ${textSecondary}`} />
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Phone Number</h2>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className={`w-full px-4 py-2.5 ${inputBg} border ${inputBorder} ${inputFocus} rounded-lg ${textPrimary} outline-none transition-colors`}
                />
              </div>
              <button
                onClick={handleSavePhone}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#F7DC6F] hover:bg-[#F4D03F] text-gray-900 font-medium rounded-lg transition-colors"
              >
                <Save className="size-4" />
                Save Phone Number
              </button>
            </div>
          </div>
        </section>

        {/* Password Section */}
        <section className={`${bgSecondary} ${borderColor} border rounded-2xl overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${borderColor}`}>
            <div className="flex items-center gap-2">
              <Lock className={`size-5 ${textSecondary}`} />
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Reset Password</h2>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`w-full px-4 py-2.5 pr-12 ${inputBg} border ${inputBorder} ${inputFocus} rounded-lg ${textPrimary} outline-none transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${textSecondary} hover:${textPrimary} transition-colors`}
                  >
                    {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full px-4 py-2.5 pr-12 ${inputBg} border ${inputBorder} ${inputFocus} rounded-lg ${textPrimary} outline-none transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${textSecondary} hover:${textPrimary} transition-colors`}
                  >
                    {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-2.5 pr-12 ${inputBg} border ${inputBorder} ${inputFocus} rounded-lg ${textPrimary} outline-none transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${textSecondary} hover:${textPrimary} transition-colors`}
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleResetPassword}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#F7DC6F] hover:bg-[#F4D03F] text-gray-900 font-medium rounded-lg transition-colors"
              >
                <Lock className="size-4" />
                Reset Password
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
