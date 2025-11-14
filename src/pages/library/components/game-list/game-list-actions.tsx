import { Button } from '@radix-ui/themes'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useSelectedGames } from '../../atoms.ts'
import { useRoms } from '../../hooks/use-roms.ts'
import { DeleteDialog } from './delete-dialog.tsx'

export function GameListActions() {
  const { roms } = useRoms()
  const [selectedGames, setSelectedGames] = useSelectedGames()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <AnimatePresence>
      {selectedGames.length > 0 ? (
        <motion.div
          animate={{ height: 'auto', opacity: 1 }}
          className='flex justify-between px-4'
          exit={{ height: 0, opacity: 0 }}
          initial={{ height: 0, opacity: 0 }}
        >
          <div className='flex items-center gap-2'>
            <span className='icon-[mdi--order-checkbox-ascending]' />
            <span>
              Vybráno:  <span className='text-(--accent-9) font-semibold'>{selectedGames.length}</span>{' '}
              {selectedGames.length === 1 ? 'hra' : (selectedGames.length >= 2 && selectedGames.length <= 4 ? 'hry' : 'her')}
            </span>

            <AnimatePresence>
              {selectedGames.length < roms.length ? (
                <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} layout>
                  <Button onClick={() => setSelectedGames(roms.map(({ id }) => id))} type='button' variant='soft'>
                    <span className='icon-[mdi--check-all]' />
                    Vybrat vše
                  </Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className='flex gap-2'>
            <Button onClick={() => setDeleteDialogOpen(true)} type='button' variant='soft'>
              <span className='icon-[mdi--delete]' />
              Odstranit vybrané {selectedGames.length} {selectedGames.length === 1 ? 'ROM' : 'ROMs'}
            </Button>
            <DeleteDialog onOpenChange={setDeleteDialogOpen} open={deleteDialogOpen} />

            <Button onClick={() => setSelectedGames([])} type='button' variant='soft'>
              <span className='icon-[mdi--close]' />
              Zrušit
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
