'use client';

import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

export default function SendNoticeTestButton({ message = 'Test' }: { message?: string }) {
  const handleClick = async () => {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
      sendNotification({ title: 'TAURI', body: message });
    }
  };

  return (
    <button onClick={handleClick} className='block p-2'>
      Send Notice
    </button>
  );
}
