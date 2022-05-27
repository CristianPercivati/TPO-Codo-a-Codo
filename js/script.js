let navLinks = document.querySelector("#nav-links");
    
function toggleNav() {
navLinks.classList.toggle("links-show");
}

window.onscroll = function (){changeToFixed()};

let header = document.querySelector("header");
let navText = document.querySelector("#logo-title");
let navCollapse = document.querySelector("#nav-hamb");

function changeToFixed()
{
if (document.documentElement.scrollTop > 0 && header.classList!="is-fixed")
{
    header.classList.toggle("is-fixed");
    navText.classList.toggle("is-inverted");
    navLinks.classList.toggle("is-inverted");
    navCollapse.classList.toggle("is-inverted");
}
else if (document.documentElement.scrollTop < 1)
{
    header.classList.toggle("is-fixed");
    navText.classList.toggle("is-inverted");
    navLinks.classList.toggle("is-inverted");
    navCollapse.classList.toggle("is-inverted");
}
}

let idInput = (id) => document.getElementById(id);
let form = idInput("formulario_contacto"), name = idInput("form_name"), tel = idInput("form_tel"), email = idInput("form_email"), message = idInput("form_consulta");
let isFormValid = false;

function debounce(callback, delay){
let timer;
return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
}
}

let isNameValid, isEmailValid, isTelValid, isMessageValid;

name.addEventListener("input", debounce(() => isNameValid = validateForm(name, "isNameValid", "El campo nombre no es válido."), 1000));
email.addEventListener("input", debounce(() => validateForm(email, "isEmailValid", "El campo email no es válido."), 1000));
tel.addEventListener("input", debounce(() => validateForm(tel, "isTelValid", "El campo teléfono no es válido."), 1000));

form.addEventListener("submit", (e) => {

    let isNameValid = validateForm(name, "isEmpty", "El campo nombre no puede estar vacío.");
    if (isNameValid===true)
    {
    isNameValid = validateForm(name, "isNameValid", "El campo nombre no es válido.");
    }
    let isEmailValid = validateForm(email, "isEmpty", "El campo email no puede estar vacío.");
    if (isEmailValid===true)
    {
    isEmailValid = validateForm(email, "isEmailValid", "El campo email no es válido.");
    }

    let isTelValid = validateForm(tel, "isEmpty", "El campo teléfono no puede estar vacío.");
    if (isTelValid===true)
    {
    isTelValid = validateForm(tel, "isTelValid", "El campo teléfono no es válido.");
    }

    let isMessageValid = validateForm(message, "isEmpty", "El mensaje no puede estar vacío.");

    if (isNameValid&&isEmailValid&&isTelValid&&isMessageValid)
    {
        isFormValid=true;
    }

if (isFormValid==false)
{
    e.preventDefault();
}

});
let validateForm = (id, check, message) => {
let error = id.parentElement.querySelector("small");
let isInputValid = false;
    if (check == "isEmpty"){
        if (id.value.trim()===""){
            isInputValid = false;
        }
        else{
            isInputValid = true;
        }
    }

    if (check == "isTelValid"){
        let tel=id.value.replace('/\D+/','');
        if (id.value.match(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/)==null){
            isInputValid = false;
            }
        else{
        isInputValid = true; 
        }
    }

    if (check == "isNameValid"){        
    if (id.value.match(/^[a-zA-Z]+$/)==null){
        isInputValid = false;
        }
    else{
        isInputValid = true; 
        }
    }
    
    if (check == "isEmailValid"){
        if (id.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)==null){
        isInputValid = false;
        }
        else{
            isInputValid = true;
        }
    }
        if (!isInputValid)
        {
            id.classList.add("field-error");
            error.classList.add("field-error");
            id.classList.remove("field-success");
            error.classList.remove("field-success");
            error.innerText=message;
            return false;
    
        } else{
            id.classList.remove("field-error");
            error.classList.remove("field-error");
            id.classList.add("field-success");
            error.classList.add("field-success");
            error.innerText='';
            return true;
        }

        
    };