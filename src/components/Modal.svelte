<script lang="ts">
  import { fly } from "svelte/transition";
  import { notice } from "../utils/store";

  function closeModal() {
    notice.set({ show: false, message: "" });
  }
</script>

{#if $notice && $notice.show}
  <div
    class="d-grid gap-2 position-fixed top-0 vw-100 justify-content-center align-items-center p-1"
    style="z-index: 100;"
  >
    {#if $notice.message}
      <div
        transition:fly={{ duration: 350, y: -200 }}
        class={`p-3 rounded-1 alert ${
          $notice.type === "notice"
            ? "alert-success" : $notice.type === "warning"
            ? "alert-warning" : "alert-danger"
        } shadow d-flex justify-content-between gap-3`}
      >
        <div>
          <p class="py-2">{$notice.message}</p>
        </div>

        <div class="d-flex justify-content-end">
          <button
            class="btn btn-close p-2 rounded-circle bg-white"
            on:click={closeModal}
          />
        </div>
      </div>
    {/if}
  </div>
{/if}
