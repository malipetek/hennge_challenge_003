import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		user: 'mami@mami.com'
	}
});

export default app;