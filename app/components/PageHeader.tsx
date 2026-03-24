import Image from 'next/image';

interface PageHeaderProps {
    title: string;
    count?: number;
    countLabel?: string;
}

export default function PageHeader({title, count, countLabel = 'offres'}: PageHeaderProps) {
    return (
        <div className="mb-8 flex items-end justify-between">
            <div>
                <h1 className="text-5xl font-medium leading-none text-dark pb-4">{title}</h1>
                <div className="h-1 w-48 bg-primary" />
                <div className="h-px bg-dark/10" />
            </div>
            {count !== undefined && (
                <div className="flex items-center gap-2 text-primary">
                    <Image src="/icons/briefcase.svg" alt="" width={20} height={20} />
                    <span className="text-sm font-semibold">
            {count} {countLabel}
          </span>
                </div>
            )}
        </div>
    );
}
