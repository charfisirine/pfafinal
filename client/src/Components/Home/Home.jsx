import React from 'react';
import { Grid, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import php from '../../assets/php.png';
import page from '../../assets/page.png';
import python from '../../assets/python.png';
import css from '../../assets/css.jpg';
import ssl from '../../assets/ssl.png';
import learning from '../../assets/learning.png';
import react from '../../assets/react.jpg';
import './home.css';

const Home = () => {
  const cards = [
    { img: php, title: 'PHP Certification', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { img: python, title: 'Python Certification', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { img: css, title: 'CSS Certification', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { img: ssl, title: 'SSL Certification', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { img: learning, title: 'Learning Certification', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { img: react, title: 'React Certification', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' }
  ];

  return (
    <div>
      <section id="home" className="hero-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12 col-12">
              <div className="hero-content">
                <h1 className="wow fadeInLeft" data-wow-delay=".4s">Empowering Your Journey Through Certification Excellence.</h1>
                <p className="wow fadeInLeft" data-wow-delay=".6s">Empowering individuals with the keys to certification excellence, we ignite pathways to boundless achievement and professional growth.</p>
                <form className="search-form">
                  <input className="input-search" type="text" placeholder="Search..." />
                  <button className="button-search" type="submit">Search</button>
                  {/* <Button  variant="contained" startIcon={<DeleteIcon />} type="submit">Search</Button> */}
                </form>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-12">
              <div className="hero-image wow fadeInRight" data-wow-delay=".4s">
                <img src={page} alt="Laptop" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features section">
        <div className="">
          <div className="row">
            <div className="col-24">
              <div className="section-title">
                <h2 className="wow fadeInUp" data-wow-delay=".4s">"ÉLEVEZ VOTRE RÉUSSITE AVEC NOS CERTIFICATIONS !"</h2>
                <p className="wow fadeInUp" data-wow-delay=".6s">Nous proposons une multitude de certifications pour répondre à tous vos besoins !</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container top-distance-xl">
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <div className="single-feature wow fadeInUp" data-wow-delay=".2s">
                  <img src={card.img} className="card-img-top" alt={`${card.title} Logo`} />
                  <h5 className="top-distance">{card.title}</h5>
                  <p className="top-distance">{card.description}</p>
                  <Button variant="contained" color="primary" className="top-distance">
                    See More
                  </Button>
                </div>
              </Grid>
            ))}
          </Grid>
          </div>
      </section>
    </div>
  );
}

export default Home;
