import { storage } from "./storage";


function success(response: Response, onSuccess: () => void) {
  response.json().then((data) => {
    storage.store('token', data.token)
    storage.store('email', data.email)
    onSuccess()
  })
}

function failure(response: Response, onFailure: () => void) {
  onFailure()
}

export async function signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
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
    "Content-Type": "application/json"
  }

  const options = {
    method,
    body,
    headers
  }

  const response = await fetch(url, options)

  if (response.ok) {
    success(response, onSuccess)
  } else {
    failure(response, onFailure)
  }
}

function loggedIn() {
  return !!storage.get('token')
}

function signOut(andThen: () => void) {
  storage.remove('token')
  storage.remove('email')

  andThen()

}

function currentUser() {
  if (!loggedIn()) {
    return null
  }

  return {
    email: storage.get('email')
  }

}

export const auth = {
  signIn,
  loggedIn,
  currentUser,
  signOut
}