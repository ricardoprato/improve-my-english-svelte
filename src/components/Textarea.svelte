<script>
  import { isValidInput } from "./store.js";
  import { checkIsEnglish } from "../lib/ia.js";
  import { debounceLeading } from "../lib/util";

  const processChange = debounceLeading((e) => handleChange(e));

  const handleChange = async (e) => {
    const { value } = e.target;
    const isValid = value.length > 7;
    if (!isValid) {
      isValidInput.set(false);
      return;
    }
    const isEnglish = await checkIsEnglish(value);
    isValidInput.set(isEnglish);
  };
</script>

<textarea
  on:input={processChange}
  class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
  id="result"
  placeholder="Put your English to improve"
  name="result"
  rows="5"
  cols="40"
/>
