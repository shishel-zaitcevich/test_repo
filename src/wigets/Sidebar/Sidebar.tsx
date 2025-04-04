'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import SidebarMenuItem from '@/shared/sideBarMenuItem/SideBarMenuItem'
import styles from './Sidebar.module.scss'

const Sidebar: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Organizations')

  const menuItems = [
    { label: 'Organizations', icon: '/svg/Company.svg' },
    { label: 'Contractors', icon: '/svg/Contractor.svg' },
    { label: 'Clients', icon: '/svg/Account.svg' },
  ]

  const activeItem = menuItems.find((item) => item.label === activeMenuItem)
  const activeIcon = activeItem ? activeItem.icon : ''

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.sidebarIcons}>
          <div className={styles.icons}>
            <Image src={'/svg/logo.svg'} alt={'Edit'} width={36} height={36} />

            {activeIcon && (
              <Image
                src={activeIcon}
                alt={'Active icon'}
                width={20}
                height={20}
                className={styles.activeIcon}
              />
            )}

            <Image src={'/svg/Search.svg'} alt={'Edit'} width={20} height={20} />
          </div>
          <div className={styles.bottomIcons}>
            <div className={styles.divider}></div>
            <Image
              src={'svg/Settings.svg'}
              alt={'Active icon'}
              width={20}
              height={20}
              className={styles.activeIcon}
            />
            <Image
              src={'svg/SignOut.svg'}
              alt={'Active icon'}
              width={20}
              height={20}
              className={styles.activeIcon}
            />
          </div>
        </div>
        <div className={styles.title}>
          <h1>Oak Tree Cemetery</h1>
          <p>Process Manager</p>
          <span className={styles.divider}></span>

          <nav className={styles.menu}>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                isActive={activeMenuItem === item.label}
                onClick={() => setActiveMenuItem(item.label)}
              />
            ))}
          </nav>
          <div className={styles.footer}>
            <p className={styles.footer__text}>All Funeral Services © 2015-2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
