import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import styles from './Selector.module.scss'

interface SelectorProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
  variant?: 'single' | 'multi'
  label?: string
}

const Selector: React.FC<SelectorProps> = ({
  options,
  selected,
  onChange,
  variant = 'single',
  label,
}) => {
  const [open, setOpen] = useState(false)

  const handleOptionClick = (option: string) => {
    if (variant === 'single') {
      onChange(option)
      setOpen(false)
    } else {
      const currentSelected = selected ? selected.split(', ') : []
      const newSelected = currentSelected.includes(option)
        ? currentSelected.filter((val) => val !== option)
        : [...currentSelected, option]
      onChange(newSelected.join(', '))
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`.${styles.selector}`)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.selector}>
      {label && <label className={classNames(styles.label)}>{label}</label>}
      <div
        className={classNames(styles.selected, open ? styles.focused : '')}
        onClick={() => setOpen(!open)}
      >
        {selected || (variant === 'multi' ? 'Select options' : 'Select an option')}
        <Image
          src={'/svg/Inputs Icon.svg'}
          alt={'ArrowDown'}
          width={18}
          height={18}
          className={classNames(styles.arrow, open ? styles.arrowUp : styles.arrowDown)}
        />
      </div>
      {open && (
        <ul className={styles.dropdown}>
          {options.map((option) => {
            const isChecked = selected.split(', ').includes(option)
            return (
              <li
                key={option}
                className={styles.option}
                onClick={(e) => {
                  e.stopPropagation()
                  handleOptionClick(option)
                }}
              >
                {variant === 'multi' && (
                  <div className={styles.checkboxWrapper}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleOptionClick(option)}
                    />
                    {isChecked && (
                      <Image
                        src="/svg/Save.svg"
                        alt="Checkmark"
                        width={12}
                        height={12}
                        className={styles.checkmark}
                      />
                    )}
                  </div>
                )}
                {option}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Selector
