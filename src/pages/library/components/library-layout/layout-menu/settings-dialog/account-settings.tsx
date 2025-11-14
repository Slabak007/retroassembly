import { Button, Callout, Card } from '@radix-ui/themes'
import type { FormEvent } from 'react'
import { useLoaderData } from 'react-router'
import useSWRMutation from 'swr/mutation'
import { client } from '@/api/client.ts'
import { AccountFormField } from '@/pages/components/account-form-field.tsx'
import { SettingsTitle } from './settings-title.tsx'

const { $patch } = client.auth.password

function validateFormData(formData: FormData) {
  if (formData.get('new_password') !== formData.get('repeat_new_password')) {
    throw new Error('Heslo nesouhlasí')
  }
  if (formData.get('new_password') === formData.get('password')) {
    throw new Error('Heslo je stejné jako původní')
  }
  return {
    new_password: `${formData.get('new_password')}`,
    password: `${formData.get('password')}`,
  }
}

export function AccountSettings() {
  const { currentUser } = useLoaderData()
  const accountFormFields = [
    {
      defaultValue: currentUser.username,
      iconClass: 'icon-[mdi--user-card-details]',
      label: 'Uživatelské jméno',
      name: 'username',
      readOnly: true,
    },
    { iconClass: 'icon-[mdi--password]', label: 'Současné heslo', name: 'password', type: 'password' },
    { iconClass: 'icon-[mdi--password-add]', label: 'Nové heslo', name: 'new_password', type: 'password' },
    {
      iconClass: 'icon-[mdi--password-check]',
      label: 'Opakujte nové heslo',
      name: 'repeat_new_password',
      type: 'password',
    },
  ] as const

  const {
    data,
    error,
    isMutating,
    trigger: handleSubmit,
  } = useSWRMutation(
    { endpoint: 'auth/password', method: 'patch' },
    async (_key, { arg: event }: { arg: FormEvent<HTMLFormElement> }) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const form = validateFormData(formData)
      return await $patch({ form })
    },
  )

  return (
    <div>
      <SettingsTitle>
        <span className='icon-[mdi--password]' />
        Heslo
      </SettingsTitle>
      <Card>
        <form className='lg:w-xl flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='grid-cols-2 grid-rows-2 gap-4 lg:grid'>
            {accountFormFields.map((field) => (
              <AccountFormField key={field.name} size='2' {...field} />
            ))}
          </div>
          <div className='pl-2 text-xs opacity-50'>
            Doporučení: 10+ znaků, kombinace písmen, čísel a symbolů.
          </div>
          <Button className='!mt-2' loading={isMutating} type='submit'>
            <span className='icon-[mdi--password-check]' />
            Aktualizovat heslo
          </Button>

          {data ? (
            <Callout.Root className='mt-4'>
              <Callout.Icon>
                <span className='icon-[mdi--check]' />
              </Callout.Icon>
              <Callout.Text>Vaše heslo bylo aktualizováno</Callout.Text>
            </Callout.Root>
          ) : null}

          {error ? (
            <Callout.Root className='mt-4'>
              <Callout.Icon>
                <span className='icon-[mdi--information]' />
              </Callout.Icon>
              <Callout.Text>{error.message || 'Neznámá chyba'}</Callout.Text>
            </Callout.Root>
          ) : null}
        </form>
      </Card>
    </div>
  )
}
