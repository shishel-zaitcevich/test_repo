import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import styles from './CompanyPage.module.scss'
import { companyStore } from '@/app/store/companyStore'
import { contactStore } from '@/app/store/contactsStore'
import CompanyDetails from '@/shared/companyDetails/CompanyDetails'
import ContactDetails from '@/shared/contactsBlock/ContactDetails'
import PhotosSection from '@/shared/photoSection/PhotoSection'
import { apiService } from '@/app/api/api'
import Sidebar from '@/wigets/Sidebar/Sidebar'
import DialogContent from '@/shared/dialogContent/DialogContent'
import Modal from '@/shared/modal/Modal'

const CompanyPage: React.FC = observer(() => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  const [organizationName, setOrganizationName] = useState('Eternal Rest Funeral Home')

  const handleEditConfirm = () => {
    console.log('New organization name:', organizationName)
    setIsEditModalOpen(false)
  }

  const handleRemoveConfirm = () => {
    companyStore.deleteCompany('12')
    setIsRemoveModalOpen(false)
    console.log('Organization removed')
  }

  useEffect(() => {
    const authenticateAndFetch = async () => {
      try {
        await apiService.authenticate('USERNAME')
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Authentication failed:', error)
      }
    }

    authenticateAndFetch()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      companyStore.fetchCompany('12')
      contactStore.fetchContact('16')
    }
  }, [isAuthenticated])

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{organizationName}</h1>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={() => setIsEditModalOpen(true)}>
                <Image src={'/svg/Edit.svg'} alt={'Edit'} width={20} height={20} />
              </button>
              <button className={styles.deleteButton} onClick={() => setIsRemoveModalOpen(true)}>
                <Image src={'/svg/Trash.svg'} alt={'Delete'} width={20} height={20} />
              </button>
            </div>
          </div>
          <div className={styles.sections}>
            <CompanyDetails />
            <ContactDetails />
            <PhotosSection />
          </div>
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogContent
          variant="editName"
          organizationName={organizationName}
          onConfirm={handleEditConfirm}
          onCancel={() => setIsEditModalOpen(false)}
          onNameChange={setOrganizationName}
        />
      </Modal>

      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <DialogContent
          variant="confirmRemove"
          onConfirm={handleRemoveConfirm}
          onCancel={() => setIsRemoveModalOpen(false)}
        />
      </Modal>
    </div>
  )
})

export default CompanyPage
