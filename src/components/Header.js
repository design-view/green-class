import { Link } from "react-router-dom";
export default function Header(){
    return(
        <div className="header">
            <h1><Link to="/">그린컴퓨터 수업과정</Link></h1>
            <ul>
                <li><Link to="/addCourse">과정추가하기</Link></li>
                <li>월추가하기</li>
            </ul>
        </div>
    );
}