import React from 'react'
import styles from './DialogContent.module.scss'
import Input from '../input/Input'
import Button from '../button/Button'

interface DialogContentProps {
  variant: 'editName' | 'confirmRemove' | 'confirmImageRemove'
  organizationName?: string
  onConfirm: () => void
  onCancel: () => void
  onNameChange?: (name: string) => void
}

const DialogContent: React.FC<DialogContentProps> = ({
  variant,
  organizationName = '',
  onConfirm,
  onCancel,
  onNameChange,
}) => {
  const [name, setName] = React.useState(organizationName)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (onNameChange) {
      onNameChange(e.target.value)
    }
  }

  return (
    <div className={styles.container}>
      {variant === 'editName' && (
        <>
          <h2>Specify the Organization’s name</h2>
          {/* <input type="text" value={name} onChange={handleNameChange} className={styles.input} /> */}
          <Input
            value={name}
            onChange={handleNameChange}
            placeholder={name}
            inputClassName={styles.modalInput}
          />
          <div className={styles.actions}>
            <Button variant="outline" onClick={onCancel}>
              {'Cancel'}
            </Button>
            <Button variant="filled" onClick={onConfirm}>
              {'Save changes'}
            </Button>
          </div>
        </>
      )}

      {variant === 'confirmRemove' && (
        <>
          <h2>Remove the Organization?</h2>
          <p>Are you sure you want to remove this organization?</p>
          <div className={styles.actions}>
            <Button variant="outline" onClick={onCancel}>
              {'No'}
            </Button>
            <Button variant="filled" onClick={onConfirm}>
              {'Yes, remove'}
            </Button>
          </div>
        </>
      )}

      {variant === 'confirmImageRemove' && (
        <>
          <h2>Remove the Image?</h2>
          <p>Are you sure you want to remove this image?</p>
          <div className={styles.actions}>
            <Button variant="outline" onClick={onCancel}>
              {'No'}
            </Button>
            <Button variant="filled" onClick={onConfirm}>
              {'Yes, remove'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default DialogContent
