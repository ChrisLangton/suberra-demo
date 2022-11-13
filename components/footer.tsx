import packageJSON from "../package.json"

export default function Footer() {
  return (
  <footer className={"styles.footer"}>
      <hr />
      <ul className={"styles.navItems"}>
        <li className={"styles.navItem"}>
          <a href="https://next-auth.js.org">Suberra</a>
        </li>
        {/* <li className={"styles.navItem"}>
          <a href="https://www.npmjs.com/package/next-auth">Suberra</a>
        </li>
        <li className={"styles.navItem"}>
          <a href="https://github.com/nextauthjs/next-auth-example">Suberra</a>
        </li>
        <li className={"styles.navItem"}>
          <Link href="/policy">
            <a>Suberra</a>
          </Link>
        </li>*/}
        <li className={"styles.navItem"}>
          <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>
        </li> 
      </ul>
    </footer>
  )
}
