/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { UserModalType, UserProfileDataType } from '../model';

const useUserModal = ({profile, saveProfile}: UserModalType) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setData] = useState<UserProfileDataType>({
    cpf: profile?.cpf,
    email: profile?.email,
    id: profile?.id,
    nascimento: profile?.nascimento,
    nome: profile?.nome,
    telefone: profile?.telefone,
    userid: profile?.userid,
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const validate = () => {
    if (formData.nome === undefined || formData.nome?.length === 0) {
      setErrors({...errors, local: 'Preencha Corretamente o Nome'});
      return false;
    }
    if (formData.email === undefined || formData.email?.length === 0) {
      setErrors({...errors, numero: 'Preencha Corretamente o Email'});
      return false;
    }
    if (formData.cpf === undefined || formData.cpf?.length < 11) {
      setErrors({...errors, bairro: 'Preencha Corretamente o CPF'});
      return false;
    }
    if (
      formData.nascimento === undefined ||
      formData.nascimento?.length === 0
    ) {
      setErrors({
        ...errors,
        cidade: 'Preencha Corretamente a Data de Nascimento',
      });
      return false;
    }
    if (formData.telefone === undefined || formData.telefone?.length === 0) {
      setErrors({...errors, estado: 'Preencha Corretamente o Celular'});
      return false;
    }

    setErrors({});
    return true;
  };

  const onSubmit = () => {
    setLoading(true);
    if (validate()) {
      saveProfile(formData);
    }
    setLoading(false);
  };

  return {
    onSubmit,
    setData,
    setErrors,
    errors,
    loading,
    formData,
    showCalendar,
    setShowCalendar,
  };
};

export default useUserModal;
