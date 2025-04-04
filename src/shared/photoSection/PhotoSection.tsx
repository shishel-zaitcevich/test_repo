'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import styles from './PhotosSection.module.scss'
import { companyStore } from '@/app/store/companyStore'
import DialogContent from '../dialogContent/DialogContent'
import Modal from '../modal/Modal'
import Button from '../button/Button'

const PhotosSection: React.FC = observer(() => {
  const [isImageRemoveModalOpen, setIsImageRemoveModalOpen] = useState(false)
  const [imageToRemove, setImageToRemove] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('Selected file:', e.target.files[0])
      companyStore.uploadImage('12', e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    console.log('Button clicked')
    fileInputRef.current?.click()
  }

  const handleDeleteClick = (imageName: string) => {
    setImageToRemove(imageName)
    setIsImageRemoveModalOpen(true)
  }

  const handleImageRemoveConfirm = () => {
    if (imageToRemove) {
      companyStore.deleteImage('12', imageToRemove)
    }
    setIsImageRemoveModalOpen(false)
    setImageToRemove(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Photos</h3>
        <Button variant="flattened" src={'/svg/Add Photo.svg'} onClick={handleButtonClick}>
          {'Add'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className={styles.photos}>
        {companyStore.photos.map((photo) => (
          <div key={photo.name} className={styles.photo}>
            <img src={photo.thumbpath} alt="Photo" />
            <button className={styles.deleteButton} onClick={() => handleDeleteClick(photo.name)}>
              <Image src={'/svg/WhiteTrash.svg'} alt={'Delete'} width={16} height={16} />
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={isImageRemoveModalOpen} onClose={() => setIsImageRemoveModalOpen(false)}>
        <DialogContent
          variant="confirmImageRemove"
          onConfirm={handleImageRemoveConfirm}
          onCancel={() => setIsImageRemoveModalOpen(false)}
        />
      </Modal>
    </div>
  )
})

export default PhotosSection
