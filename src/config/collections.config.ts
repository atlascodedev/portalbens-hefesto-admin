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

export const collections: Array<DashboardItem> = [
  {
    itemID: "testCollection1",
    collectionRef: "collection1",
    itemCategory: "creation",
    sidebarIcon: "Delete",
    routerPath: "routerPath",
    sidebarLabel: "Dashboard item",
    hasAttributes: true,
    hasCategories: true,
    fieldGroups: [
      {
        id: "group1",
        label: "Informações",
      },
      {
        id: "group2",
        label: "Grupo 2",
      },
    ],

    fields: [
      {
        label: "Número",
        fieldType: "phone",
        name: "phoneNumber",
        groupID: "group1",
      },

      {
        label: "Preço",
        fieldType: "money",
        name: "itemPrice",
        currencyPrefix: "R$",
        groupID: "group1",
      },

      {
        name: "creditValue",
        fieldType: "string",
        label: "Valor do crédito",
        groupID: "group1",
      },
      {
        name: "featuredImage",
        fieldType: "image",
        label: "Imagem principal",
        groupID: "group1",
        hidden: true,
      },

      {
        label: "Post",
        fieldType: "markdown",
        name: "blogPost",
        groupID: "group2",
        hidden: true,
      },
    ],

    attributesFields: [
      {
        name: "adminOrigin",
        label: "Administradoras",
      },
      {
        name: "brands",
        label: "Marcas",
      },
      {
        name: "sizes",
        label: "Tamanhos",
      },
      {
        name: "ingredients",
        label: "Ingredientes",
      },
    ],
  },

  {
    fieldGroups: [{ id: "group1", label: "Informações" }],
    itemID: "testCollection2",
    collectionRef: "firebaseCollection",
    itemCategory: "creation",
    fields: [
      {
        fieldType: "string",
        label: "Campo",
        name: "field1",
        currencyPrefix: "R$",
        groupID: "group1",
      },

      {
        fieldType: "select",
        name: "selectme",
        groupID: "group1",
        label: "Selecione",
        selectOptions: ["Opção 1", "trikiki", "rolimã"],
      },
      {
        fieldType: "boolean",
        name: "verdaderoooo",
        groupID: "group1",
        label: "Habilitado",
      },
      {
        fieldType: "radio",
        name: "mylittleradio",
        groupID: "group1",
        label: "Just no",
        radioOptions: [
          { label: "Primeiro valor", value: "value1" },
          { label: "Segundo valor maybe", value: "maybevalue2" },
          { label: "To reach inside and find the peace", value: "as I decay" },
        ],
      },

      {
        fieldType: "checkbox",
        label: "Checkboxu-sama",
        groupID: "group1",
        name: "checkboxsenpai",
        checkboxOptions: [
          { label: "Primeiro valorhue", value: "value1" },
          { label: "Segundo valor maybehue", value: "maybevalue2" },
          {
            label: "To reach inside and find the peacehue",
            value: "as I decay",
          },
        ],
      },
    ],
    routerPath: "rota2",
    sidebarIcon: "AcUnit",
    sidebarLabel: "Label 2",
  },
];
