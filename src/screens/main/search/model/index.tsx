/* eslint-disable prettier/prettier */
import { Route } from 'react-native';
import { CategoriaType, LojaType, ProdutoType } from '../../home/model';

export type SearchInputType = {
  buscar: (busca: string | undefined) => void;
  texto: string | undefined;
};
export type CategoriaListItemType = {
  item: CategoriaType;
  navigate: (categ: CategoriaType | undefined) => void;
};

export type CategoriaScreenType = {
  route: Route;
};

export type SearchResultScreenType = {
  route: Route;
};

export type SearchTabsType = {
  lojas: LojaType[] | undefined;
  produtos: ProdutoType[] | undefined;
};

export type LojasTabType = {
  lojas: LojaType[] | undefined;
};

export type ProdutoTabType = {
  produtos: ProdutoType[] | undefined;
};

export type LojasListItemType = {
  item: LojaType | undefined;
};

export type ProdutoListItemType = {
  item: ProdutoType | undefined;
  click: boolean | undefined;
};


