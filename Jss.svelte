<script>
  import { onMount } from 'svelte';
  import { getSSRStyleTag, removeSSRStyleTag } from './index';
  const jssStyleTag = getSSRStyleTag();
  onMount(removeSSRStyleTag);
</script>

<svelte:head>
  {@html jssStyleTag}
</svelte:head>
