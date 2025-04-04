import { makeAutoObservable } from 'mobx'

class AuthStore {
  token: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async authenticate(user: string) {
    try {
      const response = await fetch(`https://test-task-api.allfuneral.com/auth?user=${user}`)
      if (!response.ok) throw new Error('Ошибка авторизации')

      this.token = response.headers.get('Authorization')
    } catch (error) {
      console.error('Ошибка при получении токена:', error)
    }
  }
}

export const authStore = new AuthStore()