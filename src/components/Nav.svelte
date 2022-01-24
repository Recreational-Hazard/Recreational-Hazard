<script lang="ts">
import CategoryDd from "./CategoryDD.svelte";

  const navItems: any[] = [
    { name: "All categories", type: "menu" },
    { name: "Home", href: "/", type: "link" },
    { name: "New", href: "/", type: "link" },
    { name: "Fashion", href: "/", type: "link" },
  ];
</script>

<div class="nav-container">
<div class="w-100 text-end container d-sm-none">
  <button class="btn btn-sm"><span class="material-icons">menu</span></button>
</div>

  <nav class="container-sm __nav align-items-center pb-1">
    <ul class="px-1 m-0 list-unstyled gap-3" tabindex="-1">
      {#each navItems as navItem}
        <li class="nav-item">
          {#if navItem.href}
            <a
              class="btn btn-sm d-flex align-items-center hover"
              href={navItem.href}
            >
              {#if navItem.icon}
              <small><span class="material-icons"> {navItem.icon} </span></small>
              {/if}
              {navItem.name}
            </a>
          {:else}
            {#if navItem.type === "menu"}
              <CategoryDd/>
            {/if}
          {/if}
        </li>
      {/each}
      <li class="nav-item mt-1">
        <a type="button" href="/auth"
          class="btn btn-sm btn-primary d-sm-none d-flex align-items-center justify-content-center gap-1"
        >
          <b>LOGIN</b><span class="material-icons">login</span>
        </a>
      </li>
    </ul>
  </nav>
</div>

<style>
  button,
  a {
    font-weight: bold;
    font-size: 1rem;
  }
  .__nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.4);
      height: 100vh;
      padding: 0;
      visibility: hidden;
      z-index: -1;
    }
    .__nav ul {
      height: 100%;
      background: white;
      max-width: 270px;
      transform: translateX(-100%);
      transition: all 0.5s ease;
      overflow:auto;
    }
    .__nav ul li {
      border-bottom: 1px solid var(--bs-gray-400);
    }
    .__nav ul li a {
      width: 100%;
    }
    .__nav ul li * {
      padding: 0.4rem 0;
    }
    .nav-container:focus-within .__nav {
      visibility: visible;
      z-index: 1;
    }
    .nav-container:focus-within .__nav ul {
      transform: none;
    }
  @media only screen and (min-width: 576px) {
    .__nav {
      position: relative;
      display: flex;
      background-color: transparent;
      height: auto;
      width: auto;
      z-index: 1;
      visibility: visible;
    }
    .__nav ul {
      background: transparent;
      max-width: 100%;
      display: flex;
      align-items: center;
      transform: none;
      overflow: unset;
    }
    .__nav ul li {
      border-bottom: none;
    }
  }
</style>
