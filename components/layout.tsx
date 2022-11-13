import Header from "./header"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-14 my-8">{children}</main>
    </>
  )
}
