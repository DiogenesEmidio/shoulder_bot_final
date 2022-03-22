//CIN UFPE 2022.1
//ALUNO: DIOGENES EMIDIO LEODIDO / DEL@CIN.UFPE.BR
//PROF: SERGIO QUEIROZ
//MVP DO NUDGEBOT PARA RECUPERAÇÃO DE CIRURGIA DE OMBRO


//Dúvidas para reunião 09/03/2022
// a pessoa vai poder registar a dor somente apos os exercicios ou pode registrar a qualquer momento?
// esse bot considerou o registro da dor em qualquer momento
// o que acontece quando a pessoa por um emoji? apenas registra ou cada emoji pode representar uma dica do medico?

const env = require('../../.env')
const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const { enter, leave } = Stage

let idPaciente = ''
let horaManha = ''
let horaTarde = ''
let horaNoite = ''

// botoes de inicio - roadmap0
// botao dentro do board do bot

const botoesStart = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Iniciar programa de exercicios', 'agendar'),
    // Markup.callbackButton('Meus exercícios', 'meusExercicios'),
    Markup.callbackButton('Mais sobre o Shoulder_bot', 'sobre'),
],{ columns: 1 }))

//botoes de agendamento/hora
//botao fora do board do bot


const tecladoHoraManha = Markup.keyboard ([
    ['05:00','06:00'], ['07:00','08:00'], ['09:00','10:00'], ['11:00','12:00'],

]).resize().oneTime().extra()

const tecladoHoraTarde = Markup.keyboard ([
    ['13:00','14:00'], ['15:00','16:00'], ['17:00','18:00'],

]).resize().oneTime().extra()

const tecladoHoraNoite = Markup.keyboard ([
    ['19:00','20:00'], ['21:00','22:00'], ['23:00','00:00'],

]).resize().oneTime().extra()

// botoes de confirmacao de agenda
const confirmacao = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n')
]))

//botoes de exercicios

const confirmacaoExercicios = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim, quero iniciar', 'meusExercicios'),
    Markup.callbackButton('Não, mais tarde', 'botoesMain')
]))

const botoesSegundoExercicio = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim, próximo exercício', 'segundoExercicio'),
    // Markup.callbackButton('Não consigo, sinto muita dor', 'escalaDeDor')
],{ columns: 1 }))


const botaoRegistrarDor = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Registrar dor', 'escalaDeDor'),

],{ columns: 1 }))

const botoesEscalaDeDor= Markup.keyboard ([
    // ['😃'],['🙂'], ['😐'],['😟'], ['😢'],
    ['😃','🙂', '😐','😟', '😢'],


]).resize().oneTime().extra()

const botoesMain = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Alterar horários dos exercicios', 'agenda'),
    Markup.callbackButton('Meus exercícios', 'meusExercicios'),
    Markup.callbackButton('Sinto muita dor', 'escalaDeDor'),
    Markup.callbackButton('Mais sobre o Shoulder_bot', 'sobre'),
], {columns: 1}))

// prencher escala de dor - inicio
// const happyEmoji = new Composer()
// happyEmoji.hears('😃', ctx => {
//     ctx.reply('Oeeee, você está feliz, então está com pouca dor.')
//     ctx.wizard.next()
// })
// sadEmoji.hears('😃', ctx => {
//     ctx.reply('Oeeee, você está feliz, então está com pouca dor.')
//     ctx.wizard.next()
// })


const wizardSobre = new WizardScene('sobre',
    async ctx => {
        await ctx.replyWithPhoto({source: `${__dirname}/Logo-ufpe-2-2.jpg`})
        await ctx.replyWithPhoto({source: `${__dirname}/cinUfpe.png`})
        await ctx.reply(`Trata-se de uma pesquisa científica tecnologica de desenho de um chatbot de apoio a recuperação de cirurgia de ombro`)
        await ctx.reply('Linha de Pesquisa: Inteligência Computacional \nAluno: Diógenes Emidio\n Email: del@cin.ufpe.br \n Prof. Orientador: Sergio Queiroz \n Email: srmq@cin.ufpe.br')
        console.log('Entrou em sobre ')
        ctx.wizard.next()
        // ctx.scene.leave()
    }
)

const wizardEscalaDeDor = new WizardScene('escalaDeDor',
    async ctx => {
        await ctx.reply('Atualmente, qual Emoji representa como você se sente em relação as dores no seu ombro cirurgiado?', botoesEscalaDeDor)
        console.log('Entrou em escala de dor')
        ctx.wizard.next()
        // ctx.scene.leave()
    },

    async ctx => {
        emoji = ctx.update.message.text
        await ctx.reply(`Você digitou o emoji = ${emoji}`)
        await ctx.reply('Tudo certo, registrei sua escala de dor!')
        await ctx.reply('Obrigado por me deixar te acompanhar na trajetória de sua recuperação')
        await ctx.reply('Até breve 🦾')
        await ctx.reply(`Te ajudo em algo?`,botoesMain)
        ctx.scene.leave()
    }
)

// prencher escala de dor - fim
//
// realizar exercicios - lista de exercicios - inicio

// const segundoExercicio = new Composer()

// segundoExercicio.hears('Sim, próximo exercício', async ctx => {
//         await ctx.replyWithPhoto({source: `${__dirname}/1pLOAI.gif`})
//         await ctx.replyWithPhoto('Realize 20 vezes esse movimento no seu ombro operado')
//         ctx.wizard.next()
// })

const wizardMeusExercicios = new WizardScene('meusExercicios',
    async ctx => {
        await ctx.reply('Este é o seu primeiro exercício')
        await ctx.replyWithVideo({source: `${__dirname}/BoringMiniatureAmericangoldfinch-max-1mb.gif`})
        await ctx.reply('Realize 10x esse movimento no seu ombro operador')
        ctx.reply(`Finalizou?`, botoesSegundoExercicio)
        ctx.wizard.next()

    },

    async ctx => {
        await ctx.replyWithPhoto({source: `${__dirname}/1pLOAI.gif`})
        await ctx.reply('Realize 20 vezes esse movimento no seu ombro operado')
        // await ctx.reply('desenvolvimento parado até aqui')
        ctx.reply(`Finalizou?`, botoesSegundoExercicio)
        ctx.wizard.next()
    },
    async ctx => {
        await ctx.reply('Parabéns pelo esforço! Você se dedicou a fazer todos os exercícios. Isso é uma vitória 👏👏👏👏👏👏')
        await ctx.reply('Para entender melhor os seus resultados seu médico precisa saber de suas dores. Registre', botaoRegistrarDor)
        ctx.scene.leave()
    }
)
// realizar exercicios - lista de exercicios - fim

// agendamento de horários dos exercicios - inicio 
const confirmacaoHandler = new Composer()
confirmacaoHandler.action('s', async ctx => {
    await ctx.reply('Horas adicionadas!')
    await ctx.reply('Obrigado pela confirmação')
    await ctx. reply('Antes começar nossa jornada de recuperação quero te lembrar de alguns pontos importantes:')
    await ctx.reply('1. Não realize movimentos bruscos \n 2. Não pegue em peso com o braço operado \n 3. Realize somente os exercícios indicados por seu médico, os quais irei te guiar')
    await ctx.replyWithMarkdown(`E lembre-se, o sucesso de sua cirurgia depende primordialmente de você!`)
    await ctx.replyWithMarkdown(`Desejar iniciar os exercicios?`, confirmacaoExercicios)
    ctx.scene.leave()
    // ctx.wizard.next()
})

// confirmacaoHandler.action('n', ctx => {
//     ctx.reply('Horas excluidas!')
//     ctx.scene.leave()
//     ctx.reply('Vamos recomeçar?', botoesStart)
// })

confirmacaoHandler.use(ctx => ctx.reply('Apenas confiraaaaaaaaaaame', confirmacao))

const wizardAgendar = new WizardScene('agendar',
    ctx => {
        ctx.reply('Digite seu ID PACIENTE')
        console.log('Entrou na cena do id')
        ctx.wizard.next()
    },

    ctx => {
        idPaciente = ctx.update.message.text
        ctx.reply(`Ok, achei seu cadastro do id ${idPaciente}. Você possui 3 exercícios`)
        ctx.reply(`Digite o horário da manhã`, tecladoHoraManha)
        console.log('Entrou na cena do horario manha')
        ctx.wizard.next()
    },
    ctx => {
        horaManha = ctx.update.message.text
        ctx.reply(`Você digitou ctx2 ${horaManha}`)
        ctx.reply(`Digite o horário da Tarde`, tecladoHoraTarde)
        // ctx.reply(`Você digitou ${horaTarde}`)
        console.log('Entrou na cena do horario da tarde')
        ctx.wizard.next()
    },
    ctx => {
        horaTarde = ctx.update.message.text
        ctx.reply(`Você digitou ctx3 ${horaTarde}`)
        ctx.reply(`Digite o horário da noite`, tecladoHoraNoite)
        console.log('Entrou na cena do horário da noite')
        ctx.wizard.next()
    },
    ctx => {
        horaNoite = ctx.update.message.text
        ctx.reply(`Você digitou ctx4 ${horaNoite}`)
        ctx.reply(`
        Aqui está um resumo de seus horários:
        Manhã: ${horaManha}
        Tarde: ${horaTarde}
        Noite: ${horaNoite} 
        confirma?`,confirmacao)
        ctx.wizard.next()
    },
    confirmacaoHandler
)
// agendamento de horários dos exercicios - fim

const bot = new Telegraf(env.token)
const stage = new Stage([wizardAgendar, wizardMeusExercicios, wizardEscalaDeDor, wizardSobre])
bot.use(session())
bot.use(stage.middleware())


bot.action('sobre', ctx => {
    ctx.scene.enter('sobre')
    console.log('Entrou em sobre')
})

bot.action('escalaDeDor', ctx => {
    ctx.scene.enter('escalaDeDor')
    console.log('Entrou em escala De Dor')
})

bot.action('meusExercicios', ctx => {
    ctx.scene.enter('meusExercicios')
    ctx.reply('entrou em meus exercicios teste ')
    console.log('entrou em meus exercicios teste')
})
bot.action('agendar', ctx => {
    ctx.scene.enter('agendar')
}),

// bot.action('sobre', Stage.enter('sobre'))

bot.start (async (ctx) => {
    const from = ctx.update.message.from
    await ctx.reply(`Olá, ${from.first_name}!`)
    await ctx.reply(`Eu, sou o Shoulder_bot🤖. Fui criado para apoiar as pessoas que se submeteram a cirurgia de ombro.`)
    await ctx.replyWithPhoto({source: `${__dirname}/shoulder_bot.png`})
    await ctx.reply('Se você está aqui é porque provavelmente seu médico lhe orientou acerca do programa de exercícios que você deve realizar para ter uma boa recuperação')
    await ctx.reply('Pois bem, nessa jornada vou te lembrar do horário dos exercícios, mostrar vídeos demonstrativos e te orientar acerca dos procedimentos necessários para o sucesso da sua recuperação.')
    await ctx.replyWithMarkdown(`Vamos começar ?`,botoesStart)
})  

bot.startPolling()