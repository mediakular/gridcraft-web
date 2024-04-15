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
import { Grid, PrelineTheme /* Optional: GridFooter, GridPaging */ } from "@mediakular/gridcraft";
```
</Step>

<Step number=2 title="Modify Theme (Optional)">
Make changes to the theme as needed. For example, to customize the grid container component:

```typescript
let theme = PrelineTheme;
theme.grid.container = MyTableContainer;
```
</Step>

<Step number=3 title="Assign Theme">
Set the theme as property to your `Grid`, `GridFooter` or `GridPaging`:

```svelte
<Grid ... {theme} />
<GridFooter ... {theme} />
<GridPaging ... {theme} />
```
</Step>


## Switching Themes at Runtime

You can dynamically switch themes during runtime to provide users with different visual experiences. 
Here's an example of how to switch between `PlainTableTheme` and `PrelineTheme`:

```svelte
<script>
    import { Grid, GridFooter, PrelineTheme, PlainTableCssTheme } from "@mediakular/gridcraft";
    ...
    let theme = PlainTableCssTheme;
</script>

<button on:click={() => theme = PlainTableCssTheme}>Plain Css Theme</button>
<button on:click={() => theme = PrelineTheme}>Preline Theme</button>

<Grid ... {theme}/>
<GridFooter {theme}/>
```

## Using Predefined Themes
### PlainTableCss Theme

The PlainTableCSS is the default theme of GridCraft and offers a seamless solution for integrating customizable grid layouts into your projects. With support for both light and dark modes, this theme provides versatility and adaptability to suit your design preferences. By leveraging CSS classes and variables, you can effortlessly modify the appearance of your grid, ensuring it seamlessly integrates with your project's aesthetic.

#### Main Variables for Customization

In most cases it might be already sufficient to adjust the following main variables:

| Variable              | Default light | Default dark |
| --------------------- | ------------- | ------------ |
| --gc-main-color	      | #e2e8f0       | #1e293b      |
| --gc-secondary-color  | #f1f5f9       | #334155      |
| --gc-tertiary-color   | white         | #293647      |
| --gc-text-color       | #2a2a2a       | #e8e7e7      |
| --gc-color-selected   | #bae6fd88     | #155e75cc    |

To override these variables while accommodating dark mode, use the following approach:

```css
html { /* or :global(html) when in component context*/
    /* Light Mode */
    --gc-main-color: #e2e8f0;
    --gc-secondary-color: #f1f5f9;
    --gc-tertiary-color:white;
    --gc-text-color: #2a2a2a;
    --gc-color-selected: #bae6fd88;
}

html.dark { /* or :global(html.dark) when in component context*/
    /* Dark Mode */
    --gc-main-color: #1e293b;
    --gc-secondary-color: #334155;
    --gc-tertiary-color: #293647;
    --gc-text-color: #e8e7e7;
    --gc-color-selected: #155e75cc;
}
```

#### Additional Customization Variables

<details>
  <summary>Show all additional variables</summary>

  | Variable                           | Default Value                      | Description                                       |
  |------------------------------------|------------------------------------|---------------------------------------------------|
  | --gc-transitions                   | all 0.2s ease-in-out              | Transition effect for grid elements               |
  | --gc-table-bg-color                | var(--gc-main-color)              | Background color of the grid table                |
  | --gc-table-color                   | var(--gc-text-color)              | Text color of the grid table                      |
  | --gc-table-header-bg-color         | var(--gc-main-color)              | Background color of the grid table header          |
  | --gc-table-radius                  | 5px                                | Border radius of the grid table                   |
  | --gc-th-padding                    | 0.5rem 0.75rem                    | Padding for table header cells                    |
  | --gc-th-gap                        | 0.25rem                            | Gap between table header cells                    |
  | --gc-th-color                      | var(--gc-text-color)              | Text color of table header cells                  |
  | --gc-th-text-transform             | uppercase                          | Text transformation of table header text          |
  | --gc-th-text-align                 | left                               | Text alignment of table header text               |
  | --gc-th-font-size                  | small                              | Font size of table header text                    |
  | --gc-th-tr-border                  | 1px solid var(--gc-secondary-color)| Border style for table header cells               |
  | --gc-td-padding                    | 0.5rem 0.75rem                    | Padding for table data cells                      |
  | --gc-td-text-align                 | left                               | Text alignment of table data cells                |
  | --gc-td-text-align-checkbox        | center                             | Text alignment of checkbox in table data cells    |
  | --gc-td-content-font-size          | small                              | Font size of table data content                   |
  | --gc-td-content-color              | var(--gc-text-color)              | Text color of table data content                  |
  | --gc-td-content-color-odd          | var(--gc-text-color)              | Text color of odd-numbered table rows             |
  | --gc-tr-border                     | 1px solid var(--gc-main-color)    | Border style for table rows                       |
  | --gc-tr-bg-color                   | var(--gc-secondary-color)         | Background color of table rows                    |
  | --gc-tr-bg-color-odd               | var(--gc-secondary-color)         | Background color of odd-numbered table rows       |
  | --gc-tr-bg-color-selected          | var(--gc-color-selected)          | Background color of selected table rows           |
  | --gc-tr-groupby-border             | 1px solid var(--gc-secondary-color)| Border style for grouped table rows              |
  | --gc-tr-groupby-bg-color           | var(--gc-main-color)              | Background color of grouped table rows            |
  | --gc-td-groupby-content-color     | var(--gc-text-color)              | Text color of content in grouped table rows       |
  | --gc-td-groupby-padding            | 0.5rem 0.75rem                    | Padding for content in grouped table rows         |
  | --gc-td-groupby-gap                | 0.25rem                            | Gap between content in grouped table rows         |
  | --gc-tr-groupby-selected-bg        | var(--gc-color-selected)          | Background color of selected grouped table rows   |
  | --gc-footer-gap                   | 1rem                                | Gap size for footer elements                      |
  | --gc-footer-justify               | flex-end                           | Justification for footer elements                 |
  | --gc-footer-margin                | 0.5rem 0                           | Margin for footer elements                        |
  | --gc-footer-padding               | 0.5rem 0.75rem                     | Padding for footer elements                       |
  | --gc-footer-border-radius         | 0.25rem                            | Border radius for footer elements                 |
  | --gc-footer-font-size             | 0.875rem                           | Font size for footer elements                     |
  | --gc-footer-button-gap            | 0.5rem                              | Gap size between footer buttons                   |
  | --gc-footer-button-border-radius  | 0.25rem                            | Border radius for footer buttons                   |
  | --gc-footer-button-padding        | 0.5rem 0.75rem                     | Padding for footer buttons                        |
  | --gc-footer-bg-color              | var(--gc-secondary-color)          | Background color for footer                        |
  | --gc-footer-border                | 1px solid var(--gc-main-color)     | Border style for footer                            |
  | --gc-footer-color                 | var(--gc-text-color)               | Text color for footer elements                     |
  | --gc-footer-button-bg-color       | var(--gc-secondary-color)          | Background color for footer buttons                |
  | --gc-footer-button-border         | 1px solid var(--gc-secondary-color)| Border color for the footer buttons                 |
</details>

<details>
  <summary>Show all additional variables css code</summary>

  ```css
  --gc-transitions: all 0.2s ease-in-out;

  --gc-table-bg-color: var(--gc-main-color);
  --gc-table-color: var(--gc-text-color);
  --gc-table-header-bg-color: var(--gc-main-color);
  --gc-table-radius: 5px;

  --gc-th-padding: 0.5rem 0.75rem;
  --gc-th-gap: 0.25rem;
  --gc-th-color: var(--gc-text-color);
  --gc-th-text-transform: uppercase;
  --gc-th-text-align: left;
  --gc-th-font-size: small;
  --gc-th-tr-border: 1px solid var(--gc-secondary-color);

  --gc-td-padding: 0.5rem 0.75rem;
  --gc-td-text-align: left;
  --gc-td-text-align-checkbox: center;

  --gc-td-content-font-size: small;
  --gc-td-content-color: var(--gc-text-color);
  --gc-td-content-color-odd: var(--gc-text-color);

  --gc-tr-border: 1px solid var(--gc-main-color);
  --gc-tr-bg-color: var(--gc-secondary-color);
  --gc-tr-bg-color-odd: var(--gc-secondary-color);
  --gc-tr-bg-color-selected: var(--gc-color-selected);

  --gc-tr-groupby-border: 1px solid var(--gc-secondary-color);

  --gc-tr-groupby-bg-color: var(--gc-main-color);
  --gc-td-groupby-content-color: var(--gc-text-color);
  --gc-td-groupby-padding: 0.5rem 0.75rem;
  --gc-td-groupby-gap: 0.25rem;
  --gc-tr-groupby-selected-bg: var(--gc-color-selected);

  --gc-footer-gap: 1rem;
  --gc-footer-justify: flex-end;
  --gc-footer-margin: 0.5rem 0;
  --gc-footer-padding: 0.5rem 0.75rem;
  --gc-footer-border-radius: 0.25rem;
  --gc-footer-font-size: 0.875rem;

  --gc-footer-button-gap: 0.5rem;
  --gc-footer-button-border-radius: 0.25rem;
  --gc-footer-button-padding: 0.5rem 0.75rem;
  --gc-footer-bg-color: var(--gc-secondary-color);
  --gc-footer-border: 1px solid var(--gc-main-color);
  --gc-footer-color: var(--gc-text-color);
  --gc-footer-button-bg-color: var(--gc-secondary-color);
  --gc-footer-button-border: 1px solid var(--gc-secondary-color);
  --gc-footer-button-hover-bg-color: var(--gc-secondary-color);
  ```
</details>


### PlainTable Theme

The PlainTable theme is **not** your typical theme for GridCraft. Instead, it serves as a robust foundation for developers looking to create their own custom themes. Designed with simplicity and flexibility in mind, PlainTable provides a clean slate for theme development, offering a starting point for crafting unique and tailored grid designs. While not intended for direct usage, PlainTable empowers developers to dive into theme customization, unleashing their creativity to build themes that perfectly align with their project requirements.

Here you can find the code of the PlainTable theme [here on github](https://github.com/mediakular/gridcraft/tree/c7295346273f5dec5294cb8150f1066de24b5e36/src/lib/themes/plain-table).


### Preline Theme

The `PrelineTheme` is based on the design of [Preline](https://preline.co). 
To use the PrelineTheme, you need to install [Tailwind CSS](https://tailwindcss.com/docs/guides/sveltekit) and include the necessary Svelte components in your Tailwind configuration file, so all classes get indexed:

```typescript
export default {
  content: [
    ...
    './node_modules/@mediakular/gridcraft/dist/themes/preline/**/*.svelte'
    //or: './node_modules/@mediakular/gridcraft/dist/themes/**/*.svelte' in order to support all themes
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ...
  ],
}
```

### CardsPlus Theme

The CardsPlus theme follows the new approach of rendering rows as cards. The theme also uses [Tailwind CSS](https://tailwindcss.com/docs/guides/sveltekit), so you also need to include the necessary Svelte components in your Tailwind configuration file, so all classes get indexed:

```typescript
export default {
  content: [
    ...
    './node_modules/@mediakular/gridcraft/dist/themes/cards-plus/**/*.svelte' 
     //or: './node_modules/@mediakular/gridcraft/dist/themes/**/*.svelte' in order to support all themes
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

```svelte
<script>
  import { Grid, PlainTableTheme } from "@mediakular/gridcraft";
  import MyTableContainer from "$lib/components/grid/theme/MyTableContainer.svelte";

  let theme = PlainTableTheme;
  theme.grid.container = MyTableContainer;
</script>

<Grid ... {theme} />
```

This way, you can tailor the themes in GridCraft to meet the unique requirements of your application's design. Experiment with different themes and configurations to find the perfect fit for your project.

### Theme Structure

If you want to change certain parts of your chosen theme or if you want to create your own theme you can refer to the following `GridTheme` type:

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

## Creating a Custom Theme

If you want create your custom theme the best way to get started is to copy the `PlainTableTheme` theme. This theme is the most basic table theme, without any styles or classes and serves perfectly as a template for your own theme. 

You can copy `PlainTableTheme` into your own project and transform it to fit your needs.

Here you can find the code on [GitHub](https://github.com/mediakular/gridcraft/tree/master/src/lib/themes/plain-table).

After you have adapted the .svelte files of your template, you can change the name of your new theme in the index.ts file in the root of the theme: 

```typescript
const MyFirstTableTheme : GridTheme = {
    footer: Footer,
    paging: Paging,
    grid: {
        ...
    }
}

export default MyFirstTableTheme;
```

... and use it on your grid: 

```svelte
<script>
  import MyFirstTableTheme from "$lib/components/grid/theme/my-first-table-theme"

  let theme = MyFirstTableTheme;
</script>

<Grid ... {theme} />
```

