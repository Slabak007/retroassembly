import { AccountFormField } from '@/pages/components/account-form-field.tsx'

export function LoginFormFields({ register = false }: Readonly<{ register?: boolean }>) {
  return (
    <>
      <AccountFormField
        autoFocus
        description={register ? 'Např. johnsmith, admin' : ''}
        iconClass='icon-[mdi--user-card-details]'
        label='Uživatelské jméno'
        name='username'
      />

      <AccountFormField
        description={register ? 'Doporučení: 10 a více znaků, kombinace písmen, čísel a symbolů.' : ''}
        iconClass='icon-[mdi--password]'
        label='Heslo'
        name='password'
        type='password'
      />

      {register ? (
        <AccountFormField
          iconClass='icon-[mdi--password-check]'
          label='Opakujte heslo'
          name='repeat_password'
          type='password'
        />
      ) : null}
    </>
  )
}
