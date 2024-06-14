import { useState, useEffect } from "react";
import MainGrid from "components/MainGrid";
import Controlbar from "components/Controlbar";
import styles from "./styles.module.scss";

const INIT_ORIGIN = { x: 0, y: 0 };

function Main() {
  const [tilesState, setTilesState] = useState({});
  const [origin, setOrigin] = useState(INIT_ORIGIN);

  const handlePickTileBg = (bgNumId) => {
    const newObject = {};

    for (let coordinate in tilesState) {
      const tile = tilesState[coordinate];

      if (tile.selected) {
        newObject[coordinate] = {
          ...tilesState[coordinate],
          bg: bgNumId,
          selected: false,
        };
        continue;
      }

      newObject[coordinate] = tilesState[coordinate];
    }

    setTilesState(newObject);
  };

  const resetGrid = () => setTilesState([]);

  const eraseSelected = () => {
    const newState = tilesState.map((tile) =>
      tile && tile.selected ? { ...tile, bg: false, selected: false } : tile
    );

    setTilesState(newState);
  };

  const handleKeyDown = (e) => {
    const keyName = e.key;

    if (keyName === "ArrowRight") {
      setOrigin((prev) => ({ ...prev, x: prev.x + 1 }));
    } else if (keyName === "ArrowLeft") {
      setOrigin((prev) => ({ ...prev, x: prev.x - 1 }));
    } else if (keyName === "ArrowUp") {
      setOrigin((prev) => ({ ...prev, y: prev.y - 1 }));
    } else if (keyName === "ArrowDown") {
      setOrigin((prev) => ({ ...prev, y: prev.y + 1 }));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.main}>
      <MainGrid {...{ tilesState, setTilesState, origin }} />
      <Controlbar {...{ handlePickTileBg, resetGrid, eraseSelected }} />
    </div>
  );
}

export default Main;
