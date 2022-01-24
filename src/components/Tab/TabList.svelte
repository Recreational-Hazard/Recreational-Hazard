<script lang="ts">
let className = "";
export {className as class};
</script>

<div class={`tab-list d-flex align-items-center ${className}`}>
	<slot></slot>
</div>

<style>
	.tab-list {
		border-bottom: 1px solid var(--bs-primary);
	}
</style>