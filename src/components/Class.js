import { useState } from "react";
export default function Class({course : c}){
    const [ course, setCourse ] = useState(c);
    const [isDeadline, setIsDeadline] = useState(course.deadline);
    function chIsDeadline(){

        fetch(`http://localhost:3003/courses/${course.id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...course,
                deadline: !isDeadline,
            })
        }).then(res=> {
            if(res.ok){
                setIsDeadline(!isDeadline);
            }
        })   
    }
    function del(){
        if(window.confirm('삭제하시겠습니까?')){
            fetch(`http://localhost:3002/courses/${course.id}`,{
                method:"DELETE"
            }).then(res=>{
                if(res.ok){
                    setCourse({ id: 0 });
                }
            })
        }
    }
    if(course.id===0){
        return null;
    }
    return(
        <tr className={isDeadline ? "on" : ""}>
        <td><input type="checkbox" checked={isDeadline} onChange={chIsDeadline}/>{course.day}</td>
        <td>{course.title} <button onClick={del}>삭제</button></td>
         </tr>
    );
}