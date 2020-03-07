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

<input class={styles.input} />
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
  
  <!-- Include after all other components -->
  <Jss />

</div>
```

`svelte-jss` ensures that only styles that are actually used are included in your SSR.

## How to configure JSS

Setup JSS plugins before any components using jss are mounted.
E.g: in the script area of the `_layout.svelte` component:

```svelte
<script>
  import jss from 'jss';
  import jssPresetDefault from 'jss-preset-default';
  jss.setup(jssPresetDefault());
</script>

<!-- Your components -->
```
