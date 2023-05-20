const getData = async (postFilter, IDFilter) => {
    await fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(data => {
            let tableData = "<tbody>";
            let filteredData;
            
            if(!postFilter && !IDFilter){
                filteredData = data;
            } else 
            if(!postFilter && !!IDFilter){
                // filteredData = data.filter(item => item.id === IDFilter);
                filteredData = data.filter(item => {
                    idString = item.id.toString();
                    return idString.startsWith(IDFilter.toString());
                })
            } else if(!IDFilter && !!postFilter){
                // filteredData = data.filter(item => item.postId === postFilter);
                filteredData = data.filter(item => {
                    postidString = item.postId.toString();
                    return postidString.startsWith(postFilter.toString());
                })
            }
            else {
                // filteredData = data.filter(item => item.postId === postFilter && item.id === IDFilter);
                filteredData = data.filter(item => {
                    postidString = item.postId.toString();
                    idString = item.id.toString();
                    return postidString.startsWith(postFilter.toString()) && idString.startsWith(IDFilter.toString()) ;
                })
            }

            let count = 0; 
            if(filteredData.length===0){
                tableData = "<tbody><tr><td colspan='5' style='text-align:center'>Données introuvables</td></tr></tbody>";
            } else {
                document.getElementById('item-count').innerHTML =  (filteredData.length!==1) ? `(${filteredData.length.toString()} items)` : '';
                filteredData.forEach(element => {
                    const style = (count%2 === 0 ? 'background-color : aliceblue' : '')
                    tableData += "" +
                    `<tr style="${style}">\n` +
                        "<td>" + element.postId + "</td>\n" +
                        "<td>" + element.id + "</td>\n" +
                        "<td>" + element.name + "</td>\n" +
                        "<td>" + element.email + "</td>\n" +
                        "<td>" + element.body + "</td>\n" +
                    "</tr>\n";
                    count += 1;
                });
                tableData += "</tbody>";
            }
            // const textNode = document.createElement(tableData);
            document.getElementById('corps').innerHTML = tableData;
            
        }
    )
    .catch(error => {
    console.log('Une erreur s\'est produite :', error);
    });
}

document.getElementById("id-filter").addEventListener('keyup', (event) => {
    event.preventDefault()
    const postFilter = document.getElementById('ṕost-filter').value;
    const idFilter = document.getElementById('id-filter').value;
    getData(Number(postFilter),Number(idFilter));
});

document.getElementById("ṕost-filter").addEventListener('keyup', (event) => {
    event.preventDefault()
    const postFilter = document.getElementById('ṕost-filter').value;
    const idFilter = document.getElementById('id-filter').value;
    getData(Number(postFilter),Number(idFilter));
});

document.onload(getData(null,null));
