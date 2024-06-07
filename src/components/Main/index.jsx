import { useState } from "react";
import MainGrid from "components/MainGrid";
import Controlbar from "components/Controlbar";
import styles from "./styles.module.scss";

function Main() {
  const [tilesState, setTilesState] = useState([]);

  const handlePickTileBg = (bgNumId) => {
    const newTilesState = tilesState.map((tile) => {
      if (tile?.selected) return { ...tile, bg: bgNumId, selected: false };

      return tile;
    });

    setTilesState(newTilesState);
  };

  const resetGrid = () => setTilesState([]);

  return (
    <div className={styles.main}>
      <MainGrid {...{ tilesState, setTilesState }} />
      <Controlbar {...{ handlePickTileBg, resetGrid }} />
    </div>
  );
}

export default Main;
