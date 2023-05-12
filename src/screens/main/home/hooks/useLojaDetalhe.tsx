/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { LojaType, ProdutoType } from '../model';
export interface IuseLojaDetalhe {
  loja: LojaType;
}

const useLojaDetalhe = ({loja}: IuseLojaDetalhe) => {
  const [produto, setProduto] = useState<ProdutoType[]>();
  useEffect(() => {
    const loadData = async () => {
      const produtoData = await firestore()
        .collection('produto')
        .where('idloja', '==', loja.id)
        .get();
      if (produtoData) {
        const dataPromo: ProdutoType[] = [];
        produtoData.docs.forEach(item => {
          dataPromo.push({
            nome: item.data().nome,
            foto: item.data().foto,
            idloja: item.data().idloja,
            idcategoria: item.data().idcategoria,
            valor: item.data().valor,
            pagamento: item.data().pagamento,
            usaEstoque: item.data().usaEstoque,
            estoque: item.data().estoque,
            promocao: item.data().promocao,
            usaDesconto: item.data().usaDesconto,
            desconto: item.data().desconto,
            id: item.id,
          });
        });
        setProduto(dataPromo);
      }
    };
    loadData();
  }, [loja.id]);
  return {
    produto,
  };
};

export default useLojaDetalhe;
