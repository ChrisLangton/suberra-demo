import Image from "next/image"

interface Props {
  src: string;
}

export default function CoverImage({src}: Props) {
  const image = (
    <Image
      width={1800}
      height={900}
      alt={`Cover Image for ACME`}
      src={src}
      className={
        "shadow-small hover:shadow-medium transition-shadow duration-200"
      }
    />
  )
  return (
      <div className="sm:mx-0 mb-10">{image}</div>
  )
}
