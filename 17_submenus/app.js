import sublinks from "./data.js";

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (!element) {
    throw new Error("There is no element selected by that name.");
  }
  return element;
};

const toggleBtn = getElement(".toggle-btn");
const closeBtn = getElement(".close-btn");
const sidebarWrapper = getElement(".sidebar-wrapper");
const sidebar = getElement(".sidebar-links");
const submenu = getElement(".submenu");
const hero = getElement(".hero");
const nav = getElement(".nav");
const linkBtns = [...document.querySelectorAll(".link-btn")];

toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});

// set sidebar
sidebar.innerHTML = sublinks
  .map((link) => {
    const { page, links } = link;

    return `
    <article>
      <h4>${page}</h4>
      <div class="sidebar-sublinks">
        ${links
          .map((link) => {
            return `
            <a href="${link.url}"><i class="${link.icon}"></i>${link.label}</a>
          `;
          })
          .join("")}
      </div>
    </article>
  
  `;
  })
  .join("");

linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", (e) => {
    const text = e.target.textContent;
    // to dynamically place the submenu links, we use the boundingRect() of the target button
    const tempBtn = e.target.getBoundingClientRect();
    // to place the sublink at the center of the button
    const center = (tempBtn.left + tempBtn.right) / 2;
    // to move the sublink up a little
    const bottom = tempBtn.bottom - 3;

    const tempPage = sublinks.find((link) => {
      // console.log(link);
      return link.page === text;
    });

    // if the tempPage exists, then we show its submenu
    if (tempPage) {
      // console.log(tempPage);
      const { page, links } = tempPage;
      // show the submenu here
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;

      submenu.style.top = `${bottom}px`;

      /* Intially, we have col-2, a class which indicates only 2 columns for the submenu. to make it dynamic */
      let columns = "col-2";
      if (links.length === 3) {
        columns = "col-3";
      } else if (links.length > 3) {
        columns = "col-4";
      }

      submenu.innerHTML = `
        <section>
          <h4>${page}</h4>
          <div class="submenu-center ${columns}"> 
            ${links
              .map((link) => {
                return `<a href="${link.url}"><i class="${link.icon}"></i>${link.label}</a>`;
              })
              .join("")}
          </div>
        </section>
      `;
    }
  });
});

// if I navigate to the hero section, the submenu should be hidden
hero.addEventListener("mouseover", (e) => {
  submenu.classList.remove("show");
});

// since the link buttons are inside the nav (or navbar), we need to target only when the portion of the nav we nagivate to has no 'link-btn' class that we hide the submenu
nav.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("link-btn")) {
    submenu.classList.remove("show");
  }
});
