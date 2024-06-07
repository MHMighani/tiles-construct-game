import ResetIcon from "assets/icons/refresh.svg";
import EraserIcon from "assets/icons/eraser.svg";
import styles from "./styles.module.scss";

// TODO: make dynamic
const TILES_NUM = 18;

function TilePicker({ handlePickTileBg, resetGrid, eraseSelected }) {
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
      <div className={styles.btn_wrapper}>
        <button
          title="reset"
          className={styles.btn}
          onClick={handleClickResetBtn}
        >
          <img className={styles.btn__icon} src={ResetIcon} alt="" />
        </button>
        <button
          onClick={eraseSelected}
          title="erase selected"
          className={styles.btn}
        >
          <img className={styles.btn__icon} src={EraserIcon} alt="" />
        </button>
      </div>

      <div className={styles.tile_picker_container}>{renderTiles}</div>
    </div>
  );
}

export default TilePicker;
