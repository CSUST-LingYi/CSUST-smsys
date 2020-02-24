//获取学年列表接口
export let getXN = () => {
   return new Promise((resolve,reject) => {
       $.ajax({
           type:"get",
           url:"../studyDept/listXuenian",
           dataType:"json"
       }).done((res,status,xhr) => {
           // console.log(res);
           // console.log(status);
           // console.log(xhr);
           resolve(res);
       }).fail((error) => {
           reject(error);
       });
   })
};
//增加学年接口
export let addXN = (startTime,endTime) => {
    return new Promise((resolve,reject) => {
        $.ajax({
            type:"post",
            url:"insertXuenian",
            data:{
                "startTime":startTime,
                "endTime":endTime
            }
        }).done((msg) => {
            resolve(msg)
        }).fail((errMsg) =>{
            reject(errMsg)
        })
    })
};

