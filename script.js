// Mobile Menu Function Start
const menuBtn = document.getElementById("menu_btn");
const mobileMenu = document.getElementById("mobile_menu");
const navLinks = document.querySelectorAll(".mobile_menu .nav-link");
const overlay = document.getElementById("overlay");

function closeMenu() {
  menuBtn.classList.remove("active");
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
  overlay.classList.add("hiding");

  setTimeout(() => {
    overlay.classList.remove("hiding");
  }, 400);
}

menuBtn.addEventListener("click", () => {
  const isActive = menuBtn.classList.contains("active");
  if (isActive) {
    closeMenu();
  } else {
    menuBtn.classList.add("active");
    mobileMenu.classList.add("show");
    overlay.classList.add("show");
  }
});

navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

overlay.addEventListener("click", closeMenu);
// Mobile Menu Function End





// Role Transition Functionality Start
// NOTE: Connected to "About Me Section to Certifcate Section Animations" section of the CSS file
const role1 = document.getElementById("role1");
const role2 = document.getElementById("role2");
const role3 = document.getElementById("role3");
const certificateLinks = document.querySelectorAll('.card-link');

const threshold1 = 400;
const threshold2 = 800;
let currentRole = 1;

const roleConfigs = {
  1: { 
    active: role1, 
    anim: "fade-in-right",
    outgoing: [role2, "fade-out-left"],
    enableLinks: false
  },
  2: { 
    active: role2, 
    anim: (direction) => direction === "down" ? "fade-in-left" : "fade-in-right",
    outgoing: [role1, role3],
    enableLinks: false
  },
  3: { 
    active: role3, 
    anim: (direction) => direction === "down" ? "fade-in-right" : "fade-in-left",
    outgoing: [role2],
    enableLinks: true
  }
};

function setActiveRole(newRole, direction = "down") {
  [role1, role2, role3].forEach(role => {
    role.classList.remove("active", "fade-in-left", "fade-in-right", "fade-out-left", "fade-out-right");
  });

  const config = roleConfigs[newRole];
  if (config) {
    const animationClass = typeof config.anim === 'function' ? config.anim(direction) : config.anim;
    config.active.classList.add("active", animationClass);
    
    // Enable/disable certificate links
    certificateLinks.forEach(link => {
      link.style.pointerEvents = config.enableLinks ? 'auto' : 'none';
      link.style.opacity = config.enableLinks ? '1' : '0.5';
    });
  }

  currentRole = newRole;
}

// Initialize certificate links as disabled
document.addEventListener('DOMContentLoaded', function() {
  certificateLinks.forEach(link => {
    link.style.pointerEvents = 'none';
    link.style.opacity = '0.5';
  });
});

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;

  if (scrollPos < threshold1 && currentRole !== 1) {
    setActiveRole(1, "up");
  } else if (scrollPos >= threshold1 && scrollPos < threshold2 && currentRole !== 2) {
    setActiveRole(2, scrollPos > threshold1 ? "down" : "up");
  } else if (scrollPos >= threshold2 && currentRole !== 3) {
    setActiveRole(3, "down");
  }
});
// Role Transition Functionality End





// Card Hover Functionality Start
function initCardHover() {
  const cards = document.querySelectorAll('.js-float-card');
  if (!cards.length) return setTimeout(initCardHover, 500);
  
  function activate(card) { 
    card.classList.add('card--active'); 
  }
  
  function deactivate(card) { 
    card.classList.remove('card--active'); 
  }
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => activate(card));
    card.addEventListener('mouseleave', () => deactivate(card));
    
    let touchTimeout;
    card.addEventListener('touchstart', () => {
      activate(card);
      clearTimeout(touchTimeout);
    });
    
    card.addEventListener('touchend', () => {
      touchTimeout = setTimeout(() => deactivate(card), 300);
    });
    
    card.addEventListener('touchcancel', () => {
      clearTimeout(touchTimeout);
      deactivate(card);
    });
  });
}
// Card Hover Functionality End





// Modal Functionality Start
function initUniversalModal() {
  const universalModal = document.getElementById('universalModal');
  const modalImage = document.getElementById('modalImage');
  
  if (!universalModal || !modalImage) return;
  
  universalModal.addEventListener('show.bs.modal', function(event) {
    const clickedElement = event.relatedTarget;
    const imageSrc = clickedElement.getAttribute('data-image-src');
    const imageAlt = clickedElement.querySelector('img').alt;
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
  });
}
// Modal Functionality End




// Tooltip Functionality Start
function initTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}
// Tooltip Functionality End




// About Me Section Fade Animation Start
function initAboutMeFade() {
  const aboutMeSection = document.getElementById('about_me');
  const certificationsSection = document.getElementById('certifications');
  
  if (!aboutMeSection || !certificationsSection) return;
  
  let isFadedOut = false;
  let ticking = false;
  
  function checkCertificationsPosition() {
    const certificationsRect = certificationsSection.getBoundingClientRect();
    const certificationsTop = certificationsRect.top;
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.55;
    
    if (certificationsTop <= triggerPoint && !isFadedOut) {
      aboutMeSection.classList.remove('fade-in');
      aboutMeSection.classList.add('fade-out');
      isFadedOut = true;
    } else if (certificationsTop > triggerPoint && isFadedOut) {
      aboutMeSection.classList.remove('fade-out');
      aboutMeSection.classList.add('fade-in');
      isFadedOut = false;
    }
    
    ticking = false;
  }
  
  function optimizedScrollHandler() {
    if (!ticking) {
      requestAnimationFrame(checkCertificationsPosition);
      ticking = true;
    }
  }
  
  checkCertificationsPosition();
  window.addEventListener('scroll', optimizedScrollHandler);
  window.addEventListener('resize', optimizedScrollHandler);
}
// About Me Section Fade Animation End





// Certifications Animation Functionality Start
function initCertificationsAnimations() {
  const certSection = document.getElementById('certifications');
  const introElements = document.querySelectorAll('.cert-intro-element');
  const categoryTitles = document.querySelectorAll('h3.pt-5');
  
  const cardRows = [];
  const rows = document.querySelectorAll('.certifications .container .row');
  
  rows.forEach(row => {
    const rowCards = Array.from(row.querySelectorAll('.col-6, .col-sm-6, .col-lg-3'))
      .filter(container => container.querySelector('.card'))
      .map(container => {
        container.classList.add('cert-card');
        
        const rowCards = row.querySelectorAll('.col-6, .col-sm-6, .col-lg-3');
        const cardIndex = Array.from(rowCards).indexOf(container);
        const totalCards = rowCards.length;
        
        if (totalCards === 1) {
          container.classList.add('initial-bottom');
        } else if (totalCards % 2 === 0) {
          container.classList.add(cardIndex < totalCards / 2 ? 'initial-left' : 'initial-right');
        } else {
          if (cardIndex === 0) {
            container.classList.add('initial-left');
          } else if (cardIndex === totalCards - 1) {
            container.classList.add('initial-right');
          } else {
            container.classList.add('initial-bottom');
          }
        }
        
        return container;
      });
    
    if (rowCards.length > 0) {
      cardRows.push({
        element: row,
        cards: rowCards
      });
    }
  });

  function handleCertificationsAnimations() {
    const certRect = certSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const certTopVh = (certRect.top / viewportHeight) * 100;
    
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
    } else if (certTopVh > 90) {
      introElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.classList.remove('animate-in', 'animate-out');
      });
    }
    
    // Handle category title animations
    categoryTitles.forEach(title => {
      const titleRect = title.getBoundingClientRect();
      const titleTopVh = (titleRect.top / viewportHeight) * 100;
      
      if (titleTopVh <= 90 && titleTopVh >= 10) {
        const titleProgress = Math.min(1, (90 - titleTopVh) / 80);
        
        if (titleProgress >= 0.1) {
          const elementProgress = Math.min(1, (titleProgress - 0.1) / 0.3);
          title.style.opacity = elementProgress;
          title.style.transform = `translateY(${40 - (40 * elementProgress)}px)`;
          title.classList.add('animate-in');
          title.classList.remove('animate-out');
        }
      } else if (titleTopVh > 90) {
        title.style.opacity = 0;
        title.style.transform = 'translateY(40px)';
        title.classList.remove('animate-in', 'animate-out');
      }
    });
    
    // Handle card animations by row
    cardRows.forEach(rowData => {
      const rowRect = rowData.element.getBoundingClientRect();
      const rowTopVh = (rowRect.top / viewportHeight) * 100;
      const rowBottomVh = (rowRect.bottom / viewportHeight) * 100;
      
      if (rowTopVh <= 90 && rowTopVh >= 10) {
        const rowProgress = Math.min(1, (90 - rowTopVh) / 80);
        
        if (rowProgress >= 0.1) {
          const elementProgress = Math.min(1, (rowProgress - 0.1) / 0.3);
          
          rowData.cards.forEach(card => {
            if (card.classList.contains('initial-left')) {
              card.style.opacity = elementProgress;
              card.style.transform = `translateX(${-100 + (100 * elementProgress)}px)`;
              card.classList.add('animate-in-left');
              card.classList.remove('animate-out-right', 'animate-out-left', 'animate-out-top');
            } else if (card.classList.contains('initial-right')) {
              card.style.opacity = elementProgress;
              card.style.transform = `translateX(${100 - (100 * elementProgress)}px)`;
              card.classList.add('animate-in-right');
              card.classList.remove('animate-out-left', 'animate-out-right', 'animate-out-top');
            } else if (card.classList.contains('initial-bottom')) {
              card.style.opacity = elementProgress;
              card.style.transform = `translateY(${100 - (100 * elementProgress)}px)`;
              card.classList.add('animate-in-bottom');
              card.classList.remove('animate-out-top', 'animate-out-left', 'animate-out-right');
            }
          });
        }
      }
      
      if (rowBottomVh <= 30) {
        const exitProgress = Math.min(1, (30 - rowBottomVh) / 20);
        const elementProgress = Math.min(1, (exitProgress - 0.1) / 0.3);
        
        rowData.cards.forEach(card => {
          if (card.classList.contains('initial-left')) {
            card.style.opacity = 1 - elementProgress;
            card.style.transform = `translateX(${100 * elementProgress}px)`;
            card.classList.add('animate-out-right');
            card.classList.remove('animate-in-left', 'animate-in-right', 'animate-in-bottom');
          } else if (card.classList.contains('initial-right')) {
            card.style.opacity = 1 - elementProgress;
            card.style.transform = `translateX(${-100 * elementProgress}px)`;
            card.classList.add('animate-out-left');
            card.classList.remove('animate-in-right', 'animate-in-left', 'animate-in-bottom');
          } else if (card.classList.contains('initial-bottom')) {
            card.style.opacity = 1 - elementProgress;
            card.style.transform = `translateY(${-100 * elementProgress}px)`;
            card.classList.add('animate-out-top');
            card.classList.remove('animate-in-bottom', 'animate-in-left', 'animate-in-right');
          }
        });
      }
      
      if (rowTopVh > 90) {
        rowData.cards.forEach(card => {
          card.style.opacity = 0;
          
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
  
  window.addEventListener('scroll', handleCertificationsAnimations);
  setTimeout(handleCertificationsAnimations, 100);
}
// Certifications Animation Functionality End






// Tech Stacks Section Start
function initTechStacks() {
  const categories = {
    All: [],
    Frontend: ["HTML", "CSS", "Bootstrap", "JavaScript", "React", "Selenium"],
    Backend: ["Node.js", "Express", "MongoDB", "DynamoDB", "Java", "Spring Boot", "Python", "Django",  "SQL", "MySQL", "NoSQL", "Mocha Chai"],
    Utilities: ["Git","GitHub", "Sublime", "VSCode","IntelliJ", "Postman", "Vercel", "Render", "AWS Lambda", "AWS EC2", "AWS S3", "AWS SNS", "AWS SQS", "AWS SES", "Nginx", "VBA (Macro)"],
    Collab: ["Trello", "ServiceNow", "Jira", "Zendesk", "MS Office", "SharePoint"]
  };
  categories.All = Object.values(categories).flat().filter(Boolean);

  const logos = {
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    Selenium: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    DynamoDB: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazondynamodb.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    NoSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Mocha Chai": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg",
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
    "VBA (Macro)": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzVENEI5OSIgZD0iTTE4LjEyNSAwSDUuODc1QzQuODQgMCA0IC44NCA0IDEuODc1djIwLjI1QzQgMjIuMTYgNC44NCAyMyA1Ljg3NSAyM2gxMi4yNWMxLjAzNSAwIDEuODc1LS44NCAxLjg3NS0xLjg3NVYxLjg3NWMwLTEuMDM1LS44NC0xLjg3NS0xLjg3NS0xLjg3NXpNMTAgMTkuNWMtMi43NSAwLTUtMi4yNS01LTVzMi4yNS01IDUtNSA1IDIuMjUgNSA1LTIuMjUgNS01IDV6bTAtOGMtMS42NSAwLTMgMS4zNS0zIDNzMS4zNSAzIDMgMyAzLTEuMzUgMy0zLTEuMzUtMy0zLTN6Ii8+PC9zdmc+",
    Trello: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
    ServiceNow: "https://images.icon-icons.com/2699/PNG/512/servicenow_logo_icon_168835.png",
    Jira: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
    Zendesk: "https://www.svgrepo.com/show/354598/zendesk-icon.svg",
    "MS Office": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Microsoft_Office_logo_%282013%E2%80%932019%29.png/506px-Microsoft_Office_logo_%282013%E2%80%932019%29.png?20151104175314",
    SharePoint: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg.png?20190925170659",
  };

  const widget = document.getElementById('tech-stacks');
  if (!widget) return;
  
  const tabsContainer = widget.querySelector('.ts-tabs');
  const grid = widget.querySelector('.ts-stack-grid');
  const contentWrapper = widget.querySelector('.ts-content-wrapper');
  
  // Create pagination controls
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'ts-pagination';
  paginationContainer.innerHTML = `
    <button class="ts-pagination-btn ts-prev-btn" disabled>
      <i class="fas fa-chevron-left"></i>
    </button>
    <span class="ts-page-info">Page 1 of 1</span>
    <button class="ts-pagination-btn ts-next-btn">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
  contentWrapper.appendChild(paginationContainer);

  let currentCategory = 'All';
  let currentPage = 1;
  const itemsPerPage = 10;

  // Create tabs
  Object.keys(categories).forEach((cat, idx) => {
    const tab = document.createElement('div');
    tab.className = 'ts-tab' + (idx === 0 ? ' active' : '');
    tab.textContent = cat;
    tab.onclick = () => switchCategory(cat, tab);
    tabsContainer.appendChild(tab);
  });

  function setWrapperHeight(extra = 32) {
    const gridHeight = grid.scrollHeight;
    const paginationHeight = paginationContainer.scrollHeight;
    contentWrapper.style.height = (gridHeight + paginationHeight + extra) + 'px';
  }

  function switchCategory(category, tab) {
    tabsContainer.querySelectorAll('.ts-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    currentCategory = category;
    currentPage = 1;
    renderStacks();
  }

  function renderStacks() {
    grid.innerHTML = '';
    const stacks = categories[currentCategory];
    
    // Calculate pagination
    const totalPages = Math.ceil(stacks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, stacks.length);
    const currentStacks = stacks.slice(startIndex, endIndex);
    
    // Update pagination controls
    const prevBtn = paginationContainer.querySelector('.ts-prev-btn');
    const nextBtn = paginationContainer.querySelector('.ts-next-btn');
    const pageInfo = paginationContainer.querySelector('.ts-page-info');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Render current page stacks
    currentStacks.forEach((stack, i) => {
      const card = document.createElement('div');
      card.className = 'ts-stack-card';
      card.innerHTML = `
        <img src="${logos[stack] || 'https://via.placeholder.com/60'}" alt="${stack}">
        <p>${stack}</p>
      `;
      grid.appendChild(card);
      setTimeout(() => card.classList.add('show'), i * 100);
    });

    // Force height recalculation after render
    setTimeout(() => {
      adjustHeightAfterImages();
    }, 50);
  }

  function adjustHeightAfterImages() {
    const imgs = grid.querySelectorAll("img");
    let loaded = 0;
    
    // Set initial height immediately
    setWrapperHeight();
    
    if (imgs.length === 0) return;
    
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

  // Pagination event handlers
  paginationContainer.querySelector('.ts-prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderStacks();
    }
  });

  paginationContainer.querySelector('.ts-next-btn').addEventListener('click', () => {
    const stacks = categories[currentCategory];
    const totalPages = Math.ceil(stacks.length / itemsPerPage);
    
    if (currentPage < totalPages) {
      currentPage++;
      renderStacks();
    }
  });

  // Grid layout to show 5 items per row
  function updateGridLayout() {
    // Force 5 columns layout for desktop
    if (window.innerWidth >= 768) {
      grid.style.gridTemplateColumns = 'repeat(5, minmax(120px, 1fr))';
    } else {
      // For mobile, use auto-fill but with smaller minmax
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))';
    }
  }

  // Initialize with first tab
  window.addEventListener("load", () => {
    updateGridLayout();
    const firstTab = tabsContainer.querySelector('.ts-tab');
    if (firstTab) {
      switchCategory('All', firstTab);
    }
  });

  window.addEventListener('resize', () => {
    updateGridLayout();
    setWrapperHeight();
  });
}
// Tech Stacks Section End







// Projects Section Animation Functionality Start
function initProjectsAnimations() {
  const projSection = document.getElementById('projects');
  if (!projSection) return;
  
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


// Project Card Modal Functionality Start
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
      stackImg.src = getLogoForStack(stack);
      stackImg.alt = stack;
      stackImg.title = stack;
      stackImg.className = 'stack-icon';
      stacksContainer.appendChild(stackImg);
    });
  });
}

// Helper function to get logo for stack
function getLogoForStack(stack) {
  const logos = {
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    Selenium: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    DynamoDB: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazondynamodb.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    NoSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Mocha Chai": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg",
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
    "VBA (Macro)": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzVENEI5OSIgZD0iTTE4LjEyNSAwSDUuODc1QzQuODQgMCA0IC44NCA0IDEuODc1djIwLjI1QzQgMjIuMTYgNC44NCAyMyA1Ljg3NSAyM2gxMi4yNWMxLjAzNSAwIDEuODc1LS44NCAxLjg3NS0xLjg3NVYxLjg3NWMwLTEuMDM1LS44NC0xLjg3NS0xLjg3NS0xLjg3NXpNMTAgMTkuNWMtMi43NSAwLTUtMi4yNS01LTVzMi4yNS01IDUtNSA1IDIuMjUgNSA1LTIuMjUgNS01IDV6bTAtOGMtMS42NSAwLTMgMS4zNS0zIDNzMS4zNSAzIDMgMyAzLTEuMzUgMy0zLTEuMzUtMy0zLTN6Ii8+PC9zdmc+",
    Trello: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
    ServiceNow: "https://images.icon-icons.com/2699/PNG/512/servicenow_logo_icon_168835.png",
    Jira: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
    Zendesk: "https://www.svgrepo.com/show/354598/zendesk-icon.svg",
    "MS Office": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Microsoft_Office_logo_%282013%E2%80%932019%29.png/506px-Microsoft_Office_logo_%282013%E2%80%932019%29.png?20151104175314",
    SharePoint: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg.png?20190925170659",
  };
  
  return logos[stack] || 'https://via.placeholder.com/40';
}
// Project Card Modal Functionality End
// Projects Section Animation Functionality End







// Contact Section Animation Functionality Start
function initContactAnimations() {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;
  
  const introElements = document.querySelectorAll('.contact-intro-element');
  
  function handleContactAnimations() {
    const contactRect = contactSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const contactTopVh = (contactRect.top / viewportHeight) * 100;
    
    // Handle intro text animations
    if (contactTopVh <= 90 && contactTopVh >= 10) {
      const introProgress = Math.min(1, (90 - contactTopVh) / 80);
      
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
    } else if (contactTopVh > 90) {
      // Reset elements if scrolled above
      introElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.classList.remove('animate-in', 'animate-out');
      });
    }
  }
  
  // Add scroll event listener for contact section
  window.addEventListener('scroll', handleContactAnimations);
  // Initial check
  setTimeout(handleContactAnimations, 100);
}
// Contact Section Animation Functionality End




// Initializer for Functions
function initializeAll() {
  const initializers = [
    initCardHover,
    initUniversalModal,
    initTooltips,
    initAboutMeFade,
    initCertificationsAnimations,
    initTechStacks,
    initProjectsAnimations,
    initProjectModal,
    initContactAnimations
  ];
  
  initializers.forEach(init => {
    try {
      init();
    } catch (error) {
      console.warn(`Initialization failed for ${init.name}:`, error);
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeAll);






