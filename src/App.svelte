<script>	
	import { onMount } from 'svelte';

	export let user;
	let emails_data;
	let emails = emails_data;
	$: emails = emails_data || [];
	import Header from '../components/Header.svelte';
	import EmailList from '../components/EmailList.svelte';
	
	onMount(async () => {
		const response = await fetch('/data/emails.json')
		emails_data = await response.json();
	});
</script>

<main>
	<Header {emails} {user}> </Header>
	<EmailList {emails}>
	</EmailList>
</main>

<style>
	main {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		text-align: center;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			padding: 0 2em;
			max-width: none;
		}
	}
</style>