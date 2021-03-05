<script lang="ts">
	import router from 'page';
import { claim_text } from 'svelte/internal';
	import Auth from './routes/Auth.svelte'
	import Index from './routes/Index.svelte';
	import NotFound from './routes/NotFound.svelte';
	import { queryString } from './services/util';

	let page;
	let params = {};
	let qs = {};

	
	router("/", () => page = Index);
	router("/404/:msg", (ctx: {params: {}, queryString: string},next) => {
		params=ctx.params;
		next();
	})
	router("/auth", (ctx, next)=>{
		qs = queryString(ctx.querystring);
		next();
	});
	router("/login", ()=>router.redirect("/auth") );
	router("/register", ()=>router.redirect("/auth") );

	router.start();
</script>

<svelte:component this={page} {params} {qs} />

<style global>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';

	@import 'tailwindcss/utilities';
</style>