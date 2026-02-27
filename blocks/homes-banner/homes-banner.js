// export default async function decorate(block) {
//   console.log('Home banner loaded!');
//   console.log('Block element:', block);

//   const endpoint = window.Location.contains("localhost") ? "https://author-p48457-e1275402.adobeaemcloud.com/graphql/execute.json/beautiful-homes/test" : window.location.origin+"/graphql/execute.json/beautiful-homes/test";

//   try {
//     const response = await fetch(endpoint);
//     const data = await response.json();

//     console.log("GraphQL Response:", data);

//     if (data?.data?.ronCfList?.items) {
//       renderData(block, data.data.ronCfList.items);
//     }

//   } catch (error) {
//     console.error("GraphQL Error:", error);
//   }
// }

// function renderData(block, items) {
//     console.log("block",block);
    
//   block.innerHTML = "";

//   items.forEach(item => {
//     const card = document.createElement("div");
//     card.className = "bio-card";

//     card.innerHTML = `
//       <h2>${item.title || ""}</h2>
//       <div>${item.desc?.html || ""}</div>
//       ${item.image?._path ? `<img src="${item.image._path}" alt="${item.title}">` : ""}
//     `;

//     block.appendChild(card);
//   });
// }
export default function decorate(block) {

  const section = block.closest('.section');

  const picture = block.querySelector('picture');
  const title = block.querySelector('h1, h2, h3, h4, h5, h6, p');

  // Section class
  if (block.dataset.sectionClass) {
    section.classList.add(block.dataset.sectionClass);
  }

  // Block class
  if (block.dataset.blockClass) {
    block.classList.add(block.dataset.blockClass);
  }

  // Image class
  if (picture && block.dataset.imageClass) {
    picture.classList.add(block.dataset.imageClass);
  }

  // Title class
  if (title && block.dataset.titleClass) {
    title.classList.add(block.dataset.titleClass);
  }

}