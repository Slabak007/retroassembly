import { clsx } from 'clsx'
import { range } from 'es-toolkit'
import { getPlatformDeviceBackground, getRomLibretroThumbnail } from '@/utils/client/library.ts'
import { DemoFocusIndicator } from './demo-focus-indicator.tsx'
import rewindImage from './rewind-image.png'

const features = [
  {
    content: (
      <div className='*:motion-preset-pulse *:motion-duration-1000 bg-(--gray-4) flex size-full items-center justify-evenly bg-cover bg-center'>
        <span className='icon-[logos--chrome] size-14 ' />
        <span className='icon-[logos--microsoft-edge] motion-delay-100 size-14' />
        <span className='icon-[logos--safari] motion-delay-200 size-14' />
        <span className='icon-[logos--firefox] motion-delay-300 size-14' />
      </div>
    ),
    description: 'Hraj retro hry přímo ve svém prohlížeči bez dalšího softwaru.',
    icon: 'icon-[mdi--web-box]',
    title: 'Hraní v prohlížeči',
  },
  {
    content: (
      <div className='relative flex size-full flex-col justify-center'>
        <div className='grid size-full grid-cols-3 grid-rows-3 rounded'>
          {['nes', 'snes', 'megadrive', 'gb', 'gba', 'gamegear', 'atari2600', 'arcade'].map((platform) => (
            <div className='overflow-hidden' key={platform}>
              <img
                alt={platform}
                className={clsx('size-full scale-110 object-contain object-center')}
                loading='lazy'
                src={getPlatformDeviceBackground(platform)}
              />
            </div>
          ))}
          <div className='text-(--accent-9) flex items-center justify-center text-center font-semibold'>
            ...a další
          </div>
        </div>
      </div>
    ),
    description: 'Podpora široké škály retro herních systémů.',
    icon: 'icon-[mdi--dice-multiple]',
    title: 'Podpora více platforem',
  },
  {
    content: (
      <div
        className='flex size-full items-center justify-center gap-2'
        style={{
          background:
            'radial-gradient(circle, transparent 20%, var(--color-background) 20%, var(--color-background) 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, var(--color-background) 20%, var(--color-background) 80%, transparent 80%, transparent) 25px 25px, linear-gradient(var(--gray-5) 2px, transparent 2px) 0 -1px, linear-gradient(90deg, var(--gray-5) 2px, var(--color-background) 2px) -1px 0',
          backgroundSize: '50px 50px, 50px 50px, 25px 25px, 25px 25px',
        }}
      >
        <span className='icon-[noto--laptop] size-16' />
        <span className='icon-[svg-spinners--bars-scale-middle] w-12 opacity-50' />
        <span className='icon-[noto--cloud] size-16' />
        <span className='icon-[svg-spinners--bars-scale-middle] w-12 opacity-50' />
        <span className='icon-[noto--desktop-computer] size-16' />
      </div>
    ),
    description: 'Synchronizujte své hry a stavy a přistupujte k nim odkudkoli.',
    icon: 'icon-[mdi--cloud]',
    title: 'Cloudová synchronizace',
  },
  {
    content: (
      <div className='grid h-full grid-cols-3 place-items-center gap-2'>
        {[
          { name: "Kirby's Adventure (USA)", platform: 'nes' },
          { name: 'Gunstar Heroes (USA)', platform: 'genesis' },
          { name: 'Pitfall II - Lost Caverns (USA)', platform: 'atari2600' },
        ].map(({ name, platform }) => (
          <div className='aspect-square overflow-hidden rounded bg-neutral-200' key={name}>
            <img
              alt={name}
              className='size-full object-contain'
              loading='lazy'
              src={getRomLibretroThumbnail({ libretroGame: { name }, platform })}
            />
          </div>
        ))}
      </div>
    ),
    description: 'Automaticky stahuje obaly her pro lepší vizuální zážitek z knihovny.',
    icon: 'icon-[mdi--drawing-box]',
    title: 'Automatické stahování obalů',
  },
  {
    content: (
      <div className='relative size-full'>
        <div className='grid size-full grid-cols-3 grid-rows-2'>
          {range(6).map((i) => (
            <div className='rounded p-1' key={i}>
              <div className='bg-(--gray-4) flex size-full items-center justify-center rounded'>
                <span className='icon-[twemoji--star] size-12' />
              </div>
            </div>
          ))}
        </div>
        <DemoFocusIndicator />
      </div>
    ),
    description: 'Pohybujte se bez myši pomocí klávesnice nebo gamepadu.',
    icon: 'icon-[mdi--controller-round]',
    title: 'Navigace pro klávesnici/gamepad',
  },
  {
    content: (
      <div className='relative size-full'>
        <div
          className='rewind-demo size-full animate-[rewind-demo-background-move_30s_linear_infinite] bg-cover'
          style={{
            backgroundImage: `url("${rewindImage}")`,
          }}
        />
        <div className='absolute left-0 top-0 flex size-full items-center justify-center'>
          <span className='icon-[svg-spinners--clock] rotate-x-180 size-32 opacity-50' />
        </div>
      </div>
    ),
    description: (
      <>
        Přehrávejte hru zpět pomocí klávesy "R" na klávesnici nebo kombinace tlačítek na gamepadu (<kbd>Select</kbd> + <kbd>L2</kbd>
        ).
      </>
    ),
    icon: 'icon-[mdi--clock-arrow]',
    title: 'Přehrávání zpět',
  },
]

export function FeaturesSection() {
  return (
    <section className='relative'>
      <h2
        className='text-(--accent-9) border-b-(--gray-4) border-t-(--gray-4) mb-6 flex items-center justify-center gap-2 border border-transparent py-8 text-4xl font-[Roboto_Slab_Variable] font-semibold lg:py-16'
        style={{
          textShadow: range(1, 5)
            .map((number) => `${number}px ${number}px 1px var(--accent-7)`)
            .join(','),
        }}
      >
        <span className='icon-[mdi--gift]' />
        Funkce
      </h2>

      <ul className='flex flex-col'>
        {features.map((feature, index) => (
          <li className={clsx('py-8 lg:py-12', { 'bg-(--gray-3)': index % 2 })} key={feature.title}>
            <article
              className={clsx(
                'lg:w-5xl mx-auto flex w-full flex-col gap-6 px-8 lg:flex lg:flex-row lg:justify-center lg:gap-10',
                {
                  'lg:flex-row-reverse': index % 2,
                },
              )}
            >
              <div className='flex flex-1 items-center'>
                <div>
                  <header>
                    <h3 className='text-(--accent-9) mb-2 flex items-center gap-2 text-xl font-semibold lg:text-2xl'>
                      <span className={clsx(feature.icon, 'text-3xl lg:text-6xl')} />
                      <span>{feature.title}</span>
                    </h3>
                  </header>
                  <p className='lg:pl-17 text-(--color-text)/60 pl-10 text-lg font-light'>{feature.description}</p>
                </div>
              </div>

              <div className='lg:flex lg:items-center lg:justify-center'>
                <figure className='bg-(--color-background) ring-(--color-text)/10 rounded p-2 ring-1'>
                  <div className='lg:w-100 aspect-5/3 lg:h-60'>{feature.content}</div>
                  <figcaption className='sr-only'>Demo nebo vizualizace pro {feature.title}</figcaption>
                </figure>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
