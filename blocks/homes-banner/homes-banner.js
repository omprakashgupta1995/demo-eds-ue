export default async function decorate(block) {
  console.log('Bio Cards block loaded!');
  console.log('Block element:', block);

  const endpoint = window.Location.contains("localhost") ? "https://author-p48457-e1275402.adobeaemcloud.com/graphql/execute.json/beautiful-homes/test" : window.location.origin+"/graphql/execute.json/beautiful-homes/test";

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    console.log("GraphQL Response:", data);

    if (data?.data?.ronCfList?.items) {
      renderData(block, data.data.ronCfList.items);
    }

  } catch (error) {
    console.error("GraphQL Error:", error);
  }
}

function renderData(block, items) {
  block.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "bio-card";

    card.innerHTML = `
      <h2>${item.title || ""}</h2>
      <div>${item.desc?.html || ""}</div>
      ${item.image?._path ? `<img src="${item.image._path}" alt="${item.title}">` : ""}
    `;

    block.appendChild(card);
  });
}