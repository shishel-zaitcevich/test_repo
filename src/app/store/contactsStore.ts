import { makeAutoObservable } from 'mobx';
import { apiService } from '@/app/api/api';


interface Contact {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

class ContactStore {
  contact: Contact | null = null;
  loading = false;
  isEditing = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContact(id: string) {
    this.loading = true;
    try {
      this.contact = await apiService.getContact(id);
    } catch (error) {
      console.error('Error fetching contact:', error);
    } finally {
      this.loading = false;
    }
  }

  async updateContact(id: string) {
    try {
      if (!this.contact) return;
      const updatedData = {
        lastname: this.contact.lastname,
        firstname: this.contact.firstname,
        phone: this.contact.phone,
        email: this.contact.email,
      };
      await apiService.updateContact(id, updatedData);
      this.isEditing = false;
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }

  setEditing(value: boolean) {
    this.isEditing = value;
  }


  get responsiblePerson() {
    return this.contact ? `${this.contact.firstname} ${this.contact.lastname}` : '';
  }

  get phone() {
    return this.contact?.phone ? `+${this.contact.phone}` : '';
  }

  get email() {
    return this.contact?.email || '';
  }


  setFirstname(value: string) {
    if (this.contact) {
      this.contact.firstname = value;
    }
  }

  setLastname(value: string) {
    if (this.contact) {
      this.contact.lastname = value;
    }
  }

  setPhone(value: string) {
    if (this.contact) {
      this.contact.phone = value.replace('+', '');
    }
  }

  setEmail(value: string) {
    if (this.contact) {
      this.contact.email = value;
    }
  }
}

export const contactStore = new ContactStore();