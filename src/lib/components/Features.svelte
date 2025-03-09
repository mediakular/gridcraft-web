<script lang="ts">
	import { Filter, Grid, Group, PaintBucket, RefreshCw, SortDesc } from "lucide-svelte";


    const features = [
        {
            "icon": Grid,
            "title": "Customizable Column Rendering",
            "description": "Tailor the appearance of your grid columns to match your data representation needs."
        },
        {
            "icon": Filter,
            "title": "Advanced Filtering",
            "description": "Effortlessly filter and refine your data to focus on what matters most."
        },
        {
            "icon": SortDesc,
            "title": "Sortable Columns",
            "description": "Enable users to sort data columns ascending or descending for better analysis."
        },
        {
            "icon": Group,
            "title": "Grouping Functionality",
            "description": "Group related data together for clearer insights and analysis."
        },
        {
            "icon": RefreshCw,
            "title": "Reactive Updates",
            "description": "All data, settings, and appearance are reactive and can be updated instantly."
        },
        {
            "icon": PaintBucket,
            "title": "Customizable Appearance",
            "description": "Personalize the visual style of your grid to match your application's design."
        }
    ];
</script>

<h2 class="block font-bold text-gray-200 text-3xl md:text-5xl lg:text-5xl mt-20">
    Features
</h2>

<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-12 mx-auto mb-20">
    <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-4 lg:gap-6">
            <div class="space-y-4 lg:space-y-6">
                {#each features.slice(0, 3) as feature}
                    <div class="flex bg-white/90 rounded-md p-6">
                        <feature.icon size="32" class="stroke-violet-600" />
                        <div class="ms-5 sm:ms-8">
                            <h3 class="text-base sm:text-lg font-semibold  bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                                {feature.title}
                            </h3>
                            <p class="mt-1 text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="space-y-4 lg:space-y-6">
                {#each features.slice(3, 6) as feature}
                    <div class="flex bg-white/90 rounded-md p-6">
                        <feature.icon size="32" class="stroke-violet-600" />
                        <div class="ms-5 sm:ms-8">
                            <h3 class="text-base sm:text-lg font-semibold  bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                                {feature.title}
                            </h3>
                            <p class="mt-1 text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>

        </div>
    </div>
</div>