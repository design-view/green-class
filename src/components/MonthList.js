import { Link } from "react-router-dom";
import useFetch from "../hook/useFetch";
export default function MonthList(){
    const months = useFetch('http://localhost:3003/months');
    console.log(months);
    return(
        <div className="monthlist">
            <ul>
                {months.map(month =>(
                    <li key={month.id}><Link to={`/page2/${month.month}`}>{month.month}</Link></li>  
                ))}
            </ul>
        </div>
    );
}
