// Main scroll functionality
const sets = document.querySelectorAll('.text-set');
const myPic = document.getElementById('myPic');
const gradPic = document.getElementById('gradPic');
let currentIndex = -1;
let exitAnimationStarted = false;

function updateActive(index) {
  if (index === currentIndex) return;
  
  sets.forEach(set => set.classList.remove('active', 'fade-out', 'exit-right'));
  myPic.classList.remove('active', 'fade-out');
  gradPic.classList.remove('active', 'fade-out', 'exit-left');
  
  sets[index].classList.add('active');
  (index === 2 ? gradPic : myPic).classList.add('active');
  currentIndex = index;
}

// Certifications animation functionality
function initCertificationsAnimations() {
  const certSection = document.getElementById('certifications');
  const introElements = document.querySelectorAll('.cert-intro-element');
  const categoryTitles = document.querySelectorAll('.cert-category-title');
  const certRows = document.querySelectorAll('.cert-row');
  const allCards = document.querySelectorAll('.cert-card');
  
  // Set initial states for cards based on their position in the row
  allCards.forEach(card => {
    const row = card.closest('.cert-row');
    const rowCards = row.querySelectorAll('.cert-card');
    const cardIndex = Array.from(rowCards).indexOf(card);
    const totalCards = rowCards.length;
    
    // Set initial animation direction based on card count and position
    if (totalCards === 1) {
      card.classList.add('initial-bottom');
    } else if (totalCards % 2 === 0) { // Even number of cards
      if (cardIndex < totalCards / 2) {
        card.classList.add('initial-left');
      } else {
        card.classList.add('initial-right');
      }
    } else { // Odd number of cards
      if (cardIndex === 0) {
        card.classList.add('initial-left');
      } else if (cardIndex === totalCards - 1) {
        card.classList.add('initial-right');
      } else {
        card.classList.add('initial-bottom');
      }
    }
  });
  
  function handleCertificationsAnimations() {
    const certRect = certSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const certTopVh = (certRect.top / viewportHeight) * 100;
    const certBottomVh = (certRect.bottom / viewportHeight) * 100;
    
    // Handle intro text animations
    if (certTopVh <= 90 && certTopVh >= 10) {
      const introProgress = Math.min(1, (90 - certTopVh) / 80);
      
      introElements.forEach((el, index) => {
        const delay = index * 0.2;
        if (introProgress >= 0.1 + delay) {
          const elementProgress = Math.min(1, (introProgress - 0.1 - delay) / 0.3);
          el.style.opacity = elementProgress;
          el.style.transform = `translateY(${30 - (30 * elementProgress)}px)`;
          el.classList.add('animate-in');
          el.classList.remove('animate-out');
        } else {
          el.style.opacity = 0;
          el.style.transform = 'translateY(30px)';
          el.classList.remove('animate-in');
        }
      });
      
      // Handle exit animation for intro text
      if (certBottomVh <= 30) {
        const exitProgress = Math.min(1, (30 - certBottomVh) / 20);
        introElements.forEach((el, index) => {
          const delay = index * 0.1;
          if (exitProgress >= 0.1 + delay) {
            const elementProgress = Math.min(1, (exitProgress - 0.1 - delay) / 0.3);
            el.style.opacity = 1 - elementProgress;
            el.style.transform = `translateY(${-30 * elementProgress}px)`;
            el.classList.add('animate-out');
            el.classList.remove('animate-in');
          }
        });
      }
    } else if (certTopVh > 90) {
      // Reset intro elements if scrolled above
      introElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.classList.remove('animate-in', 'animate-out');
      });
    }
    
    // Handle card row animations
    certRows.forEach(row => {
      const rowRect = row.getBoundingClientRect();
      const rowTopVh = (rowRect.top / viewportHeight) * 100;
      const rowBottomVh = (rowRect.bottom / viewportHeight) * 100;
      
      // Handle category title animations
      const categoryTitle = row.querySelector('h3');
      if (categoryTitle && rowTopVh <= 90 && rowTopVh >= 10) {
        const rowProgress = Math.min(1, (90 - rowTopVh) / 80);
        
        if (rowProgress >= 0.1) {
          const titleProgress = Math.min(1, (rowProgress - 0.1) / 0.3);
          categoryTitle.style.opacity = titleProgress;
          categoryTitle.style.transform = `translateY(${40 - (40 * titleProgress)}px)`;
          categoryTitle.classList.add('animate-in');
          categoryTitle.classList.remove('animate-out');
        }
      }
      
      // Handle category title exit animations
      if (categoryTitle && rowBottomVh <= 30) {
        const exitProgress = Math.min(1, (30 - rowBottomVh) / 20);
        
        if (exitProgress >= 0.1) {
          const titleProgress = Math.min(1, (exitProgress - 0.1) / 0.3);
          categoryTitle.style.opacity = 1 - titleProgress;
          categoryTitle.style.transform = `translateY(${-40 * titleProgress}px)`;
          categoryTitle.classList.add('animate-out');
          categoryTitle.classList.remove('animate-in');
        }
      }
      
      // Reset category title if scrolled above
      if (categoryTitle && rowTopVh > 90) {
        categoryTitle.style.opacity = 0;
        categoryTitle.style.transform = 'translateY(40px)';
        categoryTitle.classList.remove('animate-in', 'animate-out');
      }
      
      // Animate cards in when row enters viewport
      if (rowTopVh <= 90 && rowTopVh >= 10) {
        const rowProgress = Math.min(1, (90 - rowTopVh) / 80);
        
        if (rowProgress >= 0.1) {
          const cards = row.querySelectorAll('.cert-card');
          
          // Animate all cards in the row at the same time
          cards.forEach((card) => {
            const cardProgress = Math.min(1, (rowProgress - 0.1) / 0.3);
            
            // Determine animation direction based on card position
            if (card.classList.contains('initial-left')) {
              card.style.opacity = cardProgress;
              card.style.transform = `translateX(${-100 + (100 * cardProgress)}px)`;
              card.classList.add('animate-in-left');
              card.classList.remove('animate-out-right', 'animate-out-left', 'animate-out-top');
            } else if (card.classList.contains('initial-right')) {
              card.style.opacity = cardProgress;
              card.style.transform = `translateX(${100 - (100 * cardProgress)}px)`;
              card.classList.add('animate-in-right');
              card.classList.remove('animate-out-left', 'animate-out-right', 'animate-out-top');
            } else if (card.classList.contains('initial-bottom')) {
              card.style.opacity = cardProgress;
              card.style.transform = `translateY(${100 - (100 * cardProgress)}px)`;
              card.classList.add('animate-in-bottom');
              card.classList.remove('animate-out-top', 'animate-out-left', 'animate-out-right');
            }
          });
        }
      }
      
      // Handle exit animation for cards when row leaves viewport
      if (rowBottomVh <= 30) {
        const exitProgress = Math.min(1, (30 - rowBottomVh) / 20);
        const cards = row.querySelectorAll('.cert-card');
        
        // Animate all cards in the row at the same time
        cards.forEach((card) => {
          const cardProgress = Math.min(1, (exitProgress - 0.1) / 0.3);
          
          // Determine exit animation direction (opposite of entrance)
          if (card.classList.contains('initial-left')) {
            card.style.opacity = 1 - cardProgress;
            card.style.transform = `translateX(${100 * cardProgress}px)`;
            card.classList.add('animate-out-right');
            card.classList.remove('animate-in-left', 'animate-in-right', 'animate-in-bottom');
          } else if (card.classList.contains('initial-right')) {
            card.style.opacity = 1 - cardProgress;
            card.style.transform = `translateX(${-100 * cardProgress}px)`;
            card.classList.add('animate-out-left');
            card.classList.remove('animate-in-right', 'animate-in-left', 'animate-in-bottom');
          } else if (card.classList.contains('initial-bottom')) {
            card.style.opacity = 1 - cardProgress;
            card.style.transform = `translateY(${-100 * cardProgress}px)`;
            card.classList.add('animate-out-top');
            card.classList.remove('animate-in-bottom', 'animate-in-left', 'animate-in-right');
          }
        });
        
        // Handle category title exit animation with the same timing
        if (categoryTitle) {
          const titleProgress = Math.min(1, (exitProgress - 0.1) / 0.3);
          categoryTitle.style.opacity = 1 - titleProgress;
          categoryTitle.style.transform = `translateY(${-40 * titleProgress}px)`;
          categoryTitle.classList.add('animate-out');
          categoryTitle.classList.remove('animate-in');
        }
      }
      
      // Reset cards if scrolled above the row
      if (rowTopVh > 90) {
        const cards = row.querySelectorAll('.cert-card');
        cards.forEach(card => {
          card.style.opacity = 0;
          
          // Reset to initial position
          if (card.classList.contains('initial-left')) {
            card.style.transform = 'translateX(-100px)';
          } else if (card.classList.contains('initial-right')) {
            card.style.transform = 'translateX(100px)';
          } else if (card.classList.contains('initial-bottom')) {
            card.style.transform = 'translateY(100px)';
          }
          
          card.classList.remove(
            'animate-in-left', 
            'animate-in-right', 
            'animate-in-bottom',
            'animate-out-right',
            'animate-out-left',
            'animate-out-top'
          );
        });
        
        // Reset category title if scrolled above
        if (categoryTitle) {
          categoryTitle.style.opacity = 0;
          categoryTitle.style.transform = 'translateY(40px)';
          categoryTitle.classList.remove('animate-in', 'animate-out');
        }
      }
    });
  }
  
  // Add scroll event listener for certifications
  window.addEventListener('scroll', handleCertificationsAnimations);
  // Initial check
  setTimeout(handleCertificationsAnimations, 100);
}

// In the checkScroll function, add code to handle the name fade-out
function checkScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  
  // Get certifications section position
  const certificationsSection = document.getElementById('certifications');
  const certificationsRect = certificationsSection.getBoundingClientRect();
  const certificationsVh = (certificationsRect.top / window.innerHeight) * 100;
  
  // Get the name title element
  const nameTitle = document.querySelector('.name-title');
  
  // Handle exit animation
  if (certificationsVh <= 90 && certificationsVh >= 75) {
    // Calculate animation progress (0 to 1)
    const animationProgress = (90 - certificationsVh) / 15;
    
    if (!exitAnimationStarted) {
      exitAnimationStarted = true;
      gradPic.classList.add('exit-left');
      document.getElementById('set3').classList.add('exit-right');
      nameTitle.classList.add('exit-right');
    }
    
    // Apply animation progress
    gradPic.style.opacity = 1 - animationProgress;
    gradPic.style.transform = `translateX(${-40 - (60 * animationProgress)}px)`;
    
    document.getElementById('set3').style.opacity = 1 - animationProgress;
    document.getElementById('set3').style.transform = `translateX(${40 * animationProgress}px)`;
    
    nameTitle.style.opacity = 1 - animationProgress;
    nameTitle.style.transform = `translateX(${40 * animationProgress}px)`;
  } 
  else if (certificationsVh > 90) {
    // Reset exit animation if scrolling back up
    exitAnimationStarted = false;
    gradPic.classList.remove('exit-left');
    document.getElementById('set3').classList.remove('exit-right');
    nameTitle.classList.remove('exit-right');
    
    gradPic.style.opacity = '';
    gradPic.style.transform = '';
    document.getElementById('set3').style.opacity = '';
    document.getElementById('set3').style.transform = '';
    
    nameTitle.style.opacity = '';
    nameTitle.style.transform = '';
    
    // Normal scroll behavior
    if (scrolled >= 15) updateActive(2);
    else if (scrolled >= 10) updateActive(1);
    else updateActive(0);
  }
  else if (certificationsVh < 75) {
    // Animation complete, keep elements hidden
    gradPic.style.opacity = 0;
    document.getElementById('set3').style.opacity = 0;
    nameTitle.style.opacity = 0;
  }
  else {
    // Normal scroll behavior
    if (scrolled >= 20) updateActive(2);
    else if (scrolled >= 10) updateActive(1);
    else updateActive(0);
  }
}

// Card hover functionality
function initCardHover() {
  const cards = document.querySelectorAll('.js-float-card');
  if (!cards.length) return setTimeout(initCardHover, 500);
  
  function activate(card) { card.classList.add('card--active'); }
  function deactivate(card) { card.classList.remove('card--active'); }
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => activate(card));
    card.addEventListener('mouseleave', () => deactivate(card));
    
    let touchTimeout;
    card.addEventListener('touchstart', (e) => {
      e.preventDefault();
      activate(card);
      clearTimeout(touchTimeout);
    });
    
    card.addEventListener('touchend', (e) => {
      e.preventDefault();
      touchTimeout = setTimeout(() => deactivate(card), 300);
    });
    
    card.addEventListener('touchcancel', () => {
      clearTimeout(touchTimeout);
      deactivate(card);
    });
  });
}

// Universal modal functionality
function initUniversalModal() {
  const universalModal = document.getElementById('universalModal');
  const modalImage = document.getElementById('modalImage');
  
  if (!universalModal || !modalImage) return;
  
  universalModal.addEventListener('show.bs.modal', function(event) {
    // Get the clicked element
    const clickedElement = event.relatedTarget;
    
    // Get the image source from data attribute
    const imageSrc = clickedElement.getAttribute('data-image-src');
    const imageAlt = clickedElement.querySelector('img').alt;
    
    // Set the image source and alt text
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
  });
}

// Optional: log modal open/close
function initModalLogging() {
  const modals = document.querySelectorAll(".modal");

  modals.forEach(modal => {
    modal.addEventListener("shown.bs.modal", () => {
      console.log(`Modal ${modal.id} opened`);
    });
    modal.addEventListener("hidden.bs.modal", () => {
      console.log(`Modal ${modal.id} closed`);
    });
  });
}

// Initialize everything
function init() {
  checkScroll();
  window.addEventListener('scroll', checkScroll);
  setTimeout(initCardHover, 100);
  initModalLogging();
  initUniversalModal();
  initCertificationsAnimations();
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Smooth scrolling for navigation links (for testing)
// document.querySelectorAll('.navbar-nav a').forEach(anchor => {
//   anchor.addEventListener('click', function(e) {
//     e.preventDefault();
//     const targetId = this.getAttribute('href');
    
//     if (targetId === '#') {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       const targetElement = document.querySelector(targetId);
//       if (targetElement) {
//         targetElement.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   });
// });


const categories = {
  All: [],
  Frontend: ["HTML", "CSS", "Bootstrap", "JavaScript", "React"],
  Backend: ["Node.js", "Express", "MongoDB", "DynamoDB", "Java", "Spring Boot", "SQL", "MySQL", "NoSQL"],
  Utilities: ["Git","GitHub", "Sublime", "VSCode","IntelliJ", "Postman", "Vercel", "Render", "AWS Lambda", "AWS EC2", "AWS S3", "AWS SNS", "AWS SQS", "AWS SES", "Nginx"],
  Collaboration: ["Trello", "ServiceNow", "Jira", "Zendesk", "MS Office", "SharePoint"]
};
categories.All = Object.values(categories).flat().filter(Boolean);

const logos = {
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",

  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  DynamoDB: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazondynamodb.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  NoSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",


  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Sublime: "https://cdn.simpleicons.org/sublimetext/FF9800",
  VSCode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  IntelliJ: "https://www.svgrepo.com/show/353906/intellij-idea.svg",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  Vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  Render: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg",
  "AWS Lambda": "https://a.b.cdn.console.awsstatic.com/a/v1/BMZQS7MWY7VIUF7PXETK3ULHIXZQQOURXD3AK46KD7UE6WMRLUSA/icon/945f3fc449518a73b9f5f32868db466c-926961f91b072604c42b7f39ce2eaf1c.svg",
  "AWS EC2": "https://a.b.cdn.console.awsstatic.com/a/v1/RHSMMGZKYJXPPNI2IOC6Z63HJEW4FD5ZYMKJSXD7HQ5IPUTQR2TQ/icon/d88319dfa5d204f019b4284149886c59-7d586ea82f792b61a8c87de60565133d.svg",
  "AWS S3": "https://a.b.cdn.console.awsstatic.com/a/v1/DKY2SIL5N3MJQCULDNOQE7TKLNQIUXRSOHBJKJGQAHLZO7TLH3TQ/icon/c0828e0381730befd1f7a025057c74fb-43acc0496e64afba82dbc9ab774dc622.svg",
  "AWS SNS": "https://a.b.cdn.console.awsstatic.com/a/v1/MW4GDEWKEYFO66RNNDQN5WY7CUZ7HOR4RUQV6KKJYMDG7PPKOSIQ/icon/6002c6713f40e8a35d365605542e72b0-03c2386fb392e0d689e45d9b4f683a8d.svg",
  "AWS SQS": "https://a.b.cdn.console.awsstatic.com/a/v1/RZZ3VKILJU45ROTAA2NVQLCHDKLNARXV2FZ3EM6MSXZCSFKDHSDA/icon/252a8156d87a671bfeb32a02f200406f-c7d7df285c32f703a63b1d3c7f9679fb.svg",
  "AWS SES": "https://a.b.cdn.console.awsstatic.com/a/v1/2QIS3M6GW3A6OS7WHLYZ26DOKTQ3ZGRI22PA57GP4C7Y7ANK5XDQ/icon/f2b32bda85a5a4a613eb47fb01c57ce3-2b4a0b6e3c7d785e7e0d22f5d540dce9.svg",
  Nginx: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",

  Trello: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
  ServiceNow: "https://images.icon-icons.com/2699/PNG/512/servicenow_logo_icon_168835.png",
  Jira: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
  Zendesk: "https://www.svgrepo.com/show/354598/zendesk-icon.svg",
  "MS Office": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Microsoft_Office_logo_%282013%E2%80%932019%29.png/506px-Microsoft_Office_logo_%282013%E2%80%932019%29.png?20151104175314",
  SharePoint: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg.png?20190925170659",


};

// Scoped selectors
const widget = document.getElementById('tech-stacks');
const tabsContainer = widget.querySelector('.ts-tabs');
const grid = widget.querySelector('.ts-stack-grid');
const contentWrapper = widget.querySelector('.ts-content-wrapper');

Object.keys(categories).forEach((cat, idx) => {
  const tab = document.createElement('div');
  tab.className = 'ts-tab' + (idx === 0 ? ' active' : '');
  tab.textContent = cat;
  tab.onclick = () => switchCategory(cat, tab);
  tabsContainer.appendChild(tab);
});

function setWrapperHeight(extra = 32) {
  contentWrapper.style.height = grid.scrollHeight + extra + 'px';
}

function switchCategory(category, tab) {
  tabsContainer.querySelectorAll('.ts-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');

  grid.innerHTML = '';
  const stacks = categories[category];

  stacks.forEach((stack, i) => {
    const card = document.createElement('div');
    card.className = 'ts-stack-card';
    card.innerHTML = `
      <img src="${logos[stack] || 'https://via.placeholder.com/60'}" alt="${stack}">
      <p>${stack}</p>
    `;
    grid.appendChild(card);
    setTimeout(() => card.classList.add('show'), i * 100);
  });

  // Force recalculation of height after a brief delay
  setTimeout(adjustHeightAfterImages, 50);
}

function adjustHeightAfterImages() {
  const imgs = grid.querySelectorAll("img");
  let loaded = 0;
  
  // Set initial height immediately
  setWrapperHeight();
  
  if (imgs.length === 0) {
    return;
  }
  
  imgs.forEach(img => {
    if (img.complete) {
      loaded++;
      if (loaded === imgs.length) {
        // Final adjustment after all images are loaded
        setTimeout(() => setWrapperHeight(), 10);
      }
    } else {
      img.onload = () => {
        loaded++;
        if (loaded === imgs.length) {
          // Final adjustment after all images are loaded
          setTimeout(() => setWrapperHeight(), 10);
        }
      };
    }
  });
}

// Init
window.addEventListener("load", () => {
  const firstTab = tabsContainer.querySelector('.ts-tab');
  switchCategory('All', firstTab);
});

window.addEventListener('resize', () => setWrapperHeight());


  // Force scroll to top on page load
  window.onload = function() {
    window.scrollTo(0, 0);
  };
  
  // Prevent browser from restoring scroll position
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Additional safety measure for modern browsers
  window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
  });


  // Add to your existing script.js file

// Projects animation functionality (similar to certifications)
function initProjectsAnimations() {
  const projSection = document.getElementById('projects');
  const introElements = document.querySelectorAll('.proj-intro-element');
  const projRows = document.querySelectorAll('.proj-row');
  const allCards = document.querySelectorAll('.proj-card');
  
  // Set initial states for cards based on their position in the row
  allCards.forEach(card => {
    const row = card.closest('.proj-row');
    const rowCards = row.querySelectorAll('.proj-card');
    const cardIndex = Array.from(rowCards).indexOf(card);
    const totalCards = rowCards.length;
    
    // Set initial animation direction based on card count and position
    if (totalCards === 1) {
      card.classList.add('initial-bottom');
    } else if (totalCards % 2 === 0) { // Even number of cards
      if (cardIndex < totalCards / 2) {
        card.classList.add('initial-left');
      } else {
        card.classList.add('initial-right');
      }
    } else { // Odd number of cards
      if (cardIndex === 0) {
        card.classList.add('initial-left');
      } else if (cardIndex === totalCards - 1) {
        card.classList.add('initial-right');
      } else {
        card.classList.add('initial-bottom');
      }
    }
  });
  
  function handleProjectsAnimations() {
    const projRect = projSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const projTopVh = (projRect.top / viewportHeight) * 100;
    const projBottomVh = (projRect.bottom / viewportHeight) * 100;
    
    // Handle intro text animations
    if (projTopVh <= 90 && projTopVh >= 10) {
      const introProgress = Math.min(1, (90 - projTopVh) / 80);
      
      introElements.forEach((el, index) => {
        const delay = index * 0.2;
        if (introProgress >= 0.1 + delay) {
          const elementProgress = Math.min(1, (introProgress - 0.1 - delay) / 0.3);
          el.style.opacity = elementProgress;
          el.style.transform = `translateY(${30 - (30 * elementProgress)}px)`;
          el.classList.add('animate-in');
          el.classList.remove('animate-out');
        } else {
          el.style.opacity = 0;
          el.style.transform = 'translateY(30px)';
          el.classList.remove('animate-in');
        }
      });
      
      // Handle exit animation for intro text
      if (projBottomVh <= 30) {
        const exitProgress = Math.min(1, (30 - projBottomVh) / 20);
        introElements.forEach((el, index) => {
          const delay = index * 0.1;
          if (exitProgress >= 0.1 + delay) {
            const elementProgress = Math.min(1, (exitProgress - 0.1 - delay) / 0.3);
            el.style.opacity = 1 - elementProgress;
            el.style.transform = `translateY(${-30 * elementProgress}px)`;
            el.classList.add('animate-out');
            el.classList.remove('animate-in');
          }
        });
      }
    } else if (projTopVh > 90) {
      // Reset intro elements if scrolled above
      introElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.classList.remove('animate-in', 'animate-out');
      });
    }
    
    // Handle card row animations
    projRows.forEach(row => {
      const rowRect = row.getBoundingClientRect();
      const rowTopVh = (rowRect.top / viewportHeight) * 100;
      const rowBottomVh = (rowRect.bottom / viewportHeight) * 100;
      
      // Animate cards in when row enters viewport
      if (rowTopVh <= 90 && rowTopVh >= 10) {
        const rowProgress = Math.min(1, (90 - rowTopVh) / 80);
        
        if (rowProgress >= 0.1) {
          const cards = row.querySelectorAll('.proj-card');
          
          // Animate all cards in the row at the same time
          cards.forEach((card) => {
            const cardProgress = Math.min(1, (rowProgress - 0.1) / 0.3);
            
            // Determine animation direction based on card position
            if (card.classList.contains('initial-left')) {
              card.style.opacity = cardProgress;
              card.style.transform = `translateX(${-100 + (100 * cardProgress)}px)`;
              card.classList.add('animate-in-left');
              card.classList.remove('animate-out-right', 'animate-out-left', 'animate-out-top');
            } else if (card.classList.contains('initial-right')) {
              card.style.opacity = cardProgress;
              card.style.transform = `translateX(${100 - (100 * cardProgress)}px)`;
              card.classList.add('animate-in-right');
              card.classList.remove('animate-out-left', 'animate-out-right', 'animate-out-top');
            } else if (card.classList.contains('initial-bottom')) {
              card.style.opacity = cardProgress;
              card.style.transform = `translateY(${100 - (100 * cardProgress)}px)`;
              card.classList.add('animate-in-bottom');
              card.classList.remove('animate-out-top', 'animate-out-left', 'animate-out-right');
            }
          });
        }
      }
      
      // Handle exit animation for cards when row leaves viewport
      if (rowBottomVh <= 30) {
        const exitProgress = Math.min(1, (30 - rowBottomVh) / 20);
        const cards = row.querySelectorAll('.proj-card');
        
        // Animate all cards in the row at the same time
        cards.forEach((card) => {
          const cardProgress = Math.min(1, (exitProgress - 0.1) / 0.3);
          
          // Determine exit animation direction (opposite of entrance)
          if (card.classList.contains('initial-left')) {
            card.style.opacity = 1 - cardProgress;
            card.style.transform = `translateX(${100 * cardProgress}px)`;
            card.classList.add('animate-out-right');
            card.classList.remove('animate-in-left', 'animate-in-right', 'animate-in-bottom');
          } else if (card.classList.contains('initial-right')) {
            card.style.opacity = 1 - cardProgress;
            card.style.transform = `translateX(${-100 * cardProgress}px)`;
            card.classList.add('animate-out-left');
            card.classList.remove('animate-in-right', 'animate-in-left', 'animate-in-bottom');
          } else if (card.classList.contains('initial-bottom')) {
            card.style.opacity = 1 - cardProgress;
            card.style.transform = `translateY(${-100 * cardProgress}px)`;
            card.classList.add('animate-out-top');
            card.classList.remove('animate-in-bottom', 'animate-in-left', 'animate-in-right');
          }
        });
      }
      
      // Reset cards if scrolled above the row
      if (rowTopVh > 90) {
        const cards = row.querySelectorAll('.proj-card');
        cards.forEach(card => {
          card.style.opacity = 0;
          
          // Reset to initial position
          if (card.classList.contains('initial-left')) {
            card.style.transform = 'translateX(-100px)';
          } else if (card.classList.contains('initial-right')) {
            card.style.transform = 'translateX(100px)';
          } else if (card.classList.contains('initial-bottom')) {
            card.style.transform = 'translateY(100px)';
          }
          
          card.classList.remove(
            'animate-in-left', 
            'animate-in-right', 
            'animate-in-bottom',
            'animate-out-right',
            'animate-out-left',
            'animate-out-top'
          );
        });
      }
    });
  }
  
  // Add scroll event listener for projects
  window.addEventListener('scroll', handleProjectsAnimations);
  // Initial check
  setTimeout(handleProjectsAnimations, 100);
}

// Project modal functionality
function initProjectModal() {
  const projectModal = document.getElementById('projectModal');
  
  if (!projectModal) return;
  
  projectModal.addEventListener('show.bs.modal', function(event) {
    // Get the clicked element
    const clickedElement = event.relatedTarget;
    
    // Get the project data from data attributes
    const title = clickedElement.getAttribute('data-title');
    const description = clickedElement.getAttribute('data-description');
    const imageSrc = clickedElement.getAttribute('data-image');
    const stacks = JSON.parse(clickedElement.getAttribute('data-stacks'));
    const githubLink = clickedElement.getAttribute('data-github');
    const liveLink = clickedElement.getAttribute('data-live');
    
    // Set the modal content
    document.getElementById('projectModalTitle').textContent = title;
    document.getElementById('projectModalDescription').textContent = description;
    document.getElementById('projectModalImage').src = imageSrc;
    document.getElementById('projectModalImage').alt = title;
    document.getElementById('projectModalGithub').href = githubLink;
    document.getElementById('projectModalLive').href = liveLink;
    
    // Clear and populate the stacks section
    const stacksContainer = document.getElementById('projectModalStacks');
    stacksContainer.innerHTML = '';
    
    stacks.forEach(stack => {
      const stackImg = document.createElement('img');
      stackImg.src = logos[stack] || 'https://via.placeholder.com/40';
      stackImg.alt = stack;
      stackImg.title = stack;
      stackImg.className = 'stack-icon';
      stacksContainer.appendChild(stackImg);
    });
  });
}

// Update the init function to include projects
function init() {
  checkScroll();
  window.addEventListener('scroll', checkScroll);
  setTimeout(initCardHover, 100);
  initModalLogging();
  initUniversalModal();
  initCertificationsAnimations();
  initProjectsAnimations(); // Add this line
  initProjectModal(); // Add this line
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}



// Contact/Footer section animation functionality
function initContactAnimations() {
  const contactSection = document.getElementById('contact');
  const socialLinks = document.querySelectorAll('.social-link');
  const downloadBtn = document.querySelector('.download-btn');
  const contactText = document.querySelectorAll('#contact p');
  
  function handleContactAnimations() {
    const contactRect = contactSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const contactTopVh = (contactRect.top / viewportHeight) * 100;
    const contactBottomVh = (contactRect.bottom / viewportHeight) * 100;
    
    // Animate elements when contact section enters viewport
    if (contactTopVh <= 90 && contactTopVh >= 10) {
      const contactProgress = Math.min(1, (90 - contactTopVh) / 80);
      
      // Animate social links with staggered delay
      socialLinks.forEach((link, index) => {
        const delay = index * 0.1;
        if (contactProgress >= 0.1 + delay) {
          const elementProgress = Math.min(1, (contactProgress - 0.1 - delay) / 0.3);
          link.style.opacity = elementProgress;
          link.style.transform = `translateY(${20 - (20 * elementProgress)}px)`;
        }
      });
      
      // Animate download button
      if (contactProgress >= 0.4) {
        const elementProgress = Math.min(1, (contactProgress - 0.4) / 0.3);
        downloadBtn.style.opacity = elementProgress;
        downloadBtn.style.transform = `translateY(${20 - (20 * elementProgress)}px)`;
      }
      
      // Animate text elements
      contactText.forEach((text, index) => {
        const delay = 0.5 + (index * 0.1);
        if (contactProgress >= delay) {
          const elementProgress = Math.min(1, (contactProgress - delay) / 0.3);
          text.style.opacity = elementProgress;
          text.style.transform = `translateY(${10 - (10 * elementProgress)}px)`;
        }
      });
    }
  }
  
  // Add scroll event listener for contact section
  window.addEventListener('scroll', handleContactAnimations);
  // Initial check
  setTimeout(handleContactAnimations, 100);
}

