import { db } from "../../firebase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import _ from "lodash";

interface CardCollectionType {
  uuid: string;
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
  cardType: "Imóvel" | "Veículo";
  cardValor: number;
  cardBoatPlane: boolean;
}

const cardCollectionToFlatArray = (card: CardCollectionType) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  const flatMapWithoutInstallment: Omit<CardCollectionType, "cardInstallment"> =
    {
      administradora: card.administradora,
      cardEntrada: formatter.format(card.cardEntrada) as any,
      cardValor: formatter.format(card.cardValor) as any,
      cardDestaque: card.cardDestaque ? "Sim" : ("Não" as any),
      cardExpire: new Date(card.cardExpire).toLocaleDateString("pt-br"),
      cardNotes: card.cardNotes,
      cardSituation: card.cardSituation ? "Ativa" : ("Inativa" as any),
      cardType: card.cardType,
      uuid: card.uuid,
      cardBoatPlane: card.cardBoatPlane ? "Sim" : ("Não" as any),
    };

  return _.flatMap(flatMapWithoutInstallment);
};

const cardInstallmentsFlatAndFormat = (
  cardInstallment: CardCollectionType["cardInstallment"]
) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
  const formatAndFlat = cardInstallment.map((value, index) => {
    return `${value.installmentMonths}x  ${formatter.format(
      value.installmentValue
    )}`;
  });
  return formatAndFlat.join("\n\n");
};

export default async function exportAllCards() {
  const flatDataArray: Array<string | number | boolean>[] = [];
  try {
    const fireStoreRequest = await db
      .collection("collections")
      .doc("cartas")
      .collection("entries")
      .get();

    fireStoreRequest.forEach(async (value) => {
      const cardValue = value.data() as CardCollectionType;

      flatDataArray.push([
        ...cardCollectionToFlatArray(cardValue),
        cardInstallmentsFlatAndFormat(cardValue.cardInstallment),
      ]);
    });

    const doc = new jsPDF();

    autoTable(doc, {
      head: [
        [
          "Administradora",
          "Entrada",
          "Valor",
          "Destaque",
          "Vencimento",
          "Anotações",
          "Situação",
          "Tipo",
          "ID",
          "Embarcação/Aeronave",
          "Parcelas",
        ],
      ],
      body: flatDataArray,
      bodyStyles: {
        fontSize: 4,
      },
      headStyles: {
        fontSize: 6,
      },
    });

    doc.save();
  } catch (error) {
    console.log(error);
  }
}
