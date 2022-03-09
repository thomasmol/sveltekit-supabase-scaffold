import supabase from '$lib/supabase';

export async function get({ locals }) {
	const { data, error } = await supabase
	.from('profiles')
	.select('*')
	.eq('id', locals.user.id)
	.limit(1)
	.single();
	if (error) {
		console.error( error);
		return {
			status: 400,
			body: error.message
		};
	}
	return {
		status: 200,
		body: data
	};
}
