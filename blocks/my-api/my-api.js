@import {div} from '../../scripts/dom-helper.js';

export default function decorate(block) {
    const url = "https://main--demo-eds--omprakashgupta1995.aem.page/anurag/anurag-api.json";
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
}