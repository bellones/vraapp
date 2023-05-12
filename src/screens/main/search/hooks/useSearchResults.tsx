/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { LojaType, ProdutoType } from '../../home/model';
interface IuseSearchResults {
  busca: string;
}
const useSearchResults = ({busca}: IuseSearchResults) => {
  const [produtos, setProdutos] = useState<ProdutoType[]>();
  const [lojas, setLojas] = useState<LojaType[]>();

  useEffect(() => {
    const loadLoja = async () => {
      const lojaData = await firestore()
        .collection('loja')
        .orderBy('nome', 'asc')
        .get();
      let dataLoja: LojaType[] = [];
      if (lojaData) {
        lojaData.docs.forEach(item => {
          dataLoja.push({
            banner: item.data().banner,
            cnpj: item.data().cnpj,
            foto: item.data().foto,
            funcionamento: item.data().funcionamento,
            id: item.id,
            idtipo: item.data().idtipo,
            localizacao: {
              latitude: item.data().locazicao[0],
              longitude: item.data().locazicao[1],
            },
            nome: item.data().nome,
          });
        });
        if (dataLoja) {
          dataLoja = dataLoja.filter(item =>
            item.nome?.toLowerCase().includes(busca.toString().toLowerCase()),
          );
          setLojas(dataLoja);
        }
      }
    };
    const loadProduto = async () => {
      const promoData = await firestore()
        .collection('produto')
        .orderBy('nome', 'asc')
        .get();
      let dataPromo: ProdutoType[] = [];
      if (promoData) {
        promoData.docs.forEach(item => {
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
        if (dataPromo) {
          dataPromo = dataPromo.filter(item =>
            item.nome?.toLowerCase().includes(busca.toString().toLowerCase()),
          );
          setProdutos(dataPromo);
        }
      }
    };

    const loadData = async () => {
      await loadLoja();
      await loadProduto();
    };
    loadData();
  }, [busca]);
  return {
    produtos,
    lojas,
  };
};
export default useSearchResults;
