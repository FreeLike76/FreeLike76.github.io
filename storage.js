function storageDelete(note)
{
    localStorage.removeItem(note.id);
}

function storageAdd(note)
{
    localStorage.setItem(note.id,JSON.stringify(note));
}

function storageReadAll()
{
    let noteArray=[];
    for(let i=0; i<localStorage.length; i++)
    {
        let key = localStorage.key(i);
        let thisnote = JSON.parse(localStorage.getItem(key));
        noteArray.push(thisnote);
    }
    noteArray.sort((a,b)=>b.date-a.date);
    return noteArray;
}