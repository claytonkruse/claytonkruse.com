<script>
	import { page } from '$app/state';
</script>

<hgroup>
	<h1 class="text-4xl font-bold">{page.status}</h1>
	<h2>{page.error?.message}</h2>
</hgroup>

<nav>
	<a href="/">Go to Homepage</a>
</nav>
