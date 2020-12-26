import { Alignment, Navbar } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { functions } from "../helpers/functionsConfig";
import styles from "../styles/Home.module.css";
import { FunctionsSelect } from "./FunctionsSelect";
import Link from "next/link";

interface INavBarProps {}

const NavBar: FunctionComponent<INavBarProps> = (props) => {
  const router = useRouter();
  const { name } = router.query;
  const myFunctionFromPath = functions.find((v) => v.name === name);

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <Link href="/">
            <a
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
            </a>
          </Link>
        </Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group>
        <span>
          {myFunctionFromPath?.prettyName || "Виберіть функцію із списку"}
        </span>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <FunctionsSelect />
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
