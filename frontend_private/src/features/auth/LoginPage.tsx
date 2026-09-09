import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLogin } from './useLogin.ts'
import { loginSchema, type LoginFormValues } from './loginSchema'
import type { CurrentUser } from '../../types/auth.types.ts'

type LoginPageProps = {
  onLogin: (user: CurrentUser) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const loginMutation = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const loginResponse = await loginMutation.mutateAsync(data)
    onLogin(loginResponse.user)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <section className="w-full max-w-md border border-gray-300 bg-white p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-950">Đăng nhập</h1>
          <p className="mt-1 text-sm text-gray-600">Đăng nhập vào hệ thống quản trị.</p>
        </div>

        {loginMutation.error && (
          <p className="mb-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {loginMutation.error.message}
          </p>
        )}

        <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              {...register('phone')}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              aria-invalid={errors.phone ? 'true' : 'false'}
              className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-700"
              id="phone"
              inputMode="numeric"
              maxLength={10}
              type="tel"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-700" id="phone-error">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800" htmlFor="password">
              Mật khẩu
            </label>
            <input
              {...register('password')}
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={errors.password ? 'true' : 'false'}
              className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-700"
              id="password"
              maxLength={50}
              type="password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-700" id="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            className="w-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isSubmitting || loginMutation.isPending}
            type="submit"
          >
            {isSubmitting || loginMutation.isPending ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>
      </section>
    </main>
  )
}