export async function signIn(email: string, password: string, onSuccess: any) {
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

  response.json().then(() => onSuccess())
}

export const auth = {
  signIn
}