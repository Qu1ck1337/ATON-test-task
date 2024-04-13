import {ChangeStatusButton} from "./changeStatusButton";
import {useState} from "react";

export const ClientsTableRow = ({client}) => {
    const [status, setStatus] = useState(client[client.length - 1]);

    const StatusDecoder = (status) => {
        switch (status) {
            case 0:
                return ("Не в работе")
            case 1:
                return ("В работе")
            case 2:
                return ("Отказ")
            case 3:
                return ("Сделка закрыта")
        }
    }

    return (
        <tr>
            {client.slice(0, -1).map((val, key) => (<td key={key}>{val}</td>))}
            <td>{(StatusDecoder(status))}</td>
            <td><ChangeStatusButton client_accountID={client[0]} setStatus={setStatus}/></td>
        </tr>
    )
}