export type NestedArray<T> = Array<T | NestedArray<T>>;

export interface Options {
    /** CSS selector for headings. */
    selector?: string,
    useInnerText?: boolean,
    tocSelector?: string,
}

export const defaultOptions: Options = {
    selector: 'h2, h3, h4, h5, h6',
    useInnerText: true,
    tocSelector: '#toc'
}

export const Headings = {
    levels: ["H1", "H2", "H3", "H4", "H5", "H6"], // tag names are all-caps
    /** 
        Returns a positive value if the first heading is at a higher level, 0 for the same level, and negative for lower.
    */
    compareLevels(a: string, b: string) {
        const a_id = this.levels.indexOf(a)
        const b_id = this.levels.indexOf(b)
        return b_id - a_id
    },
    numericLevel(a: string) {
        return this.levels.indexOf(a)
    }
}

export function addToc(container: HTMLElement, options?: Options) {
    const foundToc = document.querySelector<HTMLElement>({...defaultOptions, ...options ?? {}}.tocSelector as string);
    const headings = getHeadings(container, options);
    let wrapper: HTMLElement;
    if (foundToc === null) {
        wrapper = document.createElement("nav")
        wrapper.id = "toc"
        wrapper.before(headings[0])
    } else {
        wrapper = foundToc;
    }
    wrapper.classList.add("toc")
    const tag = document.createElement("strong")
    tag.id = "toc-header"
    tag.innerText = "Table of contents"
    wrapper.setAttribute("aria-describedby", "toc-header")
    wrapper.appendChild(tag)
    const list = document.createElement("ul")
    wrapper.appendChild(list)
    list.classList.add("toc-list")
    for (let i of headings) {
        const link = document.createElement("a")
        link.href = "#" + encodeURIComponent(i.id)
        if ({...defaultOptions, ...options}.useInnerText) {
            link.innerText = i.innerText
        } else {
            link.innerHTML = i.innerHTML
        }
        const linkWrapper = document.createElement("li")
        linkWrapper.appendChild(link)
        linkWrapper.classList.add("link-" + i.tagName.toLowerCase())
        list.appendChild(linkWrapper)
    }
}

export function getHeadings(container: HTMLElement, options?: Options) {
    return container.querySelectorAll<HTMLElement>({...defaultOptions, ...options ?? {}}.selector as string)
}

export function addAnchorLinksToHeaders(container: HTMLElement, options?: Options) {
    for (let i of getHeadings(container, options)) {
        const wrapper = document.createElement("div")
        wrapper.classList.add()
    }
}