let currentLang = 'en';

// Dil dosyasını yükle
async function loadLang(lang) {
  try {
    const res = await fetch(`lang/${lang}.json`);
    if (!res.ok) throw new Error(`Dil dosyası bulunamadı: ${lang}`);
    const data = await res.json();

    document.getElementById('name').innerText = data.name || "Halit Bozkurt";
    document.getElementById('username').innerText = data.username || "@bozlive";
    document.getElementById('about-title').innerText = data.aboutTitle || "Hakkımda";
    document.getElementById('about').innerText = data.about || "";
    document.getElementById('random-title').innerText = data.randomTitle || "Rastgele Bilgi";
    document.getElementById('sponsor-title').innerText = data.sponsorTitle || "Sponsorlar & Reklamlar";
    document.getElementById('follow-title').innerText = data.followTitle || "Takip Et";

    // Rastgele bilgi göster
    showRandomFact(data.facts);

  } catch (err) {
    console.error("Dil dosyası yüklenemedi:", err);
  }
}

function setLang(lang) {
  currentLang = lang;
  loadLang(lang);
}

function showRandomFact(factsArray) {
  if (factsArray && factsArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * factsArray.length);
    document.getElementById('random-info').innerText = factsArray[randomIndex];
  }
}

// Sayfa açıldığında otomatik dil algılama
document.addEventListener("DOMContentLoaded", () => {
  const browserLang = navigator.language.slice(0,2);
  if (['tr','en','id'].includes(browserLang)) {
    setLang(browserLang);
  } else {
    setLang('en');
  }
});
