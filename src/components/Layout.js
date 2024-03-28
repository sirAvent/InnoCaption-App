import Nav from "./Nav";
import Store from "./Store/Store";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <Store />
    </>
  )
}