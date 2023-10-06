import { Box } from "@chakra-ui/react";
import { CarouselContainer, Hero } from "./components";
import { Card } from "../../shared/components/";
import { useEffect, useRef, useState } from 'react';
import { getCachorros, getGatos } from '../../services';
import { IPetResponse } from '../../types';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {

  const ref = useRef<any>();
  const [cachorros, setCachorros] = useState<IPetResponse[]>([]);
  const [gatos, setGatos] = useState<IPetResponse[]>([]);
  useEffect(() => {
    const getCachorrosEGatosFromApi = async () => {
      const dogResponse = await getCachorros()
      if (dogResponse.response) {
        setCachorros(dogResponse.response)
      }
      const catResponse = await getGatos()
      if (catResponse.response) {
        setGatos(catResponse.response)
      }
    }
    getCachorrosEGatosFromApi()

  }, []);

  const navigate = useNavigate()

  return (
    <Box>
      <Hero PortedRef={ref} />
      <Box ref={ref}>
        {cachorros.length > 1 && <CarouselContainer title="Doguinhos">
          {cachorros.map((cachorro, index) => (
            <Card
              especie="Cachorro"
              nome={cachorro.nome}
              usuario={cachorro.nome}
              pic={!cachorro.fotos[0] ? "/dogprofile.jpg" : cachorro.fotos[0]}
              key={index}
              sexo={cachorro.sexo}
              onClick={() => navigate(`/pet/${cachorro.id}`)}
            />
          ))}
        </CarouselContainer>
        }
        {
          gatos.length >= 1 &&
          <CarouselContainer title="Gatinhos">
            {gatos.map((gato, index) => (
              <Card
                especie={`${index}`}
                nome={gato.nome}
                usuario="Ana Francisca"
                pic={!gato.fotos[0] ? "/catprofile.jpg" : gato.fotos[0]}
                key={index}
                sexo={gato.sexo}
                onClick={() => navigate(`/pet/${gato.id}`)}
              />
            ))}
          </CarouselContainer>
        }
      </Box>
    </Box>
  );
};
