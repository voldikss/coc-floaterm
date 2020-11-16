# coc-floaterm

coc.nvim extension for [vim-floaterm](https://github.com/voldikss/vim-floaterm)

![](https://user-images.githubusercontent.com/20282795/75005925-fcc27f80-54aa-11ea-832e-59ea5b02fc04.gif)

# Use cases

- CocCommand
- CocList for all opened floaterms
- Completion from opened floaterms

## Requirements

- [coc.nvim](https://github.com/neoclide/coc.nvim)
- [vim-floaterm](https://github.com/voldikss/vim-floaterm)

## Install

```
:CocInstall coc-floaterm
```

## Configurations

- `floaterm.enableCompletion`:
  default: `true` (Update: `false` now because this feature is supported from within vim-floaterm...)

- `floaterm.shortcut`:
  default: `"floaterm"`

- `floaterm.priority`:
  default: `5`

- `floaterm.patterns`: default: `{"*": []}`

  Javascript style regex patterns that defines the cursor position to enable autocomplete, empty array `[]` means to enable for whole buffer.

  For example, in order to enable completion only if the cursor is in the
  comment region in javascript file, set this option as follows

  ```jsonc
  "floaterm.patterns": {
    "javascript": [
      "^\\s*\\/\\/",
      "^\\s*\\/\\*",
      "^\\s*\\*"
    ]
  }
  ```

  The `*` in the default value `{"*": []}` means to enable autocomplete for all
  filetypes.

## Commands

- `:CocCommand floaterm.new`

- `:CocCommand floaterm.next`

- `:CocCommand floaterm.prev`

- `:CocCommand floaterm.toggle`

- `:CocCommand floaterm.update [opts]`

## CocList

Try `:CocList floaterm`

- `open`
- `preview`

## License

MIT
