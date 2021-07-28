import React from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { RFValue } from "react-native-responsive-fontsize";

import { Button } from "../../components/Form/Button";

import { Container, HeaderTitle, Form } from "./styles";
import { useStorageData } from "../../hooks/storage";

export function Settings() {
  const { handleSubmit } = useForm();

  const { clearStorage } = useStorageData();

  async function handleConfirm() {
    try {
      Alert.alert(
        "Remover itens",
        "Tem certeza que você deseja remover todos os itens cadastrados?",
        [
          {
            text: "Sim",
            onPress: async () => await clearStorage(),
          },
          {
            text: "Não",
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível remover os itens");
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <Container>
        <HeaderTitle>Configurações</HeaderTitle>

        <Form>
          <Button
            style={{
              marginTop: RFValue(26),
            }}
            title="Excluir os logins cadastrados"
            onPress={handleSubmit(handleConfirm)}
          />
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
}
