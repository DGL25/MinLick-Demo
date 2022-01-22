const elSel = (el) => document.querySelector(el)

let jogador = {
    nomeJogador: 'Jogador',
    nivelJogador: 0,
    coinsMl: 0,
    expJogador: 0,
    expProximoNivel: undefined,
    inventario: [
        avatars = []
    ]
}

let {nomeJogador, nivelJogador, coinsMl, expJogador, expProximoNivel} = jogador

let jogo = {
    tempo: 60,
    contTempo: 60,
    setTempo: false,
    ptsAtuais: 0,
    salvaPts: 0,
    melhorPts: 0,
    highScore: [],
    menuPause: false,
    newGame: true,
}

let {tempo, contTempo, setTempo, ptsAtuais, salvaPts, melhorPts, highScore, menuPause, newGame} = jogo

let time
let timeFimJogo

elSel('#jogar').addEventListener('touchstart', irJogar)
elSel('#voltar-menu-1').addEventListener('touchstart', voltarMenu)
elSel('#voltar-menu-2').addEventListener('touchstart', voltarMenu)
elSel('#voltar-menu-3').addEventListener('touchstart', voltarMenu)
elSel('#pc-start').addEventListener('touchstart', comecarPartida)
elSel('#pause-menu').addEventListener('touchstart', pauseMenu)
elSel('#cont-jogo').addEventListener('touchstart', pauseMenu)
elSel('#jogar-dnv').addEventListener('touchstart', jogarDnv)

function irJogar(){
    for(i=1;i<4;i++){elSel(`#screen-${i}`).style.marginLeft = '-100vw'}
    
    setTimeout(()=>{
        for(i=1;i<4;i++){elSel(`#screen-${i}`).style.marginLeft = '-200vw'}
        elSel('#pronto-comecar').style.display = 'grid'
    }, 1000)
}

function voltarMenu(){
    for(i=1;i<4;i++){elSel(`#screen-${i}`).style.marginLeft = '-100vw'}

    setTimeout(()=>{
        for(i=1;i<4;i++){elSel(`#screen-${i}`).style.marginLeft = '0vw'}
        elSel('#cabecalho-pc').style.display = 'block'
        elSel('#comecar').style.display = 'none'
        elSel('#menu-pause').style.display = 'none'
        elSel('#fim-jogo').style.display = 'none'

        contTempo = 60

        elSel('#time-jogo').innerText = '1:00'
        elSel('#score').innerText = '0'
    }, 1000)
}

function comecarPartida(){
    elSel('#cabecalho-pc').style.display = 'none'
    elSel('#comecar').style.display = 'block'

    setTimeout(()=>{
        elSel('#pronto-comecar').style.display = 'none'

        if(setTempo === false){
            time = setInterval(() => {
                if(contTempo <= 60 && contTempo >= 10){
                    contTempo--
                    elSel('#time-jogo').innerText = `0:${contTempo}`
                }else if(contTempo < 10 && contTempo >= 1){
                    contTempo--
                    elSel('#time-jogo').innerText = `0:0${contTempo}`
                }else if(contTempo < 1 || contTempo === 0){
                    elSel('#time-jogo').innerText = `0:0${contTempo}`
                    clearInterval(time)
                }
            }, 1000);
        
            timeFimJogo = setTimeout(()=>{fimJogo()}, tempo * 1000 )

            setTempo = true
        }

    },1250)
}

function pauseMenu(){
    switch(menuPause){
        case false:
            elSel('#menu-pause').style.display = 'grid'
            
            clearInterval(time)
            clearTimeout(timeFimJogo)
            
            setTempo = false
            menuPause = true
            break;
        
        case true:
            elSel('#menu-pause').style.display = 'none'
            
            if(setTempo === false){
                time = setInterval(() => {
                    if(contTempo <= 60 && contTempo >= 10){
                        contTempo--
                        elSel('#time-jogo').innerText = `0:${contTempo}`
                    }else if(contTempo <= 9 && contTempo >= 1){
                        contTempo--
                        elSel('#time-jogo').innerText = `0:0${contTempo}`
                    }else if(contTempo < 1 || contTempo === 0){
                        elSel('#time-jogo').innerText = `0:0${contTempo}`
                        clearInterval(time)
                    }
                }, 1000);
    
                timeFimJogo = setTimeout(()=>{fimJogo()}, contTempo * 1000 )

                setTempo = true
            }

            menuPause = false
            break;
    }
}

function fimJogo(){
    elSel('#fim-jogo').style.display = 'grid'
    setTempo = false
}

function jogarDnv(){
    contTempo = 60
    
    elSel('#time-jogo').innerText = '1:00'
    elSel('#score').innerText = '0'

    elSel('#fim-jogo').style.display = 'none'

    if(setTempo === false){
        time = setInterval(() => {
            if(contTempo <= 60 && contTempo >= 10){
                contTempo--
                elSel('#time-jogo').innerText = `0:${contTempo}`
            }else if(contTempo < 10 && contTempo >= 1){
                contTempo--
                elSel('#time-jogo').innerText = `0:0${contTempo}`
            }else if(contTempo < 1 || contTempo === 0){
                elSel('#time-jogo').innerText = `0:0${contTempo}`
                clearInterval(time)
                fimJogo()
            }
        }, 1000);
    
        setTimeout(()=>{fimJogo()}, tempo * 1000 )
    }
}