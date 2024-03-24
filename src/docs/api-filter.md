---
title: Filter API
description: The Filter API page provides documentation on the configuration options and usage of filters within GridCraft. Explore how to implement custom filtering functionality to refine data presentation in your SvelteKit applications.
date: '2024-3-24'
category: API
order: 3
categoryOrder: 4
published: true
---

### GridFilter API Documentation

This API enables the implementation of custom filtering functionality in GridCraft, allowing users to refine and interact with data displayed in data grids within SvelteKit applications.

| Property | Type                              | Description                                          |
|----------|-----------------------------------|------------------------------------------------------|
| key      | string                            | A unique identifier for the filter.                  |
| columns  | "all" \| string \| string[]       | Specifies the column(s) to apply the filter to.      |
| filter   | (columnValue: unknown, columnKey: string) => boolean | The filter function to determine whether a row should be included based on the column value. |
| active   | boolean                           | Indicates whether the filter is active or inactive. |
