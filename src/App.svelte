<script>	
	import { onMount } from 'svelte';

	export let user;
	let emails_data;
	let emails = emails_data;
	$: emails = emails_data || [];
	let formattedSelected;
	let formattedSelectedEnd;
	let dateChosenStart;
	let dateChosenEnd;
	import Header from '../components/Header.svelte';
	import EmailList from '../components/EmailList.svelte';
	
	let dymd = (s) => {
		const d = new Date();
		const [year, month, day] = s.split('/').map(n => parseInt(n, 10));
		d.setDate(day);
		d.setMonth(month);
		d.setFullYear(year);
		return d;
	}
	let ddmy = (s) => {
		const d = new Date();
		const [day, month, year] = s.split('/').map(n => parseInt(n, 10));
		d.setDate(day);
		d.setMonth(month);
		d.setFullYear(year);
		return d;
	}
	onMount(async () => {
		const response = await fetch('/data/emails.json')
		emails_data = await response.json();
	});
	let rangeSelected = () => {
			console.log(dateChosenStart, dateChosenEnd);
			if(!dateChosenStart || !dateChosenEnd) return
			console.log('dateSelected', formattedSelected, formattedSelectedEnd);
			const [startRange, endRange] = [formattedSelected, formattedSelectedEnd].map(s => dymd(s));
			emails = emails_data.filter(email => {
						
				const inRange = ddmy(email.date).getTime() > startRange.getTime() && ddmy(email.date).getTime() < endRange.getTime()
				if(inRange) console.log(startRange.toLocaleDateString(), ddmy(email.date).toLocaleDateString(), endRange.toLocaleDateString());
				return inRange;
			});
	}
</script>

<main>
	<Header {emails} {user} 
	on:rangeSelected={rangeSelected}
	bind:formattedSelected
	bind:formattedSelectedEnd
	bind:dateChosenStart
	bind:dateChosenEnd
	> </Header>
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