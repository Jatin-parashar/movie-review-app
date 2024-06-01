import logo from "../assets/logo.png";
import styles from "./NotSearched.module.css"
const MoviesNotSearched = () => {
  return (
    <div className={styles.blank}>
      <img src={logo} />
      <div>No movie searched yet!</div>
    </div>
  )
}

export default MoviesNotSearched
