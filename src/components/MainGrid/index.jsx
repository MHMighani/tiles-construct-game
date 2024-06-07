import styles from "./styles.module.scss";

const GRID_SIZE = 25;
const DEFAULT_BG_INDEX = 17;

function MainGrid({ tilesState, setTilesState }) {
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

  const handleClickTile = (tileNum) => {
    const prevTileState = tilesState[tileNum] || {};

    updateTile(tileNum, { selected: !prevTileState.selected });
  };

  const handleClickContextMenu = (e, tileNum) => {
    e.preventDefault();

    updateTile(tileNum, { bg: false });
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
      onContextMenu={(e) => handleClickContextMenu(e, index)}
    >
      {renderTileImage(tilesState[index])}
    </div>
  ));

  return <div className={styles.main_grid}>{renderTiles}</div>;
}

export default MainGrid;
