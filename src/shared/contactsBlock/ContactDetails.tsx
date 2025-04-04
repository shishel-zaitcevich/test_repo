import React from 'react'
import { observer } from 'mobx-react-lite'
import styles from './ContactDetails.module.scss'
import Button from '../button/Button'
import Input from '../input/Input'
import { contactStore } from '@/app/store/contactsStore'

const ContactDetails: React.FC = observer(() => {
  if (contactStore.loading) return <p>Loading...</p>
  if (!contactStore.contact) return <p>Error loading contact data</p>

  const handleSave = () => {
    contactStore.updateContact('16')
  }

  return (
    <div className={styles.container}>
      {!contactStore.isEditing ? (
        <div className={styles.viewMode}>
          <div className={styles.header}>
            <h3>Contacts</h3>
            <Button
              variant="flattened"
              onClick={() => contactStore.setEditing(true)}
              src={'/svg/Edit.svg'}
            >
              {'Edit'}
            </Button>
          </div>
          <div className={styles.item}>
            <strong>Responsible person:</strong>
            <span>{contactStore.responsiblePerson}</span>
          </div>
          <div className={styles.item}>
            <strong>Phone number:</strong> <span>{contactStore.phone}</span>
          </div>
          <div className={styles.item}>
            <strong>E-mail:</strong> <span>{contactStore.email}</span>
          </div>
        </div>
      ) : (
        <div className={styles.editMode}>
          <div className={styles.header}>
            <h3>Contacts</h3>
            <div className={styles.buttons}>
              <Button variant="flattened" onClick={handleSave} src={'/svg/Save.svg'}>
                {'Save changes'}
              </Button>
              <Button
                src={'/svg/X.svg'}
                variant="flattened"
                onClick={() => contactStore.setEditing(false)}
              >
                {'Cancel'}
              </Button>
            </div>
          </div>
          <Input
            value={contactStore.responsiblePerson}
            onChange={(e) => {
              const [firstname, lastname] = e.target.value.split(' ')
              contactStore.setFirstname(firstname || '')
              contactStore.setLastname(lastname || '')
            }}
            label={contactStore.responsiblePerson}
            placeholder="Responsible person"
            className={styles.label}
            inputClassName={styles.input__width}
          />
          <Input
            value={contactStore.phone}
            onChange={(e) => contactStore.setPhone(e.target.value)}
            placeholder={contactStore.phone}
            label="Phone number:"
            className={styles.label}
            inputClassName={styles.input__width}
          />
          <Input
            value={contactStore.email}
            onChange={(e) => contactStore.setEmail(e.target.value)}
            placeholder={contactStore.email}
            label="E-mail"
            className={styles.label}
            inputClassName={styles.input__width}
          />
        </div>
      )}
    </div>
  )
})

export default ContactDetails
