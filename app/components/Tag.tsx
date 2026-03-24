import Link from 'next/link';

interface TagProps {
  label: string;
  active?: boolean;
  href?: string;
}

export default function Tag({ label, active = false, href }: TagProps) {
  const target = href ?? `/tag/${encodeURIComponent(label)}`;

  return (
    <Link
      href={target}
      className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold leading-none transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'bg-medium text-dark hover:bg-primary hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
