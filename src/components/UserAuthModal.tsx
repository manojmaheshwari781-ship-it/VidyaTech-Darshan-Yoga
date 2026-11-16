import React, { useState } from 'react';
import {
  UserPlus,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  X,
  LogOut,
  Unlock,
  Sparkles,
} from 'lucide-react';
import { RegisteredUser, UserProgress } from '../types/yoga';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: RegisteredUser | null;
  progress: UserProgress;
  requestedLevelId?: number | null;
  onAuthSuccess: (user: RegisteredUser) => void;
  onSignOutUser: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  progress,
  requestedLevelId,
  onAuthSuccess,
  onSignOutUser,
}) => {
  const [name, setName] = useState<string>(currentUser?.name || '');
  const [contact, setContact] = useState<string>(currentUser?.contact || '');
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter both your name and email or phone number.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          progress: {
            currentLevelId: progress.currentLevelId,
            currentDayNumber: progress.currentDayNumber,
            totalMinutesPracticed: progress.totalMinutesPracticed,
            streak: progress.streak,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatusMessage({ type: 'error', text: data.error || 'Could not register account.' });
        return;
      }
      onAuthSuccess(data.user);
      setStatusMessage({
        type: 'success',
        text: `Welcome, ${data.user.name}! Your practice account is now synced.`,
      });
    } catch {
      setStatusMessage({ type: 'error', text: 'Network error while saving your profile.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeemVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setStatusMessage({
        type: 'error',
        text: 'Please sign up with your name and phone/email first before redeeming a code.',
      });
      return;
    }
    if (!voucherCode.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your secret unlock code.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/vouchers/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          code: voucherCode.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatusMessage({ type: 'error', text: data.message || 'Invalid unlock code.' });
        return;
      }
      onAuthSuccess(data.user);
      setVoucherCode('');
      setStatusMessage({ type: 'success', text: data.message });
    } catch {
      setStatusMessage({ type: 'error', text: 'Network error while validating unlock code.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#0c1624] border border-amber-500/30 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
          aria-label="Close member dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl p-0.5 bg-gradient-to-tr from-emerald-600 via-amber-500 to-amber-400 shrink-0 shadow-sm">
            <img
              src="/assets/aistudio/Yogi_meditating_on_lotus_flower_20260929160250_9487d332.jpg"
              alt="VidyaTech Darshan Logo"
              className="w-full h-full object-cover rounded-[10px] bg-white dark:bg-[#0c1624]"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Practitioner Account · Access & Vouchers
            </p>
            <h2 className="text-xl font-serif-display font-semibold text-slate-900 dark:text-white">
              {currentUser ? `Namaste, ${currentUser.name}` : 'Sign Up / Sign In'}
            </h2>
          </div>
        </div>

        {requestedLevelId && requestedLevelId > 1 && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-800 dark:text-slate-200">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-0.5">
              Unlock Level {requestedLevelId} (Levels 2–12 Membership)
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Level 1 is open to all practitioners. To unlock Level {requestedLevelId} or Full Access (Levels 2–12), sign up below and redeem an Easypaisa / JazzCash unlock code from Manoj YogaWala—or ask the Admin to enable access for your account.
            </p>
          </div>
        )}

        {/* Current User Summary or Registration Form */}
        {currentUser ? (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700/70 mb-5 space-y-2.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {currentUser.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentUser.contact} · Joined {new Date(currentUser.registeredAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={onSignOutUser}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 bg-white dark:bg-[#0c1624] border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Account</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200/70 dark:border-slate-700/60 flex flex-wrap items-center gap-3 text-xs font-mono-numbers">
              <span className={currentUser.hasFullAccess ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-amber-600 dark:text-amber-400 font-semibold'}>
                {currentUser.hasFullAccess
                  ? 'Full Access Active (Levels 1–12)'
                  : `Unlocked Levels: ${currentUser.unlockedLevels.join(', ')}`}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 dark:text-slate-300">
                {currentUser.totalMinutesPracticed} mins practiced
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3 mb-5 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ayesha Khan"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address or Mobile Number (Easypaisa / JazzCash / WhatsApp)
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. +92 300 1234567 or ayesha@email.com"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 disabled:opacity-60 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isLoading ? 'Saving Profile...' : 'Register / Sign In to Sync Progress'}</span>
            </button>
          </form>
        )}

        {/* Redeem Secret Unlock Code / Voucher Section */}
        <form onSubmit={handleRedeemVoucher} className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <KeyRound className="w-4 h-4 text-amber-500" />
            <span>Redeem Secret Unlock Code (Easypaisa / JazzCash Voucher)</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              placeholder="e.g. MANOJ-VIP-L2"
              className="flex-1 px-3.5 py-2 text-sm font-mono-numbers uppercase rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
            <button
              type="submit"
              disabled={isLoading || !currentUser}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Unlock</span>
            </button>
          </div>
          {!currentUser && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Sign up above first to apply an unlock code to your account.
            </p>
          )}
        </form>

        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-xl border text-xs flex items-start gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Level 1 is always free for all ages</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
          >
            Back to Practice
          </button>
        </div>
      </div>
    </div>
  );
};
