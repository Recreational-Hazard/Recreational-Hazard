<script lang="ts">
  import { slide } from "svelte/transition";
  import type { SlideParams } from "svelte/transition";
  export let expanded = false;
  let transOps: SlideParams = { duration: 400 };
</script>

<div class="collapsible my-3">
  <button
    class="btn btn-light w-100 btn-lg text-start rounded-0 border border-1 py-3 d-flex align-items-center justify-content-between"
    aria-expanded={expanded}
    on:click={() => (expanded = !expanded)}
  >
    <slot name="title" />
    <svg viewBox="0 0 32 32" fill="black"
      ><path
        d="M9.914 11.086l-2.829 2.829 8.914 8.914 8.914-8.914-2.828-2.828-6.086 6.086z"
      /></svg
    >
  </button>

  {#if expanded}
  <div
    class="contents border-1 border rounded-bottom rounded-1 p-1"
    transition:slide|local={transOps}
  >
    <slot />
  </div>
  {/if}
</div>

<style>
  svg {
    height: 1em;
    width: 1em;
  }
</style>
