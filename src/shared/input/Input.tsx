'use client'

import React, { useState } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

type InputProps = {
  placeholder?: string
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  inputClassName?: string
}

const Input: React.FC<InputProps> = ({
  placeholder = 'Input text',
  value,
  onChange,
  label,
  className,
  inputClassName,
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className={styles.inputContainer}>
      {label && <label className={classNames(styles.label, className)}>{label}</label>}
      <input
        className={classNames(styles.input, focused ? styles.focused : '', inputClassName)}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default Input
