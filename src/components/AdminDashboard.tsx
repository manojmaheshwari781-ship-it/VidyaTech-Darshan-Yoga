import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  KeyRound,
  LogOut,
  Search,
  Unlock,
  Lock,
  Plus,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  Sun,
  Moon,
  Clock,
  Award,
  ShieldCheck,
  AlertCircle,
  Power,
  Sparkles,
} from 'lucide-react';
import {
  RegisteredUser,
  UnlockVoucher,
  AdminDashboardStats,
  PaymentMethod,
} from '../types/yoga';

interface AdminDashboardProps {
  adminToken: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogoutToApp: () => void;
  onUserRecordUpdated?: (updatedUser: RegisteredUser) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminToken,
  isDarkMode,
  onToggleDarkMode,
  onLogoutToApp,
  onUserRecordUpdated,
}) => {
  const [activeSection, setActiveSection] = useState<'users' | 'vouchers'>('users');
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [vouchers, setVouchers] = useState<UnlockVoucher[]>([]);
  const [stats, setStats] = useState<AdminDashboardStats>({
    totalUsers: 0,
    fullAccessUsers: 0,
    freeTierUsers: 0,
    totalPracticeMinutes: 0,
    activeVouchers: 0,
    totalVoucherRedemptions: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // User filter/search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [accessFilter, setAccessFilter] = useState<'all' | 'full' | 'free'>('all');
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<string | null>(null);

  // Voucher creation form state
  const [newCode, setNewCode] = useState<string>('');
  const [unlockType, setUnlockType] = useState<'full' | 'level'>('level');
  const [targetLevel, setTargetLevel] = useState<number>(2);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Easypaisa');
  const [paymentNote, setPaymentNote] = useState<string>('');
  const [maxUses, setMaxUses] = useState<number>(1);
  const [copiedVoucherId, setCopiedVoucherId] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (res.status === 401) {
        onLogoutToApp();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
        setVouchers(data.vouchers || []);
        if (data.stats) setStats(data.stats);
      }
    } catch {
      setBannerMessage({ type: 'error', text: 'Could not refresh admin data from server.' });
    } finally {
      setIsLoading(false);
    }
  }, [adminToken, onLogoutToApp]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleToggleUserAccess = async (user: RegisteredUser) => {
    setActionBusyId(user.id);
    setBannerMessage(null);
    try {
      const res = await fetch(`/api/admin/users/${user.id}/toggle-access`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setBannerMessage({ type: 'error', text: data.error || 'Failed to update user access.' });
        return;
      }

      const updated: RegisteredUser = data.user;
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setStats((prev) => ({
        ...prev,
        fullAccessUsers: updated.hasFullAccess
          ? prev.fullAccessUsers + 1
          : Math.max(0, prev.fullAccessUsers - 1),
        freeTierUsers: updated.hasFullAccess
          ? Math.max(0, prev.freeTierUsers - 1)
          : prev.freeTierUsers + 1,
      }));
      if (onUserRecordUpdated) onUserRecordUpdated(updated);

      setBannerMessage({
        type: 'success',
        text: updated.hasFullAccess
          ? `Full Access (Levels 2–12) granted to ${updated.name}.`
          : `Levels 2–12 access revoked for ${updated.name} (restricted to Level 1).`,
      });
    } catch {
      setBannerMessage({ type: 'error', text: 'Network error updating user access.' });
    } finally {
      setActionBusyId(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setActionBusyId(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (res.ok) {
        setConfirmDeleteUserId(null);
        await fetchDashboard();
        setBannerMessage({ type: 'success', text: 'User record removed.' });
      }
    } finally {
      setActionBusyId(null);
    }
  };

  const handleGenerateRandomCode = () => {
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const prefix = unlockType === 'full' ? 'MANOJ-VIP-ALL' : `MANOJ-VIP-L${targetLevel}`;
    setNewCode(`${prefix}-${suffix}`);
  };

  const handleCreateVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) {
      setBannerMessage({ type: 'error', text: 'Please enter a voucher code or click Auto-Generate.' });
      return;
    }

    setActionBusyId('create-voucher');
    setBannerMessage(null);
    try {
      const res = await fetch('/api/admin/vouchers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          code: newCode.trim(),
          unlockType,
          targetLevel: unlockType === 'level' ? targetLevel : undefined,
          paymentMethod,
          paymentNote: paymentNote.trim(),
          maxUses,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setBannerMessage({ type: 'error', text: data.error || 'Could not create voucher code.' });
        return;
      }
      setNewCode('');
      setPaymentNote('');
      setMaxUses(1);
      await fetchDashboard();
      setBannerMessage({
        type: 'success',
        text: `Secret unlock code "${data.voucher.code}" generated and ready to share.`,
      });
    } catch {
      setBannerMessage({ type: 'error', text: 'Network error while creating voucher.' });
    } finally {
      setActionBusyId(null);
    }
  };

  const handleToggleVoucher = async (voucherId: string) => {
    setActionBusyId(voucherId);
    try {
      const res = await fetch(`/api/admin/vouchers/${voucherId}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (res.ok) {
        await fetchDashboard();
      }
    } finally {
      setActionBusyId(null);
    }
  };

  const handleDeleteVoucher = async (voucherId: string) => {
    setActionBusyId(voucherId);
    try {
      const res = await fetch(`/api/admin/vouchers/${voucherId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (res.ok) {
        await fetchDashboard();
        setBannerMessage({ type: 'success', text: 'Voucher deleted.' });
      }
    } finally {
      setActionBusyId(null);
    }
  };

  const handleCopyCode = (voucher: UnlockVoucher) => {
    navigator.clipboard.writeText(voucher.code);
    setCopiedVoucherId(voucher.id);
    setTimeout(() => setCopiedVoucherId(null), 1800);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      accessFilter === 'all' ||
      (accessFilter === 'full' && u.hasFullAccess) ||
      (accessFilter === 'free' && !u.hasFullAccess);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070e17] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0c1624]/95 backdrop-blur-md border-b border-emerald-500/25 dark:border-emerald-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-emerald-600 via-amber-500 to-amber-400 shrink-0 shadow-sm">
              <img
                src="/assets/aistudio/Yogi_meditating_on_lotus_flower_20260929160250_9487d332.jpg"
                alt="VidyaTech Darshan Official Logo"
                className="w-full h-full object-cover rounded-full bg-white dark:bg-[#0c1624]"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-serif-display font-bold text-slate-900 dark:text-white truncate">
                  VidyaTech Darshan
                </span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hidden sm:inline">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-amber-700 dark:text-amber-400 truncate">
                by Manoj YogaWala · User Management & Unlock Vouchers
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={fetchDashboard}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Refresh dashboard data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={onLogoutToApp}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 active:scale-95 rounded-xl transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout / Return to App</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome / Analytics Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              Manoj YogaWala Administration
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900 dark:text-white">
              Practitioner Analytics & Access Control
            </h1>
          </div>

          {/* Segmented Navigation Tabs */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-[#111f32] rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveSection('users')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeSection === 'users'
                  ? 'bg-white dark:bg-[#0c1624] text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Registered Users ({users.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('vouchers')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeSection === 'vouchers'
                  ? 'bg-white dark:bg-[#0c1624] text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Secret Unlock Vouchers ({vouchers.length})</span>
            </button>
          </div>
        </div>

        {/* 4-Card Analytics Overview Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              <span>Registered Practitioners</span>
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono-numbers text-slate-900 dark:text-white">
              {stats.totalUsers}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {stats.freeTierUsers} on Level 1 Free · {stats.fullAccessUsers} Full Access
            </p>
          </div>

          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-5 border border-emerald-500/30 dark:border-emerald-900/50 shadow-sm">
            <div className="flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-2">
              <span>Full Access Members (L2–12)</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono-numbers text-emerald-700 dark:text-emerald-400">
              {stats.fullAccessUsers}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {stats.totalUsers > 0
                ? `${Math.round((stats.fullAccessUsers / stats.totalUsers) * 100)}% conversion rate`
                : '0% conversion rate'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-5 border border-amber-500/30 dark:border-amber-900/50 shadow-sm">
            <div className="flex items-center justify-between text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
              <span>Total Practice Minutes</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono-numbers text-amber-600 dark:text-amber-400">
              {stats.totalPracticeMinutes.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Cumulative meditation & asana minutes
            </p>
          </div>

          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              <span>Active Unlock Vouchers</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono-numbers text-slate-900 dark:text-white">
              {stats.activeVouchers}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono-numbers">
              {stats.totalVoucherRedemptions} total codes redeemed
            </p>
          </div>
        </section>

        {/* Feedback Banner */}
        {bannerMessage && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
              bannerMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {bannerMessage.type === 'success' ? (
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
              <span className="font-medium">{bannerMessage.text}</span>
            </div>
            <button
              onClick={() => setBannerMessage(null)}
              className="text-[11px] underline opacity-80 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* SECTION 1: REGISTERED USERS & MANUAL ACCESS CONTROL */}
        {activeSection === 'users' && (
          <section className="bg-white dark:bg-[#0c1624] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white">
                  Registered Practitioners & Level Access
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track practice progress and toggle Levels 2–12 access instantly for any member.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, email, or phone..."
                    className="pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                {/* Filter buttons */}
                <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#111f32] rounded-xl border border-slate-200/70 dark:border-slate-800">
                  {(['all', 'full', 'free'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setAccessFilter(filterKey)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                        accessFilter === filterKey
                          ? 'bg-white dark:bg-[#0c1624] text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {filterKey === 'all' ? 'All' : filterKey === 'full' ? 'Full Access' : 'Level 1 Free'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Responsive Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#111f32]/60 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-3.5 px-5">User Name</th>
                    <th className="py-3.5 px-4">Email / Phone</th>
                    <th className="py-3.5 px-4">Registration Date</th>
                    <th className="py-3.5 px-4">Active Level</th>
                    <th className="py-3.5 px-4">Practice Time</th>
                    <th className="py-3.5 px-4">Access Status</th>
                    <th className="py-3.5 px-5 text-right">Manual Level Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-slate-500 dark:text-slate-400">
                        No registered users match your current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => {
                      const isBusy = actionBusyId === user.id;
                      const initials = user.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase();

                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-[#111f32]/50 transition-colors"
                        >
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                                {initials || 'Y'}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">
                                  {user.name}
                                </p>
                                {user.redeemedCodes.length > 0 && (
                                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-mono-numbers">
                                    Code: {user.redeemedCodes.join(', ')}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                            {user.contact}
                          </td>

                          <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono-numbers whitespace-nowrap">
                            {formatDate(user.registeredAt)}
                          </td>

                          <td className="py-3.5 px-4 font-mono-numbers whitespace-nowrap">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              Level {user.currentLevelId}
                            </span>
                            <span className="text-slate-400 mx-1">·</span>
                            <span className="text-slate-500 dark:text-slate-400">
                              Day {user.currentDayNumber}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-mono-numbers whitespace-nowrap">
                            <span className="font-semibold text-amber-700 dark:text-amber-400">
                              {user.totalMinutesPracticed} mins
                            </span>
                            <span className="text-slate-400 mx-1">·</span>
                            <span className="text-slate-500 dark:text-slate-400">
                              {user.streak}d streak
                            </span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  user.hasFullAccess
                                    ? 'bg-emerald-500'
                                    : user.unlockedLevels.length > 1
                                    ? 'bg-amber-500'
                                    : 'bg-slate-400'
                                }`}
                              />
                              <span
                                className={`font-semibold ${
                                  user.hasFullAccess
                                    ? 'text-emerald-700 dark:text-emerald-400'
                                    : user.unlockedLevels.length > 1
                                    ? 'text-amber-700 dark:text-amber-400'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                {user.hasFullAccess
                                  ? 'Full Access (L1–12)'
                                  : user.unlockedLevels.length > 1
                                  ? `Levels ${user.unlockedLevels.join(', ')}`
                                  : 'Level 1 Only'}
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-5 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => handleToggleUserAccess(user)}
                                disabled={isBusy}
                                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 shadow-sm disabled:opacity-50 ${
                                  user.hasFullAccess
                                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-100 dark:hover:bg-rose-900/50'
                                    : 'bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white'
                                }`}
                              >
                                {user.hasFullAccess ? (
                                  <>
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>Revoke Access</span>
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="w-3.5 h-3.5" />
                                    <span>Grant Full Access</span>
                                  </>
                                )}
                              </button>

                              {confirmDeleteUserId === user.id ? (
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="px-2 py-1.5 text-[11px] font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteUserId(null)}
                                    className="px-2 py-1.5 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmDeleteUserId(user.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                                  title="Delete user"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 2: SECRET UNLOCK CODES & VOUCHERS */}
        {activeSection === 'vouchers' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Create Voucher Card (4 cols) */}
            <section className="lg:col-span-4 bg-white dark:bg-[#0c1624] rounded-2xl p-5 md:p-6 border border-emerald-500/30 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Easypaisa / JazzCash Access
                </p>
                <h2 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white">
                  Generate Secret Unlock Code
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create custom voucher codes for students who complete payment manually.
                </p>
              </div>

              <form onSubmit={handleCreateVoucher} className="space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Voucher Code
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomCode}
                      className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Auto-Generate Code
                    </button>
                  </div>
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    placeholder="e.g. MANOJ-VIP-L2"
                    className="w-full px-3.5 py-2 text-sm font-mono-numbers uppercase rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Unlock Scope
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUnlockType('level')}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                        unlockType === 'level'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-amber-300'
                          : 'bg-slate-50 dark:bg-[#111f32] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Specific Level
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnlockType('full')}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                        unlockType === 'full'
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-50 dark:bg-[#111f32] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      All Levels (2–12)
                    </button>
                  </div>
                </div>

                {unlockType === 'level' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Target Level to Unlock
                    </label>
                    <select
                      value={targetLevel}
                      onChange={(e) => setTargetLevel(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((lvl) => (
                        <option key={lvl} value={lvl}>
                          Level {lvl} (Month {lvl})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Payment Channel
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                      <option value="Easypaisa">Easypaisa</option>
                      <option value="JazzCash">JazzCash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Complimentary">Complimentary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Max Uses
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={maxUses}
                      onChange={(e) => setMaxUses(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-xs font-mono-numbers rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Payment / Student Reference Note
                  </label>
                  <input
                    type="text"
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    placeholder="e.g. Easypaisa TRX #94821 — Sara Ali"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={actionBusyId === 'create-voucher'}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 disabled:opacity-50 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Unlock Voucher</span>
                </button>
              </form>
            </section>

            {/* Vouchers Table (8 cols) */}
            <section className="lg:col-span-8 bg-white dark:bg-[#0c1624] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white">
                    Active & Redeemed Unlock Vouchers
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Share any active code with a practitioner to unlock their levels automatically.
                  </p>
                </div>
                <span className="text-xs font-mono-numbers text-slate-500 dark:text-slate-400">
                  {vouchers.length} Total Codes
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {vouchers.length === 0 ? (
                  <div className="p-10 text-center text-xs text-slate-500">
                    No unlock vouchers generated yet. Create your first code on the left.
                  </div>
                ) : (
                  vouchers.map((voucher) => {
                    const isExhausted = voucher.usedCount >= voucher.maxUses;
                    const statusLabel = !voucher.isActive
                      ? 'Disabled'
                      : isExhausted
                      ? 'Fully Redeemed'
                      : 'Active';

                    return (
                      <div
                        key={voucher.id}
                        className="p-4 sm:p-5 hover:bg-slate-50/70 dark:hover:bg-[#111f32]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="font-mono-numbers text-sm font-bold tracking-wide text-slate-900 dark:text-white bg-slate-100 dark:bg-[#152438] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                              {voucher.code}
                            </span>

                            <button
                              onClick={() => handleCopyCode(voucher)}
                              className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
                              title="Copy code to clipboard"
                            >
                              {copiedVoucherId === voucher.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-600">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            <span className="text-slate-300 dark:text-slate-700">·</span>

                            <span
                              className={`text-xs font-semibold ${
                                statusLabel === 'Active'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : statusLabel === 'Disabled'
                                  ? 'text-slate-500'
                                  : 'text-amber-600 dark:text-amber-400'
                              }`}
                            >
                              {statusLabel}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                              {voucher.unlockType === 'full'
                                ? 'Unlocks Full Access (Levels 2–12)'
                                : `Unlocks Level ${voucher.targetLevel}`}
                            </span>
                            <span className="text-slate-400">·</span>
                            <span>{voucher.paymentMethod}</span>
                            {voucher.paymentNote && (
                              <>
                                <span className="text-slate-400">·</span>
                                <span className="text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                  {voucher.paymentNote}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono-numbers">
                            <span>
                              Usage: {voucher.usedCount} / {voucher.maxUses}
                            </span>
                            <span>·</span>
                            <span>Created {formatDate(voucher.createdAt)}</span>
                            {voucher.redeemedBy.length > 0 && (
                              <>
                                <span>·</span>
                                <span className="font-sans text-slate-600 dark:text-slate-300">
                                  Redeemed by: {voucher.redeemedBy.join(', ')}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleToggleVoucher(voucher.id)}
                            disabled={actionBusyId === voucher.id}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors inline-flex items-center gap-1.5 ${
                              voucher.isActive
                                ? 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20'
                            }`}
                          >
                            <Power className="w-3.5 h-3.5" />
                            <span>{voucher.isActive ? 'Disable' : 'Activate'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteVoucher(voucher.id)}
                            disabled={actionBusyId === voucher.id}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                            title="Delete voucher"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};
