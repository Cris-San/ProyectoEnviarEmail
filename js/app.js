document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    

    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"] ');
    const btnReset = document.querySelector('#formulario button[type="reset"] ');
    const spinner = document.querySelector('#spinner')
    
    
    //Asignar eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })

    //Enviar Email
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center',
            'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove(); 
            }, 3000);
        }, 3000);
    }


    //Validando Campos
    function validar(e){

        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        //Validar email 
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        //limpiar alerta
        limpiarAlerta(e.target.parentElement);
        
        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Comprobar el objeto de email
        comprobarEmail();
    }

    //Mostrar alerta
    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        //Inyectar error al formulario
        referencia.appendChild(error);//Agrega hijo al final del form
    }

    function limpiarAlerta(referencia) {
        //Comprobando si existe una alerta
       const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        };
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disable = true;
            return
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disable = false;
    }

    function resetFormulario() {
        //Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});

//APUNTES PROYECTO

//Al ocurrir el evento se ejeucta la funcion eso es un callback. EL blur quiere decir q si se sale de un campo se dispara ese evneto. Sirve para validar si un usuario no lleno ese campo, se le muestra una alerta.

//Al validar q los campos esten vacios es mejor usar un metodo de strings llamado trim() el cual se encarga de eliminar los espacios en blanco.

//lA Alerta se crea con scripting de js, creando un variable donde se almacenara el elemento html q creemos. luego llamo la variable y con textcontent le asigno el mensaje. Para mostrarlo en pantalla voy al html y hago uso de la etiqueta form y de su id formulario.
//Ahora se crea una variable para seleccionar el elemento formulario y lo traigo con su id. Con appendchild se va a agregar un nuevo elemento a lo q ya existente osea del padre formulario se va a agregar como otro hijo el error antes que se cierre la etiqueta form.formulario.appendChild(error);

//Se le asignan mensajes personalizados a cada campo, como parametro la funcion mostrarAlerta tomara un mensaje e imprimira el mensaje de acuerdo a como lo hallamos desiganado para cada campo. Se hace uso de e.target.id el cual por medio del evento mostrara el campo con el id y se imprimira un solo mensaje para todos los campos conociendo ya su id.

//MOSTRANDO ALERTA JUNTO A SU CAMPO
//Se hace con traversing de DOM o recorrer el DOM. Se toma el elemento q dispara el evento, hacer referencia a su padre y luego en el div agregar un appendchild para q lo agregue junto al input.

//En la funcion se añade como segundo parametro la referencia al padre q es por donde se va a mostrar la alerta = e.target.parentElement, q contiene el div,el label y el input.Este lo toma referencia Y con apendchild lo mandamos a llamar pero tomando el paramero de referencia= referencia.appendChild(error);

//PREVENIR Q SE GENEREN MULTIPLES ALERTAS.
//Debemos crear una variable alerta que sea igual a la referencia que tiene configurado al padre del input y con quieryselector seleccione solo en ese div y no en todo el formulario el elemento q se esta indicando, asi ya no aparecen multiples alertas y solo aparece en ese lugar.                       const alerta = referencia.querySelector('.bg-red-600');
//Ademas con return detenemos la aejecucion para q no siga el codigo

//OCULTAR ALERTAS SI PASA VALIDACION ----LIMPIAR ALERTA SI EL CAMPO SE LLENA.
//Despues del return llamamos una funcion limpiarAlerta(referencia); la cual va a tomar la referencia del input q estemos seleccionando junto con su padre e hijos y con un if llamammos la alerta y removemos en caso de ser verdadero osea en caso q si se llene el campo.

//VALIDAR EMAIL CON EXPRESION REGULAR
//Se hace por medio de una expresion regular q va a buscar un patron en una cadena de texto o una serie de numeros.
//Se crea una variable donde se almacena el resultado y llamamos la expresion regular por su variable y con el metodo test le pasamos lo q se desea comprobar const resultado = regex.test(email); Ahora se llama la funcion desde la fncion de validar(e),  validarEmail(e.target. value); y con e.target.value va a validar q se trate del campo del email.

//Si el email no es valido le mostramos con un if una alerta:
/**
 * if (e.target.id === 'email' && !validarEmail(e.target.value)) {
    mostrarAlerta('El email no es válido', e.target.parentElement);
    return;
}

De este modo se le indica q se muestre la alerta cuando no se cumpla la validacion. Ahora se le dice q se deben cumplir dos condiciones, la condicion es q el campo con el id debe ser = al email y q debe fallar el email para q muestre la alerta.
 */

//CREANDO EL OBJETO PRINCIPAL PARA VALIDAR Y SINCRONIZAR DATOS---HABILITAR BOTON ENVIAR
//Se crea un objeto email con las propiedades que se van a ir llenando una vez se ingrese lo correspondiente a cada campo.  email[e.target.name] = e.target.value.trim().toLowerCase(); En esta linea se esta llamando el campo email q al escribir en el se agregue la propiedad de email y asi sucesivamente en todos los campos. Se llama al campo email se abren corchetes se asigna dinamicamente apoyandose en el html con e.target y .name de cada campo y que esto sea igual e.target.value que va a verificar el nombre del campo y con .trim() se eliminan los espacios en blanco y con .toLowerCase(); pasamos todo a minusculas.

//Comprobar email: Se crea una funcion q se va a mandar a llamar cada q agreguemos algo en el formulario que pase las validaciones. 
/**
 *  function comprobarEmail() {
     console.log(Object.values(email).includes(''));
 }

    Con Object.values va a retornar unicamente la parte de los valores del obejto email, es decir la parte del lado derecho. Con Object.keys, retornaria la parte del lado izquierdo. El resultado que se obtiene es un arreglo.Por lo tanto, se puede utilizar un metodo de arreglos llamado includes(). 
    Entonces lo que hace este codigo es tomar todos los valores del objeto y los va a asignar un arreglo y ahi mismo con .include verifica si al menos uno de esos valores contiene un string vacio, esto nos va a retornar true.Al crearse un nuevo areglo es por eso que se hace uso de un array-method en este caso include y decirle si alguno de los elementos de este arreglo incluye un string vacio? Esto nos va a retornar true si se cumple la condicion o false si todos los valores estan llenos de ese email y con esta validacion se puede eliminar el atributo de disable del boton enviar y de la opacidad del mismo.
 */

//HABILITAR O DESAHABILITAR EL BOTON DE ENVIAR
//Se crea una variable para mandar a llmar el boton del html: const btnSubmit = document.querySelector('#formulario button[type="submit"] '). Para cuando la validacion falle se debe reiniciar esa propiedad en el objeto, por eso agregamos email[e.target.name] = ''; vacio, para que una vez se reinicie se quite el valor de ahi.

/**
 * function comprobarEmail() {
    if(Object.values(email).includes('')) {
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disable = true;
        return
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disable = false;
}
Por medio del condicional le estamos diciendo entonces q verifique si hay algun campo vacion del email, si lo hay permanece el boton opaco y desactivado. Caso contrario se remueve la opacidad y se activa el boton para realizar el envio.
 */

//RESETAR EL FORMULARIO -- PREGUNTAR ANTES AL USUARIO
//Se puede ver en el html q el boton es de tipo reset. Se crea entonces una variable para llamar ese elemento del html const btnReset = document.querySelector('#formulario button[type="reset"] '), se le asigna ademas un evento por medio del click y una funcion que previene por defecto q el btn reset limpie el formulario e.preventDefault();, luego vuelve y activa el el boton reset con formulario.reset();.

//Al parecer ya funciona bien, pero al presionar en reset el btn de enviar sigue habilitado. Eso pasa por q visualmente estamos reinciando el formulario, pero el objeto principal q contiene los datos, el q comprueba el email no lo hemos reinciado. Para eso se llama cada propiedad del objeto y se deja como vacia y se manda a llamar la funcion para comprobar el email y q se ejecuten las instrucciones de la funcion comprobarEmail();
/**
 * btnReset.addEventListener('click', function(e) {
    e.preventDefault();
    //Reiniciar el objeto
    email.email = '';
    email.asunto = '';
    email.mensaje = '';

    formulario.reset();
    comprobarEmail();
})
 */

//SIMULAR ENVIO DE EMAIL POR MEDIO DE UN SPINNER
//Traemos el codigo del spinner y lo pegamos en html agregando las clases y en css. Se crea un nuevo evento que escuchara por el btn enviar del formulario y se crea una funcion enviarEmail. Tambien se crea una variable para seleccionar y traer el spinner con su id #, al cual le vamos a agregar y a quitar clases para mostrar y ocultar el spinner.
/**
 * function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');
}
Ahora es necesario quitar el spinner una vez se encien los datos
 */