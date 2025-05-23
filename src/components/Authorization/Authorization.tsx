import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/libs/UI'
import { Button } from '@/libs/UI/CustomTags'
import { useLogin } from '@/services/API/auth/hook'
import { useAuthStore } from '@/store/authStore/authStore'
import s from './Authorization.module.scss'

const Authorization = () => {
	const navigate = useNavigate()
	const { setLogin, isAuthenticated } = useAuthStore()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorPassword, setErrorPassword] = useState<string | null>(null)
	const [errorUsername, setErrorUsername] = useState<string | null>(null)

	const { mutateAsync: loginMutate } = useLogin({ setLogin })

	const validateFields = () => {
		let isValid = true

		if (!username) {
			setErrorUsername('Поле обязательно для заполнения')
			isValid = false
		} else {
			setErrorUsername(null)
		}

		if (!password) {
			setErrorPassword('Поле обязательно для заполнения')
			isValid = false
		} else {
			setErrorPassword(null)
		}

		return isValid
	}

	const handleSignIn = async () => {
		if (!validateFields()) {
			return
		}

		try {
			await loginMutate({ username, password })
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard')
		} else {
			navigate('/')
		}
	}, [isAuthenticated])

	return (
		<div className={s.wrapper}>
			<div className={s.login}>
				<p className={s.title}>Вход</p>
				<div className={s.form}>
					<Input
						type="text"
						placeholder="Никнейм"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						error={errorUsername}
					/>

					<Input
						type="password"
						placeholder="Пароль"
						icon
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={errorPassword}
					/>

					<div className={s.buttons}>
						<Button type="primary" onClick={handleSignIn}>
							Войти
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Authorization
