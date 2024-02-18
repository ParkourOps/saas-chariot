export default (src: string) => new URL(src, import.meta.url).href;

