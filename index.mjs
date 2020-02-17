import jss, { SheetsManager, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { onDestroy } from 'svelte';

jss.setup(preset());
const SSR_TAG_NAME = 'svelte-jss-ssr';
const registry = new SheetsRegistry();
const manager = new SheetsManager();

const addSheet = (styles) => {
  let sheet = manager.get(styles);
  if (!sheet) {
    sheet = jss.createStyleSheet(styles);
    registry.add(sheet);
    manager.add(styles, sheet);
  }
  return sheet;

};
const manageStyles = (styles) => {
  const sheet = addSheet(styles);
  // Attach sheet once + increment ref count
  manager.manage(styles);
  onDestroy(() => {
    // Decrement ref count + detach sheet if 0
    manager.unmanage(styles);
  });
  return sheet;
};

export const useStyles = (styles) => {
  if (!styles) throw new Error(`Cannot manage these styles: ${styles}`);
  return manageStyles(styles).classes;
};

export const getSSRStyleTag = () => {
  return `<style id="${SSR_TAG_NAME}">${registry.toString()}</style>`;
};

export const removeSSRStyleTag = () => {
  const ssrStyles = document.getElementById(SSR_TAG_NAME);
  ssrStyles.parentNode.removeChild(ssrStyles);
};
