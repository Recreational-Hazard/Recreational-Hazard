<script context="module" lang="ts">
  export type TAB = {
    id: number;
  };
  export type Panel = {};

  export const TABS = {
    registerTab: Function,
    registerPanel: Function,
    selectTab: Function,
    selectedTab: null,
    selectedPanel: null,
  };
</script>

<script lang="ts">
  import { setContext, onDestroy } from "svelte";
  import { writable } from "svelte/store";

  let className = "";
  export {className as class};

  const tabs: TAB[] = [];
  const panels: Panel[] = [];
  const selectedTab = writable(null);
  const selectedPanel = writable(null);

  setContext(TABS, {
    registerTab: (tab: TAB) => {
      tabs.push(tab);
      selectedTab.update((current: TAB) => current || tab);

      onDestroy(() => {
        const i = tabs.indexOf(tab);
        tabs.splice(i, 1);
        selectedTab.update((current: TAB) =>
          current === tab ? tabs[i] || tabs[tabs.length - 1] : current
        );
      });
    },

    registerPanel: (panel: Panel) => {
      panels.push(panel);
      selectedPanel.update((current: Panel) => current || panel);

      onDestroy(() => {
        const i = panels.indexOf(panel);
        panels.splice(i, 1);
        selectedPanel.update((current: Panel) =>
          current === panel ? panels[i] || panels[panels.length - 1] : current
        );
      });
    },

    selectTab: (tab: TAB) => {
      const i = tabs.indexOf(tab);
      selectedTab.set(tab);
      selectedPanel.set(panels[i]);
    },
    selectedTab,
    selectedPanel,
  });
</script>

<div class={`tabs ${className}`}>
  <slot />
</div>
