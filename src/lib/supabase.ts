import { goto } from '$app/navigation';
import { createClient } from '@supabase/supabase-js';
import * as cookie from 'cookie';

const supbaseUrl: string = import.meta.env.VITE_SUPABASE_URL.toString();
const supbaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY.toString();
const options = { 
  persistSession: false,
}
const supabase = createClient(supbaseUrl, supbaseAnonKey, options);

export default supabase;

export const auth = supabase.auth;

export const signOut = async () => {
	await auth.signOut();
	await unsetAuthCookie();
	goto('/');
};

export const getCookie = (name, token, extra) => {
	const Blank = { path: '/', expires: new Date(0) };
	const DefaultOptions = {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 180 // default Max-Age, can be overwritten via extra
	};
	const options = { ...DefaultOptions, ...extra };

	return token ? cookie.serialize(name, token, options) : cookie.serialize(name, '', Blank);
};

export const blankCookies = () => {
	return [
		getCookie('refresh_token', null, null),
		getCookie('access_token', null, null),
		getCookie('expires_at', null, null)
	];
};

const setServerSession = async (event, session) => {
	console.log('Setting Server Session >>>', event, session);
	await fetch('/api/auth', {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'same-origin',
		body: JSON.stringify({ event, session })
	});
};

export const setAuthCookie = async (session) => {
	await setServerSession('SIGNED_IN', session);
};
export const unsetAuthCookie = async () => {
	await setServerSession('SIGNED_OUT', null);
};
