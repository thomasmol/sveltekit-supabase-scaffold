import supabase from "$lib/supabase"

export async function post({ request }) {
  const body = await request.formData();
  
  const email = body.get('email');
  const password = body.get('password');;

  const {session: supabaseSession,user, error} = await supabase.auth.signIn({email, password})
  if (error) {
    return {
      status: error.status,
      body: error.message
    }
  }
  return {
    status: 200,
    body: user,
    headers: {
      'set-cookie': `session=${supabaseSession?.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(supabaseSession.expires_at * 1000).toUTCString()};`
    }
  }
}