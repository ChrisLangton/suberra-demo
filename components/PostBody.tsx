export default function PostBody({ content }: { content: string }) {
  return (
    <div className={`py-4 text-base`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
