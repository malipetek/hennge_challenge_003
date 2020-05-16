<script>	
	import { onMount } from 'svelte';
	import { ddmy, dymd }from '../components/lib/dateParser.js';

	export let user;
	let emails_data;
	export let emails = emails_data;
	let emails_filtered;
	$: {
		if(!emails_data) {
			emails = []
		}
		if(emails_data && emails_data.length) {
			const [startRange, endRange] = [dateChosenStart ? formattedSelected : minDate, dateChosenEnd ? formattedSelectedEnd : maxDate].map(s => dymd(s));
				emails_filtered = emails_data.filter(email => {	
				const inRange = email.date.getTime() > startRange.getTime() - dayAsMs && email.date.getTime() < endRange.getTime()
				return inRange;
			})
			console.log('sorting...');
			emails = emails_filtered.sort((e1, e2) => {
					return sortAscending ? e1.date.getTime() - e2.date.getTime() : e2.date.getTime() - e1.date.getTime()
				});
		}
	};
	let formattedSelected,
		formattedSelectedEnd,
		dateChosenStart,
		dateChosenEnd;
	let sortAscending = false;

	const dayAsMs = 864e5;
  	const allowedArchiveCallback = 90 * dayAsMs; // 90 days
	
	let minDate = new Date();
	minDate.setTime(new Date().getTime() - allowedArchiveCallback);
	let maxDate = new Date();
	
	import Header from '../components/Header.svelte';
	import EmailList from '../components/EmailList.svelte';
	
	onMount(async () => {
		const response = await fetch('/data/emails.json')
		emails_data = await response.json();
		emails_data = emails_data.map(email => { email.date = ddmy(email.date); return email;});
	});
</script>

<main>
	<Header 
		{emails}
		{user} 
		bind:formattedSelected
		bind:formattedSelectedEnd
		bind:dateChosenStart
		bind:dateChosenEnd
		bind:minDate
		bind:maxDate
	/>
	<EmailList 
		{emails}
		bind:sortAscending
	/>
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