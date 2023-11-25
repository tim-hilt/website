export default function Article({ params }: { params: { article: string } }) {
  return <div>{params.article}</div>;
}
