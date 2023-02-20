<script>
  import Button from "./Button.svelte";
  import { isValidInput } from "./store.js";
  import { ImproveMyEnglish } from "../lib/ia";
  // import Loading from "./icons/loading.svelte";
  let promise = null;
  const handleClick = async () => {
    const input = document.getElementById("result").value;
    promise = ImproveMyEnglish(input);
    document.getElementById("result").value = "";
  };
</script>

{#if promise === null}
  <Button
    on:click={handleClick}
    disabled={!$isValidInput}
    type="button"
    text="Please, improve my English"
  />
{:else}
  {#await promise}
    <Button disabled="true" type="button" text="Loading" />
  {:then data}
    <Button
      on:click={handleClick}
      disabled={!$isValidInput}
      type="button"
      text="Another One"
    />
    <p>
      output:
      <span class="text-bold text-slate-600">
        {data}
      </span>
    </p>
  {/await}
{/if}

{#if !$isValidInput}
  <strong class="text-red-800"
    >You're not using English or the input is too short!</strong
  >
{/if}
