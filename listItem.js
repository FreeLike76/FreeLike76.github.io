function createLI(note)
{
    let template = document.getElementById("noteCardTemplate");
    let newNote = template.content.querySelector("li").cloneNode(true); //WHY

    newNote.id = note.id;
    newNote.querySelector(".noteListItemName").querySelector("h4").innerHTML = note.name;
    newNote.querySelector(".noteListItemDate").querySelector("h4").innerHTML = getDateString(note);
    return newNote;
}

