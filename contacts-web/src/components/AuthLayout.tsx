import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-twc-teal p-[2px]">
      <div className="relative min-h-[calc(100vh-4px)] overflow-hidden bg-white">

    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/auth-pattern.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-white/90" />
    </div>

       {/* Logo + Contacts Portal */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pl-[40%]">
          <div className="flex flex-col items-start">
            <img
              src="/twc-logo.png"
              alt="TWC"
              className="w-36"
            />

            <div className="mt-1 text-5xl leading-none text-twc-teal">
              <div className="font-bold">contacts</div>
              <div className="font-semibold">portal</div>
            </div>
          </div>
        </div>

        {/* Teal curved panel */}
        <div className="absolute inset-y-0 left-0 z-10 w-[58%]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 580 800"
            preserveAspectRatio="none"
          >
            <path
              d="
                M 0 0
                L 500 0
                C 570 100, 580 220, 580 400
                C 580 580, 570 700, 500 800
                L 0 800
                Z
              "
              fill="#0d3b3e"
            />
          </svg>

          {/* Login form */}
          <div className="relative z-20 flex h-full items-center px-16 md:px-24">
          <div className="w-full max-w-[360px]">
            <div className="relative z-10">{children}</div>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}