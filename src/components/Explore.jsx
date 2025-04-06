import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { AiFillHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { uploadFileToPinata } from "../utils/uploadToPinata";


export const Explore = ({ state, account }) => {
  const { contract } = state;
  const [likedPins, setLikedPins] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  const toggleLike = (id) => {
    setLikedPins((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const dummyPins = [
    { id: 1, image: "https://i.pinimg.com/736x/c9/b8/19/c9b819d3d8f74767132022eac6201b5a.jpg" },
    { id: 2, image: "https://i.pinimg.com/474x/a3/73/a7/a373a7c6251ea3ff07c47a05287778ff.jpg" },
    { id: 3, image: "https://i.pinimg.com/474x/a8/5d/b6/a85db6ce8aea9d0688118b7c4f08c91a.jpg" },
    { id: 4,  image: "https://i.pinimg.com/736x/66/b1/08/66b1082468790b1a4a345a62538263b5.jpg" },
    { id: 5,  image: "https://i.pinimg.com/736x/51/35/3c/51353cac082a606c196051b8bb46a025.jpg" },
    { id: 6, image: "https://i.pinimg.com/474x/f9/d6/f7/f9d6f7aed6693c4cbc95f8ea4e7b33f9.jpg" },
    { id: 7,  image: "https://i.pinimg.com/474x/08/ec/d4/08ecd4ef29e1bfc7fd0a29e2be5e7fa8.jpg" },
    { id: 8,  image: "https://i.pinimg.com/474x/da/96/b6/da96b6431f2c25932416cd9c1e918c9b.jpg" },
  ];

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1,
  };

  const styles = {
    container: {
      padding: '20px',
      background: '#f8f8f8',
      width: '100vw',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      maxWidth: '1300px',
      marginInline: 'auto',
    },
    title: {
      fontSize: '28px',
      color: '#333',
    },
    button: {
      backgroundColor: '#e60023',
      color: 'white',
      border: 'none',
      padding: '10px 18px',
      borderRadius: '20px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    gridWrapper: {
      maxWidth: '1300px',
      margin: '0 auto',
    },
    masonryGrid: {
      display: 'flex',
      marginLeft: '-15px',
      width: 'auto',
      gap: '15px',
    },
    masonryColumn: {
      paddingLeft: '15px',
      backgroundClip: 'padding-box',
    },
    card: {
      background: 'white',
      marginBottom: '20px',
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      position: 'relative',
    },
    image: {
      width: '100%',
      display: 'block',
      objectFit: 'cover',
    },
    cardText: {
      padding: '12px',
      fontSize: '15px',
      color: '#444',
    },
    iconContainer: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      display: 'flex',
      gap: '10px',
      zIndex: 1,
    },
    icon: {
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '50%',
      padding: '5px',
      transition: 'transform 0.2s',
    },
    liked: {
      color: '#e60023',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    popupCard: {
      background: 'white',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'row',
      maxWidth: '800px',
      width: '90%',
      padding: '20px',
      gap: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    },
    popupImage: {
      width: '200px',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '12px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '10px',
    },
    closeBtn: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      fontSize: '24px',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Explore Pins</h1>
        <button style={styles.button}>Log Contract</button>
      </div>

      <div style={styles.gridWrapper}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          style={styles.masonryGrid}
          columnClassName="masonry-column"
        >
          {dummyPins.map((pin) => (
            <div
              key={pin.id}
              style={styles.card}
              onClick={() => setSelectedCard(pin)}
            >
              <div style={styles.iconContainer}>
                <AiFillHeart
                  style={{
                    ...styles.icon,
                    ...(likedPins[pin.id] ? styles.liked : {}),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(pin.id);
                  }}
                />
                <AiOutlineInfoCircle
                  style={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Info about "${pin.title}"`);
                  }}
                />
              </div>
              <img src={pin.image} alt={pin.title} style={styles.image} />
              <div style={styles.cardText}>{pin.title}</div>
            </div>
          ))}
        </Masonry>
      </div>

      {selectedCard && (
        <div style={styles.overlay} onClick={() => setSelectedCard(null)}>
          <div style={styles.popupCard} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedCard.image}
              alt={selectedCard.title}
              style={styles.popupImage}
            />
            <div style={styles.details}>
              <h2>{selectedCard.title}</h2>
              <p><strong>Creator:</strong> Jane Doe</p>
              <p><strong>Price:</strong> 1.5 ETH</p>
              <p><strong>Description:</strong> A stunning capture of nature’s raw beauty and vibrant serenity.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
