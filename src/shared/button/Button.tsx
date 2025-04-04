import React from 'react'
import Image from 'next/image'
import styles from './Button.module.scss'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import classNames from 'classnames'

interface ButtonProps {
  variant: 'filled' | 'outline' | 'flattened' | 'icon'
  children: React.ReactNode
  onClick?: () => void
  src?: string | StaticImport | undefined
  className?: string
  iconClassName?: string
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  src,
  className,
  iconClassName,
}) => {
  return (
    <button className={classNames(styles.button, styles[variant], className)} onClick={onClick}>
      {src && <Image src={src} alt={'Edit'} width={16} height={16} className={iconClassName} />}
      {children}
    </button>
  )
}

export default Button
