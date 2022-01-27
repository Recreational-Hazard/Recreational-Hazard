<script lang="ts">
  import { auth } from "../utils/firebase/auth";
  import { sendEmailVerification } from "firebase/auth";

  function resend(e: MouseEvent) {
    sendEmailVerification($auth.user)
      .then(() => {
        (e.target as Element).textContent = "Link sent ✓";
        (e.target as HTMLButtonElement).disabled = true;
      })
      .catch((err) => console.log(err));
  }
</script>

<svelte:head>
  <title>Verify your email address</title>
</svelte:head>
{#if !$auth && !$auth.known}
  <div class="d-grid align-items-center justify-content-center py-3">
    <span class="spinner-border" />
  </div>
{:else}
  <div class="container py-3">
    {#if $auth.user && !$auth.user.emailVerified}
      <h4>Almost done!</h4>
      <hr />
      <div class="text-center mx-auto">
        <img
          src="/assets/mail_re_duel.svg"
          class="w-100 max-width-250"
          alt="Mail sent logo"
        />
        <h3 class="py-3">Verify your email address</h3>
        <p>
          A verification link was sent to your email account. Please check your
          inbox to verify.
        </p>
        <div>
          <p>
            Didn't receive an email? &nbsp; <button
              class="btn btn-danger"
              on:click={resend}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    {:else}
      <div class="text-center mx-auto">
        <img
          src="/assets/warning_cyit.svg"
          class="w-100 max-width-500"
          alt="404"
        />
        <h3 class="py-2">404 not found...</h3>
        <a href="/"> go to main page </a>
      </div>
    {/if}
  </div>
{/if}
