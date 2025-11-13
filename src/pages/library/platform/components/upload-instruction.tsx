import { Callout, Code } from '@radix-ui/themes'
import clsx from 'clsx'
import { platformMap, type PlatformName } from '@/constants/platform.ts'
import { getPlatformIcon } from '@/utils/client/library.ts'

export function UploadInstruction({ maxFiles, platform }: Readonly<{ maxFiles: number; platform: PlatformName }>) {
  return (
    <Callout.Root className={clsx({ hidden: status !== 'initial' })} size='1'>
      <Callout.Icon>
        <span className='icon-[mdi--information] mt-1.5' />
      </Callout.Icon>
      {/* @ts-expect-error the 'as' prop is valid here as it will be passed to a Text internally */}
      <Callout.Text as='div' className='flex flex-col gap-1 text-xs'>
        <p>
          Nahráváš ROM pro{' '}
          <img
            alt={platformMap[platform].displayName}
            className='inline-block size-7 align-middle'
            src={getPlatformIcon(platform)}
          />
          <b>{platformMap[platform].displayName}</b>. Podporované přípony pro tuto platformu:
          <br />
          <span className='inline-flex gap-1 py-2'>
            {platformMap[platform].fileExtensions.map((extention) => (
              <Code key={extention}>{extention}</Code>
            ))}
          </span>
        </p>

        {
          {
            arcade: (
              <p>
                Používej <b>Full Non-Merged ROMsets</b> pro lepší kompatibilitu.
              </p>
            ),
            gameandwatch: (
              <p>
                <span>
                  Games can be downloaded from{' '}
                  <a
                    className='underline'
                    href='https://buildbot.libretro.com/assets/cores/Handheld%20Electronic%20Game/'
                    rel='noreferrer noopener'
                    target='_blank'
                  >
                    buildbot.libretro.com
                  </a>
                  .
                </span>
              </p>
            ),
            pcengine: (
              <p>
                Note that <b>PC Engine CD</b> games are NOT supported.
              </p>
            ),
          }[platform]
        }

        <p>
          Můžeš nahrávat <b>{maxFiles}</b> souborů současně.
        </p>
      </Callout.Text>
    </Callout.Root>
  )
}
