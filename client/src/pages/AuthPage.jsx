import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {

    }
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {

    }
  }

  return (
    <div className='row'>
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card  blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder=""
                  id="email"
                  type="text"
                  name='email'
                  value={form.email}
                  className='yellow-input'
                  onChange={changHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field ">
                <input
                  placeholder=""
                  id="password"
                  type="password"
                  name='password'
                  className='yellow-input'
                  value={form.password}
                  onChange={changHandler}
                />
                <label htmlFor="password">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className='btn yellow darken-4'
              disabled={loading}
              onClick={loginHandler}
              style={{ marginRight: 10 }}> Войти</button>
            <button
              className='btn grey lighten-1 black-text'
              disabled={loading}
              onClick={registerHandler}
            > Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
