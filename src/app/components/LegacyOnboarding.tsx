import { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle, Shield, ArrowLeft } from 'lucide-react';
import { GenericLabLogo } from '@/app/components/GenericLabLogo';

interface LegacyOnboardingProps {
  onComplete: () => void;
  onBack?: () => void;
}

export function LegacyOnboarding({ onComplete, onBack }: LegacyOnboardingProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength validation
  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = isPasswordValid && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
      {/* Back Button */}
      {onBack && (
        <div className="absolute top-6 left-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-md transition-colors"
          >
            <ArrowLeft className="size-5" />
            <span>Back</span>
          </button>
        </div>
      )}

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <GenericLabLogo className="h-20 w-20" />
            </div>
          </div>

          {/* Welcome Content */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Your New Client Portal
            </h1>
            <p className="text-gray-600 leading-relaxed">
              We've upgraded your experience. Securely access <strong>10 years</strong> of your
              sample history, manage your team, and share results faster than ever. Please set a
              secure password to claim your account.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Create Password Field */}
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Create New Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="size-5" />
                  </div>
                  <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a secure password"
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {password.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 text-sm transition-colors ${
                          req.met ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {req.met ? (
                          <CheckCircle2 className="size-4 flex-shrink-0" />
                        ) : (
                          <div className="size-4 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                        )}
                        <span>{req.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="size-5" />
                  </div>
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 outline-none transition-all ${
                      confirmPassword.length > 0
                        ? passwordsMatch
                          ? 'border-green-500 focus:ring-green-600 focus:border-transparent'
                          : 'border-red-500 focus:ring-red-600 focus:border-transparent'
                        : 'border-gray-200 focus:ring-green-600 focus:border-transparent'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword.length > 0 && (
                  <div className="mt-3">
                    {passwordsMatch ? (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="size-4" />
                        <span>Passwords match</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="size-4" />
                        <span>Passwords do not match</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${
                  canSubmit && !isSubmitting
                    ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-xl active:scale-98'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="size-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Securing Your Account...</span>
                  </>
                ) : (
                  <>
                    <Shield className="size-6" />
                    <span>Secure My Account & Import History</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Security Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <Shield className="size-5 text-blue-600 mt-0.5" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Your Data is Secure</h4>
                <p className="text-sm text-blue-800">
                  We use industry-standard encryption to protect your account and sample data. Your
                  password is never stored in plain text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>Agricultural Laboratory © 2026</p>
      </footer>
    </div>
  );
}