import {
  commands,
  ExtensionContext,
  listManager,
  workspace
} from 'coc.nvim'
import Floaterm from './floaterm'

export async function activate(context: ExtensionContext): Promise<void> {
  const { nvim } = workspace
  const { subscriptions } = context

  subscriptions.push(
    commands.registerCommand(
      'floaterm.new', shell => nvim.call('floaterm#new', shell)
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
      'floaterm.toggle', () => nvim.call('floaterm#toggle')
    )
  )

  subscriptions.push(
    listManager.registerList(
      new Floaterm(nvim)
    )
  )
}
