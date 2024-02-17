<p align="center">
    <img width="220" src="https://raw.githubusercontent.com/RokiiApp/developers/main/assets/icon.svg" />
</p>

<h1 align="center">@rokii/utils</h1>
<h4 align="center">Common tools for Rokii Plugin Developers</h4>

## Available Utils

### Memoize

```js
import { memoize }  from '@rokii/utils';

const fetchResults = memoize(() => {
  // Your long running function
})
```

Use `memoize` function for your long-running functions, like API-requests.

Under the hood it just uses [just-memoize](https://github.com/angus-c/just).
Check the documentation for more details.

### Search

```js
import { search } from '@rokii/utils';

// Filter your results array
const results = search(arr, 'something', (el) => el.key);

// Display filtered results
display(results);
```

Simple function to search in your collection:

`search = (items, term, toString = (item) => item) => {}`

Where

* `items` – your array of items;
* `term` – search term;
* `toString` – function to convert your collection item to string.

### ShellCommand

```js
import { shellCommand } from '@rokii/utils';

// Run your shell command
const result = await shellCommand('ls -la');
```

Simple function to run shell commands. It uses native `child_process` module.

## Related

* [Rokii](http://github.com/RokiiApp) – main repo for Cerebro app;

## License

MIT © [David Jiménez](https://dubis.dev)
