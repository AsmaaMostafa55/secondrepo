var inputsitename=document.getElementById("siten");
var inputsiteurl=document.getElementById("siteu");
var but=document.getElementById("but");
var but2=document.getElementById("butt");
var tbody=document.getElementById("tbody");
var hhh=document.getElementById("hhh");
var searchinput=document.getElementById("search");
var modalmassage=document.getElementById("modalmassgae");
var indexupdate=0;
var namemessage=document.getElementById("message");

var sitelist=[];



if(localStorage.getItem("objs")!=null){
    sitelist=JSON.parse(localStorage.getItem("objs"));
    display();
    }
    
function add(){
if(validationname() && validationmail()){

    var obj={
        sitename:inputsitename.value,
        siteurl:inputsiteurl.value
    }
    sitelist.push(obj);
    localStorage.setItem("objs",JSON.stringify(sitelist));
}

// else{

//     modalmassage
// }
}

but.onclick=function(){
    add();
    clear();
    display();
}
function clear()
{
    inputsitename.value="";
    inputsiteurl.value="";
}
function display(){
    var cartona="";
    for(var i=0;i<sitelist.length;i++)
    {
        cartona+=`
        
        <tr>
            <td>
                ${i}
            </td>
            <td>${sitelist[i].sitename}</td>
            <td><button class="btn btn-success" ><a href="${sitelist[i].siteurl}"><i class="fa-solid fa-eye pe-2"></i>visit</a></td>
            <td><button class="btn btn-danger" onclick="deleteitem(${i})">delete</button></td>
            <td><button class="btn btn-info" onclick="setdata(${i})">update</button></td>
        </tr>
        `
    }
tbody.innerHTML=cartona;

}
function deleteitem(index){
    sitelist.splice(index,1);
    localStorage.setItem("objs",JSON.stringify(sitelist));
    display();
}


function search(){
var term=searchinput.value;
cartona="";
for(var i=0;i<sitelist.length;i++)
{
    if(sitelist[i].sitename.toLowerCase().includes(term.toLowerCase()))
    {
        cartona+=`
        
        <tr>
            <td>
                ${i}
            </td>
            <td>${sitelist[i].sitename}</td>
            <td><button class="btn btn-success" ><a href="${sitelist[i].siteurl}"><i class="fa-solid fa-eye pe-2"></i>visit</a></td>
            <td><button class="btn btn-danger" onclick="deleteitem(${i})">delete</button></td>
            <td><button class="btn btn-info" ">update</button></td>
        </tr>
        `

    }
    tbody.innerHTML=cartona;
}

}


function setdata(index){
    indexupdate=index;
    var currentsite=sitelist[index];

    inputsitename.value=currentsite.sitename;
    inputsiteurl.value=currentsite.siteurl;
    but2.classList.remove("d-none");
    but.classList.add("d-none");

}
function updateproduct(){
    var obj={
        sitename:inputsitename.value,
        siteurl:inputsiteurl.value
    };
    sitelist.splice(indexupdate,1,obj);
    display();
    localStorage.setItem("objs",JSON.stringify(sitelist));


but2.classList.add("d-none");
    but.classList.remove("d-none");



}
but2.onclick=function(){
    updateproduct();

}

function validationname(){
   var text=inputsitename.value;
   var Regexname=/[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?/;
   if(Regexname.test(text))
   {
inputsitename.classList.add("is-valid");
inputsitename.classList.remove("is-invalid");
namemessage.classList.add("d-none");
return true;

   }
   else{
    inputsitename.classList.add("is-invalid");
    
    namemessage.classList.remove("d-none");
    return false;
   }
//    console.log(Regexname.test(text));

}
function validationmail(){
    var text=inputsiteurl.value;
    var Regexmail=/^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    if(Regexmail.test(text))
    {
        inputsiteurl.classList.add("is-valid");
        inputsiteurl.classList.remove("is-invalid");
        namemessage.classList.add("d-none");
        return true;
    }
    else
    {
        inputsiteurl.classList.add("is-invalid");
        namemessage.classList.remove("d-none");
        return false;
    }
}
function none(){
    namemessage.classList.add("d-none");

}