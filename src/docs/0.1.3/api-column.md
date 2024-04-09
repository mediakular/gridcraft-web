---
title: Column API
description: The Column API in GridCraft allows you to define and customize the columns for your data grid, offering various properties for column configuration and rendering.
date: '2024-3-24'
category: API
order: 2
categoryOrder: 4
published: true
---

## Column API Documentation

This API provides a comprehensive set of options for defining and customizing columns within a data grid, allowing for flexible and interactive presentation of data in SvelteKit applications.

### Properties

The GridColumn type in GridCraft represents the configuration options for defining columns in a data grid.

| Property        | Type                              | Default Value | Description         
|-----------------|-----------------------------------|---------------|----------------------------------------------------------|
| key             | string                            |               | The key or property name from the data object.           |
| title           | string                            | ""            | The title or label for the column. |
| visible         | boolean?                          | undefined     | Indicates whether the column is initially visible. |
| sortable        | boolean?                          | undefined     | Indicates whether the column is sortable. |
| width           | number \| string \| undefined     | undefined     | The width of the column.  |
| renderComponent | ComponentType \| undefined        | undefined     | The custom Svelte component for rendering the column.  |
| accessor        | (row: T) => unknown               | undefined     | The accessor function for accessing the column value.  |
| sortValue       | (row: T) => string \| number \| Date \| undefined | | The function to determine the value used for sorting the column. |

