import "./styles/changeStatusButton.css"
import axios from "axios";
import {ClientsTableRow} from "./clientsTableRow";

export const ChangeStatusButton = ({client_accountID, setStatus}) => {
    const chooseStatusButton = (event) => {
        const chooseBar = event.target.querySelector("#chooseStatus")
        if (chooseBar)
            chooseBar.classList.toggle("show");
    }

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    const changeStatus = (status) => {
        axios.post('http://localhost:8000/set_status', {
            accountID: client_accountID,
            new_status: status
          })
          .then(response => console.log(response))
          .catch(function (error) {
            console.log(error);
          });
        setStatus(status);
    }

    return (
        <div className="dropdown">
            <button onClick={chooseStatusButton} className="dropbtn">
                Смена статуса
                <div id="chooseStatus" className="dropdown-content">
                    <a onClick={() => changeStatus(0)}>Не в работе</a>
                    <a onClick={() => changeStatus(1)}>В работе</a>
                    <a onClick={() => changeStatus(2)}>Отказ</a>
                    <a onClick={() => changeStatus(3)}>Сделка закрыта</a>
                </div>
            </button>
        </div>
    )
}