import { getCookie, blankCookies } from '$lib/supabase';

export async function post({ request }) {
	const body = await request.json();
	const session = body.session;

	const setCookie = session
		? [
				getCookie('refresh_token', session['refresh_token'], { maxAge: session['expires_in'] }),
				getCookie('access_token', session['access_token'], { maxAge: session['expires_in'] }),
				getCookie('expires_at', session['expires_at'], { maxAge: session['expires_in'] })
		  ]
		: blankCookies();

	return {
		status: 200,
		body: null,
		headers: { 'set-cookie': setCookie }
	};
}

export async function get({ request }) {
	const { user, authenticated } = await request.locals;
	// refer hooks to see how this got populated
	return {
		body: { user, authenticated }
	};
}
