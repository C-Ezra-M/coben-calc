import { addTocAndAnchorLinks } from "./toc";
import './toc.css';
import { setAspectRatios } from './iframe-resizer';

addTocAndAnchorLinks(document.querySelector("main"))
setAspectRatios(document.querySelectorAll("iframe"));