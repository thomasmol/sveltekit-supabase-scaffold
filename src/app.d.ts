/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Platform {}
	// interface Stuff {}
	interface Locals {
		user: User;
		accessToken: string | null;
		error: ApiError;
	}

	interface Session {
		user: User;
		accessToken?: string;
	}

	declare namespace svelte.JSX {
		interface HTMLProps<T> {
			clickoutside: () => void;
		}
	}
}
