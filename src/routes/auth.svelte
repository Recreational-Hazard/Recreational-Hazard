<script lang="ts">
  import { FacebookIcon, GoogleIcon } from "../components/icons";
  import { Tab, TabList, TabPanel, Tabs } from "../components/Tab";
  import { getFormData } from '../utils';

  function onLogin(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    const data = getFormData(event);
    /**
     * send to firebase
     */
  }

  function onSignUp(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    const data = getFormData(event);
    /**
     * send to firebase for sign up
     */
  }
</script>

<div class="container py-4 d-grid align-items-center form-container">
  <div>
    <div class="col p-2 rounded-2 shadow max-width-800 mx-auto">
      <Tabs>
        <TabList>
          <Tab><b>Login</b></Tab>
          <Tab><b>Sign up</b></Tab>
        </TabList>

        <TabPanel>
          <h2 class="pt-3">LOGIN</h2>
          <form on:submit|preventDefault={onLogin}>
            <input
              class="form-control my-3"
              type="email"
              name="email"
              placeholder="E-mail"
              required
            />
            <input
              class="form-control my-3"
              type="password"
              name="password"
              placeholder="password"
              required
            />
            <button class="btn btn-primary w-100" type="submit"> Login </button>
          </form>
          <div>
            <button class="btn mb-2">Forgot password ?</button>
          </div>
          <br />
          <div class="text-center mb-2 hr-before hr-after">Or sign in with</div>
          <br />
          <div class="mx-auto text-center">
            <button class="btn"> <GoogleIcon style="width:45px; height:45px" /> </button>
          <button class="btn"> <FacebookIcon style="width:45px; height:45px" /> </button>
          </div>
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
              class="form-control my-3"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              class="form-control my-3"
            />

            <input
              class="form-control my-3"
              type="password"
              placeholder="Password"
            />

            <input
              class="form-control my-3"
              type="password"
              placeholder="Confirm password"
            />
            <button class="btn btn-primary w-100" type="submit">
              Sign up
            </button>
          </form>
          <div class="text-center hr-before hr-after my-2">Or sign up with</div>
          <div class="mx-auto text-center">
              <button class="btn"> <GoogleIcon style="width:45px; height:45px" /> </button>
              <button class="btn"> <FacebookIcon style="width:45px; height:45px" /> </button>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  </div>
</div>

<style>
  .form-container {
    width: 100vw;
    height: 80vh;
  }
</style>
