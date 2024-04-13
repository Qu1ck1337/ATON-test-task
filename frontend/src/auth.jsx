import axios from "axios";
import {ClientsTable} from "./components/clientsTable";
import {useState} from "react";

export const Auth = () => {
    const [clients, setClients] = useState([])

    const login = (event) => {
        event.preventDefault()

        const { elements } = event.target

        axios.post('http://localhost:8000/access', {
            login: elements['auth_login'].value,
            pass: elements['auth_pass'].value
      })
      .then(response => {
          setClients(response.data)
          document.querySelector("#form-block").classList.add("hide")
          document.querySelector("#clients-table").classList.remove("hide")
      })
      .catch(error => {
          alert("Неверный логин или пароль")
      });
    }

    return (
        <>
            <div id="form-block">
                <form id="auth" onSubmit={login}>
                    <h1>Авторизация</h1>
                    <label>Введите логин</label>
                    <input type="text" name="auth_login" placeholder="login" required/>
                    <label>Введите пароль</label>
                    <input type="password" name="auth_pass" placeholder="password" required/>
                    <button className="form_auth_button" type="submit" name="form_auth_submit">Войти</button>
                </form>
            </div>
            <div className="hide" id="clients-table">
                <ClientsTable clients={clients}/>
            </div>
        </>
    )
}