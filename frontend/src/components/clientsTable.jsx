import {ClientsTableRow} from "./clientsTableRow";
import './styles/clientsTable.css'

export const ClientsTable = ({clients}) => {
    return (
        <table id="client_table" className="">
            <caption>
                Список клиентов
            </caption>
            <thead>
            <tr>
                <th scope="col">Номер счёта</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Имя</th>
                <th scope="col">Отчество</th>
                <th scope="col">Дата рождения</th>
                <th scope="col">ИНН</th>
                <th scope="col">Статус</th>
                <th scope="col">Действие</th>
            </tr>
            </thead>
            <tbody id="table_rows">
            {clients.map((client, key) => (<ClientsTableRow client={client} key={key}/>))}
            </tbody>
        </table>
    )
}