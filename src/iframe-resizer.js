export function setAspectRatios(frames) {
    for (let i of frames) {
        if (i.hasAttribute("width") && i.hasAttribute("height")) {
            i.style.aspectRatio = i.getAttribute("width") + "/" + i.getAttribute("height")
        }
    }
}