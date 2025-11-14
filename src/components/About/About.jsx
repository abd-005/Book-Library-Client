import React from 'react';
import MyContainer from '../MyContainer';

const About = () => {
    return (    
         <div>
            <MyContainer>
            <div className="my-12 text-center">
            <div className="card rounded-2xl badge-outline overflow-hidden p-12 mx-12 md:mx-3 md:p-10 space-y-6">
        <h2 className="font-secondary text-4xl font-semibold text-base-100">
          <span className="text-2xl pl-2 md:text-4xl text-base-100 font-primary">The Book Heaven</span>
        </h2>
        <div className="text-base-100 leading-loose text-lg space-y-4">
          <p>
            Welcome to <b>The Book Heaven</b>, a community built by book lovers, for book lovers. Our mission is simple: to create a vibrant, inclusive space where readers can discover, share, and discuss the literature that moves them. We believe that every book has a reader, and every reader deserves a voice.
          </p>
          <p>
            This platform was founded on the idea of shared passion. We go beyond mere listings, providing detailed pages for every title, complete with summaries, key details, and a dynamic comment section. Here, you can track your literary journey, contribute your favorite reads, and engage in meaningful conversations that deepen your appreciation for the written word.
          </p>
          <p>
            Thank you for being a part of our growing library. Happy reading!
          </p>
        </div>
      </div> 
    </div>
         </MyContainer>
         </div>
    );
};

export default About;