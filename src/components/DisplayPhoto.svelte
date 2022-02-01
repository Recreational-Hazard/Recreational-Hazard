<script lang="ts">
//   import { auth } from "../utils/firebase/auth";
//   import { updateProfile } from "firebase/auth";
  import { compressImage } from "../utils";

  export let photoURL = "";
  export let displayName = "";

  function onUpload(e: Event) {
    // const files = (e.target as HTMLInputElement).files;
    // console.log(files);
    // compressImage(files[0], async (imgData) => {
        
    // });
  }
</script>

<div class="my-2 mx-auto text-center">
  <div class="position-relative profile-pic mx-auto">
    <img
      class="w-100 border border-2 rounded-circle"
      src={photoURL || "/assets/default-avatar.png"}
      alt={displayName || ""}
    />
    <div class="image-upload position-absolute change-icon">
      <label for="file-input">
        <svg
          viewBox="0 0 32 32"
          class="icon rounded-3 shadow-sm border-2 border"
        >
          <path
            d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
          />
        </svg>
      </label>
      <!-- <input id="file-input" type="file" on:change={onUpload} /> -->
    </div>
  </div>
</div>

<style>
  .icon {
    background-color: white;
    display: inline-block;
    width: 2.3em;
    height: 1.9em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }
  .profile-pic {
    max-width: 120px;
    height: auto;
  }
  .change-icon {
    bottom: 0;
    transform: translate(10px, -10px);
  }
  .image-upload > input {
    display: none;
  }
</style>
