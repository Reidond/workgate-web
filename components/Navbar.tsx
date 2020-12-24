import { Alignment, Navbar } from "@blueprintjs/core";
import { FunctionComponent } from "react";
import styles from "../styles/Home.module.css";

interface INavBarProps {}

const NavBar: FunctionComponent<INavBarProps> = (props) => {
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
    </Navbar>
  );
};

export default NavBar;
