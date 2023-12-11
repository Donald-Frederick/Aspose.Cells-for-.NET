import { ReadableStream } from 'node:stream/web'
import { ReadableStream as ReadableStreamPolyfill} from 'web-streams-polyfill';

Object.defineProperties(globalThis, {
    ReadableStream: { value: ReadableStream || ReadableStreamPolyfill },
})