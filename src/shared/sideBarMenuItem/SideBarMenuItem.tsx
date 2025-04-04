import React from 'react'
import styles from './SideBarMenuItem.module.scss'
import Button from '../button/Button'
import classNames from 'classnames'

interface SidebarMenuItemProps {
  label: string
  icon: string
  isActive: boolean
  onClick: () => void
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ label, icon, isActive, onClick }) => {
  return (
    <Button
      src={icon}
      variant={isActive ? 'filled' : 'outline'}
      onClick={onClick}
      className={styles.sidebarButton}
      iconClassName={classNames(styles.icon, isActive ? '' : styles.inactiveIcon)}
    >
      <span className={styles.buttonName}>{label}</span>
    </Button>
  )
}

export default SidebarMenuItem
