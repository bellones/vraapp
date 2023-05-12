/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { CategoriaType, ProdutoType } from '../../home/model';

export interface IuseProduto{
  categoria : CategoriaType
}

const useProduto = ({categoria} : IuseProduto) => {
  const [produtos, setProdutos] = useState<ProdutoType[]>();

  useEffect(() => {
    const loadData = async () => {
      const dataProduto: ProdutoType[] = [];
      const produtoCategoria = await firestore()
        .collection('produto')
        .where('idcategoria', '==', categoria.id)
        .get();
      produtoCategoria.docs.map(produto => {
        dataProduto.push({
          nome: produto.data().nome,
          foto: produto.data().foto,
          idloja: produto.data().idloja,
          idcategoria: produto.data().idcategoria,
          valor: produto.data().valor,
          pagamento: produto.data().pagamento,
          usaEstoque: produto.data().usaEstoque,
          estoque: produto.data().estoque,
          promocao: produto.data().promocao,
          usaDesconto: produto.data().usaDesconto,
          desconto: produto.data().desconto,
          id: produto.id,
        });
      });
      setProdutos(dataProduto);
    };
    loadData();
  }, [categoria.id]);
  return {produtos};
};
export default useProduto;
