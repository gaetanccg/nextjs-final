export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  return (
    <div className="px-6 py-12">
      <h1 className="text-5xl font-medium leading-none">Tag : {decodeURIComponent(tag)}</h1>
    </div>
  );
}
