<script lang='ts'>
import App from "../App.svelte";
import Auth from "../components/Auth.svelte";

  export let params = {msg: ""};
</script>

<h1 class='w3-jumbo w3-center'>404</h1>
<p class='w3-large w3-center'>Not found</p>
<p class='w3-center w3-text-gray'>{params.msg || "The page you were attempting to reach... just no."}</p>