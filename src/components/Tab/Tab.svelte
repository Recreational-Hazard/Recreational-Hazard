<script lang="ts">
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";
  import type { TAB } from "./Tabs.svelte";

  let className = "";
  export { className as class };

  const tab: TAB = { id: Date.now() };
  const { registerTab, selectedTab, selectTab } = getContext(TABS);
  registerTab(tab);
</script>

<button
  class={`${$selectedTab === tab ? "selected" : ""} btn ${className}`}
  on:click={() => selectTab(tab)}
>
  <slot />
</button>

<style>
  button {
    border-bottom: 2px solid white;
    border-radius: 0;
    margin: 0;
    color: #ccc;
  }
  .selected {
    border-bottom: 2px solid var(--bs-primary);
    color: #333;
  }
</style>
