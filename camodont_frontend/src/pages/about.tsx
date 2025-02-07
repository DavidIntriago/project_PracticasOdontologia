import React from 'react';
import { useRouter } from 'next/router';
import { Container, VStack, Text, Heading, Box, Avatar, Button, Link } from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  const router = useRouter();

  const handleBookAppointment = () => {
    router.push('/#BookAppointment'); // Navigate to the contact page
  };

  return (
    <>
      <NavBar />
      <Container maxW="3xl" mt={10} mb={10} centerContent>
        <VStack spacing={10} align="stretch">
          <Heading size="xl" textAlign="center" color="gray.700">
            Carrera de Odontologia
          </Heading>
          <Box>
            <Avatar size="xl" name="Dr. Smith" src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" mb={4} />
            <Text fontSize="lg" color="gray.600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In modi adipisci nesciunt? Id harum quia ducimus assumenda fugiat, molestiae nostrum commodi delectus aspernatur, iusto nobis ea necessitatibus quibusdam fuga. Nulla.
            </Text>
            <Text fontSize="lg" color="gray.600" mt={4}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam qui rem maxime perferendis inventore, iusto suscipit explicabo! Assumenda possimus, ab repellat nihil, earum itaque ad laboriosam quibusdam sed at asperiores.
            </Text>
            
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;

