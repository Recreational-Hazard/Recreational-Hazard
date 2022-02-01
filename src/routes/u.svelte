<script lang="ts">
  import { auth, changePassword } from "../utils/firebase/auth";
  import AddressAutoComplete from "../components/AddressAutoComplete.svelte";
  import Collapsible from "../components/Collapsible.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import DisplayPhoto from "../components/DisplayPhoto.svelte";
  import Modal from "../components/Modal.svelte";
  import {
    FacebookAuthProvider,
    GoogleAuthProvider,
updateProfile,
  } from "firebase/auth";
import { getFormData } from "../utils";

  let notice: { show: boolean; message?: any; [key: string]: any } = {
    show: false,
  };

  onMount(async () => {
    if (!$auth.user && $auth.known) {
      await goto("/");
    }
  });

  function closeModal() {
    notice = { show: false, message: "" };
  }

  async function onUpdateProfile (e:Event) {
    const { name, phone_number } = getFormData(e);
    const displayName = name.toString().trim();
    const phoneNumber = phone_number.toString().trim()

    if (displayName !== $auth.user.displayName || phoneNumber !== $auth.user.phoneNumber) {
      /**
       * 
      */
    }
    }

  async function resetPassword(e: Event) {
    try {
      const res = await changePassword($auth.user.email);
      notice.show = true;
      notice.message = res;
      notice.type = "notice";

      (e.target as HTMLElement).setAttribute('disabled', 'true');
      (e.target as HTMLElement).innerText = "Check your inbox for password reset link."
      // console.log(res);

    } catch (error) {
      console.log(error);
      notice.show = true;
      notice.message = error.message;
      notice.type = "error";
    }
  }
</script>

{#if notice && notice.show && notice.message}
  <Modal type={notice?.type}>
    <h5 slot="heading">{notice?.type.toUpperCase()}</h5>
    <p slot="content">{notice.message}</p>
    <button
      class="btn btn-close p-2 rounded-circle bg-white"
      on:click={closeModal}
    />
  </Modal>
{/if}

<div class="container mx-auto max-width-800 py-4 my-4">
  <Collapsible expanded={true}>
    <h5 slot="title" class="h6 text-uppercase">
      Edit your account information
    </h5>
    <div class="mt-4">
      <h5>ACCOUNT INFORMATION</h5>
      <hr />
      <DisplayPhoto
        displayName={$auth.user?.displayName}
        photoURL={$auth.user?.photoURL}
      />
      <form class="m-2" on:submit|preventDefault={onUpdateProfile}>
        <label for="name"> Name </label>
        <input
          class="mb-4 py-2 form-control rounded-0"
          name="name"
          value={$auth.user?.displayName || ""}
          type="text"
        />

        <label for="email"> Email Address </label>
        <input
          readonly={true}
          class="mb-4 py-2 form-control rounded-0"
          name="email"
          value={$auth.user?.email || ""}
          type="email"
        />

        <label for="phone_number"> Phone No. </label>
        <input
          class="mb-4 py-2 form-control rounded-0"
          name="phone_number"
          value={$auth.user?.phoneNumber || ""}
          type="number"
        />
        <div class="text-end">
          <input
            type="submit"
            class="btn rounded-0 btn-dark px-4"
            role="button"
            value="Update"
          />
        </div>
      </form>
    </div>
  </Collapsible>

  {#if $auth.user?.providerData[0].providerId === GoogleAuthProvider.PROVIDER_ID || $auth.user?.providerData[0].providerId === FacebookAuthProvider.PROVIDER_ID}
    <Collapsible>
      <h5 slot="title" class="h6 text-uppercase">Change Password</h5>
      <div class="mt-4">
        <hr />
        <button class="btn hover-1" on:click={resetPassword}
          >Reset password</button
        >
      </div>
    </Collapsible>
  {/if}

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
