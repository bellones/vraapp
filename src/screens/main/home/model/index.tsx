/* eslint-disable prettier/prettier */
import { Route } from 'react-native';
import { CarrinhoType } from '../../../../store/carrinhoStore';
import { Cartao, Endereco } from '../../profile/model';


export type ProdutoType = {
  id: string | undefined;
  nome: string | undefined;
  foto: string | undefined;
  idloja: string | undefined;
  idcategoria: string | undefined;
  valor: number | undefined;
  pagamento: number | undefined;
  usaEstoque: boolean | undefined;
  estoque: number | undefined;
  promocao: boolean | undefined;
  usaDesconto: boolean | undefined;
  desconto: number | undefined;
};
export type LojaType = {
  id: string | undefined;
  nome: string | undefined;
  foto: string | undefined;
  banner: string | undefined;
  idtipo: string | undefined;
  localizacao: {
    longitude: number | undefined;
    latitude: number | undefined;
  };
  cnpj: string | undefined;
  funcionamento: string | undefined;
};

export type CategoriaTypeItem = {
  categoria : CategoriaType[]
}
export type CategoriaType = {
  id: string | undefined;
  titulo: string | undefined;
  subtitulo: string | undefined;
  foto: string | undefined;
};
export type BannerType = {
  id: string | undefined;
  idsegmento: string | undefined;
  foto: string | undefined;
  tipo: string | undefined;
};
export type HomeScreenType = {
  produtos: ProdutoType[] | undefined;
  lojas: LojaType[] | undefined;
  banners: BannerType[] | undefined;
  categorias: CategoriaType[] | undefined;
};
export type BannerList = {
  banners: BannerType[] | undefined;
};
export type EnderecoPrincipalType = {
  item: Endereco | undefined;
  showModal : (show: boolean) => void;
  showButton: boolean;
};
export type EnderecoModalType ={
  showModal : (show: boolean) => void;
  enderecos: Endereco[] | undefined;
  selecionado : (end: Endereco | undefined) => void;
};
export type EnderecoModalItemType = {
  item : Endereco | undefined;
  selecionado : (end: Endereco | undefined) => void;
};
export type LojasList = {
  lojas: LojaType[] | undefined;
};
export type RestauranteList = {
  restaurantes: LojaType[] | undefined;
};
export type PromocaoList = {
  produtos: ProdutoType[] | undefined;
};
export type ProdutoListItemType = {
  item : ProdutoType | undefined;
};
export type CategoriaProdutoType = {
  categoria: CategoriaType | undefined;
  produtos : ProdutoType [] | undefined;
};
export type CategoriasType = {
  categoriaProduto : CategoriaProdutoType[] | undefined;
}
export type LojasScreenType = {
  route : Route;
}
export type ProdutoScreenType = {
  route : Route;
};
export type LojaDetalheScreenType = {
  route : Route;
}

export type CarrinhoListItemType = {
  item : CarrinhoType | undefined;
  removeItem : (id: string | undefined) => void;
  updateItem : (id: string | undefined, quantidade: number | undefined) => void;
};

export type FooterCarrinhoType = {
  showModal : (show: boolean) => void;
}
export type OrderModalType = {
  route: Route;
}
 export type PagamentoModalType = {
  showModal : (show: boolean) => void;
  cartao: Cartao[] | undefined;
  selecionado : (end: Cartao | undefined) => void;
 }
