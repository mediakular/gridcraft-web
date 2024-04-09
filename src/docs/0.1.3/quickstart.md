---
title: Quickstart Guide
description: Get up and running with GridCraft in no time with our Quickstart Guide. Learn how to install, configure, and integrate GridCraft into your SvelteKit application effortlessly. Start organizing, manipulating, and visualizing your data with ease today!
date: '2024-3-20'
category: Setup
order: 1
categoryOrder: 2
published: true
---
<script lang="ts">
    import Tabs from "$lib/components/tabs/Tabs.svelte"
    import TabHeadItem from "$lib/components/tabs/TabHeadItem.svelte"
    import TabItem from "$lib/components/tabs/TabItem.svelte"
    import Step from "$lib/components/docu/Step.svelte"
    import LearnNext from "$lib/components/docu/LearnNext.svelte"
    import NextBubble from "$lib/components/docu/NextBubble.svelte"
</script>

## Quickstart for GridCraft

Welcome to the Quickstart Guide for GridCraft! Follow these simple steps to get started with GridCraft in your SvelteKit application.

### Installation

<Step number=1 title="Install package">
  First, we install GridCraft in your SvelteKit application using npm, yarn, pnpm, or bun.
  <Tabs cssClasses="code-only" cssClassesContent="">
    <div slot="header">
        <TabHeadItem index="1" active={true}>npm</TabHeadItem>
        <TabHeadItem index="2">yarn</TabHeadItem>
        <TabHeadItem index="3">pnpm</TabHeadItem>
        <TabHeadItem index="4">bun</TabHeadItem>
    </div>
    <span slot="content">
        <TabItem index="1">

```bash title="terminal"
npm install @mediakular/gridcraft
```
        </TabItem>
        <TabItem index="2">

```bash title="terminal"
yarn add @mediakular/gridcraft
```
        </TabItem>
        <TabItem index="3">

```bash title="terminal"
pnpm add @mediakular/gridcraft
```
        </TabItem>
        <TabItem index="4">

```bash title="terminal"
bun add @mediakular/gridcraft
```
        </TabItem>
    </span>
  </Tabs>

</Step>


<Step number=2 title="Use the Grid Component">
Now, we reference `Grid` from `@mediakular/gridcraft` and feed the grid with data.

```svelte title="+page.svelte"
<script> 
  import { Grid } from '@mediakular/gridcraft';

  export let data;
  let clients: Client[] = data.clients;
</script>

<Grid bind:data={clients} />
```
</Step>

<Step number=3 title="Done!">
  This will produce a Table with default style and all properties available in the `Client` interface.
</Step>

<LearnNext>
  <NextBubble title="Columns" description="Learn how to customize your columns" link="/docs/columns" />
  <NextBubble title="Paging" description="Learn how to include paging to grid" link="/docs/paging" />
  <NextBubble title="Theming" description="Learn how to style your table" link="/docs/theming" />
</LearnNext>