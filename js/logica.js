const elSel = (el) => document.querySelector(el)

let jogador = {
    nomeJogador: 'Jogador',
    nivelJogador: 0,
    hitClick: 25,
    nivelHitClick: 1,
    coinsMl: 0,
    expJogador: 0,
    expProximoNivel: 500,
    inventario: [
        avatars = []
    ]
}

let {nomeJogador, nivelJogador, hitClick, nivelHitClick, coinsMl, expJogador, expProximoNivel} = jogador

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
    listaID: ['icon-1','icon-2','icon-3','icon-4'],
    iconAtual: undefined
}

let {tempo, contTempo, setTempo, ptsAtuais, salvaPts, melhorPts, highScore, menuPause, newGame, listaID, iconAtual} = jogo

let time
let timeFimJogo

elSel('#jogar').addEventListener('touchend', irJogar)
elSel('#voltar-menu-1').addEventListener('touchend', voltarMenu)
elSel('#voltar-menu-2').addEventListener('touchend', voltarMenu)
elSel('#voltar-menu-3').addEventListener('touchend', voltarMenu)
elSel('#pc-start').addEventListener('touchend', comecarPartida)
elSel('#pause-menu').addEventListener('touchend', pauseMenu)
elSel('#cont-jogo').addEventListener('touchend', pauseMenu)
elSel('#jogar-dnv').addEventListener('touchend', jogarDnv)

for(i=1;i<5;i++){
    elSel(`#btn-icon-game-${i}`).setAttribute('ontouchstart', `acaoClick(${i})`)
    elSel(`#btn-icon-game-${i}`).setAttribute('ontouchend', `removeEff()`)
}

function irJogar(){
    for(i=1;i<4;i++){elSel(`#screen-${i}`).style.marginLeft = '-100vw'}
    
    setTimeout(()=>{
        for(i=1;i<4;i++){elSel(`#screen-${i}`).style.marginLeft = '-200vw'}
        elSel('#pronto-comecar').style.display = 'grid'
        allSimb()
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

        ptsAtuais = 0

        elSel('#time-jogo').innerText = '1:00'
        elSel('#score').innerText = ptsAtuais
    }, 1000)
}

function comecarPartida(){
    elSel('#cabecalho-pc').style.display = 'none'
    elSel('#comecar').style.display = 'block'

    setTimeout(()=>{
        elSel('#pronto-comecar').style.display = 'none'

        if(setTempo === false){
            time = setInterval(() => {
                if(contTempo <= 60 && contTempo > 10){
                    contTempo--
                    elSel('#time-jogo').innerText = `0:${contTempo}`
                }else if(contTempo <= 10 && contTempo >= 1){
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

function allSimb(){
    iconAtual = Math.floor((Math.random() * 4) + 1)
    
    elSel('#icon-s').classList = `icon-s-${iconAtual}`
}

function acaoClick(acao){
    acao === iconAtual ? hit() : error()
    elSel('#score').innerHTML = ptsAtuais
    elSel('#icon-s').classList.remove(`icon-s-${iconAtual}`)
    allSimb()
}

function hit(){
    ptsAtuais += hitClick * nivelHitClick
    efeitos('hit')
}

function error(){
    ptsAtuais -= 25
    if(ptsAtuais < 0){ptsAtuais = 0}
    efeitos('error')
}

function efeitos(eff){
    switch(eff){
        case 'hit':
            elSel('#icon-spawn').style.background = '#ccff90'
            break;
        case 'error':
            elSel('#icon-spawn').style.background = '#ff8a80'
            break;
    }
}

function removeEff(){elSel('#icon-spawn').style.background = 'transparent'}

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
                    if(contTempo <= 60 && contTempo > 10){
                        contTempo--
                        elSel('#time-jogo').innerText = `0:${contTempo}`
                    }else if(contTempo <= 10 && contTempo >= 1){
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

    coinsMl+=2
    expJogador+=127

    salvaPts = ptsAtuais
    ptsAtuais = 0

    highScore.push(salvaPts)
    
    if(melhorPts != 0 && salvaPts > melhorPts){
        melhorPts = salvaPts
        elSel('#title-n-record').innerText = `Novo Recorde!`
    }else if(melhorPts != 0 && salvaPts < melhorPts){
        elSel('#title-n-record').innerText = `Você Obteve`   
    }else if(melhorPts === 0 && salvaPts > 0){
        melhorPts = salvaPts
        elSel('#title-n-record').innerText = `Novo Recorde!`
    }


    elSel('#scoreJogo').innerText = `${salvaPts} Pontos`
}

function jogarDnv(){
    contTempo = 60
    
    elSel('#time-jogo').innerText = '1:00'
    elSel('#score').innerText = ptsAtuais

    elSel('#fim-jogo').style.display = 'none'

    if(setTempo === false){
        time = setInterval(() => {
            if(contTempo <= 60 && contTempo > 10){
                contTempo--
                elSel('#time-jogo').innerText = `0:${contTempo}`
            }else if(contTempo <= 10 && contTempo >= 1){
                contTempo--
                elSel('#time-jogo').innerText = `0:0${contTempo}`
            }else if(contTempo < 1 || contTempo === 0){
                elSel('#time-jogo').innerText = `0:0${contTempo}`
                clearInterval(time)
            }
        }, 1000);
    
        timeFimJogo = setTimeout(()=>{fimJogo()}, tempo * 1000 )
    }
}