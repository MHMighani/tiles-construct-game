import { useState } from "react";
import styles from "./styles.module.scss";

const GRID_SIZE = 81;
const DEFAULT_BG_INDEX = 18;

function MainGrid({ tilesState, setTilesState }) {
  const [dragging, setDragging] = useState(false);
  const tilesArray = new Array(GRID_SIZE).fill(null);

  const isTileSelected = (tileNum) => {
    return tilesState[tileNum]?.selected;
  };

  const updateTile = (tileNum, newState) => {
    const prevTileState = tilesState[tileNum] || {};
    const newTilesState = [...tilesState];

    newTilesState[tileNum] = {
      ...prevTileState,
      ...newState,
    };

    setTilesState(newTilesState);
  };

  const markTileAsSelected = (tileNum) => {
    updateTile(tileNum, { selected: true });
  };

  const handleClickTile = (tileNum) => {
    const prevTileState = tilesState[tileNum] || {};

    updateTile(tileNum, { selected: !prevTileState.selected });
  };

  const handleClickContextMenu = (e, tileNum) => {
    e.preventDefault();

    updateTile(tileNum, { bg: false });
  };

  const handleMouseDownOnGrid = () => {
    setDragging(true);
  };

  const handleMouseMove = (tileNum) => {
    if (dragging) markTileAsSelected(tileNum);
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

  const renderTiles = tilesArray.map((_, index) => (
    <div
      onMouseUp={() => setDragging(false)}
      onMouseMove={() => handleMouseMove(index)}
      onDoubleClick={() => handleClickTile(index)}
      data-selected={isTileSelected(index)}
      className={styles.tile}
      key={index}
      onContextMenu={(e) => handleClickContextMenu(e, index)}
    >
      {renderTileImage(tilesState[index])}
    </div>
  ));

  return (
    <div onMouseDown={handleMouseDownOnGrid} className={styles.main_grid}>
      {renderTiles}
    </div>
  );
}

export default MainGrid;
