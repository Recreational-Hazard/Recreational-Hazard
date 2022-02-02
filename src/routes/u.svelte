<script lang="ts">
  import { auth, changePassword } from "../utils/firebase/auth";
  import AddressAutoComplete from "../components/AddressAutoComplete.svelte";
  import Collapsible from "../components/Collapsible.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import AccountInfo from "../components/AccountInfo.svelte";
  import { notice } from "../utils/store";
  import { browser } from "$app/env";

  onMount(async () => {
    if (!$auth.user && $auth.known) {
      await goto("/auth");
    }
  });

  $: {
    if (browser && !$auth.user && $auth.known ) goto("/auth", {replaceState:true});

  }

  async function resetPassword(e: Event) {
    try {
      const res = await changePassword($auth.user.email);
      notice.set({ show: true, message: res, type: "notice" });

      (e.target as HTMLElement).setAttribute("disabled", "true");
      (e.target as HTMLElement).innerText =
        "Check your inbox for password reset link.";
    } catch (error) {
      console.log(error);
      notice.set({ show: true, message: error.message, type: "error" });
    }
  }
</script>

<div class="container mx-auto max-width-800 py-4 my-4">
  <Collapsible expanded={true}>
    <h5 slot="title" class="h6 text-uppercase">
      Edit your account information
    </h5>
    <div class="mt-4">
      <h5>ACCOUNT INFORMATION</h5>
      <hr />
      <AccountInfo user={$auth.user} />
    </div>
  </Collapsible>

  <Collapsible>
    <h5 slot="title" class="h6 text-uppercase">Change Password</h5>
    <div class="mt-4">
      <hr />
      <button class="btn hover-1" on:click={resetPassword}
        >Reset password</button
      >
    </div>
  </Collapsible>

  <Collapsible>
    <h5 slot="title" class="h6 text-uppercase">
      Modify your address book entries
    </h5>
    <div class="mt-4">
      <h5>ADDRESS BOOK ENTRIES</h5>
      <hr />
      <small>
        We don't store client's addresses they are all stored in your browser
        for ease of access
      </small>
      <AddressAutoComplete />
    </div>
  </Collapsible>
</div>
