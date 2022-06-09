export async function authGuard({ url, session }) {
	const unguardedPaths = new Set(['/login', '/register', '/welcome', '/forgotpassword']);
	const loggedIn: boolean = session.user ? true : false;
	const isUnguardedPath: boolean = unguardedPaths.has(url.pathname);
	//console.log('AuthGuard: ', loggedIn, isUnguardedPath, url.pathname);

	if (loggedIn && isUnguardedPath) {
		return { status: 302, redirect: '/' };
	} else if (!loggedIn && isUnguardedPath) {
		return {};
	} else if (loggedIn && !isUnguardedPath) {
		return {};
	} else if (!loggedIn && !isUnguardedPath) {
		return { status: 302, redirect: '/welcome' };
	}
}

export default {
	authGuard
};
