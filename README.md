# mist
> A tiny language to convert lists to my spec.js HTML format.

Input:
```
- Hello
- World
  - Foo bar
    baz qux
```

Output:
```html
<span class="list">
  <span>Hello</span>
  <span>World
    <span class="list">
      <span>Foo bar baz qux</span>
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

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
