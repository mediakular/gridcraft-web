---
title: Installation Guide
description: Learn how to quickly and easily install GridCraft in your SvelteKit application using npm, yarn, pnpm, or bun. Get started with the ultimate data grid table for your Svelte projects today!
date: '2024-3-20'
category: Setup
published: true
order: 2
categoryOrder: 2
---

<script lang="ts">
    import Tabs from "$lib/components/tabs/Tabs.svelte"
    import TabHeadItem from "$lib/components/tabs/TabHeadItem.svelte"
    import TabItem from "$lib/components/tabs/TabItem.svelte"
</script>

## Install GridCraft

You can install GridCraft in your SvelteKit application using npm, yarn, pnpm, or bun:

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
