# Svelte JSS

Use JSS for styling your Svelte and Sapper apps.

## Installation

`npm install svelte-jss --dev`

`yarn add svelte-jss --dev`

**Note**: it's important to install the package as a **dev dependency**, otherwise you will run into
a [weird error](https://github.com/sveltejs/sapper/issues/592).

## Use in Svelte

Svelte component example: `Input.svelte`
```svelte
<script>
  import { useStyles } from 'svelte-jss';
  const styles = useStyles({
    input: {
      border: '1px solid #eee',
      boxSizing: 'border-box',
      padding: '1em',
      '&:focus': {
        outline: 'none',
      },
      width: '100%',
    }
  });
</script>

<input class={styles.button} />
```

## Server Side Rendering with Sapper

To enable SSR of the JSS styles used in any of your Svelte components you just need
to render the `Jss` component **after** all other components like this:

For example in your `routes/_layout.svelte`:

```svelte
<script>
  import Jss from "svelte-jss/Jss.svelte";
</script>

<div class="container">
  <main>
    <slot></slot>
  </main>
  <Jss /> <!-- Include after all other components -->
</div>
```

`svelte-jss` ensures that only styles that are actually used are included in your SSR.
