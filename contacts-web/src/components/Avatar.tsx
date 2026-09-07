const COLORS = ['bg-orange-400', 'bg-teal-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'];

function getColor(name: string) {
  const index = name.charCodeAt(0) % COLORS.length;
  return COLORS[index];
}

export default function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white ${getColor(name)}`}
    >
      {initial}
    </div>
  );
}