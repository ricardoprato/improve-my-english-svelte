<script>
  export let text = "default value";
  export let icon = "";
  export let disabled = false;
  export let type = "button";
</script>

<button
  on:click
  {disabled}
  {type}
  class="py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
>
  {icon}
  {text}
</button>
