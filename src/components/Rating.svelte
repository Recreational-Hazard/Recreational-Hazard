<script lang="ts">
import { nameToRgba } from "../utils";


  type Size = "small" | "medium" | "large";
  export let size: Size = "medium";
  export let color="gold";

  let className = "";
  export { className as class };
  export let rating = 0;

  $: partialRatingColor = () => {
    let rgbaVal = nameToRgba(color);
    if (rgbaVal[1] >= 70)
      rgbaVal[1] -= 70;
    else if (rgbaVal[2] >= 70)
      rgbaVal[2] -=70
    else
      rgbaVal[1] = 0;
    
      return `rgba(${rgbaVal.toLocaleString()})`
  }  
</script>

  <div
    class="d-flex gap-2 rate max-width-500"
  >
    {#each Array(5) as _, i}
      <svg
        class={className}
        viewBox="0 0 32 32"
        height={size === "small" ? 12 : size === "large" ? 48 : 36}
        width={size === "small" ? 12 : size === "large" ? 48 : 36}
        fill={rating >= i+1 ? color : (i+1 - rating) > 0 && (i+1 - rating) < 1 ? partialRatingColor() : "grey"}
      >
        <path
          d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"
        />
      </svg>
    {/each}
  </div>
