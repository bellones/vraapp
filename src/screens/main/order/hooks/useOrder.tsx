/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ProfileScreenType } from '../../profile/model';
import { OrderType } from '../model';
export interface IuseOrder {
  navigation: any;
}
const useOrder = ({navigation}: IuseOrder) => {
  const [user, setUser] = useState<ProfileScreenType>();
  const [pedido, setPedido] = useState<OrderType[]>();
  const [historico, setHistorico] = useState<OrderType[]>();

  const loadUser = async () => {
    const logged = auth().currentUser;
    const userid = logged?.uid;
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
        showButton: false,
      };
      userData.docs.forEach(perfil => {
        meuPerfill.email = perfil.data().email;
        meuPerfill.name = perfil.data().nome;
      });
      setUser(meuPerfill);
    }
  };

  const navigateTo = (order: OrderType | undefined) => {
    navigation.navigate('OrderDetail' as never, {order: order} as never);
  };

  useEffect(() => {
    const loadData = async () => {
      const logged = auth().currentUser;
      const userid = logged?.uid;
      const pedidos: OrderType[] = [];
      const dataPedido = await firestore()
        .collection('pedido')
        .orderBy('data', 'desc')
        .where('idUsuario', '==', userid)
        .get();
      if (dataPedido) {
        dataPedido.docs.forEach(item => {
          const itemAdd: OrderType = {
            aceito: item.data().aceito,
            data: moment(item.data().data.toDate()).format('DD/MM/YYYY HH:mm'),
            dataFinalizado: moment(item.data().dataFinalizado.toDate()).format(
              'DD/MM/YYYY HH:mm',
            ),
            dataSaiuEntrega: moment(
              item.data().dataSaiuEntrega.toDate(),
            ).format('DD/MM/YYYY HH:mm'),
            endereco: item.data().endereco,
            finalizado: item.data().finalizado,
            idLoja: item.data().idLoja,
            idUsuario: item.data().idUsuario,
            itens: item.data().itens,
            loja: item.data().loja,
            pagamento: item.data().pagamento,
            saiuEntrega: item.data().saiuEntrega,
            total: item.data().total,
            id: item.id,
          };
          pedidos.push(itemAdd);
        });

        if (pedidos.length > 0) {
          const hist = pedidos.filter(item => item.finalizado === true);
          const andPedidos = pedidos.filter(item => item.finalizado === false);
          setHistorico(hist);
          setPedido(andPedidos);
        }
      }
    };

    loadUser();

    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 300 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return {
    navigateTo,
    user,
    pedido,
    historico,
  };
};
export default useOrder;
