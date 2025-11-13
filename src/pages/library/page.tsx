import { useLoaderData } from 'react-router'
import { GameListMain } from './components/game-list-main.tsx'
import LibraryLayout from './components/library-layout/library-layout.tsx'
import { PageStats } from './components/page-stats.tsx'
import { useIsDemo } from './hooks/use-demo.ts'
import { UploadSelectButton } from './platform/components/upload-select-button.tsx'

export default function LibraryPage() {
  const { page, pagination, platformCount, roms } = useLoaderData()
  const isDemo = useIsDemo()

  if (page > 1 && roms.length === 0) {
    return <>404</>
  }

  return (
    <LibraryLayout>
      <GameListMain>
        <div>
          <h1 className='text-5xl font-semibold'>Knihovna</h1>
          {isDemo ? (
            <div className='text-(--gray-11) mt-4 flex items-start gap-1 text-sm lg:items-center'>
              <span className='icon-[mdi--information-outline] mt-1 shrink-0 lg:mt-0' />
              <span>
                These free (legal) games are all picked from{' '}
                <a className='underline' href='https://retrobrews.github.io/' rel='noreferrer noopener' target='_blank'>
                  retrobrews project
                </a>{' '}
                for demonstration.
              </span>
            </div>
          ) : null}
        </div>

        {isDemo ? undefined : (
          <PageStats suffix={<UploadSelectButton />}>
            <span className='icon-[mdi--bar-chart] text-(--color-text)' />
            <span className='text-(--accent-9) font-semibold'>{pagination.total}</span> {pagination.total === 1 ? 'hra' : (pagination.total >= 2 && pagination.total <= 4 ? 'hry' : 'her')} pro{' '}
            <span className='text-(--accent-9) font-semibold'>{platformCount}</span>{' '}
            {platformCount === 1 ? 'platformu' : (platformCount >= 2 && platformCount <= 4 ? 'platformy' : 'platforem')} celkem.
          </PageStats>
        )}
      </GameListMain>
    </LibraryLayout>
  )
}
