class Dom {
    static renderDictOfEditableArrays(dict){
        const baseDiv = document.createElement("div");
        for(let key in dict){
            const arr = dict[key];
            const arrDiv = document.createElement("div");
            arrDiv.innerHTML = key
            for(let index in arr){
                const value = arr[index];
                const valueDiv = document.createElement("input");
                valueDiv.setAttribute("value",value);
                valueDiv.setAttribute("size",3);
                arrDiv.appendChild(valueDiv);
            }
            arrDiv.getValues = () => Array.from(arrDiv.children).map((child) => {
                return child.value
            })
            arrDiv.key = key
            baseDiv.appendChild(arrDiv);
        }
        baseDiv.getDict = () => {
            const dict = {}
            for(let child of baseDiv.children){
                dict[child.key] = child.getValues()
            }
            return dict;
        }
        return baseDiv;
    }
}