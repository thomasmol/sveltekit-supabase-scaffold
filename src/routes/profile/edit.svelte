<script lang="ts">
	import supabase from '$lib/supabase';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';
	import { createEventDispatcher } from 'svelte';
	import EmptyProfilePicture from '$lib/components/svg/EmptyProfilePicture.svelte';
	import { goto } from '$app/navigation';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let firstName = '';
	let lastName = '';
	let loading = false;
	let uploading = false;
	let avatarPath = '';
	let files;
	let errorMessage;

	const dispatch = createEventDispatcher();

	const fetchProfile = async () => {
		const response = await fetch('/api/profile');
		if (response.ok) {
			const data = await response.json();
			firstName = data.first_name;
			lastName = data.last_name;
			avatarPath = data.avatar_url;
			return data;
		}
	};

	const updateProfile = async () => {
		try {
			loading = true;
			const userId: string = supabase.auth.user().id;
			const { data, error } = await supabase
				.from('profiles')
				.update(
					{ first_name: firstName, last_name: lastName, avatar_url: avatarPath },
					{ returning: 'minimal' }
				)
				.eq('id', userId)
				.limit(1)
				.single();
			if (error) throw error;
			goto('/');
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};

	async function uploadAvatar() {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const dateTime = new Date().toISOString();
			const fileName = `${dateTime}.${fileExt}`;
			const filePath = `${fileName}`;

			let { data, error } = await supabase.storage.from('avatars').upload(filePath, file);
			if (error) throw error;
			dispatch('upload');

			let { data: data2, error: error2 } = await supabase.storage
				.from('avatars')
				.getPublicUrl(filePath);
			if (error2) throw error2;
			avatarPath = data2.publicURL;
		} catch (error) {
			console.error(error);
		} finally {
			uploading = false;
		}
	}
</script>

<Navbar />
<section class="dark:bg-slate-900 ">
	<h1 class="mx-4 px-3 py-10 text-center text-2xl text-slate-700 dark:text-slate-100 sm:mx-auto">
		Edit your profile details here
	</h1>

	<form
		on:submit|preventDefault={updateProfile}
		class="mx-4 flex max-w-2xl flex-col rounded-lg border bg-white  shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:mx-auto ">
		<div class="px-8 py-4">
			<h1 class="mb-2 text-lg text-slate-800 dark:text-slate-100">Profile</h1>
			<p class="text-slate-600 dark:text-slate-200">
				This information will be displayed publicly so be careful what you share.
			</p>
		</div>
		<div class="flex items-center space-x-6 px-8 py-4">
			<div class="shrink-0">
				{#await fetchProfile()}
					<div class="h-16 w-16 text-center items-center">
						<CircularLoadingIndicator />
					</div>
				{:then data}
					{#if data.avatar_url}
						<img
							class="h-16 w-16 object-cover rounded-full"
							src={data.avatar_url}
							alt="Current profile" />
					{:else}
						<div class="h-16 w-16 object-cover rounded-full overflow-hidden border">
							<EmptyProfilePicture />
						</div>
					{/if}
				{:catch error}
					<p>{error}</p>
				{/await}
			</div>
			<label class="block">
				<span class="sr-only">Choose profile photo</span>
				<input
					type="file"
					class="block w-full text-sm text-slate-500 file:mr-4
          file:rounded-full file:border-0 file:bg-teal-50
          file:py-2 file:px-4
          file:text-sm file:font-semibold
          file:text-teal-700 hover:cursor-pointer
          hover:file:bg-teal-100 dark:text-slate-300"
					bind:files
					on:change={uploadAvatar}
					disabled={uploading}
					accept="image/*" />
			</label>
		</div>
		<div class="flex space-x-6 px-8 py-5">
			<div>
				<label for="firstName" class="mb-2 font-medium text-slate-700 dark:text-slate-200"
					>First name</label>
				<input
					bind:value={firstName}
					type="text"
					id="firstName"
					autocomplete="name"
					placeholder=""
					required
					class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
			</div>
			<div>
				<label for="lastName" class="mb-2 font-medium text-slate-700 dark:text-slate-200"
					>Last Name</label>
				<input
					bind:value={lastName}
					type="text"
					id="lastName"
					autocomplete="family-name"
					placeholder=""
					required
					class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
			</div>
		</div>

		{#if errorMessage}
			<p class="mb-4 rounded p-1 text-red-800">
				{errorMessage}, please try again.
			</p>
		{/if}
		<div class="bg-slate-50 px-8 py-4 text-right dark:bg-slate-700">
			{#if !loading}
				<PrimaryButton type="submit" text="Save" />
			{:else}
				<PrimaryButton type="submit" text="Processing..." disabled={true}>
					<CircularLoadingIndicator slot="icon" />
				</PrimaryButton>
			{/if}
		</div>
	</form>
</section>
