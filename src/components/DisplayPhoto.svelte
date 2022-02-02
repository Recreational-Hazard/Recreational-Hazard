<script lang="ts">
  import { notice } from "../utils/store";
  import { compressImage } from "../utils/index";
  import { storage } from "../utils/firebase/storage";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { updateProfile } from "firebase/auth";
  import { auth } from "../utils/firebase/auth";
import { afterUpdate } from "svelte";

  afterUpdate(() => {
    console.log("Updated")
  })

  $: uploadPhoto = (e: Event) => {
    const file = (e.target as HTMLInputElement).files[0];

    compressImage(file, { output: "blob" }, (image) => {
      if (typeof image !== "string") {
        console.log((image as Blob).size);
        const storageRef = ref(
          storage,
          `user_profile/${$auth.user.uid}/display.${(
            image as Blob
          ).type.replace("image/", "")}`
        );

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            notice.set({
              show: true,
              message: `Uploading ${progress}%`,
              type: "notice",
            });
            switch (snapshot.state) {
              case "paused":
                notice.set({
                  show: true,
                  message: `Uploading paused at ${progress}%`,
                  type: "warning",
                });
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            notice.set({ show: true, message: error.message, type: "error" });
          },
          async () => {
            const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile($auth.user, { photoURL });
          }
        );
      }
    });
  };

  function onImageFailure (e: Event) {
    (e.target as HTMLImageElement).src = "/assets/deckfailcat.png"
  }
</script>

{#if $auth.user}
  <div class="my-2 mx-auto text-center">
    <div class="position-relative profile-pic mx-auto">
      <img
        class="w-100 border border-2 rounded-circle"
        src={$auth.user?.photoURL || "/assets/default-avatar.png"}
        on:error={onImageFailure}
        alt={$auth.user?.displayName || ""}
      />
      <div class="image-upload position-absolute change-icon">
        <label for="file-input" class="cursor-pointer">
          <svg
            viewBox="0 0 32 32"
            class="icon rounded-3 shadow-sm border-2 border"
          >
            <path
              d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
            />
          </svg>
        </label>
        <input
          id="file-input"
          type="file"
          on:change={uploadPhoto}
          accept="image/*"
        />
      </div>
    </div>
  </div>
{:else}
  <span class=" spinner-border" />
{/if}

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
  img {
    aspect-ratio: 1;
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
