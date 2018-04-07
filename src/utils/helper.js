
export function getCategoriesOptions(categories){
    if(categories){
        return categories.map(item =>{
            return { key: item.path, text: item.name, value: item.path }
          })
    }
}

export function NewGuid()
{
  var sGuid="";
  for (var i=0; i<32; i++)
   {
     sGuid+=Math.floor(Math.random()*0xF).toString(0xF);
   }
  return sGuid;
}