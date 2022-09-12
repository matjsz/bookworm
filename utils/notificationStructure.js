const typesOfNotification = {
    'rankPromotion': {
        desc: 'Promoção de Ranking',
        text: 'Parabéns, você foi promovido(a) para ',
        rank: 'Explorador'
    },
    'rankDemotion': {
        desc: 'Demoção de Ranking',
        text: 'Ah não, você foi rebaixado(a) para ',
        rank: 'Iniciante'
    },
    'startBookReminder': {
        desc: 'Lembrete de livro na lista de desejos',
        text: 'Ei, que tal começar a ler ',
        book: 'Nome do livro'
    },
    'finishedBookReminder': {
        desc: 'Lembrete de releitura de livro finalizado',
        text: 'Seu livro está com saudade! Releia ',
        book: 'Nome do livro'
    },
    'readingBookReminder': {
        desc: 'Lembrete de livro em andamento',
        text: 'Já terminou de ler ',
        book: 'Nome do livro'
        // Teria mais um texto depois do {book} => '? Atualize o status desse livro na sua prateleira!'
    }
}

const notification = {
    type: 'rankPromotion',
    content: {
        text: 'Parabéns, você foi promovido para ',
        rank: 'Explorador!'
    },
    timestamp: new Date(),
    image: true,
    src: '/rank0.png'
}

const getTimeDifference = (d1, d2) => {
    const days = parseInt((d2 - d1) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(d2 - d1) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60) % 60);
    const seconds = parseInt(Math.abs(d2.getTime() - d1.getTime()) / (1000) % 60); 

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}