import supabase from "$lib/supabase"

export async function post(request) {
  const email = request.body.get('email')
  const password = request.body.get('password')

  const {session, error} = await supabase.auth.signUp({email, password})

  if (error) {
    return {
      status: error.status,
      body: error.message
    }
  }

  return {
    status: 200,
    body: 'success',
    headers: {
      'set-cookie': `session=${session?.user?.id}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(session.expires_at * 1000).toUTCString()};`
    }
  }
}

