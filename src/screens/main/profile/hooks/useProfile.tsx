/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import {
    Cartao,
    Endereco,
    ProfileScreenType,
    UserProfileDataType
} from '../model';
const useProfile = () => {
  const [user, setUser] = useState<ProfileScreenType>();
  const [endereco, setEndereco] = useState<Endereco[]>();
  const [selecionado, setSelecionado] = useState<Endereco>();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [showUserModal, setUserModal] = useState(false);
  const [profile, setProfile] = useState<UserProfileDataType>();
  const [card, setCard] = useState<Cartao[]>();
  const [showCard, setShowCard] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardSelecionado, SetCardSelecionado] = useState<Cartao>();

  const onSuccess = (message: string) => {
    showMessage({
      message: 'Sucesso!',
      description: message,
      type: 'success',
    });
  };

  const action = (end: Endereco | undefined) => {
    setShowAction(true);
    setSelecionado(end);
  };

  const onError = (error: string) => {
    showMessage({
      message: 'Erro',
      description: error,
      type: 'danger',
    });
  };

  const setEnd = (end: Endereco | undefined) => {
    setSelecionado(end);
  };

  const showModal = (show: boolean) => {
    setShowAddressModal(show);
  };
  const showUserEditModal = (show: boolean) => {
    setUserModal(show);
  };
  const showCardModal = (cartao: Cartao | undefined) => {
    setShowCard(true);
    SetCardSelecionado(cartao);
  };

  const cardModalForm = (show: boolean) => {
    setShowCardForm(show);
    setShowCard(false);
  };

  const onSaveEnd = async (end: Endereco | undefined) => {
    setShowAddressModal(false);
    const data = {
      bairro: end?.bairro,
      cidade: end?.cidade,
      complemento: end?.complemento,
      local: end?.local,
      localizacao: [end?.localizacao.latitude, end?.localizacao.longitude],
      numero: end?.numero,
      userid: end?.userid,
      estado: end?.estado,
    };
    if (end?.id !== '') {
      await firestore().collection('endereco').doc(end?.id).set(data);

      onSuccess('Endereço Alterado com Sucesso');
    } else {
      const insert = await firestore().collection('endereco').add(data);
      if (insert !== null) {
        onSuccess('Endereço Inserido com Sucesso');
      } else {
        onError(
          'Não foi possível Salvar seu Endereço tente novamente mais tarde',
        );
      }
    }
    loadUser();
  };

  const onEditEnd = () => {
    setShowAction(false);
    setShowAddressModal(true);
  };

  const onDeleteEnd = async () => {
    setShowAction(false);
    await firestore().collection('endereco').doc(selecionado?.id).delete();

    onSuccess('Endereço Excluído com Sucesso');

    loadUser();
  };

  const onDeleteCard = async () => {
    setShowCard(false);
    await firestore().collection('cartao').doc(cardSelecionado?.id).delete();

    onSuccess('Cartão Excluído com Sucesso');

    loadUser();
  };

  const loadUser = async () => {
    const data: Endereco[] = [];
    const cardData: Cartao[] = [];
    const logged = auth().currentUser;
    if (logged) {
      const userid = logged.uid;
      const userData = await firestore()
        .collection('perfil')
        .where('userid', '==', userid)
        .limit(1)
        .get();
      if (userData.docs) {
        const meuPerfill: ProfileScreenType = {
          name: null,
          email: null,
          showUser: () => {},
          showButton: true,
        };
        const profileData: UserProfileDataType = {
          cpf: '',
          email: '',
          id: '',
          nascimento: '',
          nome: '',
          telefone: '',
          userid: userid,
        };

        userData.docs.forEach(perfil => {
          meuPerfill.email = perfil.data().email;
          meuPerfill.name = perfil.data().nome;
          //profiledata
          profileData.email = perfil.data().email;
          profileData.nome = perfil.data().nome;
          profileData.cpf = perfil.data().cpf;
          profileData.userid = perfil.data().userid;
          profileData.telefone = perfil.data().telefone;
          profileData.nascimento = perfil.data().nascimento;
          profileData.id = perfil.id;
        });
        setUser(meuPerfill);
        setProfile(profileData);
      }
      if (userid) {
        const list = await firestore()
          .collection('endereco')
          .where('userid', '==', userid)
          .get();
        if (list) {
          list.docs.forEach(item => {
            data.push({
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
        }
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
        }
      }
      setEndereco(data);
      setCard(cardData);
    }
  };

  const onSaveProfile = async (data: UserProfileDataType) => {
    const item = {
      cpf: data.cpf,
      email: data.email,
      nascimento: data.nascimento,
      nome: data.nome,
      telefone: data.telefone,
      userid: data.userid,
    };

    if (data.id !== '') {
      await firestore().collection('perfil').doc(data?.id).set(item);

      onSuccess('Perfil Alterado com Sucesso');
    } else {
      const insert = await firestore().collection('perfil').add(item);
      if (insert !== null) {
        onSuccess('Perfil Alterado com Sucesso');
      } else {
        onError(
          'Não foi possível Salvar seu Perfil tente novamente mais tarde',
        );
      }
    }
    setUserModal(false);
    loadUser();
  };

  const onSaveCard = async (data: Cartao) => {
    console.log(data);
    const item = {
      bandeira: data.bandeira,
      cvv: data.cvv,
      numero: data.numero,
      nome: data.nome,
      validade: data.validade,
      userid: auth().currentUser?.uid,
    };

    if (data.id !== '') {
      await firestore().collection('cartao').doc(data?.id).set(item);

      onSuccess('Cartão Inserido com Sucesso');
    } else {
      const insert = await firestore().collection('cartao').add(item);
      if (insert !== null) {
        onSuccess('Cartão Alterado com Sucesso');
      } else {
        onError(
          'Não foi possível Salvar seu Cartão tente novamente mais tarde',
        );
      }
    }
    setShowCardForm(false);
    setShowCard(false);
    loadUser();
  };

  const onEditCard = () => {
    setShowCardForm(true);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return {
    onEditCard,
    onSaveCard,
    onSaveProfile,
    onDeleteCard,
    onDeleteEnd,
    onEditEnd,
    onSaveEnd,
    cardModalForm,
    showCardModal,
    showUserEditModal,
    showModal,
    setEnd,
    action,
    cardSelecionado,
    showCardForm,
    card,
    showCard,
    profile,
    showUserModal,
    showAction,
    showAddressModal,
    selecionado,
    endereco,
    user,
    setShowAction,
    setShowCard,
  };
};
export default useProfile;
