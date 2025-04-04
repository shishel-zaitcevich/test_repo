import axios, { AxiosInstance } from 'axios';


interface Company {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: string[];
  status: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
}

interface Contact {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Photo {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://test-task-api.allfuneral.com/',
    });
  }

  async authenticate(username: string): Promise<void> {
    const response = await this.api.get('/auth', {
      params: { user: username },
    });
    const authHeader = response.headers['authorization'];
    if (!authHeader) {
      throw new Error('Authorization header not found in response');
    }
    this.token = authHeader.split(' ')[1];
    this.api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
  }

  async getCompany(id: string): Promise<Company> {
    const response = await this.api.get<Company>(`/companies/${id}`);
    return response.data;
  }

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    const response = await this.api.patch<Company>(`/companies/${id}`, data);
    return response.data;
  }

  async deleteCompany(id: string): Promise<void> {
    await this.api.delete(`/companies/${id}`);
  }

  // async uploadImage(id: string, file: File): Promise<Photo> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   const response = await this.api.post<Photo>(`/companies/${id}/image`, formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  //   return response.data;
  // }

  async uploadImage(id: string, file: File): Promise<Photo> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.api.post<Photo>(`/companies/${id}/image`, formData);
    return response.data;
  }

  async deleteImage(id: string, imageName: string): Promise<void> {
    await this.api.delete(`/companies/${id}/image/${imageName}`);
  }

  async getContact(id: string): Promise<Contact> {
    const response = await this.api.get<Contact>(`/contacts/${id}`);
    return response.data;
  }

  async updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
    const response = await this.api.patch<Contact>(`/contacts/${id}`, data);
    return response.data;
  }
}

export const apiService = new ApiService();

