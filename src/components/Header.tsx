'use client';
import { getCurrentWindow } from '@tauri-apps/api/window';

export default function Header() {
  const minimize = async () => {
    await getCurrentWindow().minimize();
  }

  const maximize = async () => {
    await getCurrentWindow().toggleMaximize();
  }

  const close = async () => {
    await getCurrentWindow().close();
  }

  return <header className="flex-shrink-0 h-10 flex justify-between items-stretch bg-gray-50 bg-opacity-80 backdrop-blur z-50 w-full" data-tauri-drag-region>
    <div></div>
    <ul className="flex items-stretch justify-end flex-row-reverse">
      <li className="flex">
        <button onClick={close} title="Close" className="flex items-center justify-center group px-3 hover:bg-red-500 transition-colors">
          <span className="i-tabler-circle-x bg-black group-hover:bg-white" />
        </button>
      </li>
      <li className="flex">
        <button onClick={maximize} title="Maximize" className="flex items-center justify-center group px-3 hover:bg-gray-100 transition-colors">
          <span className="i-tabler-maximize bg-black" />
        </button>
      </li>
      <li className="flex">
        <button onClick={minimize} title="Minimize" className="flex items-center justify-center group px-3 hover:bg-gray-100 transition-colors">
          <span className="i-tabler-minus bg-black" />
        </button>
      </li>
    </ul>
  </header>
}