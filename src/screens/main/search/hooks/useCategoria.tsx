/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { CategoriaType } from '../../home/model';
const useCategoria = () => {
  const [categoria, setCategoria] = useState<CategoriaType[]>();
  useEffect(() => {
    const loadData = async () => {
      const categData = await firestore()
        .collection('categoria')
        .orderBy('titulo', 'asc')
        .get();
      const dataCateg: CategoriaType[] = [];
      if (categData) {
        categData.docs.map(item => {
          dataCateg.push({
            foto: item.data().foto,
            id: item.id,
            subtitulo: item.data().subtitulo,
            titulo: item.data().titulo,
          });
        });
        setCategoria(dataCateg);
      }
    };
    loadData();
  }, []);
  return {categoria};
};
export default useCategoria;
