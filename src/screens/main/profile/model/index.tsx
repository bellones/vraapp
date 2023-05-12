export type ProfileScreenType = {
  name: string | null | undefined;
  email: string | null | undefined;
  showUser: (show: boolean) => void;
  showButton: boolean;
};

export type Endereco = {
  id: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  complemento: string | undefined;
  local: string | undefined;
  numero: string | undefined;
  userid: string | undefined;
  localizacao: {
    longitude: number | undefined;
    latitude: number | undefined;
  };
  estado: string | undefined;
};
export interface EndrecoList {
  enderecos: Endereco[] | undefined;
  selecionado: Endereco | undefined;
  escolherEndereco: (endereco: Endereco | undefined) => void;
  showModal: (show: boolean) => void;
  action: (endereco: Endereco | undefined) => void;
}

export type ProfileTabsModel = {
  endereco: EndrecoList;
  cartao: CartaoList;
};
export type ProfileAddressListItemType = {
  item: Endereco | undefined;
  action: (endereco: Endereco | undefined) => void;
  escolherEndereco: (endereco: Endereco | undefined) => void;
};

export type AddressModalType = {
  showModal: (show: boolean) => void | undefined;
  selecionado: Endereco | undefined;
  onSaveEnd: (end: Endereco | undefined) => void;
};

export type AddresModalFormType = {
  item: Endereco | undefined;
  showModal: (show: boolean) => void | undefined;
  onSaveEnd: (end: Endereco | undefined) => void;
};

export type UserModalType = {
  showModal: (show: boolean) => void;
  profile: UserProfileDataType | undefined;
  saveProfile: (user: UserProfileDataType) => void;
};

export type UserProfileDataType = {
  nome: string | undefined;
  email: string | undefined;
  telefone: string | undefined;
  nascimento: string | undefined;
  cpf: string | undefined;
  userid: string | undefined;
  id: string | undefined;
};

//TIPOS DO CARTÃO

export type Cartao = {
  nome: string | undefined;
  cvv: number | undefined;
  numero: string | undefined;
  userid: string | undefined;
  validade: string | undefined;
  id: string | undefined;
  bandeira: string | undefined;
};

export type CartaoList = {
  cartao: Cartao[] | undefined;
  showModal: (show: boolean) => void;
  action: (cartao: Cartao | undefined) => void;
};

export type ProfileCardListItemType = {
  item: Cartao | undefined;
  action: (card: Cartao | undefined) => void;
};

export type CardModalType = {
  showModal: (show: boolean) => void;
  item: Cartao | undefined;
  saveCard: (card: Cartao) => void;
};
