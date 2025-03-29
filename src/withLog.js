import { useEffect } from "react"
const withLog = (Com)=>{
    return (props)=>{
        useEffect(()=>{
            console.log("我渲染了", `我是${Com.name}`);
        },[])
        return <Com {...props} />
    }
}
export default withLog