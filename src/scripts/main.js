    // Scroll effect
    const scrollElements = document.querySelectorAll(".scroll-animation");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          } else {
            entry.target.classList.remove("scroll-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    scrollElements.forEach((el) => observer.observe(el));
