import React from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
