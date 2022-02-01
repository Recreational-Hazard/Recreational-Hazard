<script lang="ts">
  import { FacebookIcon, GoogleIcon } from "../components/icons";
  import { Tab, TabList, TabPanel, Tabs } from "../components/Tab";
  import { getFormData } from "../utils";
  import Modal from "../components/Modal.svelte";
  import { auth } from "../utils/firebase/auth";
  import { goto } from "$app/navigation";
  import { onDestroy } from "svelte";
  import { browser } from "$app/env";

  let error: { show: boolean; [key: string]: any } = { show: true };
  let signingIn = false;

  $: unsubscribe = auth.subscribe(async ({ user, known }) => {
    if (user) {
      if (!user.emailVerified) await goto("/verification");
      await goto("/"); //Might change it later...
    }
  });

  onDestroy(() => unsubscribe());

  function onLogin(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    const data = getFormData(event);
    /** */
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
        error = { ...err, message: err.message };
      }
    } else {
      error.clientError = "Confirm password does not match!";
      signingIn = false;
    }
  }

  async function googleSignIn() {
    try {
      signingIn = true;
      await auth.signInWith("google");
      signingIn = false;
    } catch (err) {
      console.log(err);
      error = { message: err.message, show: true };
      signingIn = false;
    }
  }

  async function facebookSignIn() {}

  function closeModal() {
    error = null;
  }
</script>

{#if error && error.show && error.message}

    <Modal>
      <h3 slot="heading"><b> Error occured </b></h3>
      <button
        class="btn btn-close p-2 rounded-circle bg-white"
        on:click={closeModal}
      />
      <p slot="content">{error.message}</p>
    </Modal>

{/if}

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
            <div class="text-center mb-2 hr-before hr-after">
              Or sign in with
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
              {#if error && error.clientError}
                <div
                  class="d-flex align-items-center justify-content-between my-2 alert alert-danger"
                >
                  <span class="p-1">{error.clientError}</span>
                  <button class="btn btn-close" on:click={closeModal} />
                </div>
              {/if}
              <button class="btn btn-primary rounded-0 px-5" type="submit">
                Sign up
              </button>
            </form>
            <div class="text-center hr-before hr-after my-2">
              Or sign up with
            </div>
          </TabPanel>
          <div class="mx-auto text-center">
            <button class="btn" on:click={googleSignIn}>
              <GoogleIcon style="width:45px; height:45px" />
            </button>
            <button class="btn" on:click={facebookSignIn}>
              <FacebookIcon style="width:45px; height:45px" />
            </button>
          </div>
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
