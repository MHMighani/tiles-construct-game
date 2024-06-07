import { useState } from "react";
import MainGrid from "components/MainGrid";
import Controlbar from "components/Controlbar";
import styles from "./styles.module.scss";

function Main() {
  const [tilesState, setTilesState] = useState({});

  return (
    <div className={styles.main}>
      <MainGrid {...{ tilesState, setTilesState }} />
      <Controlbar />
    </div>
  );
}

export default Main;
