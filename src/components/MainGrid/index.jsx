import styles from "./styles.module.scss";

const GRID_SIZE = 25;
const DEFAULT_BG_INDEX = 17;

function MainGrid({ tilesState, setTilesState }) {
  const tilesArray = new Array(GRID_SIZE).fill(null);

  const isTileSelected = (tileNum) => {
    return tilesState[tileNum]?.selected;
  };

  const handleClickTile = (tileNum) => {
    const prevTileState = tilesState[tileNum] || {};
    const newTilesState = [...tilesState];

    newTilesState[tileNum] = {
      ...prevTileState,
      selected: !prevTileState.selected,
    };

    setTilesState(newTilesState);
  };

  const renderTileImage = (tile) => {
    const bgIndex = tile?.bg || DEFAULT_BG_INDEX;

    return <img alt="tile" src={require(`assets/tiles/${bgIndex + 1}.png`)} />;
  };

  const renderTiles = tilesArray.map((_, index) => (
    <div
      onClick={() => handleClickTile(index)}
      data-selected={isTileSelected(index)}
      className={styles.tile}
      key={index}
    >
      {renderTileImage(tilesState[index])}
    </div>
  ));

  return <div className={styles.main_grid}>{renderTiles}</div>;
}

export default MainGrid;
