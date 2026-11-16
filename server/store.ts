import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type {
  RegisteredUser,
  UnlockVoucher,
  AdminDashboardStats,
  PaymentMethod,
} from '../src/types/yoga';

interface DatabaseSchema {
  users: RegisteredUser[];
  vouchers: UnlockVoucher[];
}

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DB_PATH = path.join(DATA_DIR, 'vidyatech-db.json');

const ALL_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function createInitialData(): DatabaseSchema {
  const now = new Date();
  const daysAgo = (d: number) =>
    new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

  return {
    users: [
      {
        id: 'usr_aisha_01',
        name: 'Aisha Siddiqui',
        contact: '+92 300 4182910',
        registeredAt: daysAgo(18),
        currentLevelId: 3,
        currentDayNumber: 12,
        totalMinutesPracticed: 420,
        streak: 9,
        hasFullAccess: true,
        unlockedLevels: [...ALL_LEVELS],
        redeemedCodes: ['DARSHAN-FULL-2026'],
        lastActiveAt: daysAgo(0),
      },
      {
        id: 'usr_rohan_02',
        name: 'Rohan Sharma',
        contact: 'rohan.sharma@gmail.com',
        registeredAt: daysAgo(9),
        currentLevelId: 1,
        currentDayNumber: 8,
        totalMinutesPracticed: 120,
        streak: 4,
        hasFullAccess: false,
        unlockedLevels: [1],
        redeemedCodes: [],
        lastActiveAt: daysAgo(1),
      },
      {
        id: 'usr_fatima_03',
        name: 'Fatima Zahra',
        contact: '+92 321 9845120',
        registeredAt: daysAgo(5),
        currentLevelId: 2,
        currentDayNumber: 4,
        totalMinutesPracticed: 185,
        streak: 5,
        hasFullAccess: false,
        unlockedLevels: [1, 2],
        redeemedCodes: ['MANOJ-VIP-L2'],
        lastActiveAt: daysAgo(0),
      },
      {
        id: 'usr_vikram_04',
        name: 'Vikram Patel',
        contact: 'vikram.patel@outlook.com',
        registeredAt: daysAgo(2),
        currentLevelId: 1,
        currentDayNumber: 2,
        totalMinutesPracticed: 30,
        streak: 2,
        hasFullAccess: false,
        unlockedLevels: [1],
        redeemedCodes: [],
        lastActiveAt: daysAgo(0),
      },
    ],
    vouchers: [
      {
        id: 'vch_vip_l2',
        code: 'MANOJ-VIP-L2',
        unlockType: 'level',
        targetLevel: 2,
        paymentMethod: 'Easypaisa',
        paymentNote: 'Level 2 Pranayama Starter Pack (Easypaisa)',
        maxUses: 10,
        usedCount: 1,
        redeemedBy: ['Fatima Zahra (+92 321 9845120)'],
        isActive: true,
        createdAt: daysAgo(10),
      },
      {
        id: 'vch_full_2026',
        code: 'DARSHAN-FULL-2026',
        unlockType: 'full',
        paymentMethod: 'JazzCash',
        paymentNote: 'Annual Full Access Levels 2-12 (JazzCash)',
        maxUses: 5,
        usedCount: 1,
        redeemedBy: ['Aisha Siddiqui (+92 300 4182910)'],
        isActive: true,
        createdAt: daysAgo(20),
      },
    ],
  };
}

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      const initial = createInitialData();
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      vouchers: Array.isArray(parsed.vouchers) ? parsed.vouchers : [],
    };
  } catch (err) {
    console.error('Failed to read VidyaTech DB, resetting to initial:', err);
    return createInitialData();
  }
}

function writeDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tmpPath = `${DB_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmpPath, DB_PATH);
}

export function registerOrLoginUser(
  name: string,
  contact: string,
  currentProgress?: {
    currentLevelId?: number;
    currentDayNumber?: number;
    totalMinutesPracticed?: number;
    streak?: number;
  }
): RegisteredUser {
  const db = readDb();
  const normalizedContact = contact.trim().toLowerCase();
  const existingIndex = db.users.findIndex(
    (u) => u.contact.trim().toLowerCase() === normalizedContact
  );

  const nowIso = new Date().toISOString();

  if (existingIndex !== -1) {
    const existing = db.users[existingIndex];
    const updated: RegisteredUser = {
      ...existing,
      name: name.trim() || existing.name,
      lastActiveAt: nowIso,
    };
    db.users[existingIndex] = updated;
    writeDb(db);
    return updated;
  }

  const newUser: RegisteredUser = {
    id: `usr_${crypto.randomBytes(5).toString('hex')}`,
    name: name.trim(),
    contact: contact.trim(),
    registeredAt: nowIso,
    currentLevelId: 1,
    currentDayNumber: currentProgress?.currentDayNumber || 1,
    totalMinutesPracticed: currentProgress?.totalMinutesPracticed || 0,
    streak: currentProgress?.streak || 1,
    hasFullAccess: false,
    unlockedLevels: [1],
    redeemedCodes: [],
    lastActiveAt: nowIso,
  };

  db.users.unshift(newUser);
  writeDb(db);
  return newUser;
}

export function getUserById(userId: string): RegisteredUser | null {
  const db = readDb();
  return db.users.find((u) => u.id === userId) || null;
}

export function updateUserProgress(
  userId: string,
  updates: {
    currentLevelId?: number;
    currentDayNumber?: number;
    totalMinutesPracticed?: number;
    streak?: number;
  }
): RegisteredUser | null {
  const db = readDb();
  const idx = db.users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;

  const user = db.users[idx];
  const updated: RegisteredUser = {
    ...user,
    currentLevelId: updates.currentLevelId ?? user.currentLevelId,
    currentDayNumber: updates.currentDayNumber ?? user.currentDayNumber,
    totalMinutesPracticed: Math.max(
      user.totalMinutesPracticed,
      updates.totalMinutesPracticed ?? user.totalMinutesPracticed
    ),
    streak: updates.streak ?? user.streak,
    lastActiveAt: new Date().toISOString(),
  };

  db.users[idx] = updated;
  writeDb(db);
  return updated;
}

export function toggleUserFullAccess(userId: string): RegisteredUser | null {
  const db = readDb();
  const idx = db.users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;

  const user = db.users[idx];
  const nextFullAccess = !user.hasFullAccess;

  const updated: RegisteredUser = {
    ...user,
    hasFullAccess: nextFullAccess,
    unlockedLevels: nextFullAccess ? [...ALL_LEVELS] : [1],
    currentLevelId: nextFullAccess ? user.currentLevelId : 1,
    lastActiveAt: new Date().toISOString(),
  };

  db.users[idx] = updated;
  writeDb(db);
  return updated;
}

export function deleteUserById(userId: string): boolean {
  const db = readDb();
  const initialLen = db.users.length;
  db.users = db.users.filter((u) => u.id !== userId);
  if (db.users.length === initialLen) return false;
  writeDb(db);
  return true;
}

export function createVoucher(params: {
  code: string;
  unlockType: 'full' | 'level';
  targetLevel?: number;
  paymentMethod: PaymentMethod;
  paymentNote: string;
  maxUses: number;
}): { voucher?: UnlockVoucher; error?: string } {
  const db = readDb();
  const cleanCode = params.code.trim().toUpperCase().replace(/\s+/g, '-');
  if (!cleanCode || cleanCode.length < 4) {
    return { error: 'Voucher code must be at least 4 characters long.' };
  }

  if (db.vouchers.some((v) => v.code.toUpperCase() === cleanCode)) {
    return { error: `Voucher code "${cleanCode}" already exists.` };
  }

  const newVoucher: UnlockVoucher = {
    id: `vch_${crypto.randomBytes(4).toString('hex')}`,
    code: cleanCode,
    unlockType: params.unlockType,
    targetLevel:
      params.unlockType === 'level'
        ? Math.min(12, Math.max(2, Number(params.targetLevel) || 2))
        : undefined,
    paymentMethod: params.paymentMethod || 'Easypaisa',
    paymentNote: params.paymentNote.trim() || 'Manual Admin Voucher',
    maxUses: Math.max(1, Number(params.maxUses) || 1),
    usedCount: 0,
    redeemedBy: [],
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  db.vouchers.unshift(newVoucher);
  writeDb(db);
  return { voucher: newVoucher };
}

export function toggleVoucherActive(voucherId: string): UnlockVoucher | null {
  const db = readDb();
  const idx = db.vouchers.findIndex((v) => v.id === voucherId);
  if (idx === -1) return null;

  db.vouchers[idx] = {
    ...db.vouchers[idx],
    isActive: !db.vouchers[idx].isActive,
  };
  writeDb(db);
  return db.vouchers[idx];
}

export function deleteVoucherById(voucherId: string): boolean {
  const db = readDb();
  const initialLen = db.vouchers.length;
  db.vouchers = db.vouchers.filter((v) => v.id !== voucherId);
  if (db.vouchers.length === initialLen) return false;
  writeDb(db);
  return true;
}

export function redeemVoucherForUser(
  userId: string,
  rawCode: string
): { success: boolean; user?: RegisteredUser; message: string } {
  const db = readDb();
  const userIdx = db.users.findIndex((u) => u.id === userId);
  if (userIdx === -1) {
    return { success: false, message: 'Please sign in or register first before redeeming a code.' };
  }

  const cleanCode = rawCode.trim().toUpperCase();
  const vchIdx = db.vouchers.findIndex((v) => v.code.toUpperCase() === cleanCode);
  if (vchIdx === -1) {
    return { success: false, message: 'Invalid unlock code. Please check the code and try again.' };
  }

  const voucher = db.vouchers[vchIdx];
  if (!voucher.isActive) {
    return { success: false, message: 'This unlock code has been disabled by the administrator.' };
  }

  if (voucher.usedCount >= voucher.maxUses) {
    return { success: false, message: 'This unlock code has reached its maximum redemption limit.' };
  }

  const user = db.users[userIdx];
  if (user.redeemedCodes.includes(voucher.code)) {
    return { success: false, message: 'You have already redeemed this unlock code on your account.' };
  }

  let updatedLevels = Array.from(new Set([...user.unlockedLevels, 1]));
  let updatedFullAccess = user.hasFullAccess;
  let successMsg = '';

  if (voucher.unlockType === 'full') {
    updatedFullAccess = true;
    updatedLevels = [...ALL_LEVELS];
    successMsg = 'Full Access unlocked! All Levels 1 to 12 are now open for your practice.';
  } else {
    const target = voucher.targetLevel || 2;
    if (!updatedLevels.includes(target)) {
      updatedLevels.push(target);
      updatedLevels.sort((a, b) => a - b);
    }
    successMsg = `Level ${target} unlocked! You can begin your Level ${target} practice immediately.`;
  }

  const updatedUser: RegisteredUser = {
    ...user,
    hasFullAccess: updatedFullAccess,
    unlockedLevels: updatedLevels,
    redeemedCodes: [...user.redeemedCodes, voucher.code],
    lastActiveAt: new Date().toISOString(),
  };

  db.users[userIdx] = updatedUser;
  db.vouchers[vchIdx] = {
    ...voucher,
    usedCount: voucher.usedCount + 1,
    redeemedBy: [...voucher.redeemedBy, `${user.name} (${user.contact})`],
  };

  writeDb(db);
  return { success: true, user: updatedUser, message: successMsg };
}

export function getAdminDashboardData(): {
  users: RegisteredUser[];
  vouchers: UnlockVoucher[];
  stats: AdminDashboardStats;
} {
  const db = readDb();
  const totalUsers = db.users.length;
  const fullAccessUsers = db.users.filter((u) => u.hasFullAccess).length;
  const freeTierUsers = totalUsers - fullAccessUsers;
  const totalPracticeMinutes = db.users.reduce(
    (sum, u) => sum + (u.totalMinutesPracticed || 0),
    0
  );
  const activeVouchers = db.vouchers.filter(
    (v) => v.isActive && v.usedCount < v.maxUses
  ).length;
  const totalVoucherRedemptions = db.vouchers.reduce(
    (sum, v) => sum + (v.usedCount || 0),
    0
  );

  return {
    users: db.users,
    vouchers: db.vouchers,
    stats: {
      totalUsers,
      fullAccessUsers,
      freeTierUsers,
      totalPracticeMinutes,
      activeVouchers,
      totalVoucherRedemptions,
    },
  };
}
