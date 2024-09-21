import moment  from "moment/moment"

function getFormatTime(dateTime,format='YYYY-MM-DD h:mm:ss'){
  return moment(dateTime).format(format);
}

function isObjectNull(obj){
  return  obj&&Object.keys(obj).length>0 ?true:false
}

export const useUtils=  ()=>{
  return {
      getFormatTime,
      isObjectNull
  }
}