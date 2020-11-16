import {
  CompletionItemProvider,
  Neovim,
  workspace,
} from 'coc.nvim'
import {
  CompletionItem,
  CompletionItemKind,
  Position,
  Range,
  TextDocument
} from 'vscode-languageserver-protocol'

export class FloatermCompletionProvider implements CompletionItemProvider {

  constructor(private nvim: Neovim, private patterns) { }

  public async provideCompletionItems(document: TextDocument, position: Position): Promise<CompletionItem[]> {
    const loaded_floaterm = await this.nvim.eval('exists("*floaterm#buflist#gather")')
    if (loaded_floaterm.valueOf() == 0) return []

    const { languageId, uri } = document

    const patterns = this.patterns['*'] || this.patterns[languageId]
    if (!patterns) return []

    const doc = workspace.getDocument(uri)
    if (!doc) return []

    const wordRange = doc.getWordRangeAtPosition(Position.create(position.line, position.character - 1))
    if (!wordRange) return []

    const word = document.getText(wordRange)
    const linePre = document.getText(Range.create(Position.create(position.line, 0), position))
    if (!patterns.length || patterns.some(p => new RegExp(p).test(linePre))) {
      return this.gatherCandidates(word)
    }
    return []
  }

  private async gatherCandidates(word: string): Promise<CompletionItem[]> {
    const words: string[] = []
    const buffers = await this.nvim.call('floaterm#buflist#gather')
    for (const buffer of buffers) {
      const lnum = await this.nvim.eval(`getbufinfo(${buffer})[0]['lnum']`)
      const lines: string[] = await this.nvim.call('getbufline', [buffer, Math.max(0, Number(lnum) - 100), '$'])
      words.push(...[].concat(...lines.map(line => line.split(' '))))
    }
    return [...new Set(words)]
      .filter(w => new RegExp(word).test(w))
      .map<CompletionItem>(word => ({
        label: word,
        kind: CompletionItemKind.Text,
        insertText: word,
      }))
  }
}
