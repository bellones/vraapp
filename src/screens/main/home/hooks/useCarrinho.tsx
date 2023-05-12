/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { CarrinhoType } from '../../../../store/carrinhoStore';
import { Endereco } from '../../profile/model';
import { LojaType } from '../model';

export interface IuseCarrinho {
    carrinhoItens : CarrinhoType[],
    calculatotal: () => void
}

const useCarrinho = ({carrinhoItens, calculatotal}:IuseCarrinho) => {
  const [endereco, setEndereco] = useState<Endereco>();
  const [enderecoList, setEnderecoList] = useState<Endereco[]>();
  const [showEnderecoModal, setShowEnderecoModal] = useState(false);
  const [loja, setLoja] = useState<LojaType>();

  const showSelectEnderecoModal = (visible: boolean) => {
    setShowEnderecoModal(visible);
  };
  const selectEndereco = (end: Endereco | undefined) => {
    setShowEnderecoModal(false);
    setEndereco(end);
  };

  useEffect(() => {
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

    const loadLoja = async () => {
      if (carrinhoItens.length > 0) {
        const idLoja = carrinhoItens[0].produto?.idloja;
        const lojaData = await firestore().collection('loja').doc(idLoja).get();
        if (lojaData.exists) {
          setLoja({
            banner: lojaData?.data()?.banner,
            cnpj: lojaData?.data()?.cnpj,
            foto: lojaData?.data()?.foto,
            funcionamento: lojaData?.data()?.funcionamento,
            id: lojaData.id,
            idtipo: lojaData?.data()?.idtipo,
            localizacao: {
              latitude: lojaData?.data()?.locazicao[0],
              longitude: lojaData?.data()?.locazicao[1],
            },
            nome: lojaData?.data()?.nome,
          });
        }
      }
    };
    loadEndereco();
    loadLoja();
    calculatotal();
  }, [calculatotal, carrinhoItens]);

  return {
    endereco, enderecoList, showEnderecoModal, loja, showSelectEnderecoModal, selectEndereco,
  };
};
export default useCarrinho;
