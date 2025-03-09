<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
	import { afterUpdate } from "svelte";
    import { browser } from "$app/environment";
    import ClipboardJS from 'clipboard';
    import Header from "$lib/components/Header.svelte";

    function updateTOC() {
        var fragment = document.createDocumentFragment();
        const tableOfContents = document.getElementsByClassName('toc');
        if (tableOfContents.length > 0) {
            fragment.appendChild(tableOfContents[0]);
            document.getElementById('toc')?.appendChild(fragment);
        }
    }

    function modifyCodeBlocks() {
        document.querySelectorAll('pre').forEach(function (codeBlock) {
            const parent = codeBlock.parentNode;
            const titleElem = parent?.querySelectorAll('[data-remark-code-title="true"]');

            if (titleElem && titleElem.length > 0) {
                codeBlock.classList.add('code-with-title');
                codeBlock.append(titleElem[0]);
            }

            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.type = 'button';

            const code = codeBlock.querySelector('code');
            const text = code?.innerText || "";
            button.setAttribute('data-clipboard-text', text);
            button.innerText = 'Copy';
            
            codeBlock.appendChild(button);
        });

        var clipboard = new ClipboardJS('.copy-code-button');

        clipboard.on('success', function(e) {
            e.trigger.textContent = 'Copied!';
            window.setTimeout(function() {
                e.trigger.textContent = 'Copy';
            }, 2000);
            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            e.trigger.textContent = 'Error :(';
            window.setTimeout(function() {
                e.trigger.textContent = 'Copy';
            }, 2000);
            e.clearSelection();
        });
    }

    function initScrollSpy() {
        const headings = document.querySelectorAll('h2, h3');

        window.addEventListener('scroll', function() {
            
            // Get the current scroll position
            const scrollPosition = window.scrollY;
            
            headings.forEach((heading) => {
                // Get the top position of the heading
                const headingTop = (heading as HTMLElement).offsetTop;
                
                // Check if the scroll position is within the heading
                if (scrollPosition + 20 >= headingTop) {
                    // Add 'active' class to the corresponding navigation link
                    const navLinks = document.querySelectorAll('nav.toc a');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href')?.substring(1) === heading.id) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        });
    }

    afterUpdate(() => {
        if (browser) {
            updateTOC();
            initScrollSpy();
            modifyCodeBlocks();
        }
    })
</script>

<Header isDocs={true}/>
<slot />