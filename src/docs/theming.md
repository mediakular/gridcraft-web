---
title: Theming
description: Explore the possibilities of theming in GridCraft data grid tables. Learn how to customize the appearance of your grid to match your application's design and branding, creating a cohesive user experience in your SvelteKit applications.
date: '2024-3-21'
category: Features
order: 7
categoryOrder: 3
published: true
---
<script lang="ts">
    import Step from "$lib/components/docu/Step.svelte"
</script>

## Introduction to Theming in GridCraft

GridCraft provides a powerful theming system that allows you to customize the appearance of your data grid tables to suit your application's design and branding. Each theme in GridCraft is represented by an object containing a defined structure of Svelte components. 

!> GridCraft doesn't render any HTML code or text. The entire structure is provided by themes.

This means, you have full access to the structure of the rendered grid and you can modify existing themes or create your own to achieve the desired look and feel and html structure.

## Using Themes

<Step number=1 title="Import Theme">
Begin by importing the necessary theme components from GridCraft.

```typescript
import { Grid, PlainTableTheme } from "@mediakular/gridcraft";
```
</Step>

<Step number=2 title="Modify Theme (Optional)">
Make changes to the theme as needed. For example, to customize the grid container component:

```typescript
let theme = PlainTableTheme;
theme.grid.container = MyTableContainer;
```
</Step>

<Step number=3 title="Assign Theme">
Assign the (modified) theme to the appropriate component properties.

```svelte
<Grid ... {theme} />
<GridFooter ... {theme} />
```
</Step>


## Switching Themes at Runtime

You can dynamically switch themes during runtime to provide users with different visual experiences. 
Here's an example of how to switch between `PlainTableTheme` and `PrelineTheme`:

```svelte
<script>
    import { Grid, GridFooter, PrelineTheme, PlainTableTheme } from "@mediakular/gridcraft";
    ...
    let theme = PlainTableTheme;
</script>

<button on:click={() => theme = PlainTableTheme}>Plain Theme</button>
<button on:click={() => theme = PrelineTheme}>Preline Theme</button>

<Grid ... {theme} />
<GridFooter ... {theme} />
```

## Using PrelineTheme

The `PrelineTheme` is designed to enhance the visual appeal of your data grid tables. To use the PrelineTheme, you need to install [Tailwind CSS](https://tailwindcss.com/docs/guides/sveltekit) and include the necessary Svelte components in your Tailwind configuration file:

```typescript
export default {
  content: [
    ...
    './node_modules/@mediakular/gridcraft/dist/themes/preline/*.svelte'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ...
  ],
}
```

## Overwriting Existing Themes

You can also overwrite existing themes to make specific changes without creating a completely new theme. Here's an example of how to modify a theme by replacing the grid container component:

```typescript
import MyTableContainer from "$lib/components/grid/theme/MyTableContainer.svelte";

let theme = PlainTableTheme;
theme.grid.container = MyTableContainer;
```

In this way, you can tailor the themes in GridCraft to meet the unique requirements of your application's design. Experiment with different themes and configurations to find the perfect fit for your project.

### Theme Structure

```typescript
export type GridTheme = {
    grid: {
        container: ComponentType;
        header: {
            container: ComponentType,
            row: ComponentType,
            content: ComponentType,
            checkbox: ComponentType,
            sortIndicator: ComponentType,
        },
        groupby: {
            container: ComponentType,
            checkbox: ComponentType,
            cell: ComponentType,
            content: ComponentType,
            rowsCount: ComponentType,
        },
        body: {
            container: ComponentType,
            row: ComponentType,
            cell: ComponentType,
            checkbox: ComponentType,
            content: ComponentType
        }
    }
    footer: ComponentType;
    paging: ComponentType;
}
```