import { useRef } from "react";
import useFetch from "../hook/useFetch";
export default function CreateCourse(){
    //useFetch를 사용해 json데이터를 받아와서 months에할당
    const months = useFetch('http://localhost:3003/months');
    //useFetch를 사용해 json데이터를 받아와서 courses에할당
    const courses = useFetch('http://localhost:3003/courses');
    //DOM요소를 선택하도록 useRef실행
    const titleRef = useRef(null);
    const dayRef = useRef(null);
    const monRef = useRef(null);
    //courses배열에서 id값만을 새로운 배열로 생성후 그중 최대값을 구해서 num에 할당
    const num = Math.max.apply(null, courses.map(course => course.id));
    console.log(num); 
    //id중 최대값을 idnum의 초기값으로 할당
    const idnum = useRef(num);

    //저장버튼 클릭시 실행
    function onSubmit(e){
        //기본이벤트 사용제거
        e.preventDefault();
        //POST전송
        fetch('http://localhost:3003/courses',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id: idnum.current,
                deadline: false,
                month: monRef.current.value,
                title: titleRef.current.value,
                day: dayRef.current.value
            })
        }).then(res=>{
                if(res.ok){
                    alert('등록되었습니다.');
                    idnum.current = idnum.current+1;
                }
        })
       
    }
    return (
        <div>
            <h2>과정 추가하기</h2>
            <form onSubmit={onSubmit}>
                <p>과정명
                    <input type="text" ref={titleRef}/>
                </p>
                <p>개강일
                    <input type="text" ref={dayRef}/>
                </p>
                <p>개강달
                    <select ref={monRef}>
                        {months.map(month=>(
                            <option key={month.id} value={month.month}>{month.month}</option>
                        ))}
                    </select>
                </p>
                <p>
                    <button>저장</button>
                </p>
            </form>
        </div>
    );
}