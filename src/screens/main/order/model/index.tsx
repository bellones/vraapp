/* eslint-disable prettier/prettier */
import { Route } from 'react-native';
import { CarrinhoType } from '../../../../store/carrinhoStore';
import { LojaType } from '../../home/model';
import { Cartao, Endereco } from '../../profile/model';

export type OrderType = {
  idUsuario: string | undefined;
  idLoja: string | undefined;
  itens: CarrinhoType[] | undefined;
  endereco: Endereco | undefined;
  data: string | undefined;
  aceito: boolean;
  saiuEntrega: boolean;
  total: number;
  loja: LojaType | undefined;
  pagamento: Cartao;
  dataSaiuEntrega :  string | undefined;
  dataFinalizado : string | undefined;
  finalizado: boolean;
  id: string
};

export type OrderTabsType = {
    pedido : OrderType[] | undefined;
    historico  : OrderType[] | undefined;
    navigateTo: (order: OrderType | undefined) => void;
}

export type OrderOnProgress = {
    pedido : OrderType[] | undefined;
    navigateTo: (order: OrderType | undefined) => void;
}

export type OrderHistoryType = {
    historico  : OrderType[] | undefined;
    navigateTo: (order: OrderType | undefined) => void;
}

export type OrderListItemType = {
    item : OrderType | undefined;
    navigateTo: (order: OrderType | undefined) => void;
};

export type OrderDetailScreenType = {
    route: Route;
}

export type StatusBadgeType = {
    color: string;
    text: string;
  };
