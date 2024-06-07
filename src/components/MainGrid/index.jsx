import styles from "./styles.module.scss";

function MainGrid() {
  const gridSize = 16;
  const tilesArray = new Array(gridSize).fill(null);

  const renderTiles = tilesArray.map((_, index) => (
    <div className={styles.tile} key={index}></div>
  ));

  return <div className={styles.main_grid}>{renderTiles}</div>;
}

export default MainGrid;
