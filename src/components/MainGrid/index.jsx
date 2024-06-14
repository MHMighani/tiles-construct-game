import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const GRID_SIZE = 81;
const ROW_NUM = 9;
const COL_NUM = 9;

const DEFAULT_BG_INDEX = 18;

function MainGrid({ tilesState, setTilesState, origin }) {
  const [dragging, setDragging] = useState(false);

  const isTileSelected = (coordination) => {
    return tilesState[coordination]?.selected;
  };

  const updateTile = (coordination, newState) => {
    const prevTileState = tilesState[coordination] || {};
    const newTilesState = { ...tilesState };

    newTilesState[coordination] = {
      ...prevTileState,
      ...newState,
    };

    setTilesState(newTilesState);
  };

  const markTileAsSelected = (coordination) => {
    updateTile(coordination, { selected: true });
  };

  const handleClickTile = (coordination) => {
    const prevTileState = tilesState[coordination] || {};

    updateTile(coordination, { selected: !prevTileState.selected });
  };

  const handleClickContextMenu = (e, coordination) => {
    e.preventDefault();

    updateTile(coordination, { bg: false });
  };

  const handleMouseDownOnGrid = () => {
    setDragging(true);
  };

  const handleMouseMove = (coordination) => {
    if (dragging) markTileAsSelected(coordination);
  };

  const renderTileImage = (tile) => {
    const bgIndex = tile?.bg;

    if (!bgIndex) return <></>;

    return (
      <img
        className={styles.tile__image}
        draggable={false}
        alt="tile"
        src={require(`assets/tiles/${bgIndex}.png`)}
      />
    );
  };

  const renderTiles = () => {
    const initArr = [];
    const { x: xOrigin, y: yOrigin } = origin;

    const minCol = xOrigin;
    const maxCol = xOrigin + COL_NUM;
    const minRow = yOrigin;
    const maxRow = yOrigin + ROW_NUM;

    for (let row = minRow; row < maxRow; row++) {
      for (let col = minCol; col < maxCol; col++) {
        const coordination = `${row}:${col}`;

        initArr.push(
          <div
            onMouseUp={() => setDragging(false)}
            onMouseMove={() => handleMouseMove(coordination)}
            onDoubleClick={() => handleClickTile(coordination)}
            data-selected={isTileSelected(coordination)}
            className={styles.tile}
            key={coordination}
            onContextMenu={(e) => handleClickContextMenu(e, coordination)}
          >
            {renderTileImage(tilesState[coordination])}
          </div>
        );
      }
    }

    return initArr;
  };

  return (
    <div onMouseDown={handleMouseDownOnGrid} className={styles.main_grid}>
      {renderTiles()}
    </div>
  );
}

export default MainGrid;
