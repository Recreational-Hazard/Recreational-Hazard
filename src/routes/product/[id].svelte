<script context="module" lang="ts">
  import type { LoadInput } from "$utils/types/load";

  export async function load({ params, fetch, session, stuff }: LoadInput) {
    const url = `https://fakestoreapi.com/products/${params.id}`;
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          data: await res.json(),
        },
      };
    }
    return {
      status: res.status,
      error: new Error(`Could not load the page`),
    };
  }
</script>

<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import type { FlyParams } from "svelte/transition";
  import ReviewForm from "../../components/ReviewForm.svelte";
  import CommentSection from "../../components/CommentSection.svelte";
  import type { Product } from "src/utils/types";
  import { onMount } from "svelte";
  import Rating from "../../components/Rating.svelte";
  import NotFound from "../../components/Error.svelte";

  export let data:any;
  let product: Product;
  let showChart = false;
  const flyParam: FlyParams = { y: 300, duration: 400 };

  onMount(() => {
    product = {
      ...data,
      rating: data.rating?.rate,
    };
    console.log(product);
  });
  
</script>

<div class="container py-2">
  {#if product}
    {#if showChart}
      <div
        transition:fade
        class="position-fixed bg-dark bg-opacity-25 top-0 start-0 vw-100 vh-100 d-grid align-items-center justify-content-center"
      >
        <div transition:fly={flyParam}>
          <div class="text-end">
            <button
              class="btn btn-close fs-4 bg-white"
              aria-label="close"
              on:click={() => (showChart = false)}
            />
          </div>
          <img
            class="w-100"
            src="/assets/size-chart.jpg"
            alt="Size chart"
          />
        </div>
      </div>
    {/if}
    <div class="product">
      <div class="row">
        <div
          class="col-md-6 px-1 my-3 mx-auto d-flex align-items-center justify-content-center"
        >
          <img
            class="px-2 max-height-400"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div class="col-md-6">
          <h3 class="text-capitalize text-secondary">{product.category}</h3>
          <h1 class="py-2">{product.title}</h1>
          <p class="fs-5 my-2 text-danger"><b>Tk. {product.price} </b></p>
          <p class="my-2 py-3 px-1 text-justify fs-5 max-width-500">
            {product.description}
          </p>
          <form class="form-container" id="add-cart">
            <label class="form-label mt-2" for="size">Size:</label>
            <button
              class="btn btn-outline-info btn-sm"
              on:click|preventDefault={() => (showChart = true)}
            >
              view size chart</button
            >
            <select class="form-select" name="size" id="size" form="add-cart">
              <option value>Select size</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">X</option>
              <option value="xl">XXL</option>
            </select>
            <div
              class="my-2 d-flex gap-2 align-items-center justify-content-evenly"
            >
              <input
                class="form-control max-width-180"
                type="number"
                name="quantity"
                value={0}
                min={0}
                max="10"
              />
              <button class="btn btn-success w-100"> Add to cart </button>
            </div>
          </form>
        </div>
      </div>
      <hr class="position-relative" />
      <div class="my-2 p-2">
        <h6 class="fw-bold my-2">Overall rating:</h6>
        <h4 class="my-1">{product.rating} / 5</h4>
        <Rating rating={product.rating} />
      </div>
      <hr class="position-relative" />
      <div class="row my-2 py-1">
        <div class="col-md-6">
          <CommentSection />
        </div>
        <div class="col-md-6">
          <ReviewForm />
        </div>
      </div>
    </div>
    {:else}
    <NotFound/>
  {/if}
</div>
