import { user } from '$lib/stores/auth'; // stores related to app state, auth state

export async function authGuard({ url }) {
	/* const loggedIn = user.id ? true : false;

	if (
		loggedIn &&
		(url.pathname === '/login' || url.pathname === '/register' || url.pathname === '/welcome')
	) {
		return { status: 302, redirect: '/' };
	} else if (
		!loggedIn &&
		(url.pathname === '/login' || url.pathname === '/register' || url.pathname === '/welcome')
	) {
		return {};
	} else {
		return { status: 302, redirect: '/welcome' };
	} */
  return {};
}

export default {
	authGuard
};
