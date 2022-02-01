<script lang="ts">
  import { fly } from "svelte/transition";
  export let type: "notice"|"warning"|"error" = "error";
</script>

<div
  class="d-grid gap-2 position-fixed top-0 vw-100 justify-content-center align-items-center p-1"
  style="z-index: 100;"
>
  <div  transition:fly={{ duration: 350, y: -200 }}
    class={`p-3 rounded-1 alert ${type === "notice" ? "alert-success" : type === "warning" ? "alert-warning" : "alert-danger"} shadow d-flex justify-content-between gap-3`}
  >
    <div>
      <slot name="heading" />
      <hr />
      <slot name="content" />
    </div>

    <div class="d-flex justify-content-end">
      <slot class="close-button" />
    </div>
  </div>
</div>
