<script lang="ts">
  import { fly } from "svelte/transition";

  let show = false;
  const categories = [
    {
      name: "Laptop stickers",
      link: "/",
      image: "/assets/thumbnail/laptop-stickers.jpg",
    },
    {
      name: "Posters",
      link: "/",
      image: "/assets/thumbnail/poster.jpg",
    },
    {
      name: "Custom t-shirts",
      link: "/",
      image: "/assets/thumbnail/custom-tshirts.jpg",
    },
    {
      name: "Hoodies",
      link: "/",
      image: "/assets/thumbnail/hoodies.jpg",
    },
    {
      name: "Gadgets and accessories",
      link: "/",
      image: "/assets/thumbnail/laptop-stickers.jpg",
    },
  ];
</script>

<div class="category-wrapper position-relative">
  <button
    on:click={() => (show = !show)}
    class="btn fw-bold d-flex align-items-center hover"
    ><small><span class="material-icons"> category </span></small> All categories
  </button>
  {#if show}
    <div
      transition:fly|local={{ y: 50, duration: 500 }}
      class="shadow rounded-2 p-2 bg-white categories max-width-500"
    >
      <div class="d-grid justify-content-center align-items-center mx-auto">
        {#each categories as category (category.name)}
          <div class="p-1 d-block">
            <a
              class="hover-1 category overflow-hidden rounded-3 mb-3 text-decoration-none"
              href={category.link}
            >
              <img
                class="w-100 max-width-180 rounded-3 overflow-hidden shadow-sm"
                src={category.image}
                alt={category.name}
              />
              <h6 class="mt-sm-3 p-1 mb-4 text-dark fw-bold">{category.name}</h6>
            </a>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  /* .category-wrapper:focus-within .categories {
        display: block;
    } */
  .btn {
    width: 100%;
  }
  a.category {
    display: grid;
    grid-template-columns: 50px auto;
    align-items: self-end;
    justify-content: space-between;
    border-bottom: 1px solid var(--bs-gray-400);
  }
  @media only screen and (min-width: 576px) {
    .categories {
      position: absolute;
      left: 0;
      min-width: 530px;
    }
    .categories > .d-grid {
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    }

    a.category {
      display: block;
      border-bottom: none;
    }
  }
</style>
