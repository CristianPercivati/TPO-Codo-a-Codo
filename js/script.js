/* funcionamiento del navbar */
let navLinks = document.querySelector("#nav-links");

// activa o desactiva el menú del navbar en dispositivos móviles
function toggleNav() {
navLinks.classList.toggle("links-show");
}

// si existe desplazamiento, cambiamos el navbar a fixed
window.onscroll = function (){changeToFixed()};

let header = document.querySelector("header");
let navText = document.querySelector("#logo-title");
let navCollapse = document.querySelector("#nav-hamb");

// función encargada de cambiar la navbar a fixed y corregir colores según el fondo
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
/* fin del funcionamiento del navbar*/

/* validación del formulario */
// comprobamos que exista el formulario
let form = document.querySelector("#formulario_contacto");
if (form){
    //función arrow para pasar más rápido elementos DOM a variables
let idInput = (id) => document.getElementById(id);
    //asignamos las variables
let name = idInput("form_name"), tel = idInput("form_tel"), email = idInput("form_email"), message = idInput("form_consulta");
    //variable de comprobación del estado del formulario
let isFormValid = false;

    //función "debounce", permite llamar a una función "callback" pasado cierta cantidad de tiempo. Si el evento vuelve a llamar al debounce, 
    //ese tiempo se reinicia, evitando de esta forma que la función se llame innecesariamente en cada evento.

function debounce(callback, delay){
let timer;
return () => {
    //se reinicia el tiempo si se llama de vuelta
    clearTimeout(timer);
    //se llama a la función solo transcurrido el delay
    timer = setTimeout(callback, delay);
}
}

// variables de validación del estado de cada campo
let isNameValid, isEmailValid, isTelValid, isMessageValid;

// vinculamos los eventos a su correspondiente función dentro de debounce. En este caso 
// callback llama a validateForm, el cual regresa true o false para ser asignada a la
// variable de estado de cada input.

name.addEventListener("input", debounce(() => isNameValid = validateForm(name, "isNameValid", "El campo nombre no es válido."), 1000));
email.addEventListener("input", debounce(() => isEmailValid = validateForm(email, "isEmailValid", "El campo email no es válido."), 1000));
tel.addEventListener("input", debounce(() => isTelValid = validateForm(tel, "isTelValid", "El campo teléfono no es válido."), 1000));

form.addEventListener("submit", (e) => {

    // Volvemos a generar las comprobaciones en caso de que se apriete el botón de envío.
    // primero que el input no esté vacío.
    isNameValid = validateForm(name, "isEmpty", "El campo nombre no puede estar vacío.");
    if (isNameValid===true)
    {
    // y en caso de no estarlo, comprobar que sea válido.
    isNameValid = validateForm(name, "isNameValid", "El campo nombre no es válido.");
    }
    isEmailValid = validateForm(email, "isEmpty", "El campo email no puede estar vacío.");
    if (isEmailValid===true)
    {
    isEmailValid = validateForm(email, "isEmailValid", "El campo email no es válido.");
    }

    isTelValid = validateForm(tel, "isEmpty", "El campo teléfono no puede estar vacío.");
    if (isTelValid===true)
    {
    isTelValid = validateForm(tel, "isTelValid", "El campo teléfono no es válido.");
    }

    isMessageValid = validateForm(message, "isEmpty", "El mensaje no puede estar vacío.");

    // si todos son válidos, el formulario es válido.
    if (isNameValid&&isEmailValid&&isTelValid&&isMessageValid)
    {
        isFormValid=true;
    }

    // pero en caso de no ser válido el formulario, evitamos su envío con preventDefault.
if (isFormValid==false)
{
    e.preventDefault();
}

});

    // la función que realiza la comprobación en sí. Toma 3 argumentos: id, donde pasamos
    // el elemento a comprobar, check para indicar qué tipo de comprobación queremos, y
    // message que es el mensaje que se devuelve en caso de error.

let validateForm = (id, check, message) => {
let error = id.parentElement.querySelector("small");
let isInputValid = false;
    // si está vacío...
    if (check == "isEmpty"){
        if (id.value.trim()===""){
    // este campo es inválido
            isInputValid = false;
        }
        else{
            isInputValid = true;
        }
    }

    // si el campo teléfono es válido o no...
    if (check == "isTelValid"){
    // eliminamos guiones o cualquier caracter que no sea un dígito
        let tel=id.value.replace('/\D+/','');
    // comprobamos con regex que el número sea válido
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
        // si el campo no es válido...
        if (!isInputValid)
        {
        // cambiamos el estado de la leyenda y el campo a error y devolvemos false
            id.classList.add("field-error");
            error.classList.add("field-error");
            id.classList.remove("field-success");
            error.classList.remove("field-success");
            error.innerText=message;
            return false;
    
        } else{
        // en caso contrario, devolvemos true y cambiamos el estado a success 
            id.classList.remove("field-error");
            error.classList.remove("field-error");
            id.classList.add("field-success");
            error.classList.add("field-success");
            error.innerText='';
            return true;
        }       
    }
}