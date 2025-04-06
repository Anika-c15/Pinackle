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
    { id: 1, title: "Mountains", image: "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Ocean", image: "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Forest", image: "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "City", image: "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, title: "Art", image: "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, title: "Food", image: "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, title: "Travel", image: "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, title: "Design", image: "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
