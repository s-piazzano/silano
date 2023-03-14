export default function Product() {
  return <div>product</div>;
}

export async function getStaticPaths() {
  const pages = await getAllPages();

  // Automatic generation of paths
  const slugs = pages.map(
    (x) =>
      new Object({
        params: x.attributes,
      })
  );
  return {
    paths: slugs,
    fallback: false, // can also be true or 'blocking'
  };
}