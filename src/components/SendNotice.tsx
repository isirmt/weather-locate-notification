'use client';

import { invoke } from "@tauri-apps/api";
import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/api/notification";

export default function SendNoticeTestButton({ message = "Test" }: { message?: string }) {
  const handleClick = async () => {
    await invoke<void>("send_notice", { message }).catch(console.error);

    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
      sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
    }
  }

  return <button onClick={handleClick} className="block p-2">
    Send Notice
  </button>
}