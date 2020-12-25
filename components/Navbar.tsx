import { Alignment, Navbar } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import styles from "../styles/Home.module.css";
import { FunctionsSelect } from "./FunctionsSelect";

interface INavBarProps {}

const NavBar: FunctionComponent<INavBarProps> = (props) => {
  const router = useRouter();
  const routerPathnameSplit = router.pathname.split("/");
  const myFunctionName = routerPathnameSplit[routerPathnameSplit.length - 1];

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <div
            style={{
              display: "inline-flex",
              gap: "10px",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <strong>Workgate</strong>
            <img
              src="/favicon.svg"
              alt="Workgate Logo"
              className={styles.logo}
            ></img>
          </div>
        </Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group>
        <span>{myFunctionName || "Виберіть функцію із списку"}</span>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <FunctionsSelect />
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
