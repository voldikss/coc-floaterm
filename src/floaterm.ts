import {
  workspace,
  ListAction,
  ListContext,
  ListItem,
  Neovim,
  BasicList
} from 'coc.nvim'

export default class Floaterm extends BasicList {
  public readonly name = 'floaterm'
  public readonly description = 'CocList for vim-floaterm'
  public readonly defaultAction = 'open'
  public actions: ListAction[] = []

  constructor(nvim: Neovim) {
    super(nvim)

    this.addAction('open', async (item: ListItem) => {
      await this.nvim.call('floaterm#terminal#open', item.data)
    })

    this.addAction('preview', async (item: ListItem, context) => {
      const bufnr = item.data
      const bufinfo = await this.nvim.call('getbufinfo', bufnr)
      const lnum = bufinfo[0]['lnum']
      let lines: string[] = await this.nvim.call('getbufline', [bufnr, Math.max(lnum - 10, 0), '$'])
      lines = lines.slice(Math.max(lines.length - 10, 0))
      await this.preview({
        sketch: true,
        filetype: 'floaterm_preview',
        lines
      }, context)
    })
  }

  public async loadItems(_context: ListContext): Promise<ListItem[]> {
    const list: ListItem[] = []
    const loaded_floaterm = await this.nvim.eval('exists("*floaterm#buflist#gather")')
    if (loaded_floaterm.valueOf() == 0) return []


    const buffers = await this.nvim.call('floaterm#buflist#gather')
    for (const bufnr of buffers) {
      const bufinfo = await this.nvim.call('getbufinfo', bufnr)
      const bufname = bufinfo[0]['name']
      const term_title = await this.nvim.call('getbufvar', [bufnr, 'term_title'])
      list.push({
        label: `${bufnr}    ${bufname}    ${term_title}`,
        data: bufnr
      })
    }
    return list
  }

  public doHighlight(): void {
    let { nvim } = workspace
    nvim.pauseNotification()
    nvim.command('syntax match FloatermBufnr /\\v^.*\\v%4v/', true)
    nvim.command('hi def link FloatermBufnr Constant', true)
    nvim.command('syn match FloatermInfo /\\v%4v.*$/', true)
    nvim.command('hi def link FloatermInfo Statement', true)
    nvim.resumeNotification().catch(_e => {
      // nop
    })
  }
}
