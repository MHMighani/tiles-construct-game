import styles from "./styles.module.scss";

const GRID_SIZE = 25;

function MainGrid() {
  const tilesArray = new Array(GRID_SIZE).fill(null);

  const renderTiles = tilesArray.map((_, index) => (
    <div className={styles.tile} key={index}></div>
  ));

  return <div className={styles.main_grid}>{renderTiles}</div>;
}

export default MainGrid;
