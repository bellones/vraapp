/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { CarrinhoType } from '../../../../store/carrinhoStore';
import { Cartao, Endereco } from '../../profile/model';
import { LojaType } from '../model';

export interface IuseOrderModal {
  endereco: Endereco;
  loja: LojaType;
  itens: CarrinhoType[];
  limpa: () => void;
  total: number;
  setQtd: (quantidade: number) => void;
  navigation: any;
}

const useOrderModal = ({
  endereco,
  loja,
  itens,
  limpa,
  total,
  setQtd,
  navigation,
}: IuseOrderModal) => {
  const [show, setShow] = useState(false);
  const [card, setCard] = useState<Cartao[]>();
  const [selectedCard, setSelectedCard] = useState<Cartao>();
  const [loading, setLoading] = useState(false);

  const showPagamentoModal = (showitem: boolean) => {
    setShow(showitem);
  };
  const selectCard = (cartao: Cartao | undefined) => {
    setSelectedCard(cartao);
    setShow(false);
  };

  const finalizarPedido = async () => {
    if (!selectedCard) {
      onError('Você deve Cadastrar uma forma de pagamento');
      return false;
    }
    if (!endereco) {
      onError('Você deve Cadastrar um endereço para entrega');
      return false;
    }
    setLoading(true);

    const pedidoData = {
      idUsuario: auth().currentUser?.uid,
      idLoja: loja?.id,
      itens: itens,
      endereco: endereco,
      data: firestore.Timestamp.fromDate(new Date()),
      aceito: false,
      saiuEntrega: false,
      total: total + 10,
      loja: loja,
      pagamento: selectedCard,
      dataSaiuEntrega: firestore.Timestamp.fromDate(new Date()),
      dataFinalizado: firestore.Timestamp.fromDate(new Date()),
      finalizado: false,
    };
    const criarPedido = await firestore().collection('pedido').add(pedidoData);
    if (criarPedido !== null) {
      setLoading(false);
      limpa();
      setQtd(0);
      navigation.navigate('Pedidos' as never);
    } else {
      setLoading(false);
      onError('Erro ao criar pedido tente novamente mais tarde');
    }
    setLoading(false);
  };

  const onError = (error: string) => {
    showMessage({
      message: 'Erro',
      description: error,
      type: 'danger',
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const userid = auth().currentUser?.uid;
      const cardData: Cartao[] = [];
      const cardList = await firestore()
        .collection('cartao')
        .where('userid', '==', userid)
        .get();
      if (cardList) {
        cardList.docs.forEach(item => {
          cardData.push({
            nome: item.data().nome,
            cvv: item.data().cvv,
            numero: item.data().numero,
            userid: item.data().userid,
            validade: item.data().validade,
            id: item.id,
            bandeira: item.data().bandeira,
          });
        });
        setCard(cardData);
        setSelectedCard(cardData[0]);
      }
    };
    loadData();
  }, []);
  return {
    finalizarPedido,
    selectCard,
    showPagamentoModal,
    show,
    card,
    loading,
    selectedCard,
  };
};
export default useOrderModal;
