# mist
> A tiny language to convert lists to my spec.js HTML format.

Input:
```
- Hello
- World
  - Foo bar
    baz qux
    oof rab

  # Foo bar
  - test
    - example
```

Output:
```html
<span class="list">
  <span>Hello</span>
  <span>World
    <span class="list">
      <span>Foo bar baz qux oof rab</span>
      <span>test
        <span class="list">
          <span>example</span>
        </span>
      </span>
    </span>
  </span>
</span>
```

## Installation
```shell
$ npm install --save-dev jamen/mist
```

## Usage
Pipe in list(s), get HTML out.

```shell
$ mist < spec.mist > spec.html
```
```shell
$ <input_command> | mist > spec.html
```

Use as a module.

```javascript
var input = /* some mist data */

// Individual functions
var tokens = mist.tokenize(input);
var ast = mist.transform(tokens);
var output = mist.resolve(ast);

// Simplify the process into one function
var output = mist.render(input);
```

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
