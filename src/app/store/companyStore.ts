import { action, makeAutoObservable } from 'mobx';
import { apiService } from '@/app/api/api';


interface Photo {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

interface Contract {
  no: string;
  issue_date: string;
}

interface Company {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: Contract;
  type: string[];
  status: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
}



class CompanyStore {
  company: Company | null = null;
  photos: Photo[] = [];
  loading = false;
  isEditing = false;

  constructor() {
    makeAutoObservable(this, {
      uploadImage: action, // Помечаем метод как действие
      deleteImage: action, // Помечаем метод как действие
    });
  }

  async fetchCompany(id: string) {
    this.loading = true;
    try {
      const data = await apiService.getCompany(id);
      this.company = data;
      this.photos = data.photos || [];
    } catch (error) {
      console.error('Error fetching company:', error);
    } finally {
      this.loading = false;
    }
  }

  async updateCompany(id: string) {
    try {
      if (!this.company) return;
      const updatedData = {
        name: this.company.name,
        shortName: this.company.shortName,
        businessEntity: this.company.businessEntity,
        contract: this.company.contract,
        type: this.company.type,
      };
      await apiService.updateCompany(id, updatedData);
      this.isEditing = false;
    } catch (error) {
      console.error('Error updating company:', error);
    }
  }

  async deleteCompany(id: string) {
    try {
      await apiService.deleteCompany(id);
      this.company = null;
      this.photos = [];
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  }


  async uploadImage(id: string, file: File) {
    try {
      const newPhoto = await apiService.uploadImage(id, file);
      this.photos.push(newPhoto); 
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }


  async deleteImage(id: string, imageName: string) {
    try {
      await apiService.deleteImage(id, imageName);
      this.photos = this.photos.filter((photo) => photo.name !== imageName); 
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  setEditing(value: boolean) {
    this.isEditing = value;
  }

  get agreement() {
    return this.company?.contract?.no || '';
  }

  get date() {
    return this.company?.contract?.issue_date?.split('T')[0] || '';
  }

  get businessEntity() {
    return this.company?.businessEntity || '';
  }

  get companyType() {
    return this.company?.type?.join(', ') || '';
  }

  setAgreement(value: string) {
    if (this.company) {
      this.company.contract.no = value;
    }
  }

  setDate(value: string) {
    if (this.company) {
      this.company.contract.issue_date = value;
    }
  }

  setBusinessEntity(value: string) {
    if (this.company) {
      this.company.businessEntity = value;
    }
  }

  setCompanyType(value: string) {
    if (this.company) {
      this.company.type = value.split(', ');
    }
  }
}

export const companyStore = new CompanyStore();