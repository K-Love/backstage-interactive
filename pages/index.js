import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/ComingSoon.module.css';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your email collection logic here
    alert(`Thank you! We'll notify ${email} when we launch.`);
    setEmail('');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coming Soon | Backstage Interactive</title>
        <meta name="description" content="The new Backstage Interactive website is coming soon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image 
            src="/backstage-interactive-logo.png" 
            alt="Backstage Interactive Logo" 
            width={280}
            height={70}
            priority
            className={styles.logo}
          />
        </div>
        
        <h1 className={styles.title}>Coming Soon</h1>
        
        <p className={styles.description}>
          We're redesigning the Backstage Interactive website to serve you better.
          Our new site will be live soon with exciting new features and content.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form} data-netlify="true" name="contact">
          <input
            type="email"
            placeholder="Enter your email for updates"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            name="email"
            required
          />
          <button type="submit" className={styles.button}>Notify Me</button>
        </form>
        
        <div className={styles.social}>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter</a>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
          <a href="mailto:your@email.com" className={styles.socialLink}>Contact</a>
        </div>
      </main>
    </div>
  );
}