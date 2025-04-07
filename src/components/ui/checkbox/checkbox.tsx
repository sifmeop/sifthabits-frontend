import styles from './checkbox.module.css'

export const Checkbox = () => {
  return (
    <label className={styles.checkbox}>
      <input type='checkbox' name='color' />
      <span className={styles.checkmark} />
    </label>
  )
}
