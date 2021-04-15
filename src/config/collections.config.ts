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
  hidden?: boolean;
  private?: boolean;
  required?: boolean;
  currencyPrefix?: string;
  groupID?: string;
  name: string;
}

export interface DataCreationItem extends DashboardItemRoot {
  collectionRef: string;
  fields: Array<DataCreationField>;
  attributesFields?: Array<AttributeCollectionField>;
  hasCategories?: boolean | null;
  hasAttributes?: boolean | null;
  fieldGroups?: FieldGroup[];
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
  ],
  fields: [
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
      fieldType: "string",
      label: "Saldo",
      name: "cardSaldo",
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
      label: "Vencimento da carta",
      name: "cardExpire",
    },

    {
      groupID: "infoGroup",
      fieldType: "time",
      label: "Horário ",
      name: "cardTime",
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
    },
  ],
};

const testimonialCollection: DashboardItem = {
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
  ],
};

export const collections: Array<DashboardItem> = [
  cardCollection,
  blogCollection,
  testimonialCollection,
  partnersCollection,
];
