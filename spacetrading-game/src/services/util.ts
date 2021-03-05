export function queryString(unparsed:string): {} {
  const separated = unparsed.replace("?", "").split("&");
  return !separated 
         ? {} 
         : separated.reduce((accumulator, pair) =>{
            const [key, value] = pair.split("=");
           return {...accumulator, [key]:value}
         },{})
}