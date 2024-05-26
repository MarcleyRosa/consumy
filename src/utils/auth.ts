import { createStorage, type SimpleStorage } from "./storage"

class Auth {
  private storage: SimpleStorage

  constructor(persistent = false) {
    this.storage = createStorage(persistent)
  }

  success(response: Response, onSuccess: () => void) {
    response.json().then((data) => {
      this.storage.store('token', data.token)
      this.storage.store('email', data.email)
      onSuccess()
    })
  }

  failure(response: Response, onFailure: () => void) {
    onFailure()
  }

  signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
    console.log('will sign in...');
    const body = JSON.stringify({
      login: {
        email,
        password
      }
    })
    const url = 'http://localhost:3000/sign_in'
    const method = "POST"
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-API-KEY": "D+PQFRWy9hb/RqN2bYZnHXUNIMY="
    }

    const options = {
      method,
      body,
      headers
    }

    fetch(url, options).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess)
      } else {
        this.failure(response, onFailure)
      }
    })

  }

  private getFallback(key: string): string | null {
    const transient = createStorage(false)
    const persistent = createStorage(true)

    return transient.get(key) || persistent.get(key) 
  }

  isLoggedIn() {
    return Boolean(this.getFallback('token'))
  }

  currentUser() {
    if (!this.isLoggedIn()) return null
    return { email: this.getFallback('email')}
  }

  signOut(andThen = () => {}) {
    const transient = createStorage(false)
    const persistent = createStorage(true)

    transient.remove('token')
    transient.remove('email')
    persistent.remove('email')
    persistent.remove('token')

    andThen()
  }
}

export { Auth }