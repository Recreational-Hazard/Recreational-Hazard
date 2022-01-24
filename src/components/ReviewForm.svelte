<script lang="ts">
  import { getFormData } from "../utils";

  let error="";

  function onSubmit(
    e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    const data = getFormData(e);
    if (!data.rate) {
      error = "Please give us a rating";
    }
    console.log(data);
  }
</script>

<div class="bg-light max-width-500 py-4 px-sm-4 rounded-3">
  <h3 class="h4 pb-2">Write a review</h3>
  <form on:submit|preventDefault={onSubmit} id="write-review">
    <div class="mb-3">
      <label class="form-label" for="rate">Rating</label>
      <select class="form-select" name="rate" id="rate" form="write-review" required>
        <option value> Give a rating </option>
        {#each [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as rate}
          <option value={rate}>{rate}</option>
        {/each}
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label" for="review">Review</label>
      <textarea class="form-control" rows="6" name="review" required />
    </div>
    {#if error}
      <span class="my-2 p-1 alert-danger"> {error}</span>
    {/if}
    <button type="submit" class="btn btn-danger shadow-sm d-block w-100 my-2">
      Submit
    </button>
  </form>
</div>
