import React from 'react'

import { observer } from 'mobx-react-lite'
import styles from './CompanyDetails.module.scss'
import Button from '../button/Button'
import Input from '../input/Input'
import Selector from '../selector/Selector'
import { companyStore } from '@/app/store/companyStore'

const BUSINESS_TYPES = ['Partnership', 'Sole Proprietorship', 'Limited Liability Company']
const COMPANY_TYPES = ['Funeral Home', 'Logistics services', 'Burial care Contractor']

const CompanyDetails: React.FC = observer(() => {
  if (companyStore.loading) return <p>Loading...</p>
  if (!companyStore.company) return <p>Error loading company data</p>

  const handleSave = () => {
    companyStore.updateCompany('12')
    console.log(companyStore.isEditing, 'isEditing')
    companyStore.setEditing(false)
  }

  return (
    <div className={styles.container}>
      {!companyStore.isEditing ? (
        <div className={styles.viewMode}>
          <div className={styles.header}>
            <h3>Company Details</h3>
            <Button
              variant="flattened"
              onClick={() => companyStore.setEditing(true)}
              src={'/svg/Edit.svg'}
            >
              {'Edit'}
            </Button>
          </div>
          <div className={styles.item}>
            <strong>Agreement:</strong>{' '}
            <span>
              {companyStore.agreement} / {companyStore.date}
            </span>
          </div>
          <div className={styles.item}>
            <strong>Business entity:</strong> <span>{companyStore.businessEntity}</span>
          </div>
          <div className={styles.item}>
            <strong>Company type:</strong> <span>{companyStore.companyType}</span>
          </div>
        </div>
      ) : (
        <div className={styles.editMode}>
          <div className={styles.header}>
            <h3>Company Details</h3>
            <div className={styles.buttons}>
              <Button variant="flattened" onClick={handleSave} src={'/svg/Save.svg'}>
                {'Save changes'}
              </Button>
              <Button
                src={'/svg/X.svg'}
                variant="flattened"
                onClick={() => companyStore.setEditing(false)}
              >
                {'Cancel'}
              </Button>
            </div>
          </div>
          <div className={styles.row}>
            <Input
              value={companyStore.agreement}
              onChange={(e) => companyStore.setAgreement(e.target.value)}
              placeholder={companyStore.agreement}
              label="Agreement number:"
              className={styles.inputPadding}
            />
            <Input
              value={companyStore.date}
              onChange={(e) => companyStore.setDate(e.target.value)}
              placeholder={companyStore.date}
              label="Date:"
            />
          </div>
          <Selector
            options={BUSINESS_TYPES}
            selected={companyStore.businessEntity}
            onChange={(val) => companyStore.setBusinessEntity(val)}
            label="Business entity:"
            variant="single"
          />
          <Selector
            variant="multi"
            options={COMPANY_TYPES}
            selected={companyStore.companyType}
            onChange={(val) => companyStore.setCompanyType(val)}
            label="Company type:"
          />
        </div>
      )}
    </div>
  )
})

export default CompanyDetails
