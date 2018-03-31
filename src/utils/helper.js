
export function getCategoriesOptions(categories){
    if(categories){
        return categories.map(item =>{
            return { key: item.path, text: item.name, value: item.path }
          })
    }
}