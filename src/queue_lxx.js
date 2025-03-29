export function createQueue (q) {
    console.log(q);
    
    const queue = {
        task: [],
        callback: [],
        taskCopy: [],
        isFirst: true
    }
    queue.register = (step,cb) => {
        console.log("走了");
        queue.task.push(step)
        queue.taskCopy.push(step)
        queue.callback[step] = cb
    }
    queue.start= () => {
        if(queue.task.length<=0) {
            return console.log("任务已清空");
        }
        queue.next()
    }
    queue.next =() => {
        if(queue.task.length<=0) {
            return console.log("任务已清空");
        }
        if (queue.isFirst) {
            console.log("准备开始了");
            queue.isFirst = false
            return
        }
        const name  = queue.task.shift()
        queue.callback[name]()
    }
    queue.onFinish= (cb) => {
        cb()
     }
     queue.reset= () => {
        queue.task = queue.taskCopy.slice()
        queue.isFirst = true
     }
    return queue
}
