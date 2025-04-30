export default function decorate(block) {
  const blockChild = block.children;
  const list = blockChild[0];
  const last = list.children;

  Array.from(last).forEach((child) => {
    child.classList.add('li-list');

    const allList = child.children;

    Array.from(allList).forEach((data, index) => {
      data.classList.add(`li${index}`);
    });

    const showDataClasses = [
      'show-data-0',
      'show-data-1',
      'show-data-2',
      'show-data-3',
      'show-data-4',
      'show-data-5',
    ];

    // ✅ Delay default activation to ensure DOM is ready
    window.requestAnimationFrame(() => {
      const defaultIndex = 0;
      const defaultData = document.querySelector(
        `.${showDataClasses[defaultIndex]}`,
      );
      if (defaultData) defaultData.classList.add('active');
      if (allList[defaultIndex]) allList[defaultIndex].style.background = 'red';
    });

    Array.from(allList).forEach((data, index) => {
      data.addEventListener('click', () => {
        // Remove 'active' from all showData elements
        showDataClasses.forEach((cls) => {
          const el = document.querySelector(`.${cls}`);
          if (el) el.classList.remove('active');
        });

        // Reset background for all data elements
        Array.from(allList).forEach((item) => {
          item.style.background = '';
        });

        // Add 'active' to the corresponding one
        const targetData = document.querySelector(`.${showDataClasses[index]}`);
        if (targetData) targetData.classList.add('active');

        // Set the background color of the clicked element
        data.style.background = 'red';
      });
    });
  });
}
