import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
} from '@chakra-ui/react'
import { GiCardRandom, GiFemale, GiMale, } from 'react-icons/gi';

interface props {
  especie: string;
  nome: string;
  usuario: string;
  pic?: string;
  sexo?: 'm' | 'f' | null;
  onClick?: () => void;
}

export function Card({ especie, nome, usuario, pic, sexo, onClick }: props) {

  const currentSex = sexo

  const icon = currentSex === 'm' ? <GiMale /> : currentSex === 'f' ? <GiFemale /> : <GiCardRandom />;

  return (
    <Center py={12}
      onClick={() => onClick && onClick()}
      cursor={'pointer'}
      _hover={
        {
          boxShadow: 'lg',
          transform: 'scale(1.02)',
          transition: 'all .3s ease-in-out',
        }
      }
    >
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${pic})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={pic}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              {especie}
            </Text>
            <Text
              textColor={currentSex === 'm' ? 'blue.500' : currentSex === 'f' ? 'pink.500' : 'gray.500'}
              fontSize={24}
              position={'absolute'}
              right={'15%'}
            >
              {icon}
            </Text>
          </Flex>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {nome}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text color={'gray.600'}>
              {usuario}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}