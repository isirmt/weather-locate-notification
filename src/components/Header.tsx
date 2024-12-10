'use client';
import { getCurrentWindow } from '@tauri-apps/api/window';

export default function Header() {
  const minimize = async () => {
    await getCurrentWindow().minimize();
  };

  const maximize = async () => {
    await getCurrentWindow().toggleMaximize();
  };

  const close = async () => {
    await getCurrentWindow().close();
  };

  return (
    <header
      className='z-50 flex h-10 w-full flex-shrink-0 items-stretch justify-between bg-gray-50 bg-opacity-80 backdrop-blur'
      data-tauri-drag-region
    >
      <div></div>
      <ul className='flex flex-row-reverse items-stretch justify-end'>
        <li className='flex'>
          <button
            onClick={close}
            title='Close'
            className='group flex items-center justify-center px-3 transition-colors hover:bg-red-500'
          >
            <span className='i-tabler-circle-x bg-black group-hover:bg-white' />
          </button>
        </li>
        <li className='flex'>
          <button
            onClick={maximize}
            title='Maximize'
            className='group flex items-center justify-center px-3 transition-colors hover:bg-gray-100'
          >
            <span className='i-tabler-maximize bg-black' />
          </button>
        </li>
        <li className='flex'>
          <button
            onClick={minimize}
            title='Minimize'
            className='group flex items-center justify-center px-3 transition-colors hover:bg-gray-100'
          >
            <span className='i-tabler-minus bg-black' />
          </button>
        </li>
      </ul>
    </header>
  );
}
