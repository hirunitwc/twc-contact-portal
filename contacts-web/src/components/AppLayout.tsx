import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* SVG clipPath definition — invisible, just defines the shape */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="teal-shape" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 L 0.78 0 C 0.88 0 0.92 0.04 0.96 0.14 L 1 0.24 L 1 1 L 0.22 1 C 0.12 1 0.08 0.96 0.04 0.86 L 0 0.76 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Pattern underneath — shows through the cut corners */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/auth-pattern.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
      </div>

      {/* Teal shape with curved cut corners */}
      <div
        className="absolute inset-0 bg-twc-teal"
        style={{ clipPath: 'url(#teal-shape)' }}
      />

      {/* Content column — same left/right gutter for every section */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-10 text-white lg:px-20">
        {/* Logo */}
        <div className="flex flex-col items-start pt-8">
          <img src="/twc-logo.png" alt="TWC" className="w-16" />
          <div className="mt-1 text-lg font-bold leading-tight">contacts</div>
          <div className="text-lg font-semibold leading-tight">portal</div>
        </div>

        {/* Page content */}
        <main className="flex flex-1 flex-col justify-center py-4">{children}</main>

        {/* Logout */}
        <div className="flex justify-end pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-white/90 transition hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="underline underline-offset-2">logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}