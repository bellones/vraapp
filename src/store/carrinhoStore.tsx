/* eslint-disable prettier/prettier */
import create from 'zustand';
import { ProdutoType } from '../screens/main/home/model';

export type CarrinhoType = {
  valor: Number | undefined;
  quantidade: Number | undefined;
  produto: ProdutoType | undefined;
  lojaId: string | undefined;
  idUsuario: string | undefined;
};

export type CarrinhoStoreType = {
  carrinho: CarrinhoType[];
  addCarrinho: (item: CarrinhoType) => void;
  removeItem: (id: string | undefined) => void;
  updateCarrinho: (
    quantidade: number | undefined,
    id: string | undefined,
  ) => void;
  qtd: number;
  setQtd: (quantidade: number) => void;
  total: number;
  calculaTotal: () => void;
  limpaCarinho : () => void;
};

export const useCarrinhoStore = create<CarrinhoStoreType>(set => ({
  carrinho: [],
  addCarrinho: carrinho =>
    set(state => ({
      carrinho: [...state.carrinho, carrinho],
    })),
  removeItem: id =>
    set(state => ({
      carrinho: state.carrinho.filter((item) => item.produto?.id !== id),
    })),
  updateCarrinho: (quantidade, id) =>
    set(state => ({
      carrinho: state.carrinho.map(item => {
        if (item.produto?.id === id) {
          return {
            ...item,
            quantidade: quantidade === 0 ? 1 : quantidade,
            valor: item.produto?.usaDesconto
              ? Number(item?.produto?.valor) - Number(item?.produto?.desconto)
              : Number(item?.produto?.valor),
          };
        } else {
          return {...item};
        }
      }),
    })),
  qtd: 0,
  setQtd: () =>
    set(state => ({
      qtd: state.carrinho.length,
    })),
  total: 0,
  calculaTotal: () =>
    set(state => ({
      total: state.carrinho.reduce((total, item) => (Number(item.quantidade) * Number(item.valor)) + total, 0),
    })),
    limpaCarinho: () =>
      set(_ => ({
      carrinho: [],
    })),
}));
