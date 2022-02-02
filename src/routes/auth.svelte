<script lang="ts">
  import { Tab, TabList, TabPanel, Tabs } from "../components/Tab";
  import { getFormData } from "../utils";
  import { auth } from "../utils/firebase/auth";
  import { goto } from "$app/navigation";
  import { onDestroy } from "svelte";
  import { browser } from "$app/env";
  import { notice } from "../utils/store";

  let signingIn = false;

  $: unsubscribe = auth.subscribe(async ({ user, known }) => {
    if (user) {
      if (!user.emailVerified) await goto("/verification");
      else {
        await goto("/u");
      }
    }
  });

  onDestroy(() => unsubscribe());

  async function onLogin(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    const data = getFormData(event);
    try {
      signingIn = true;
      const {email, password} = data;
      await auth.signIn(email.toString(), password.toString());

    } catch (error) {
      notice.set({ show: true, message: error.message, type: "error" });
      signingIn = false;
    }
  }

  function onSignUp(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    signingIn = true;
    const data = getFormData(event);

    if (data.password === data.confirm_password) {
      try {
        auth
          .signUpWithEmail(
            data.name.toString(),
            data.email.toString(),
            data.password.toString()
          )
          .then(async () => {
            signingIn = false;
            await goto("/verification");
          });
      } catch (err) {
        console.log(err);
        notice.set({ show: true, message: err.message, type: "error" });

      }
    } else {
      notice.set({clientError: "Confirm password does not match!", show: false})
      signingIn = false;
    }
  }

</script>

{#if !browser || !$auth.known}
  <div class="py-2">
    <span class="spinner-border" />
  </div>
{:else}
  <div class="container py-4 d-grid align-items-center form-container">
    <div>
      <div
        class="col p-2 rounded-2 shadow max-width-800 mx-auto position-relative"
      >
        {#if signingIn}
          <div
            class="position-absolute top-0 w-100 h-100 d-grid justify-content-center align-items-center bg-light bg-opacity-50"
          >
            <span class=" spinner-border text-primary" />
          </div>
        {/if}

        <Tabs>
          <TabList>
            <Tab><b>Login</b></Tab>
            <Tab><b>Sign up</b></Tab>
          </TabList>

          <TabPanel>
            <h2 class="pt-3">LOGIN</h2>
            <form on:submit|preventDefault={onLogin}>
              <input
                class="form-control my-3 rounded-0 py-2"
                type="email"
                name="email"
                placeholder="E-mail"
                required
              />
              <input
                class="form-control my-3 rounded-0 py-2"
                type="password"
                name="password"
                placeholder="password"
                required
              />
              <button class="btn btn-primary rounded-0 px-5" type="submit">
                Login
              </button>
            </form>
            <div>
              <button class="btn mb-2">Forgot password ?</button>
            </div>
            <br />
          </TabPanel>

          <TabPanel>
            <h2 class="pt-3">SIGN UP</h2>
            <p>Please fill up ths form to create an account</p>
            <form on:submit|preventDefault={onSignUp}>
              <input
                type="text"
                max="20"
                min="3"
                name="name"
                placeholder="Name"
                class="form-control my-3 rounded-0 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                class="form-control my-3 rounded-0 py-2"
                required
              />

              <input
                class="form-control my-3 rounded-0 py-2"
                type="password"
                name="password"
                placeholder="Password"
                required
              />

              <input
                class="form-control my-3 rounded-0 py-2"
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                required
              />
              {#if $notice && $notice.clientError}
                <div
                  class="d-flex align-items-center justify-content-between my-2 alert alert-danger"
                >
                  <span class="p-1">{$notice.clientError}</span>
                  <button class="btn btn-close" on:click={() =>notice.set({clientError:null, show: false})} />
                </div>
              {/if}
              <button class="btn btn-primary rounded-0 px-5" type="submit">
                Sign up
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  </div>
{/if}

<style>
  .form-container {
    width: 100vw;
    height: 80vh;
  }
</style>
