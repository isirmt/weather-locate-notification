'use client'

import { useSyncLocalStorage } from "@/lib/PointReduxManager";

export default function PointsSync() {
  useSyncLocalStorage();
  return null;
}