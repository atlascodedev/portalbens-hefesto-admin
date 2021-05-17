import { IconTypes, FormFieldTypes } from "../dictionaries/types";

export interface FieldGroup {
  id: string;
  label: string;
}

export type DashboardItemCategory = "creation" | "visualization";

export interface DashboardItemRoot {
  itemID: string;
  routerPath: string;
  sidebarLabel: string;
  sidebarIcon: IconTypes;
  itemCategory: DashboardItemCategory;
}

export interface RadioField {
  value: string;
  label: string;
}

export interface CheckboxField extends RadioField {}

export interface DataCreationField {
  fieldType: FormFieldTypes;
  label: string;
  initialValue?: string | Array<string>;
  selectOptions?: Array<string>;
  radioOptions?: Array<RadioField>;
  checkboxOptions?: Array<CheckboxField>;
  listOptions?: ListFieldOptions;
  hidden?: boolean;
  private?: boolean;
  required?: boolean;
  currencyPrefix?: string;
  slug?: boolean;
  groupID?: string;
  name: string;
}

export interface ListFieldOptions {
  label: string;
  fieldLabel: string;
  min?: number;
  max?: number;
}

export interface DataCreationItem extends DashboardItemRoot {
  collectionRef: string;
  fields: Array<DataCreationField>;
  attributesFields?: Array<AttributeCollectionField>;
  hasCategories?: boolean | null;
  hasAttributes?: boolean | null;
  fieldGroups?: FieldGroup[];
  showID?: boolean;
  noEdit?: boolean;
}

export interface Attribute {
  label: string;
  name: string;
  attributeValues: Array<string>;
}

export interface AttributeCollectionField {
  label: string;
  name: string;
}

export interface Category {
  uuid: string;
  root?: boolean;
  label: string;
  parent: string | null | undefined;
  uuid_path: Array<string>;
  label_path?: Array<string>;
}

export type DashboardItem = DataCreationItem;

const cardCollection: DashboardItem = {
  showID: true,
  collectionRef: "cartas",
  itemID: "cartas_id",
  itemCategory: "creation",
  sidebarIcon: "CardTravel",
  routerPath: "cartas",
  sidebarLabel: "Cartas contempladas",
  hasAttributes: false,
  hasCategories: false,
  fieldGroups: [
    { id: "adminGroup", label: "Administradora" },
    { id: "infoGroup", label: "Informações" },
    { id: "privateGroup", label: "Campos privados" },
  ],
  fields: [
    {
      groupID: "privateGroup",
      fieldType: "text",
      hidden: true,
      label: "Anotações sobre a carta",
      name: "cardNotes",
      private: true,
      required: false,
    },

    {
      groupID: "adminGroup",
      fieldType: "string",
      label: "Nome da administradora",
      name: "administradora",
    },
    {
      groupID: "infoGroup",
      fieldType: "select",
      selectOptions: ["Imóvel", "Automóvel"],
      label: "Tipo de carta",
      name: "cardType",
    },
    {
      groupID: "infoGroup",
      fieldType: "money",
      label: "Valor do crédito",
      name: "cardValor",
    },
    {
      groupID: "infoGroup",
      fieldType: "money",
      label: "Entrada",
      name: "cardEntrada",
    },

    {
      groupID: "infoGroup",
      fieldType: "boolean",
      label: "Alerta de boa oferta",
      name: "cardDestaque",
      hidden: true,
    },
    {
      groupID: "infoGroup",
      fieldType: "boolean",
      label: "Situação da carta",
      name: "cardSituation",
      hidden: true,
    },

    {
      groupID: "infoGroup",
      fieldType: "date",
      label: "Vencimento",
      hidden: true,
      name: "cardExpire",
    },

    {
      groupID: "infoGroup",
      fieldType: "installment",
      label: "Parcelas",
      name: "cardInstallment",
      hidden: true,
      listOptions: {
        fieldLabel: "Saldo",
        label: "Saldo",
      },
    },
  ],
};

const blogCollection: DashboardItem = {
  collectionRef: "portalBlog",
  sidebarIcon: "LibraryBooks",
  routerPath: "blog",
  sidebarLabel: "Blog",
  itemCategory: "creation",
  itemID: "blogPortal",
  fieldGroups: [{ id: "blogInfo", label: "Informações" }],
  fields: [
    {
      groupID: "blogInfo",
      fieldType: "string",
      label: "Título",
      name: "blogTitle",
      slug: true,
    },

    {
      groupID: "blogInfo",
      fieldType: "text",
      label: "Descrição do post",
      name: "blogDescription",
      hidden: true,
    },

    {
      groupID: "blogInfo",
      fieldType: "image",
      label: "Imagem principal",
      name: "featuredImage",
      hidden: true,
    },
    {
      groupID: "blogInfo",
      fieldType: "markdown",
      label: "Texto",
      name: "blogPost",
      hidden: true,
    },
    {
      groupID: "blogInfo",
      fieldType: "boolean",
      label: "Status do post",
      name: "blogActive",
      hidden: true,
    },
  ],
};

const testimonialCollection: DashboardItem = {
  showID: true,
  collectionRef: "testimonials",
  itemCategory: "creation",
  itemID: "portalTestimonials",
  routerPath: "depoimentos",
  sidebarLabel: "Depoimento",
  sidebarIcon: "Group",
  fieldGroups: [{ id: "infoTestimonial", label: "Informações" }],
  fields: [
    {
      groupID: "infoTestimonial",
      fieldType: "string",
      label: "Nome do cliente",
      name: "testimonialName",
      slug: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "image",
      label: "Foto do cliente",
      name: "testimonialPicture",
      hidden: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "text",
      label: "Depoimento do cliente",
      name: "testimonialText",
      hidden: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "string",
      label: "Cidade/Estado",
      name: "testimonialLocation",
      hidden: true,
    },
  ],
};

const messageCollection: DashboardItem = {
  collectionRef: "messages",
  hasAttributes: false,
  hasCategories: false,
  itemCategory: "creation",
  itemID: "messages_id",
  routerPath: "mensagens",
  sidebarIcon: "AddPhotoAlternate",
  sidebarLabel: "Mensagens",
  noEdit: true,
  fieldGroups: [{ id: "infoGroup", label: "informações" }],
  fields: [
    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Nome",
      name: "messageName",
    },
    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Email",
      name: "messageEmail",
    },
    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Mensagem",
      name: "messageText",
    },
  ],
};

const partnersCollection: DashboardItem = {
  collectionRef: "partners",
  itemCategory: "creation",
  itemID: "partnerID",
  routerPath: "parceiros",
  sidebarIcon: "MoreHoriz",
  sidebarLabel: "Parceiro",
  fieldGroups: [{ id: "partnerInfo", label: "Informações" }],
  fields: [
    {
      fieldType: "string",
      label: "Nome do parceiro",
      name: "partnerName",
      groupID: "partnerInfo",
    },
    {
      fieldType: "image",
      label: "Logo do parceiro",
      name: "partnerLogo",
      groupID: "partnerInfo",
      hidden: true,
    },
    {
      fieldType: "list",
      label: "Lista",
      name: "simpleList",
      groupID: "partnerInfo",
      listOptions: {
        fieldLabel: "Nome do ingrediente",
        label: "Lista de ingredientes",
      },
      hidden: true,
    },
    {
      fieldType: "installment",
      label: "Another list",
      name: "installmentList",
      groupID: "partnerInfo",
      listOptions: {
        fieldLabel: "Saldo",
        label: "notused",
      },
      hidden: true,
    },
  ],
};

export const collections: Array<DashboardItem> = [
  cardCollection,
  blogCollection,
  testimonialCollection,
  partnersCollection,
  messageCollection,
];
