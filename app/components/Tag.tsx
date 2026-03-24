import Link from 'next/link';

interface TagProps {
    label: string;
    active?: boolean;
    href?: string;
}

export default function Tag({label, active = false, href}: TagProps) {
    const target = href ?? `/tag/${encodeURIComponent(label)}`;

    return (
        <Link
            href={target}
            className={`inline-block rounded-md border px-3 py-1.5 text-xs font-semibold leading-none transition-colors ${
                active
                    ? 'border-primary bg-primary text-white'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
        >
            {label}
        </Link>
    );
}
