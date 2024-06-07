import ResetIcon from "assets/icons/refresh.svg";
import styles from "./styles.module.scss";

// TODO: make dynamic
const TILES_NUM = 18;

function TilePicker({ handlePickTileBg, resetGrid }) {
  // TODO: reusable grid template
  const tilesArray = new Array(TILES_NUM).fill(null);

  const handleClickResetBtn = () => resetGrid();

  // dynamically render all tiles from assets
  const renderTiles = tilesArray.map((_, index) => (
    <div
      key={index}
      onClick={() => handlePickTileBg(index)}
      className={styles.tile}
    >
      <img alt={index} src={require(`assets/tiles/${index + 1}.png`)} />
    </div>
  ));

  return (
    <div className={styles.controller_wrapper}>
      <button
        title="reset"
        className={styles.reset_btn}
        onClick={handleClickResetBtn}
      >
        <img className={styles.reset_btn__icon} src={ResetIcon} alt="" />
      </button>
      <div className={styles.tile_picker_container}>{renderTiles}</div>
    </div>
  );
}

export default TilePicker;
