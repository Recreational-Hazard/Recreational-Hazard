<script lang="ts">
    import Reviews from '../../static/assets/client-reviews/client-reviews.json';
    function spiralPosition(i: number, position: string []): string {
       if ( i%2 ) {
           return position[0]
       }
       else
        return position[1]
    }
</script>

<div class="py-4 px-1">
    <h2 class="my-1 fw-bold mx-2 h1 font-wendy text-center"> And what's our client's response ? </h2>
    <div class="py-2 my-2 d-flex overflow-auto gap-3 align-items-stretch scrollbar">
        {#each Reviews as review, i}
            <div class="p-1 review position-relative">
                {#if review.photo}
                <img src={review.photo} alt="Review Product" class="max-height-400 review-photo"
                    style={`margin: ${spiralPosition(i, ["-2.5rem", "2.5rem"])} 0 0 3.5rem;`} />
                {/if}
                <div class="d-flex gap-2 align-items-start position-absolute bg-light rounded-2 shadow"
                 style={`top: ${review.photo ? spiralPosition(i, ["200px", "100px"]) : "0px"}`}>
                    <img class="client-avatar" src={review['reviewer-img']} alt={review.reviewer}/>
                    <div>
                        <p><b> {review.reviewer} </b>
                            <br/>
                            <small class="text-secondary"> {review.date} </small>
                        </p>
                        <p class="pl-3 py-2 pe-1 text-justify small content"> {review.content} </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .client-avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
    .review {
        min-width: 350px;
    }
    .review .content {
        white-space: pre-line;
    }
</style>