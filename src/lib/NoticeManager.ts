import { isPermissionGranted, Options, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

export async function SendNotice(options: Options | string) {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
  }
  if (permissionGranted) {
    sendNotification(options);
  }
}
