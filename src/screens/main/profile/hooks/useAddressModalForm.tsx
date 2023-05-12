/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { AddresModalFormType, Endereco } from '../model';

const useAddressModalForm = ({
  item,
  onSaveEnd,
  showModal,
}: AddresModalFormType) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setData] = useState<Endereco>({
    bairro: item?.bairro,
    cidade: item?.cidade,
    complemento: item?.complemento,
    local: item?.local,
    localizacao: {
      latitude: item?.localizacao.latitude,
      longitude: item?.localizacao.longitude,
    },
    numero: item?.numero,
    userid: item?.userid,
    estado: item?.estado,
    id: item?.id,
  });
  const validate = () => {
    if (formData.local === undefined || formData.local?.length === 0) {
      setErrors({...errors, local: 'Preencha Corretamente o Endereço'});
      return false;
    }
    if (formData.numero === undefined || formData.numero?.length === 0) {
      setErrors({...errors, numero: 'Preencha Corretamente o Número'});
      return false;
    }
    if (formData.bairro === undefined || formData.bairro?.length === 0) {
      setErrors({...errors, bairro: 'Preencha Corretamente o Bairro'});
      return false;
    }
    if (formData.cidade === undefined || formData.cidade?.length === 0) {
      setErrors({...errors, cidade: 'Preencha Corretamente a Cidade'});
      return false;
    }
    if (formData.estado === undefined || formData.estado?.length === 0) {
      setErrors({...errors, estado: 'Preencha Corretamente o Estado'});
      return false;
    }

    setErrors({});
    return true;
  };
  const submitData = () => {
    if (validate()) {
      setLoading(true);
      showModal(false);
      onSaveEnd(formData);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = () => {
      if (item) {
        setData(item);
      }
    };
    loadData();
  }, [item]);

  return {
    submitData,
    errors,
    setData,
    setErrors,
    loading,
    formData,
  };
};

export default useAddressModalForm;
