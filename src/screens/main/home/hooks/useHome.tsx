/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Endereco } from '../../profile/model';
import { BannerType, CategoriaProdutoType, LojaType, ProdutoType } from '../model';

const useHome = () => {

const [banner, setBanner] = useState<BannerType[]>();
const [endereco, setEndereco] = useState<Endereco>();
const [enderecoList, setEnderecoList] = useState<Endereco[]>();
const [promocao, setPromocao] = useState<ProdutoType[]>();
const [loja, setLoja] = useState<LojaType[]>();
const [categoria, setCategoria] = useState<CategoriaProdutoType[]>();
const [restaurante, setRestaurante] = useState<LojaType[]>();
const [showEnderecoModal, setShowEnderecoModal] = useState(false);
const showSelectEnderecoModal = (show: boolean) => {
  setShowEnderecoModal(show);
};
const selectEndereco = (end: Endereco | undefined) => {
  setShowEnderecoModal(false);
  setEndereco(end);
};


useEffect(() => {
  const loadBanner = async () => {
    const bannerData = await firestore().collection('banner').get();
    const dataBanner: BannerType[] = [];
    if (bannerData) {
      bannerData.docs.forEach(item => {
        dataBanner.push({
          foto: item.data().foto,
          idsegmento: item.data().idsegmento,
          tipo: item.data().tipo,
          id: item.id,
        });
      });
      setBanner(dataBanner);
    }
  };
  const loadEndereco = async () => {
    const userid = auth().currentUser?.uid;
    const enderecoData = await firestore()
      .collection('endereco')
      .where('userid', '==', userid)
      .get();

    const dataEndereco: Endereco[] = [];

    if (enderecoData) {
      enderecoData.docs.forEach(item => {
        dataEndereco.push({
          bairro: item.data().bairro,
          cidade: item.data().cidade,
          complemento: item.data().complemento,
          local: item.data().local,
          localizacao: {
            latitude: item.data().localizacao[0],
            longitude: item.data().localizacao[1],
          },
          numero: item.data().numero,
          userid: item.data().userid,
          estado: item.data().estado,
          id: item.id,
        });
      });
      setEndereco(dataEndereco[0]);
      setEnderecoList(dataEndereco);
    }
  };
  const loadLojas = async () => {
    const lojaData = await firestore().collection('loja').limit(20).get();
    const dataLoja: LojaType[] = [];
    const dataRestaurante: LojaType[] = [];
    if (lojaData) {
      lojaData.docs.forEach(item => {

        const itemData : LojaType =
          {
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
          };

          itemData.idtipo === 'NthpkRTu3fXqfbwSk1PA' ? dataLoja.push(itemData) : dataRestaurante.push(itemData);
      });

      setLoja(dataLoja);
      setRestaurante(dataRestaurante);
    }
  };
  const loadPromocao = async () => {
    const promoData = await firestore()
      .collection('produto')
      .where('promocao', '==', true)
      .limit(10)
      .get();
    const dataPromo: ProdutoType[] = [];
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
      setPromocao(dataPromo);
    }
  };

  const loadCategorias = async () => {
    const categoriaData = await firestore()
      .collection('categoria')
      .limit(3)
      .get();
    const dataCategoria: CategoriaProdutoType[] = [];
    if (categoriaData) {
      categoriaData.docs.forEach(async item => {
        const dataProduto: ProdutoType[] = [];
        const produtoCategoria = await firestore()
          .collection('produto')
          .where('idcategoria', '==', item.id)
          .limit(10)
          .get();
        produtoCategoria.docs.forEach(produto => {
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

        dataCategoria.push({
          categoria: {
            foto: item.data().foto,
            id: item.id,
            subtitulo: item.data().subtitulo,
            titulo: item.data().titulo,
          },
          produtos: dataProduto,
        });
      });
      setCategoria(dataCategoria);
    }
  };
  const loadData = async () => {
    await loadCategorias();
    await loadBanner();
    await loadEndereco();
    await loadLojas();
    await loadPromocao();
  };

  loadData();
}, []);


  return {
      banner, endereco, enderecoList, promocao, loja, categoria, restaurante, showEnderecoModal, showSelectEnderecoModal, selectEndereco,
  };
};
export default useHome;
