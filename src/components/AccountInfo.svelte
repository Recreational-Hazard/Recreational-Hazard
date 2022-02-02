<script lang="ts">
  import DisplayPhoto from "./DisplayPhoto.svelte";
  import { getFormData } from "../utils";
  import { notice } from "../utils/store";
  import { auth } from "../utils/firebase/auth";

  export let user: any;
  let isSubmitting = false;

  async function onUpdateProfile(e: Event) {
    try {
      isSubmitting = true;
      const { name, phone_number } = getFormData(e);

      const displayName = name?.toString().trim();
      const phoneNumber = phone_number?.toString().trim();

      if ((displayName && displayName !== user.displayName) || phoneNumber) {
        await auth.updateUserData(user, {
          displayName,
          phoneNumber: +phoneNumber,
        });

        notice.set({
          show: true,
          message: "Account info updated ✔️",
          type: "notice",
        });
        isSubmitting = false;
      }
    } catch (error) {
      console.log(error);
      isSubmitting = false;
      notice.set({ show: true, message: error.message, type: "error" });
    }
  }
</script>

<DisplayPhoto />
<form class="m-2" on:submit|preventDefault={onUpdateProfile}>
  <label for="name"> Name </label>
  <input
    class="mb-4 py-2 form-control rounded-0"
    name="name"
    value={user?.displayName || ""}
    type="text"
  />

  <label for="email"> Email Address </label>
  <input
    readonly={true}
    class="mb-4 py-2 form-control rounded-0"
    name="email"
    value={user?.email || ""}
    type="email"
  />

  <label for="phone_number"> Phone No. </label>
  <input
    class="mb-4 py-2 form-control rounded-0"
    name="phone_number"
    value={user?.phoneNumber || ""}
    type="number"
  />
  <div class="text-end">
    <button
      type="submit"
      class="btn rounded-0 btn-dark px-4"
      disabled={isSubmitting}
    >
      {#if isSubmitting}<span class="spinner-border spinner-border-sm" />{:else}
        Update
      {/if}
    </button>
  </div>
</form>
