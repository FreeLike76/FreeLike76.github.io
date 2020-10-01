class Note
{
    constructor(id, name, message)
    {
        this.id=id;
        this.name=name;
        this.message=message;
        this.date=Date.now();
    }
       
}

function getDateString(note)
{
    let temp = new Date(note.date)
    return (temp.getMonth()+1)+'.'+temp.getDate()+" "+temp.getHours()+":"+temp.getMinutes();
}

function setDateNow(note)
{
    note.date=Date.now();
}