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
      'floaterm.new', opts => nvim.call('floaterm#new', opts)
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
      'floaterm.update', opts => nvim.call('floaterm#update', opts)
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
