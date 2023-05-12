/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { LojaType } from '../model';
export interface IuseLoja {
  tipo: string;
}
const useLoja = ({tipo}: IuseLoja) => {
  const [lojas, setLojas] = useState<LojaType[]>();

  useEffect(() => {
    const loadLoja = async () => {
      const idTipo =
        tipo === 'restaurante'
          ? '6aPe5cxvxHfxOptFQU7n'
          : 'NthpkRTu3fXqfbwSk1PA';
      const lojaData = await firestore()
        .collection('loja')
        .where('idtipo', '==', idTipo)
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
          setLojas(dataLoja);
        }
      }
    };
    loadLoja();
  }, [tipo]);
  return {
    lojas,
  };
};
export default useLoja;
