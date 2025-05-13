/**
 * MedusaBest - Kişisel Biyografi Web Sitesi
 * script.js - Ana JavaScript dosyası
 */

// DOM içeriği yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    console.log('web sitesi yüklendi!');
    
    // Tema değiştirici
    setupThemeToggle();
    
    // Matrix animasyonu
    setupMatrixBackground();
    
    // Mobil menü toggle
    setupMobileMenu();
    
    // Yazı animasyonu
    setupTypingAnimation();
    
    // Smooth scrolling
    setupSmoothScrolling();
    
    // Özel imleç
    setupCustomCursor();
    
    // Footer yılını otomatik güncelle
    updateFooterYear();
    
    // Sayfada fade-in animasyonlarını aktif et
    setupScrollAnimations();
});

/**
 * Tema değiştirici işlevselliğini ayarlar (Koyu/Açık mod)
 */
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Kullanıcı tercihini localStorage'dan al (varsa)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
    
    themeToggleBtn.addEventListener('click', function() {
        // Temayı değiştir
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
}

/**
 * Matrix stilinde arkaplan animasyonu oluşturur
 */
function setupMatrixBackground() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Karakterler
    const characters = "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Dikey pozisyonları tutan dizi
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Animasyon fonksiyonu
    function drawMatrix() {
        // Yarı saydam siyah arkafon, kuyruk etkisi için
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Yeşil text
        ctx.fillStyle = "#0f0";
        ctx.font = fontSize + "px 'Fira Code'";
        
        // Her sütun için karakterleri çiz
        for (let i = 0; i < drops.length; i++) {
            // Rastgele bir karakter seç
            const text = characters[Math.floor(Math.random() * characters.length)];
            
            // Karakteri çiz
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Karakterin Y pozisyonunu güncelle
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Canvas boyutunu pencere boyutuyla güncelle
    window.addEventListener('resize', function() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
    
    // Animasyon döngüsü
    setInterval(drawMatrix, 50);
}

/**
 * Mobil menü toggle fonksiyonu
 */
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
    
    // Menü linklerine tıklandığında mobil menüyü kapat
    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('show');
        });
    });
    
    // Sayfa kaydırıldığında menüyü küçült
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Aşağı kaydırma
            navbar.style.transform = "translateY(-100%)";
        } else {
            // Yukarı kaydırma
            navbar.style.transform = "translateY(0)";
        }
        
        // Sayfanın en üstündeyken her zaman görünür
        if (scrollTop <= 50) {
            navbar.style.transform = "translateY(0)";
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Yazı animasyonu oluşturur
 */
function setupTypingAnimation() {
    const typedElement = document.getElementById('home-typed');
    if (!typedElement) return;
    
    const texts = [
        "echo 'Siber dünyaya hoş geldiniz!'",
        "sudo nmap -sS -sV -O medusa.best",
        "cat /etc/passwd | grep 'security'",
        "python3 zafiyet_tarayici.py --hedef=website.com",
        "git commit -m 'Güvenlik açığı giderildi'"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Silme işlemi
            typedElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Yazma işlemi
            typedElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Yazma tamamlandıysa, silmeye başla
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Silmeden önce bekle
        }
        
        // Silme tamamlandıysa, sonraki metne geç
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Yazı animasyonunu başlat
    typeText();
}

/**
 * Sayfa içi linklerde yumuşak kaydırma sağlar
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Özel imleç efekti oluşturur
 */
function setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Linklere ve butonlara hover olduğunda imleç efekti
    const hoverables = document.querySelectorAll('a, button, .btn');
    
    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.5';
        });
        
        hoverable.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '0.7';
        });
    });
    
    // Mobil cihazlarda özel imleci gizle
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
    }
}

/**
 * Footer'daki yılı otomatik günceller
 */
function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Sayfa kaydırıldıkça öğelerin fade-in animasyonunu aktif eder
 */
function setupScrollAnimations() {
    // Tüm ana bölümler
    const sections = document.querySelectorAll('.section');
    
    // Intersection Observer ile ekrana giren öğeleri tespit et
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Terminal pencerelerindeki yazı animasyonu
                if (entry.target.querySelector('.terminal-content')) {
                    const terminalContent = entry.target.querySelector('.terminal-content');
                    terminalContent.style.opacity = '0';
                    setTimeout(() => {
                        terminalContent.style.transition = 'opacity 1s ease';
                        terminalContent.style.opacity = '1';
                    }, 300);
                }
                
                // Gözlemlemeyi durdur
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Bölümleri gözlemle
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Proje kartları için animasyon
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }, index * 100); // Kademeli animasyon
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // Blog kartları için animasyon
    const blogCards = document.querySelectorAll('.blog-card');
    const blogObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }, index * 100); // Kademeli animasyon
            }
        });
    }, {
        threshold: 0.1
    });
    
    blogCards.forEach(card => {
        blogObserver.observe(card);
    });
}
