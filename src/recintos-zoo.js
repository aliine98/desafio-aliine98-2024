class RecintosZoo {
    #recintos = [
        { id: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ animal: 'macaco', quantidade: 3, carnivoro: false }] },
        { id: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
        { id: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ animal: 'gazela', quantidade: 1, carnivoro: false }] },
        { id: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
        { id: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ animal: 'leao', quantidade: 1, carnivoro: true }] },
    ];

    #animais = [
        { especie: 'leao', tamanho: 3, biomas: ['savana'], carnivoro: true },
        { especie: 'leopardo', tamanho: 2, biomas: ['savana'], carnivoro: true },
        { especie: 'crocodilo', tamanho: 3, biomas: ['rio'], carnivoro: true },
        { especie: 'macaco', tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        { especie: 'gazela', tamanho: 2, biomas: ['savana'], carnivoro: false },
        { especie: 'hipopotamo', tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
    ];

    analisaRecintos(animal, quantidade) {
        if (quantidade <= 0) {
            return {
                erro: 'Quantidade inválida',
            };
        }

        const animalEncontrado = this.#animais.find(a => a.especie.toLowerCase() === animal.toLowerCase());
        if (!animalEncontrado) {
            return {
                erro: 'Animal inválido',
            };
        }

        const recintosViaveis = [];

        this.#recintos.forEach(recinto => {
            const espacoJaOcupado = recinto.animaisExistentes.reduce((acc, curr) => {
                const animal = this.#animais.find(a => a.especie === curr.animal);
                return acc + curr.quantidade * animal.tamanho;
            }, 0);

            const biomaCorreto = animalEncontrado.biomas.some(bioma => recinto.bioma.includes(bioma));

            const mensagem = `Recinto ${recinto.id} (espaço livre: ${
                recinto.tamanhoTotal - espacoJaOcupado - quantidade * animalEncontrado.tamanho
            } total: ${recinto.tamanhoTotal})`;

            if (recinto.tamanhoTotal - espacoJaOcupado >= quantidade * animalEncontrado.tamanho && biomaCorreto) {
                if (recinto.animaisExistentes.some(a => a.carnivoro) || animalEncontrado.carnivoro) {
                    if (recinto.animaisExistentes.some(a => a.animal === animalEncontrado.especie) || recinto.animaisExistentes.length === 0) {
                        recintosViaveis.push(mensagem);
                    }
                } else if (recinto.animaisExistentes.some(a => a.animal === 'hipopotamo') || animalEncontrado.especie === 'hipopotamo') {
                    if (recinto.animaisExistentes.length === 0 || recinto.bioma === 'savana e rio') {
                        recintosViaveis.push(mensagem);
                    }
                } else if (animalEncontrado.especie === 'macaco') {
                    if (recinto.animaisExistentes.length > 0 || quantidade > 1) {
                        recintosViaveis.push(mensagem);
                    }
                } else {
                    recintosViaveis.push(mensagem);
                }
            }
        });

        if (recintosViaveis.length === 0) {
            return {
                erro: 'Não há recinto viável',
            };
        }

        return {
            recintosViaveis,
        };
    }
}

export { RecintosZoo as RecintosZoo };

