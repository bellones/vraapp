/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import {
    Button,
    HStack,
    Icon,
    IconButton,
    KeyboardAvoidingView,
    Text,
    theme
} from 'native-base';
import React, { useRef, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import CreditCard from 'react-native-credit-card-form-ui';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CardModalType, Cartao } from '../model';
import { styles } from '../style/ProfileStyle';
const CardModal = ({ showModal, item, saveCard }: CardModalType) => {
    const creditCardRef = useRef() as any;
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
        setLoading(true);
        if (creditCardRef.current) {
            const { error, data } = creditCardRef.current.submit();
            if (error) {
                Alert.alert(
                    'Erro!',
                    'Foram Encontrados erros no preenchimento do cartão preencha os dados corretamente',
                    [
                      { text: 'OK'}
                    ]
                  );
            } else {
                const card : Cartao = {
                     bandeira : data.brand,
                     cvv: data.cvv,
                     numero: data.number,
                     nome: data.holder,
                     validade: data.expiration,
                     userid : item?.userid,
                     id : item?.userid,
                };
                saveCard(card);
            }
        }
        setLoading(false);
    };
    return (
        <SafeAreaView style={styles.container}>
            <HStack space={2} justifyContent={'space-between'} alignItems={'center'} p={2}>
                <Text fontSize="lg" color="black" bold>
                    Novo Cartão
                </Text>
                <IconButton
                    mr="1"
                    variant="unstyled"
                    alignSelf="flex-end"
                    icon={
                        <Icon
                            size="6"
                            color="black"
                            as={Ionicons}
                            name={'ios-close-outline'}
                        />
                    }
                    onPress={() => {
                        showModal(false);
                    }}
                />
            </HStack>

            <KeyboardAvoidingView alignItems={'center'}>
                <CreditCard
                    ref={creditCardRef}
                    background={theme.colors.blue[400]}
                    textColor={theme.colors.white}
                    placeholderTextColor={theme.colors.white}
                    initialValues={{
                        brand : item?.bandeira,
                        cvv :  item?.cvv?.toString() ,
                        expiration: item?.validade,
                        holder: item?.nome,
                        number: item?.numero
                    }}
                />
                <Button
                    variant="solid"
                    size="lg"
                    mt="8"
                    mb="8"
                    colorScheme={'blue'}
                    isLoading={loading}
                    onPress={() => {
                        handleSubmit();
                    }}>
                    SALVAR
                </Button>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
};

export default CardModal;
