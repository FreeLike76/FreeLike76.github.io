let userAdd = document.querySelector("#buttonAdd");
let userDelete = document.querySelector("#buttonDelete");
let userName = document.querySelector("#inputName");
let userMessage = document.querySelector("#inputMessage");
let mainList = document.querySelector("#noteList");

let loadedNotes = storageReadAll();
loadAllNotes();

let noteID = findID();

if(noteID)
{
    noteOpened(noteID);
}
else
{
    setURL();
}

userAdd.onclick = ()=>
{
    if(noteID=="")
    {
        let newNote = new Note(makeid(6), userName.value, userMessage.value);
        loadedNotes.unshift(newNote);
        storageAdd(newNote);
        loadAllNotes();
        clearUp();
        
    }
    else
    {
        let indexOfNote = loadedNotes.findIndex(function (a){return a.id===noteID});
        if(indexOfNote!=-1)
        {
            loadedNotes[indexOfNote].name = userName.value;
            loadedNotes[indexOfNote].message = userMessage.value;
            setDateNow(loadedNotes[indexOfNote]);
            storageAdd(loadedNotes[indexOfNote]);
        }
        loadAllNotes();
        clearUp();
    }
}

userDelete.onclick=()=>
{
    if(noteID=="")
    {
        userName.value ="";
        userMessage.value =""; 
    }
    else
    {
        let indexOfNote = loadedNotes.findIndex(function (a){return a.id===noteID});
        if(indexOfNote!=-1)
        {
            storageDelete(loadedNotes[indexOfNote]);
            loadedNotes.splice(indexOfNote,1);
        }
        clearUp(); 
        loadAllNotes();
    }
}

function loadAllNotes()
{
    mainList.innerHTML=""; //innerHTML
    loadedNotes.sort((a,b)=>b.date-a.date);
    for(let i=0; i<loadedNotes.length; i++)
    {
        let newListItem = createLI(loadedNotes[i]);
        mainList.appendChild(newListItem);
    }
}

function noteOpened(id) 
{
    console.log(id);
    let indexOfNote = loadedNotes.findIndex(function (a){return a.id===id});
    if( indexOfNote == -1)
    {
        noteID="";
        setURL();
    }
    else
    {
        noteID = id;
        setURL();
        userName.value = loadedNotes[indexOfNote].name;
        userMessage.value = loadedNotes[indexOfNote].message;
    }
}

function setURL() 
{
    let newURL = window.location.href;
    if(newURL.includes("?"))
    {
        if(newURL.includes("null"))
        {
            newURL=newURL.slice(0,-8);
        }
        else
        {
            newURL=newURL.slice(0,-10);
        }
    }
    if(noteID)
    {
        newURL += '?id=' + noteID;
    }
    else
    {
        newURL += '?id=' + "null";
    }
    window.history.pushState(noteID, noteID, newURL);
}

function clearUp()
{
    userName.value ="";
    userMessage.value ="";
    noteID="";
    setURL();
}

function findID()
{
    let newURL = window.location.href;
    if(newURL.includes("?")&&(!newURL.includes("null")))
    {
        return newURL.slice(-6);
    }
    return "";
}

window.onunload = ()=>
{
    let indexOfNote = loadedNotes.findIndex(function (a){return a.id===noteID});
    if(indexOfNote!=-1)
    {
        loadedNotes[indexOfNote].name = userName.value;
        loadedNotes[indexOfNote].message = userMessage.value;
        setDateNow(loadedNotes[indexOfNote]);
        storageAdd(loadedNotes[indexOfNote]);
    }
    noteID="";
}