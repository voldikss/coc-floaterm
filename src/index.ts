import {
  commands,
  ExtensionContext,
  listManager,
  workspace,
  languages
} from 'coc.nvim'
import Floaterm from './floaterm'
import { FloatermCompletionProvider } from './completion'

export async function activate(context: ExtensionContext): Promise<void> {
  const { nvim } = workspace
  const { subscriptions } = context
  const config = workspace.getConfiguration('floaterm')

  if (config.get('enableCompletion')) {
    subscriptions.push(
      languages.registerCompletionItemProvider(
        'coc-floaterm',
        config.get('shortcut'),
        null,
        new FloatermCompletionProvider(nvim, config.get('patterns')),
        [],
        config.get<number>('priority')
      )
    )
  }

  subscriptions.push(
    commands.registerCommand(
      'floaterm.new', () => nvim.call('floaterm#run', ['new', 0, ''])
    )
  )

  subscriptions.push(
    commands.registerCommand(
      'floaterm.prev', () => nvim.call('floaterm#prev')
    )
  )

  subscriptions.push(
    commands.registerCommand(
      'floaterm.next', () => nvim.call('floaterm#next')
    )
  )

  subscriptions.push(
    commands.registerCommand(
      'floaterm.toggle', name => nvim.call('floaterm#toggle', name)
    )
  )

  subscriptions.push(
    commands.registerCommand(
      'floaterm.update', opts => nvim.call('floaterm#run', ['update', 0, opts])
    )
  )

  subscriptions.push(
    commands.registerCommand(
      'floaterm.send', name => nvim.call('floaterm#send', name)
    )
  )

  subscriptions.push(
    listManager.registerList(
      new Floaterm(nvim)
    )
  )
}
