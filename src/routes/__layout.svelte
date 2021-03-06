<script lang="ts">
  import "../../static/styles/bootstrap.min.css";
  import "../../static/styles/global.css";
  import Nav from "../components/Nav.svelte";
  import { navigating } from "$app/stores";
  import Data from "../../static/data.json";
  import { FacebookIcon, InstagramIcon } from "../components/icons";
  import { auth } from "../utils/firebase/auth";
  import { browser } from "$app/env";
  import Modal from "../components/Modal.svelte";
  import Dropdown from "../components/Dropdown.svelte";
  import { notice } from "../utils/store";
  import Nprogress from "nprogress";
  import 'nprogress/nprogress.css'

  Nprogress.configure({minimum: 0.16})
  $: {
    if ($navigating) Nprogress.start()
    if (!$navigating) Nprogress.done()
  }

  function onImageFailure(e: Event) {
    (e.target as HTMLImageElement).src = "/assets/deckfailcat.png";
  }

  async function onSignOut() {
    try {
      Nprogress.start()
      await auth.signOut();
      Nprogress.done()
    } catch (error) {
      notice.set({ show: true, message: error.message, type: "error" });
      Nprogress.done()
    }
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Wendy+One&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Modal />

<div class="position-sticky top-0 bg-white shadow" style="z-index: 10;">
  <header class="d-flex p-1 pt-3">
    <div class="container d-flex justify-content-evenly align-items-center">
      <a
        href="/"
        class="d-flex justify-content-start align-items-center my-0 mx-0"
      >
        <img class="logo" src="/assets/logo.svg" alt="Recreational hazard" />
      </a>

      <div
        class="d-flex justify-content-evenly align-items-center w-100 mx-1 border rounded"
      >
        <input
          class="form-control border-0"
          placeholder="search for products"
          type="search"
        />
        <button class="btn bg-transparent d-flex">
          <span class="material-icons md-36"> search </span>
        </button>
      </div>

      <div class="d-flex align-items-center justify-content-evenly mx-1">
        {#if browser}
          {#if $auth.user}
            <Dropdown>
              <img
                class="avatar ratio cursor-pointer"
                slot="thumbnail"
                src={$auth.user.photoURL || "/assets/default-avatar.png"}
                on:error={onImageFailure}
                alt={$auth.user.displayName}
              />
              <div slot="list">
                <li class="fw-bold">{$auth.user.displayName}</li>
                <li><a class="un-a" href="/u"> My Account </a></li>
                <li><a class="un-a" href="/cart"> Cart </a></li>
                <li>
                  <button
                    class="btn outline-none p-0 d-flex align-items-center w-100"
                    on:click={onSignOut}
                  >
                    <span class="material-icons">logout</span> Log out
                  </button>
                </li>
              </div>
            </Dropdown>
          {:else}
            <a href="/auth" class="d-none d-sm-flex">
              <button
                class="btn btn-sm btn-primary d-none d-sm-flex align-items-center justify-content-evenly gap-1 rounded-0"
              >
                {#if !$auth.known}
                  <span class="spinner-border spinner-border-sm" />
                {:else}
                  <b>LOGIN</b><span class="material-icons">login</span>
                {/if}
              </button>
            </a>
          {/if}
        {/if}
      </div>
    </div>
  </header>
  <hr class="my-1" />
  <Nav known={$auth.known} />
</div>
<slot />
<footer class="text-white bg-dark pt-3 px-3">
  <div class="container">
    <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between gap-2">
      <div class="">
        <h2 class="py-1">Shop now</h2>
        <p class="text-justify max-width-500">
          Recreational Hazard is a foundation that offers customizing services
          for T-shirts, phone cases, laptop stickers, cards, polaroids, posters,
          mugs, framed posters, hoodies, outfits, and jerseys. Your requirements
          are our responsibility, and we guarantee the best quality at the
          lowest possible cost!
        </p>
      </div>
      <div>
        <h3 class="text-sm-end">Categories</h3>
        <div>
          <ul class="list-unstyled p-0 text-sm-end">
            {#each Data.category as category}
              <li class="py-1">{category.name}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    <hr />
    <div class="py-2 d-flex justify-content-between align-items-center">
      <img
        src="/assets/logo.svg"
        style="width: 100px; filter:invert(1)"
        alt="Recreational hazard's logo"
      />
      <div class="d-flex gap-3">
        <a
          class="d-block"
          href="https://www.facebook.com/groups/335811371130292"
        >
          <FacebookIcon style="width: 32px; height: auto;" />
        </a>
        <a class="d-block" href="/">
          <InstagramIcon style="width: 32px; height: auto;" />
        </a>
      </div>
    </div>
    <small>© All rights reserved. Developed Khandakar Shakib</small>
  </div>
</footer>

<style>
  .logo {
    height: 35px;
  }
  .ratio {
    aspect-ratio: 1;
  }
</style>
