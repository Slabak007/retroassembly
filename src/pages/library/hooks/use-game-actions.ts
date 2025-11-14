import { useLocation } from 'react-router'

const actionsMap = {
  history: [
    {
      color: 'red',
      confirmDescription:
        'Opravdu chcete pokračovat?\nOdstraněnou položku historie nebude možné obnovit.\nROM související s touto položkou historie NEBUDE odstraněna.',
      icon: 'icon-[mdi--delete]',
      name: 'delete',
      text: 'Odstranit z historie',
      type: 'launch_records',
    },
  ],
  library: [
    {
      confirmDescription: '',
      icon: 'icon-[mdi--checkbox-multiple-marked]',
      name: 'select',
      text: 'Vybrat',
      type: '',
    },
    {
      color: 'red',
      confirmDescription: 'Opravdu chcete pokračovat?\nOdstraněné ROMy nebude možné obnovit.',
      icon: 'icon-[mdi--delete]',
      name: 'delete',
      text: 'Odstranit ROM',
      type: 'roms',
    },
  ],
} as const

export function useGameActions() {
  const { pathname } = useLocation()
  const pageType = pathname === '/library/history' ? 'history' : 'library'
  const actions = actionsMap[pageType]
  return { actions, pageType }
}
