const createAboutTemplate = () => {
  return `
      <section class="about">
        <div class="about__header">
          <h2 class="about__title">About TuriturianSude</h2>
        </div>
        
        <div class="about__content">
          <div class="about__description">
            <p>TuriturianSude adalah platform berbagi cerita visual dan lokasi yang didedikasikan untuk komunitas pembelajar di Dicoding.</p>
            
            <div class="about__features">
              <div class="feature-card">
                <i class="fas fa-camera feature-card__icon"></i>
                <h3>Visual Stories</h3>
                <p>Bagikan momen pembelajaran Anda melalui foto berkualitas tinggi</p>
              </div>
              
              <div class="feature-card">
                <i class="fas fa-map-marker-alt feature-card__icon"></i>
                <h3>Location Sharing</h3>
                <p>Tandai dan bagikan lokasi di mana Anda belajar atau berkolaborasi</p>
              </div>
              
              <div class="feature-card">
                <i class="fas fa-users feature-card__icon"></i>
                <h3>Tech Community</h3>
                <p>Terhubung dengan sesama pembelajar teknologi di Dicoding</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
};

export default createAboutTemplate;
