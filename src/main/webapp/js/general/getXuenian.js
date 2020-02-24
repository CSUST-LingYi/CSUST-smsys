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

