/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { OrderType, StatusBadgeType } from '../model';
export interface IuseOrderDetails {
  order: OrderType;
}
const useOrderDetails = ({order}: IuseOrderDetails) => {
    const orderItem: OrderType = order;
    let [status, setStatus] = useState<StatusBadgeType>();
    useEffect(() => {
      const changeStatus = () => {
        if (
          !orderItem.aceito &&
          !orderItem.saiuEntrega &&
          !orderItem.finalizado
        ) {
          setStatus({
            color: 'warning',
            text: 'Pedido Enviado',
          });
        }
        if (orderItem.aceito && !orderItem.saiuEntrega && !orderItem.finalizado) {
          setStatus({
            color: 'info',
            text: 'Pedido em Preparação',
          });
        }
        if (orderItem.aceito && orderItem.saiuEntrega && !orderItem.finalizado) {
          setStatus({
            color: 'success',
            text: 'Pedido saiu para entrega',
          });
        }
        if (orderItem.aceito && orderItem.saiuEntrega && orderItem.finalizado) {
          setStatus({
            color: 'success',
            text: 'Pedido Finalizado',
          });
        }
      };
      const checkStatus = async () => {
        const check = await firestore()
          .collection('pedido')
          .doc(orderItem.id)
          .get();
        if (check !== null) {
          orderItem.aceito = check?.data()?.aceito;
          orderItem.finalizado = check?.data()?.finalizado;
          orderItem.saiuEntrega = check?.data()?.saiuEntrega;
        }
        changeStatus();
      };

      const interval = setInterval(() => {
        checkStatus();
      }, 60 * 1000);
      changeStatus();
      return () => clearInterval(interval);
    }, [orderItem]);

  return {
    orderItem,
    status,
  };
};
export default useOrderDetails;
