import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import ContactInfo from '../../components/ContactInfo';
import NavBar from '../components/NavBar';
import Hero from '../../components/Hero';
import Stats from '../../components/Stats';
import FAQ from '../../components/Faq';
import Testimonials from '../../components/Testimonials';
import MedicalCalculators from '../../components/MedicalCalculators';
import HealthTips from '../../components/HealthTips';
import Quotes from '../../components/Quotes';
import PublicHolidays from '../../components/PublicHolidays';
import Footer from '../components/Footer';
import {SessionProvider} from '../hooks/SessionContext';
import AppointmentFeatures from '../components/ServicesIndex';

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <Box as="main">
        <ContactInfo />
        
        <NavBar />
          <Hero />
          <AppointmentFeatures />
          <Footer />

        </Box>
      </main>
    </div>
  );
};

export default Home;

