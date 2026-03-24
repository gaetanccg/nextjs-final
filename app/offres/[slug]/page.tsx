export default async function SingleJobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="px-6 py-12">
      <h1 className="text-5xl font-medium leading-none">Offre : {slug}</h1>
    </div>
  );
}
