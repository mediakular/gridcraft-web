---
title: Grid API
description: Delve into the comprehensive API documentation for GridCraft's data grid component. Learn about all available properties and their functionalities, empowering you to fine-tune and optimize your data grid tables in SvelteKit applications.
date: '2024-3-21'
category: API
order: 1
categoryOrder: 4
published: true
---

## Grid Component API Documentation

The Grid component in GridCraft offers a comprehensive set of properties and functionalities to customize and manage data grids in SvelteKit applications.

### Properties

| Property            | Type                        | Default       | Description                  |
|---------------------|-----------------------------|---------------|------------------------------|
| data                | Iterable‹T› \| ArrayLike‹T› |  []           | The data to be displayed in the grid. |
| dataUnpaged         | Iterable‹T› \| ArrayLike‹T› |  []           | Same as data but not cut for paging. Used for exports.|
| columns             | GridColumn‹T›[]             |  []           | An array of column definitions for the grid. |
| filters             | GridFilter[]                |  []           | An array of filter definitions to apply to the grid data. |
| groupBy             | string                      |  ""           | The default grouping column for the grid. |
| sortByColumn        | string                      |  ""           | The column used for sorting the grid data.  |
| itemsPerPage        | number                      |  10           | The number of items to display per page.  |
| sortOrder           | number                      |  1            | The sort order for the grid data (1 for ascending, -1 for descending). |
| currentPage         | number                      |  1            | The current page of the grid. |
| totalPages          | number                      |  0            | The total number of pages in the grid.|
| totalResults        | number                      |  0            | The total number of results in the grid. |
| showCheckboxes      | boolean                     |  false        | Indicates whether checkboxes for row selection are displayed.|
| groupsExpandedDefault | boolean                   |  true         | Determines whether group headers are expanded by default.|
| selectedRows        | T[]                         |  []           | An array of selected rows in the grid. |
| theme               | GridTheme                   |  PlainTableTheme  | The theme applied to the grid component. |

