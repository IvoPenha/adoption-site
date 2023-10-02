import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Select,
  Text,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import React from 'react';
import { createPet } from '../../../services';
import { decodeToken } from '../../../core/cryptography/jwt';
import { CommonUsuarioClaims } from '../../../types/CommonUsuario';
import { removerPropriedade } from '../../../utils';

const FormSelect = React.forwardRef<
  HTMLSelectElement,
  { propsOptions: { value: string, name: string }[] } & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, propsOptions }, ref) => (
  <>
    <Select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      {propsOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))
      }
    </Select>
  </>
))

export const CriarPet = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const form = watch();

  const decodedToken = decodeToken<CommonUsuarioClaims>(localStorage.getItem('userToken')!)

  const { id } = decodedToken


  const onSubmit: SubmitHandler<any> = (data) => {
    data.userId = id
    removerPropriedade(data, 'disponibilidade')
    data.fotos = []
    createPet(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing="6"
          py="1"
          px={{ base: "4", md: "10" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormControl id="nome">
            <FormLabel>Nome do Bichinho</FormLabel>
            <Input
              autoComplete="nome"
              {...register("nome", { required: true })}
            />
            {errors.nome && (
              <Text color="red.500" fontSize="xs">
                Insira um nome válido
              </Text>
            )}
          </FormControl>
          <FormControl id="tamanho">
            <FormLabel>Tamanho</FormLabel>
            <FormSelect
              propsOptions={[
                { value: 'pequeno', name: 'Pequeno' },
                { value: 'medio', name: 'Médio' },
                { value: 'grande', name: 'Grande' },
                { value: 'desconhecido', name: 'Não sei' }
              ]}
              {...register('porte')}
            />
          </FormControl>
          <FormControl id="sexo">
            <FormLabel>
              Sexo
            </FormLabel>
            <FormSelect
              propsOptions={
                [
                  { value: 'm', name: 'Macho' },
                  { value: 'f', name: 'Fêmea' },
                  { value: '', name: 'Não sei' }
                ]
              }
              {...register('sexo')}
            />
          </FormControl>
          <FormControl id="especie">
            <FormLabel>
              Especie
            </FormLabel>
            <FormSelect
              propsOptions={
                [
                  { value: 'Cachorro', name: 'Cachorro' },
                  { value: 'Gato', name: 'Gato' },
                ]
              }
              {...register('especie')}
            />
          </FormControl>
          {/* <FormControl id="cpf">
                    <FormLabel>CPF</FormLabel>
                    <Input type="text" autoComplete="cpf"
                      {...register("cpf")} />

                  </FormControl> */}
          <FormControl id="raca">
            <FormLabel>Raça</FormLabel>
            <Input {...register("raca")} type="text" />
            {errors.telefone && (
              <Text color="red.500" fontSize="xs">
                Insira um telefone válido
              </Text>
            )}
          </FormControl>
          <FormControl id="sobre">
            <FormLabel>Sobre o bichinho</FormLabel>
            <Textarea  {...register("descricao")} />
          </FormControl>
          <FormControl id="disponibilidade">
            <FormLabel>Disponibilidade para encontrar contratante</FormLabel>
            <Textarea {...register("disponibilidade")} />
          </FormControl>

          <FormControl id="foto">
            <FormLabel>Foto</FormLabel>
            <Input type="file"
              {...register("fotos")}
              accept='image/*'
            />
          </FormControl>

          <Stack spacing="10">
            <Button
              type="submit"
              bg={"yellow.600"}
              color={"white"}
              _hover={{
                bg: "yellow.700",
              }}
            >
              Cadastrar
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
