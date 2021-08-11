import { db } from "../../firebase";
import jsPDF from 'jspdf'
import autoTable from  'jspdf-autotable'
import { BooleanLiteral } from "typescript";
import _ from "lodash";



interface CardCollectionType {
    uuid: string
    administradora: string;
    cardDestaque: boolean;
    cardEntrada: number;
    cardExpire: string;
    cardInstallment: Array<{
        installmentMonths: string;
        installmentValue: number;
    }>;
    cardNotes: string;
    cardSituation: boolean;
    cardType: 'Imóvel' | "Veículo";
    cardValor: number;
}

const cardCollectionToFlatArray = (card: CardCollectionType) => {

    const flatMapWithoutInstallment: Omit<CardCollectionType, "cardInstallment"> = {
        uuid: card.uuid,
        administradora: card.administradora,
        cardEntrada: card.cardEntrada,
        cardValor: card.cardValor,
        cardDestaque: card.cardDestaque,
        cardExpire: card.cardExpire,
        cardNotes: card.cardNotes,
        cardSituation: card.cardSituation,
        cardType: card.cardType,
    };

    console.log(_.flatMap(flatMapWithoutInstallment, ))

}

const cardInstallmentsFlatAndFormat = (cardInstallment: CardCollectionType['cardInstallment']) => {
    const formatter = new Intl.NumberFormat('pt-BR', {currency: 'BRL', style: 'currency'})
    const formatAndFlat = cardInstallment.map((value, index) => {

        return `${value.installmentMonths} vezez de ${formatter.format(value.installmentValue)}`

    })
    return formatAndFlat.join('\n\n');

}


export default async function exportAllCards() {

    const cardArray: CardCollectionType[] = []

    try {
        
        const fireStoreRequest = await db.collection('collections').doc('cartas').collection('entries').get()

        fireStoreRequest.forEach(async (value ) => {

        cardArray.push(value.data() as CardCollectionType)
        })


        // console.log(cardArray)
        // cardCollectionToFlatArray(cardArray[0])

        cardInstallmentsFlatAndFormat(cardArray[0].cardInstallment)



        // const doc = new jsPDF()

        // autoTable(doc, {
        //     head: [['ID', 'Administradora', 'Entrada', 'Valor', 'Próximo vencimento', 'Tipo de carta', 'Carta Destaque', 'Parcelas', 'Anotações'   ]],
        //     body: []
        // })

        // doc.save()

    } catch (error) {

        console.log(error)
        
    }

 

}