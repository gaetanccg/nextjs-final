import type {MDXComponents} from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({children}) => <h1 className="text-4xl font-medium text-dark mb-6">{children}</h1>,
        h2: ({children}) => <h2 className="text-2xl font-bold text-dark mt-8 mb-4">{children}</h2>,
        h3: ({children}) => <h3 className="text-xl font-bold text-dark mt-6 mb-3">{children}</h3>,
        p: ({children}) => <p className="text-sm font-medium leading-relaxed text-dark/80 mb-4">{children}</p>,
        ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-sm text-dark/80 space-y-1">{children}</ul>,
        a: ({children, href}) => <a href={href} className="text-primary hover:underline">{children}</a>,
        ...components,
    };
}
