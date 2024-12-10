'use client';

import { useSyncLocalStorage } from '@/lib/store';

export default function StoreSync() {
  useSyncLocalStorage();
  return null;
}
