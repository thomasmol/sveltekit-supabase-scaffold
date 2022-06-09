import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = ({ locals, request }) =>
	withApiAuth({ user: locals.user }, async () => {
		const { data, error } = await supabaseServerClient(request).from('profiles').select('*').eq('id', locals.user.id);
		console.log(data);
		console.log(error);
		return {
			status: 200,
			body: data
		};
	});