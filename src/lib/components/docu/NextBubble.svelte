<script lang="ts">
    export let title: string;
    export let description: string;
    export let link: string;
</script>


<a href="{link}" class="basis-0 flex-grow flex-wrap max-w-100 bg-gray-100 hover:bg-gray-200/50 dark:bg-gray-800 dark:hover:bg-gray-800/50 rounded-lg p-4 no-underline transition-colors">
    <h4 class="text-xs uppercase no-underline font-bold text-blue-800 dark:text-blue-200">{title}</h4>
    <p class="text-[1rem] leading-6 text-gray-700 dark:text-gray-300">{description}</p>
</a>