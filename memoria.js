let pairnumbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
// creo un array con los numeros que seran los pares de cada uno.
pairnumbers = pairnumbers.sort(()=>{return Math.random() -0.5});
// se ordena el array con el metodo .sort() de acuerdo a su funcion
// la funcion sera ()=>{} flecha para desordenar el array 
// con Math.random() que solo da numeros positivos
// pero si le restamos -0.5 podra dar valores negativos.

// Variables
let uncoverclick = 0;
let button1 = null; // boton con valor vacio null - primer boton sin pareja
let button2 = null; // boton con valor vacio null - segundo boton para emparejar
let firstclick = null; // resultado vacio porque es desconocido - primera pulsación
let secondclick = null; // resultado vacio porque es desconocido - segunda pulsación
let movement = 0; // hace referencia a la cantidad clicks en los botones
let points = 0; //hace referencia a los aciertos en pares
let counter = false; // hace referencia a temporizador
let timer = 30; // tiempo de juego
let start_timer = 30;
let counting = null; // conteo regresivo

// variables de sonidos
let WinnerAudio = new Audio('./sounds/Win.mp3');
let loseAudio = new Audio('./sounds/Lose.mp3');
let pikaAudio = new Audio('./sounds/Pikachu.wav');
let BellAudio = new Audio('./sounds/Bellsprout.wav');
let BulAudio = new Audio('./sounds/Bulbasaur.wav');
let CharAudio = new Audio('./sounds/Charmander.wav');
let JiggAudio = new Audio('./sounds/Jigglypuff.wav');
let MakAudio = new Audio('./sounds/mankey.wav');
let MeowAudio = new Audio('./sounds/Meowth.wav');
let PsyAudio = new Audio('./sounds/Psyduck.wav');
let pairAudio = new Audio('./sounds/pair.mp3');
let failAudio = new Audio('./sounds/fail.mp3');
let SoundsPoke = [pikaAudio, CharAudio, BulAudio, BellAudio, MakAudio, MeowAudio, PsyAudio, JiggAudio];

// Variables que referencian al h2 por el ID
let showclicks = document.getElementById('movimientos'); // importante marcar las comillas simples
let showpoints = document.getElementById('aciertos');
let showtimer = document.getElementById('t_restante');

// contador
function timerunning()
{
    counting = setInterval(()=>
    {
        timer--;
        showtimer.innerHTML = `${timer} segundos restantes`;
        
        if (timer == 0)
        {
            clearInterval(counting);
            unlocknumbers();
            loseAudio.play();
            if (confirm ("Se acabo el tiempo, otra vez?"))
            location.reload();
        }
    },1000);
}

    // funcion fin del juego
    function unlocknumbers()
    {
        for (let i = 0; i <= 15; i++)
        {
            let unlockbutton = document.getElementById(i);
            unlockbutton.innerHTML = `<img src="./pics/${pairnumbers[i]}.png" alt="">`;
            unlockbutton.disable = true;
        }
    }

    //Funcion descubrir numero al clickar
    function descubrir(id)
    {
    if (counter == false)
    {
        timerunning();
        counter = true;
    }
    uncoverclick++; // al clickar se suma
    //console.log(uncoverclick); // La consola del navegador muestra las veces clickada
    
    
    if (uncoverclick == 1) // pregunta si se a clickado 1 vez
    {
        button1 = document.getElementById(id); //llama al ID del boton HTML con .getElementById()
        firstclick = pairnumbers[id]; // imprime el array dentro de los botones de forma desordenada por el ID 
        button1.innerHTML = `<img src="./pics/${firstclick}.png" alt="">`; // Guardamos el primer resultado para comparar con el segundo resultado
        button1.disabled = true; // deshabilitar el boton despues de ser pulsado
        
    }
    else if (uncoverclick == 2) // preguna si se a clickado 2 veces
    {
        button2 = document.getElementById(id); //llama al ID del boton HTML
        secondclick = pairnumbers[id]; // imprime el array dentro de los botones de forma desordenada
        button2.innerHTML = `<img src="./pics/${secondclick}.png" alt="">`; // guarda el segundo resultado para comparar
        button2.disabled = true; // desactiva el segundo boton al pulsar si es que coinciden
        movement++; // cuando clickas un par aumenta un movimiento
        showclicks.innerHTML = `Movimientos: ${movement}`; // imprime el resultado con un string template ${variable} y va aumentar al clickar

        if (firstclick == secondclick) //si el primer resultado coincide con el segundo
        {
            uncoverclick = 0; // el contador se resetea
            points++; // los puntos aumentan
            showpoints.innerHTML = `Aciertos: ${points}`; // imprime los puntos en pantalla
            pairAudio.play();
            
            if (points == 8)
            {
                clearInterval(counting);
                showpoints.innerHTML = `Aciertos: ${points} 👾`;
                showtimer.innerHTML = `Terminaste en: ${start_timer - timer} 😱 segundos`;
                showclicks.innerHTML = `Movimientos ${movement} 😎`;
                WinnerAudio.play();
                if (confirm ("Ganaste, otra vez?"))
                location.reload();
            }
        }
        else // vuelve a tapar los resultados si se falla
        {
            failAudio.play();
            // setTimeout() da un tiempo para que vuelvan a cubrirse en caso de fallo
            setTimeout(()=>
            {
            button1.innerHTML = ' '; // imprime vacio como efecto de borrado
            button2.innerHTML = ' ';
            button1.disabled = false; // el valor desabilitado puede volver a activarse
            button2.disabled = false;
            uncoverclick = 0;
            },500); // el tiempo en microsegundos en volver a cubrirse el boton
        }
    }
}