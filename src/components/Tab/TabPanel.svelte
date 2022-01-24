<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
	import type { Panel } from './Tabs.svelte';

	let className="";
	export {className as class};
	
	const panel:Panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
<div class={className}>
	<slot></slot>
</div>
{/if}