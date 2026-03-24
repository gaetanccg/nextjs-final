import { getAllTags } from '@/prismicio';
import Tag from './Tag';

export default async function TagCloud() {
  const tags = await getAllTags();

  if (tags.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-medium leading-none text-dark mb-6">Explorer par tag</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </section>
  );
}
