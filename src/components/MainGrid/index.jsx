import styles from "./styles.module.scss";

const GRID_SIZE = 25;

function MainGrid({ tilesState, setTilesState }) {
  const tilesArray = new Array(GRID_SIZE).fill(null);

  const isTileSelected = (tileNum) => {
    return tilesState[tileNum]?.selected;
  };

  const handleClickTile = (tileNum) => {
    const prevTileState = tilesState[tileNum] || {};
    setTilesState({
      ...tilesState,
      [tileNum]: { ...prevTileState, selected: !prevTileState.selected },
    });
  };

  const renderTiles = tilesArray.map((_, index) => (
    <div
      onClick={() => handleClickTile(index)}
      data-selected={isTileSelected(index)}
      className={styles.tile}
      key={index}
    ></div>
  ));

  return <div className={styles.main_grid}>{renderTiles}</div>;
}

export default MainGrid;
