import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CoursesService from '../../../service/courses.service'; 
import { Container, Row, Carousel, Col, Image } from 'react-bootstrap';
import './Home.css';
import RandomCard from './Random-card';
import Loader from '../../shared/Spinner/Loader';
import Hero from './Hero';
import Features from './Features';
import Banner from './Banner';

const Home = (props) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const coursesService = new CoursesService(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesService.getRandomCourses();
        if (response.data && response.data.length > 0) {
          setCourses(response.data);
        } else {
          throw new Error("No courses found");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da');
        // Only redirect if the error is critical
        if (error.response && error.response.status !== 404) {
          props.history.push('/courses'); 
        }
      } finally {
        setLoading(false);
      }
    };    

    fetchCourses();
  }, [props]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero title='Aspire for more' p1='Learning keeps you in the lead.' p2='Get in-demand skills to impress anyone.' />

      <section className="container-fluid about">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={6}>
              <Image style={{ width: '100%' }} src="https://res.cloudinary.com/dodneiokm/image/upload/v1608222311/project3-ironhack/freedemt_x0s3mo.png" />
            </Col>
            <Col md={6}>
              <h2 className="mb-3">About us</h2>
              <p>We Are SkillWise, an online learning platform. We help organizations of all kinds prepare for the ever-evolving future of work.</p>
              <p>Connecting millions of students to the skills they need to succeed. We offer the opportunity to open access to education, especially for those whose opportunities have historically been limited. To do this, we’ve partnered with a number of organizations.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Carousel */}
      <Container>
        <section className="carousel-section mt-5">
          <h2 className="mt-5 mb-5 text-center ">Explore our schools to find your perfect program</h2>

          {loading ? <Loader /> : (
            <Carousel className='carousel'>
              {[...Array(Math.ceil(courses.length / 4))].map((_, idx) => (
                <Carousel.Item key={idx}>
                  <Row>
                    {[...courses].slice(idx * 4, (idx + 1) * 4).map(elm => (
                      <RandomCard key={elm._id} {...elm} />
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </section>
      </Container>

      <Banner title='Make the most of your online learning experience' text='Our teachers will help you learn while staying home.' />

      {/* Features */}
      <Features />
    </motion.div>
  );
};

export default Home;
